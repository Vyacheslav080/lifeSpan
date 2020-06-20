var app = new Vue({ 
    el: '#app',
    data: {
        text:'hey',
        year: 0,
        month: 0,
        day: 0,
        hour: 0,
        minute: 0,
        second: 0,
    }
});

let isLeap = (year)=> ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
let thirtyDaysMonths = [4, 6, 9, 11];
document.getElementById('submit').onclick = (e)=>{
    e.preventDefault();
    document.getElementById('birthDate').value !== '' ? bDate = new Date(document.getElementById('birthDate').value) : alert('invalid value');
    let now = new Date();
    app.year = now.getFullYear() - bDate.getFullYear();
    app.month = now.getMonth() - bDate.getMonth() + 1;
    if(app.month < 0){
        app.year--; 
        app.month += 12;
    }
    app.day = now.getDate() - bDate.getDate(); 
    if(app.day < 0){
        if(thirtyDaysMonths.includes(app.month)){
            app.day+=30;
        }else if(app.month == 1){
            isLeap(now.getFullYear()) ? app.day += 29 : app.day += 28;
        }else app.day += 31;
        app.month--;
        if(app.month < 0){
            app.year--; 
            app.month += 12;
        }
    }
    app.hour = now.getHours();
    app.minute = now.getMinutes();
    app.second = now.getSeconds();
    document.getElementById('form').style.visibility = 'hidden';
}
let counter = setInterval(()=>{
    app.second++; 
    if(app.second >= 60){
        app.second = 0;
        app.minute++;
    }
    if(app.minute >= 60){
        app.minute = 0;
        app.hour++;
    }
    if(app.hour >= 24){
        app.hour = 0;
        app.day++;
    }
    if(thirtyDaysMonths.includes(app.month)){
        if(app.day > 30){
            app.day = 1;
            app.month++;
        }
    }else if(app.month == 2){
        if(isLeap(app.year)){
            if(app.day > 29){
                app.day = 1;
                app.month++;
            }else if(app.day > 28){
                app.day = 1;
                app.month++;
            }
        }
    }else if(app.day > 31){
        app.day = 1;
        app.month++;
    }
    if(app.month > 12){
        app.month = 1;
        app.year++;
    }
}, 1000);
document.getElementById('bDateChangeBtn').onclick = () =>  document.getElementById('form').style.visibility = 'visible';