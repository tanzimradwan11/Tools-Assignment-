// HTML এর বিভিন্ন অংশগুলো (DOM) আইডি ধরে সিলেক্ট করে ভেরিয়েবলে রাখছি
const themeBtn = document.getElementById('theme-btn');
const bodyBg = document.getElementById('body-bg');
const discoverBanner = document.getElementById('discover-banner');
const currentDateContainer = document.getElementById('current-date');

// ১. ব্যাকগ্রাউন্ড কালার চেঞ্জ করা (Theme Toggle)
themeBtn.addEventListener('click', function() {
    // কিছু হালকা রঙের লিস্ট
    const colors = ['#F4F7FF', '#E2E8F0', '#FEF3C7', '#D1FAE5', '#DBEAFE', '#FCE7F3'];
    // লিস্ট থেকে র‍্যান্ডম একটি রঙ বেছে নেওয়া
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    // বডির ব্যাকগ্রাউন্ডে সেই রঙ বসিয়ে দেওয়া
    bodyBg.style.backgroundColor = randomColor;
});

// ২. Discover ব্যানারে ক্লিক করলে ব্লগ পেজে যাওয়া
discoverBanner.addEventListener('click', function() {
    window.location.href = "blog.html"; 
});

// ৩. আজকের তারিখ ডায়নামিক ভাবে বসানো
function setCurrentDate() {
    const today = new Date();
    
    // সপ্তাহের দিন (যেমন: Mon,)
    const dayName = today.toLocaleDateString('en-US', { weekday: 'short' });
    
    // মাস, দিন এবং বছর (যেমন: Sep 21, 2026)
    const dateFormatted = today.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
    });

    // উপরে দিন হালকা করে এবং নিচে তারিখ বোল্ড করে রেন্ডার করা
    currentDateContainer.innerHTML = `
        <p class="text-gray-500 text-sm font-medium">${dayName},</p>
        <p class="text-gray-900 text-base font-bold">${dateFormatted}</p>
    `;
}

// পেজ লোড হলেই তারিখের ফাংশনটি যেন কাজ করে
setCurrentDate();


// தேவையான এলিমেন্টগুলো সিলেক্ট করা
const taskAssignedElement = document.getElementById('task-assigned');
const totalPointsElement = document.getElementById('total-points');
const historyContainer = document.getElementById('history-container');
const clearBtn = document.getElementById('clear-btn');
const completedBtns = document.querySelectorAll('.completed-btn'); 

// প্রতিটি 'Completed' বাটনে ক্লিক ইভেন্ট যোগ করা
completedBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
        // ১. অ্যালার্ট দেখানো
        alert("Board Updated Successfully");

        // ২. বাটনটি ডিজেবল করা এবং রঙ পরিবর্তন করা (অ্যাশ কালার)
        this.disabled = true;
        this.classList.remove('bg-blue-600', 'hover:bg-blue-700');
        this.classList.add('bg-gray-300', 'text-gray-500', 'cursor-not-allowed');

        // ৩. টাস্ক সংখ্যা কমানো এবং পয়েন্ট বাড়ানো
        let taskCount = parseInt(taskAssignedElement.innerText);
        let pointCount = parseInt(totalPointsElement.innerText);

        // টাস্কের সংখ্যা যদি ১০ এর নিচে হয়, তবে সামনে একটা '0' দেখানোর জন্য
        let newTaskCount = taskCount - 1;
        taskAssignedElement.innerText = newTaskCount < 10 ? '0' + newTaskCount : newTaskCount; 
        
        // টোটাল পয়েন্ট বাড়ানো
        totalPointsElement.innerText = pointCount + 1; 

        // ৪. অ্যাক্টিভিটি লগে মেসেজ যোগ করা
        const card = this.closest('.bg-\\[\\#F4F7FF\\]'); 
        const taskTitle = card.querySelector('.task-title').innerText;
        
        // বর্তমান সময় বের করা (যেমন: 11:13:49 AM)
        const timeNow = new Date().toLocaleTimeString();

        // নতুন একটি div তৈরি করে সেখানে টেক্সট বসানো
        const historyLog = document.createElement('div');
        historyLog.className = 'bg-[#F4F7FF] p-3 rounded-lg text-gray-700 mb-3';
        historyLog.innerText = `You have completed the task ${taskTitle} at ${timeNow}`;
        
        // ডানপাশের হিস্ট্রি কন্টেইনারে নতুন লগটি যোগ করা
        historyContainer.appendChild(historyLog);
    });
});

// ক্লিয়ার হিস্ট্রি বাটনের কাজ
clearBtn.addEventListener('click', function() {
    historyContainer.innerHTML = '';
});