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
            return getFallbackData();
        }

        const user = data.data.matchedUser;
        const submissions = user.submitStats?.acSubmissionNum || [];
        
        // Get total submissions and accepted
        const allStats = submissions.find(s => s.difficulty === 'All');
        const totalSubmissions = allStats?.submissions || 0;
        const totalSolved = allStats?.count || 0;
        
        // ✅ Calculate acceptance rate
        // Acceptance Rate = (Total Accepted Problems / Total Submissions) * 100
        let acceptanceRate = 0;
        if (totalSubmissions > 0) {
            acceptanceRate = (totalSolved / totalSubmissions) * 100;
        }

        // For individual difficulties
        const easyStats = submissions.find(s => s.difficulty === 'Easy');
        const mediumStats = submissions.find(s => s.difficulty === 'Medium');
        const hardStats = submissions.find(s => s.difficulty === 'Hard');

        // Calculate difficulty-wise acceptance rates
        const easyAcceptance = easyStats?.submissions > 0 
            ? (easyStats.count / easyStats.submissions) * 100 
            : 0;
        const mediumAcceptance = mediumStats?.submissions > 0 
            ? (mediumStats.count / mediumStats.submissions) * 100 
            : 0;
        const hardAcceptance = hardStats?.submissions > 0 
            ? (hardStats.count / hardStats.submissions) * 100 
            : 0;
        
        return {
            username: user.username,
            totalSolved: totalSolved,
            easySolved: easyStats?.count || 0,
            mediumSolved: mediumStats?.count || 0,
            hardSolved: hardStats?.count || 0,
            totalSubmissions: totalSubmissions,
            // ✅ Acceptance rates
            acceptanceRate: acceptanceRate.toFixed(1),
            easyAcceptance: easyAcceptance.toFixed(1),
            mediumAcceptance: mediumAcceptance.toFixed(1),
            hardAcceptance: hardAcceptance.toFixed(1),
            // ✅ Add submission counts for each difficulty
            easySubmissions: easyStats?.submissions || 0,
            mediumSubmissions: mediumStats?.submissions || 0,
            hardSubmissions: hardStats?.submissions || 0,
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
    // ✅ Fallback acceptance rates
    acceptanceRate: '84.6',
    easyAcceptance: '85.2',
    mediumAcceptance: '76.7',
    hardAcceptance: '60.0',
    easySubmissions: 122,
    mediumSubmissions: 30,
    hardSubmissions: 5,
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