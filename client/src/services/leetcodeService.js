const LEETCODE_USERNAME = 'Ankit087-acer'; // ✅ Your correct LeetCode username

export const fetchLeetCodeStats = async () => {
    try {
        // Using the free LeetCode API proxy (no CORS issues)
        const response = await fetch(`https://leetcode-api-faisalshohag.vercel.app/${LEETCODE_USERNAME}`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch LeetCode stats');
        }

        const data = await response.json();
        
        return {
            username: data.username || LEETCODE_USERNAME,
            totalSolved: data.totalSolved || 0,
            easySolved: data.easySolved || 0,
            mediumSolved: data.mediumSolved || 0,
            hardSolved: data.hardSolved || 0,
            ranking: data.ranking || 'N/A',
            reputation: data.reputation || 0,
            acceptanceRate: data.acceptanceRate || '0%',
            languages: data.languageProblemCount ? 
                data.languageProblemCount.slice(0, 5).map(l => ({
                    name: l.languageName,
                    solved: l.problemsSolved
                })) : [],
            contest: data.contest ? {
                attended: data.contest.attendedContestsCount || 0,
                rating: Math.round(data.contest.rating || 0),
                globalRanking: data.contest.globalRanking || 'N/A'
            } : null
        };
    } catch (error) {
        console.error('Error fetching LeetCode:', error);
        return getFallbackData();
    }
};

const getFallbackData = () => ({
    username: LEETCODE_USERNAME,
    totalSolved: 130, // Your actual stats from profile
    easySolved: 104,
    mediumSolved: 23,
    hardSolved: 3,
    ranking: '1,235,598',
    reputation: 0,
    acceptanceRate: '84.63%',
    languages: [
        { name: 'Java', solved: 130 },
        { name: 'C++', solved: 3 }
    ],
    contest: null,
    isFallback: true
});