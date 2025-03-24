let aboutButtons;
let pictureButtons;
let bPictureBusy = false;
let pictureTimeout;

let ProjectsY;
let DocumentsY;
let menuTabs;

const aboutDescriptions = [
    "I enlisted in a university course in Computer Science at State Higher School of Technology and Economics in Jarosław in October 2022. Since then I have achieved some successes, one of them being the annual GPA of 5.0 for the 2nd year, achieved thanks to God, after my prayers had been heard. I took many courses in various IT fields, ranging from game development to creating websites. My certificates as well as my CV are presented in the <span class='docsRedir' onclick='goToDocs();'>'Documents'</span> section.",
    "I have been working in Unreal Engine 4 and 5 for 2 years, prior to that, I worked in Roblox Studio and Unity 3D, I have shipped 3 games in total, two of them in Unreal Engine. I am also familiar with Blender which I have been using for creating assets for my games (2 years of experience). I have participated in an extracurricular project at the university, tackling the problem of multithreading. The project has its own article in an international technology magazine.",
    "My most developed skill is C++, since Unreal Engine uses this language. I am familiar with the MPI library which I have used for programming on a computer cluster as well as the .NET framework with which I developed many apps. I also know C#, Java, Python and basics of Lua. I hope my humble site also shows that I have some skills in web technologies (HTML, CSS, PHP, JavaScript). I have received a certificate upon completing the Unreal Engine Multiplayer Course (see <span class='docsRedir' onclick='goToDocs();'>'Documents'</span> tab). My skill set also encompasses B2/C1 English, verified by an Erasmus Certificate.",
    "I want to start with what is the most important to me - I love God. And I am Catholic. Other than that, I'm also a passionate gamer, I'm elated when I get to binge some games together with my loved ones. Away from the computer, I adore nature, animals and taking strolls, be it with my brother or with my dog. I like cycling, playing team sports and hiking, as long as it's not too demanding. Movies are also a thing that I dig, extra points if I can find some good English in them! Sometimes, when I need to take a break, I go online to share my thoughts with others in English or Spanish. Recently I've taken up archery, too. Among my pastimes, I feel obliged to include tutoring as well. For the past two years I have been giving private lessons in math and English and I love it!"
]

// INIT

addEventListener("load", () => {

    // Populate project inventory
    let grid = document.querySelector('#inventoryGrid');
    for (let i = 0; i < projects.length; i++) {
        grid.innerHTML += '<div class="gridElement"><img src="img/project0' + (i + 1) + '.jpg" onclick="showProject(' + i + ');"></div>';
    }

    // Add functionality to "About" and "Picture" buttons
    aboutButtons = document.querySelectorAll('.contentButton');
    pictureButtons = document.querySelectorAll('.pictureButton');
    for (let i = 0; i < aboutButtons.length; i++) {
        aboutButtons[i].addEventListener('click', function () { addAboutContent(i);});
    }
    for (let i = 0; i < pictureButtons.length; i++) {
        pictureButtons[i].addEventListener('click', function () { swipePicture(i); });
    }

    // Adding the About content
    document.querySelector('#contentText').innerHTML = '<header>Skills</header>'+aboutDescriptions[2];

    // Start dynamic picture swiping
    setTimeout(() => {
        swipePicture(1);
    }, 5000);
    // Set Y positions for particular tabs
    // Project offset necessary for proper scrolling on click (see below)
    let projectsOffset;
    if (window.innerWidth > 1000)
    {
        // PC
        ProjectsY = 300;
        DocumentsY = 900;
        projectsOffset = 350;
    } else {
        // MOBILE
        ProjectsY = 150;
        DocumentsY = 500;
        projectsOffset = 180;
    }
    // Get menu tabs
    menuTabs = document.querySelectorAll('.menuTab');

    // Scrolling to a particular tab on click
    menuTabs[0].addEventListener('click', () => { scrollBy(0, -window.scrollY)});
    menuTabs[1].addEventListener('click', () => { scrollBy(0, -(window.scrollY - ProjectsY - projectsOffset))});
    menuTabs[2].addEventListener('click', () => { scrollBy(0, -(window.scrollY - DocumentsY - 300))});

    // Initial highlight
    menuTabs[0].classList.add('highlighted');
});

addEventListener("scroll", () => {
    menuTabs.forEach(function(tab) {
        tab.classList.remove('highlighted');
    });

    if (window.scrollY < ProjectsY)
    {
        // menu
        menuTabs[0].classList.add('highlighted');
    }
    else if (window.scrollY < DocumentsY) 
    {
        // projects
        menuTabs[1].classList.add('highlighted');
    }
    else
    {
        // documents
        menuTabs[2].classList.add('highlighted');
    }
})


// ABOUT



function addAboutContent(num) {
    let title;
    switch (num) {
        case 0: title = 'Education'; break;
        case 1: title = 'Experience'; break;
        case 2: title = 'Skills'; break;
        case 3: title = 'More'; break;
        default: title = 'UNKNOWN'; break;
    }
    for (let i = 0; i < aboutButtons.length; i++) {
        if (aboutButtons[i].classList.contains('contentButtonClicked'))
            aboutButtons[i].classList.remove('contentButtonClicked');
    }

    document.querySelector('#contentText').innerHTML = '<header>'+title+'</header>'+aboutDescriptions[num];
    aboutButtons[num].classList.add('contentButtonClicked');
}

function swipePicture(num) {
    if (bPictureBusy) return;
    bPictureBusy = true;
    clearTimeout(pictureTimeout);
    document.querySelectorAll('.pictureButton > .icon-circle').forEach( (el) => {
        el.outerHTML = '<i class="icon-circle-thin"></i>';
    });
    pictureButtons[num].innerHTML = '<i class="icon-circle"></i>';
    
    $('#aboutPicture img').fadeOut(500, function() {
        $('#aboutPicture img').get(0).src = 'img/myPics/pic0' + (num+1) + '.jpg';
        $('#aboutPicture img').fadeIn(500, function() { 
            pictureTimeout = setTimeout(() => {
                if (num >= 4) swipePicture(0);
                else swipePicture(num+1);
            }, 5000);
            bPictureBusy = false;
        });
    });
}

function goToDocs() {
    scrollBy(0, -(window.scrollY - DocumentsY - 300));
}


// PROJECTS

class Project {
    title = "UNKNOWN";
    desc = "UNKNOWN";
    youtube = "UNKNOWN";
    github = "UNKNOWN";
    constructor(title, desc, youtube, github) {
        this.title = title;
        this.desc = desc;
        this.youtube = youtube;
        this.github = github;
    }
}

const projects = [
    new Project('Scavengers',
        'An Unreal Engine 4 project written mainly in C++ featuring parkour, sneaking, a dynamic stamina and health system and a wide variety of interaction with the world including lock picking, opening doors and windows, random loot generators, picking up and dropping items.',
        '993rVx6QGbw',
        'LordaxPL/ScavengersProject'),
    new Project('Language App',
        'An application for language learning written in Java. The app takes the advantage of a local SQLite database to store and manipulate terms and translations, offering basic CRUD operations as well as memory training. The progress of the training is tracked with a progress bar.',
        'rpx6soCRKUA',
        'JakubSzumilak/LanguageApp'),
    new Project('Multithreading',
        'A C# program prepared as an extracurricular work during summer break 2024. The app quickly calculates integrals using the Simpson method and the ability to use more than just one thread makes the operation much faster. A cluster version of the project has also been created.',
        'JCT35A38eoc',
        'JakubSzumilak/Multithreaded-Integral-Calculations'),
    new Project('Photovoltaics',
        'This C# project serves as a simplified version of an app to interpret photovoltaic plant outputs. It takes gauged values and computes them into real output of the plant. Data from every month is gathered and saved to an external file and can be then tracked.',
        '3yMw0-wvuwo',
        'JakubSzumilak/PhotovoltaicApp'),
    new Project('Company Site',
        'A retail website created using HTML, CSS, PHP and JavaScript. Except for displaying product and company information from a database, modifying the database is also provided, featuring adding and removing both products and staff information. Accessibility features have also been included.',
        'MxFYeh1C9Zc',
        'JakubSzumilak/CompanySite'),
    new Project('Cyber Post',
        'CyberPost was a group project of an online mailing service created during vocational workshop by a team of 5. I was mainly responsible for the backend (PHP) and JavaScript. I created the registering and logging system, including password hashing and set up the mail sending feature.',
        'GL_OD3JiJpg',
        'JakubSzumilak/CyberPost')
]

// projects descriptions
// 1 - Scavengers 2 - LanguageApp 3 - Multithreading
// 4 - Photovoltaics 5 - CompanySite 6 - CyberPost

function showProject(num) {
    document.querySelector('#projectTab').innerHTML = '<header>' + projects[num].title + '</header>' +
        '<div id="description"><img src="img/wideProject0' + (num + 1) + '.jpg"> ' + projects[num].desc + '</div>' +
        '<div id="projectLinks"><a href="https://github.com/' + projects[num].github + '" target="_blank"><i class="icon-github-circled"></i></a>' +
        '<a href="https://www.youtube.com/watch?v=' + projects[num].youtube + '" target="_blank"><i class="icon-youtube-play" style="color: #FF0000;"></i></a>';
}

// Animation

