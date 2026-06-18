const LEETCODE_USERNAME = 'Ankit087-acer';

export const fetchLeetCodeStats = async () => {
    try {
        // Using the LeetCode GraphQL API directly (no CORS issues with this endpoint)
        const response = await fetch('https://leetcode.com/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Referer': 'https://leetcode.com'
            },
            body: JSON.stringify({
                query: `
                    query getUserProfile($username: String!) {
                        matchedUser(username: $username) {
                            username
                            submitStats: submitStatsGlobal {
                                acSubmissionNum {
                                    difficulty
                                    count
                                    submissions
                                }
                            }
                            profile {
                                ranking
                                reputation
                                starRating
                            }
                            languageProblemCount {
                                languageName
                                problemsSolved
                            }
                            tagProblemCounts {
                                advanced {
                                    tagName
                                    tagSlug
                                    problemsSolved
                                }
                                intermediate {
                                    tagName
                                    tagSlug
                                    problemsSolved
                                }
                                fundamental {
                                    tagName
                                    tagSlug
                                    problemsSolved
                                }
                            }
                        }
                        recentSubmissionList(username: $username, limit: 10) {
                            title
                            titleSlug
                            timestamp
                            statusDisplay
                            lang
                        }
                        userContestRanking(username: $username) {
                            attendedContestsCount
                            rating
                            globalRanking
                            totalParticipants
                            topPercentage
                        }
                    }
                `,
                variables: { username: LEETCODE_USERNAME }
            })
        });

        const data = await response.json();
        
        if (data.errors || !data.data?.matchedUser) {
            console.error('GraphQL Errors:', data.errors);
            return getFallbackData();
        }

        return transformLeetCodeData(data.data);
    } catch (error) {
        console.error('Error fetching LeetCode:', error);
        return getFallbackData();
    }
};

const transformLeetCodeData = (data) => {
    const user = data.matchedUser;
    const submissions = user.submitStats?.acSubmissionNum || [];
    
    const totalSolved = submissions.find(s => s.difficulty === 'All')?.count || 0;
    const easySolved = submissions.find(s => s.difficulty === 'Easy')?.count || 0;
    const mediumSolved = submissions.find(s => s.difficulty === 'Medium')?.count || 0;
    const hardSolved = submissions.find(s => s.difficulty === 'Hard')?.count || 0;

    // Calculate acceptance rate
    let acceptanceRate = 0;
    if (submissions.length > 0) {
        const totalSubmissions = submissions.find(s => s.difficulty === 'All')?.submissions || 1;
        acceptanceRate = totalSolved > 0 ? ((totalSolved / totalSubmissions) * 100) : 0;
    }

    // Get languages
    const languages = (user.languageProblemCount || [])
        .sort((a, b) => b.problemsSolved - a.problemsSolved)
        .slice(0, 5)
        .map(lang => ({
            name: lang.languageName,
            solved: lang.problemsSolved
        }));

    // Get contest data
    const contest = data.userContestRanking || null;

    // Get recent submissions
    const recent = (data.recentSubmissionList || [])
        .slice(0, 5)
        .map(sub => ({
            title: sub.title,
            status: sub.statusDisplay,
            language: sub.lang,
            timestamp: new Date(parseInt(sub.timestamp) * 1000).toLocaleDateString()
        }));

    return {
        username: user.username,
        totalSolved,
        easySolved,
        mediumSolved,
        hardSolved,
        ranking: user.profile?.ranking || 'N/A',
        reputation: user.profile?.reputation || 0,
        starRating: user.profile?.starRating || 0,
        acceptanceRate: acceptanceRate.toFixed(1),
        languages,
        contest: contest ? {
            attended: contest.attendedContestsCount || 0,
            rating: Math.round(contest.rating || 0),
            globalRanking: contest.globalRanking || 'N/A',
            topPercentage: contest.topPercentage || 0
        } : null,
        recent
    };
};

const getFallbackData = () => ({
    username: LEETCODE_USERNAME,
    totalSolved: 130,
    easySolved: 104,
    mediumSolved: 23,
    hardSolved: 3,
    ranking: '1,235,598',
    reputation: 0,
    starRating: 0,
    acceptanceRate: '84.6',
    languages: [
        { name: 'Java', solved: 130 },
        { name: 'C++', solved: 3 }
    ],
    contest: null,
    recent: [],
    isFallback: true
});