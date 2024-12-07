const config = {
    API_KEY: 'sk-4Ydk674523d3bbc2f7611',
    PLANT_OF_DAY_ID: (() => {
        // Get current date in YYYYMMDD format
        const today = new Date();
        const dateString = today.getFullYear().toString() + 
                          (today.getMonth() + 1).toString().padStart(2, '0') + 
                          today.getDate().toString().padStart(2, '0');
        
        // Convert date string to a number and use it as a seed
        let seed = parseInt(dateString);
        
        // Use a larger multiplier to get better distribution
        seed = seed * 1234567;
        
        // Use modulo to get a number between 0 and 10101, then add 1
        const randomNum = (seed % 10102) + 1;
        
        return randomNum;
    })(),

    GOOGLE_CLIENT_ID: '976048146595-j7v9rtblv26ifu5svv6a3mjd421crlvh.apps.googleusercontent.com', 
    DISCOVERY_DOCS: ['https://www.googleapis.com/discovery/v1/apis/tasks/v1/rest'],
    SCOPES: 'https://www.googleapis.com/auth/tasks'
};
