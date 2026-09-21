const themeBtn = document.getElementById('theme-btn');
const bodyBg = document.getElementById('body-bg');
const discoverBanner = document.getElementById('discover-banner');
const currentDateContainer = document.getElementById('current-date');

themeBtn.addEventListener('click', function() {
    const colors = ['#F4F7FF', '#E2E8F0', '#FEF3C7', '#D1FAE5', '#DBEAFE', '#FCE7F3'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    bodyBg.style.backgroundColor = randomColor;
});

discoverBanner.addEventListener('click', function() {
    window.location.href = "blog.html"; 
});

function setCurrentDate() {
    const today = new Date();
    
    const dayName = today.toLocaleDateString('en-US', { weekday: 'short' });
    
    const dateFormatted = today.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
    });

    currentDateContainer.innerHTML = `
        <p class="text-gray-500 text-sm font-medium">${dayName},</p>
        <p class="text-gray-900 text-base font-bold">${dateFormatted}</p>
    `;
}

setCurrentDate();

const taskAssignedElement = document.getElementById('task-assigned');
const totalPointsElement = document.getElementById('total-points');
const historyContainer = document.getElementById('history-container');
const clearBtn = document.getElementById('clear-btn');
const completedBtns = document.querySelectorAll('.completed-btn'); 

completedBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
        alert("Board Updated Successfully");

        this.disabled = true;
        this.classList.remove('bg-blue-600', 'hover:bg-blue-700');
        this.classList.add('bg-gray-300', 'text-gray-500', 'cursor-not-allowed');

        let taskCount = parseInt(taskAssignedElement.innerText);
        let pointCount = parseInt(totalPointsElement.innerText);

        let newTaskCount = taskCount - 1;
        taskAssignedElement.innerText = newTaskCount < 10 ? '0' + newTaskCount : newTaskCount; 

        totalPointsElement.innerText = pointCount + 1; 

        const card = this.closest('.bg-\\[\\#F4F7FF\\]'); 
        const taskTitle = card.querySelector('.task-title').innerText;

        const timeNow = new Date().toLocaleTimeString();

        const historyLog = document.createElement('div');
        historyLog.className = 'bg-[#F4F7FF] p-3 rounded-lg text-gray-700 mb-3';
        historyLog.innerText = `You have completed the task ${taskTitle} at ${timeNow}`;

        historyContainer.appendChild(historyLog);
    });
});

clearBtn.addEventListener('click', function() {
    historyContainer.innerHTML = '';
});
