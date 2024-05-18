
<script>
    document.addEventListener('DOMContentLoaded', function() {
      document.getElementById('giftForm').addEventListener('submit', function(event) {
        event.preventDefault(); 

        const reasonForArgument = document.getElementById('reason').value;
        const ageCategory = document.getElementById('ageCategory').value;
        const budgetCategory = document.getElementById('budgetCategory').value;
        const fightSeverity = document.getElementById('fightSeverity').value;

        // Simple validation (can be improved as needed)
        if(reasonForArgument && ageCategory && budgetCategory && fightSeverity) {
          generateGiftIdeas(reasonForArgument, ageCategory, budgetCategory, fightSeverity);
        } else {
          alert('Please fill in all fields.');
        }
      });

      async function generateGiftIdeas(reasonForArgument, ageCategory, budgetCategory, fightSeverity) {
        try {
          const response = await fetch('https://production.worker-dawn-truth-f0c3.sp12.workers.dev/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              reasonForArgument,
              ageCategory,
              budgetCategory,
              fightSeverity,
            }),
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const giftIdea = await response.text();
          displayGiftIdeas(giftIdea);
        } catch (error) {
          console.error('Error retrieving the gift ideas:', error);
          displayGiftIdeas('Sorry, there was a problem retrieving the gift ideas.');
        }
      }

      function displayGiftIdeas(giftIdeas) {
        document.getElementById('giftIdeas').innerText = giftIdeas;
      }
    });
  </script>
