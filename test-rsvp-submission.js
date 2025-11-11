// Test RSVP submission to verify backend is working

const testRSVP = async () => {
    console.log('🧪 Testing RSVP submission...\n');

    try {
        const response = await fetch('http://localhost:3000/api/rsvps', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                eventId: 'bowling',
                name: 'Test User',
                plusOnes: 2
            })
        });

        const data = await response.json();

        if (data.success) {
            console.log('✅ RSVP Submission Successful!');
            console.log(`   - ID: ${data.id}`);
            console.log(`   - Message: ${data.message}\n`);

            // Fetch all RSVPs to verify
            console.log('📊 Fetching all RSVPs...\n');
            const allRSVPs = await fetch('http://localhost:3000/api/admin/rsvps');
            const allData = await allRSVPs.json();

            console.log(`Total RSVPs in database: ${allData.rsvps.length}\n`);
            allData.rsvps.forEach((rsvp, index) => {
                console.log(`${index + 1}. ${rsvp.name} - ${rsvp.event_id} (+${rsvp.plus_ones})`);
            });

            console.log('\n✅ Backend is working correctly!');
            console.log('\n🌐 View all RSVPs at: http://localhost:3000/admin-rsvps.html');
        } else {
            console.error('❌ RSVP submission failed:', data);
        }
    } catch (error) {
        console.error('❌ Error:', error.message);
        console.log('\n⚠️  Make sure the server is running: npm start');
    }
};

testRSVP();
