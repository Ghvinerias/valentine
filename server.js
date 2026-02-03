const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/page/:count', (req, res) => {
  const count = parseInt(req.params.count) || 2;
  res.send(generatePage(count));
});

function generatePage(yesCount) {
  // Ensure minimum count of 2
  yesCount = Math.max(2, yesCount);
  
  const FLEE_DISTANCE_THRESHOLD = 100;
  const BUTTON_MARGIN = 50;
  
  const yesButtons = [];
  const yesLabels = [
    'Yes! 😍',
    'Absolutely Yes! 💕',
    'Of course Yes! 💗',
    'Definitely Yes! 💖',
    'Yes please! 🥰',
    'Yes for sure! 💝',
    'Obviously Yes! 😊',
    'Without a doubt Yes! 💓',
    'YES! 🎉',
    'YES YES YES! ❤️'
  ];
  
  for (let i = 0; i < yesCount; i++) {
    const label = i < yesLabels.length ? yesLabels[i] : `Yes #${i + 1}! 💕`;
    yesButtons.push(`<button class="yes-btn" onclick="handleYes()">${label}</button>`);
  }
  
  const nextCount = yesCount + 1;
  const title = yesCount === 2 ? '💖 Pretty please? Be my Valentine? 💖' :
                yesCount === 3 ? '💖 Come on! Be my Valentine! 💖' :
                yesCount === 4 ? '💖 Please please please? 💖' :
                yesCount === 5 ? '💖 I\'m not giving up! 💖' :
                yesCount > 10 ? '💖 You can\'t say no forever! 💖' :
                '💖 Be my Valentine! 💖';
  
  const message = yesCount === 2 ? `<p style="font-size: 1.2em; color: #666;">You have ${yesCount} great options to say YES! 😊</p>` :
                  `<p style="font-size: 1.2em; color: #666;">You now have ${yesCount} amazing options to say YES! 😊</p>`;
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Be my Valentine?</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: 'Arial', sans-serif;
            background: linear-gradient(135deg, #ff6b9d 0%, #c06c84 100%);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
        }

        .container {
            text-align: center;
            background: white;
            padding: 50px;
            border-radius: 20px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
            max-width: 700px;
        }

        h1 {
            color: #ff6b9d;
            font-size: 2.5em;
            margin-bottom: 30px;
        }

        .buttons {
            position: relative;
            display: flex;
            justify-content: center;
            gap: 20px;
            margin-top: 40px;
            min-height: 60px;
            flex-wrap: wrap;
        }

        button {
            padding: 15px 40px;
            font-size: 1.2em;
            border: none;
            border-radius: 10px;
            cursor: pointer;
            transition: all 0.3s;
            font-weight: bold;
        }

        .yes-btn {
            background-color: #4CAF50;
            color: white;
        }

        .yes-btn:hover {
            background-color: #45a049;
            transform: scale(1.1);
        }

        .no-btn {
            background-color: #f44336;
            color: white;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
        }

        .no-btn:hover {
            background-color: #da190b;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>${title}</h1>
        ${message}
        <div class="buttons">
            ${yesButtons.join('\n            ')}
            <button class="no-btn" id="noBtn">No 😢</button>
        </div>
    </div>

    <script>
        const noBtn = document.getElementById('noBtn');

        // Handle mouse movement near the No button
        document.addEventListener('mousemove', (e) => {
            const btnRect = noBtn.getBoundingClientRect();
            const btnCenterX = btnRect.left + btnRect.width / 2;
            const btnCenterY = btnRect.top + btnRect.height / 2;
            
            const distanceX = e.clientX - btnCenterX;
            const distanceY = e.clientY - btnCenterY;
            const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
            
            // If mouse is within ${FLEE_DISTANCE_THRESHOLD}px of the button, move it away
            if (distance < ${FLEE_DISTANCE_THRESHOLD}) {
                const maxX = window.innerWidth - btnRect.width - ${BUTTON_MARGIN};
                const maxY = window.innerHeight - btnRect.height - ${BUTTON_MARGIN};
                
                let newX = Math.random() * maxX;
                let newY = Math.random() * maxY;
                
                noBtn.style.position = 'fixed';
                noBtn.style.left = newX + 'px';
                noBtn.style.top = newY + 'px';
                noBtn.style.transform = 'none';
            }
        });

        // Handle click on No button
        noBtn.addEventListener('click', () => {
            window.location.href = '/page/${nextCount}';
        });

        function handleYes() {
            alert('Yay! 💖 I knew you would say yes! 💖');
        }
    </script>
</body>
</html>`;
}

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
