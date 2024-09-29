import cron from "node-cron";

// schedule a cron job for daily cleanup at 12:30 AM IST

cron.schedule('0 19 * * *', async () => {
    console.log('Running daily cleanup at 12:30 AM IST');
    const result = await fetch(`http://localhost:${process.env.PORT}/api/dailyCleanup`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ key: process.env.JWT_SECRET })
    });
    const data = await result.json();
    console.log(data);
  },{
    scheduled: true
});