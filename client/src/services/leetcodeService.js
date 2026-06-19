const LEETCODE_USERNAME = 'Ankit087-acer';

export const fetchLeetCodeStats = async () => {
    try {
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
                        }
                        userContestRanking(username: $username) {
                            attendedContestsCount
                            rating
                            globalRanking
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

        const user = data.data.matchedUser;
        const submissions = user.submitStats?.acSubmissionNum || [];
        
        // Get stats for each difficulty
        const allStats = submissions.find(s => s.difficulty === 'All');
        const easyStats = submissions.find(s => s.difficulty === 'Easy');
        const mediumStats = submissions.find(s => s.difficulty === 'Medium');
        const hardStats = submissions.find(s => s.difficulty === 'Hard');
        
        // ✅ Calculate acceptance rates
        // Acceptance Rate = (Accepted / Total Submissions) * 100
        const calculateRate = (accepted, submissions) => {
            if (!submissions || submissions === 0) return 0;
            return (accepted / submissions) * 100;
        };
        
        const totalAccepted = allStats?.count || 0;
        const totalSubmissions = allStats?.submissions || 0;
        const easyAccepted = easyStats?.count || 0;
        const easySubmissions = easyStats?.submissions || 0;
        const mediumAccepted = mediumStats?.count || 0;
        const mediumSubmissions = mediumStats?.submissions || 0;
        const hardAccepted = hardStats?.count || 0;
        const hardSubmissions = hardStats?.submissions || 0;
        
        return {
            username: user.username,
            totalSolved: totalAccepted,
            easySolved: easyAccepted,
            mediumSolved: mediumAccepted,
            hardSolved: hardAccepted,
            totalSubmissions: totalSubmissions,
            easySubmissions: easySubmissions,
            mediumSubmissions: mediumSubmissions,
            hardSubmissions: hardSubmissions,
            // ✅ Acceptance rates (as percentage strings)
            acceptanceRate: calculateRate(totalAccepted, totalSubmissions).toFixed(1),
            easyAcceptance: calculateRate(easyAccepted, easySubmissions).toFixed(1),
            mediumAcceptance: calculateRate(mediumAccepted, mediumSubmissions).toFixed(1),
            hardAcceptance: calculateRate(hardAccepted, hardSubmissions).toFixed(1),
            ranking: user.profile?.ranking || 'N/A',
            reputation: user.profile?.reputation || 0,
            starRating: user.profile?.starRating || 0,
            languages: (user.languageProblemCount || []).slice(0, 5).map(l => ({
                name: l.languageName,
                solved: l.problemsSolved
            })),
            contest: data.data.userContestRanking ? {
                attended: data.data.userContestRanking.attendedContestsCount || 0,
                rating: Math.round(data.data.userContestRanking.rating || 0),
                globalRanking: data.data.userContestRanking.globalRanking || 'N/A'
            } : null
        };
    } catch (error) {
        console.error('Error fetching LeetCode:', error);
        return getFallbackData();
    }
};

const getFallbackData = () => ({
    username: LEETCODE_USERNAME,
    totalSolved: 130,
    easySolved: 104,
    mediumSolved: 23,
    hardSolved: 3,
    totalSubmissions: 631,
    easySubmissions: 122,
    mediumSubmissions: 30,
    hardSubmissions: 5,
    // ✅ Fallback acceptance rates (from your actual stats)
    acceptanceRate: '84.6',
    easyAcceptance: '85.2',
    mediumAcceptance: '76.7',
    hardAcceptance: '60.0',
    ranking: '1,235,598',
    reputation: 0,
    starRating: 0,
    languages: [
        { name: 'Java', solved: 130 },
        { name: 'C++', solved: 3 }
    ],
    contest: null,
    isFallback: true
});