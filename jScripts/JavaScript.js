// פונקציה לאיסוף הערכים מהטופס
function getFormValues() {
    // קבלת הערכים מהשדות הטקסטואליים, כולל trim להסרת רווחים מיותרים
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const about = document.getElementById('aboutYou').value.trim();

    // קבלת המגדר בהתאם לבחירת המשתמש
    let gender = '';
    if (document.getElementById('genderMale').checked) {
        gender = 'זכר';
    } else if(document.getElementById('genderFemale').checked){
        gender = 'נקבה';
    }

    // הכנסת תחומי ההתנדבות שבחר המשתמש לתוך מערך
    let selectedAreas = [];
    if (document.getElementById('dogs').checked) selectedAreas[selectedAreas.length] = 'טיפול בכלבים';
    if (document.getElementById('marketing').checked) selectedAreas[selectedAreas.length] = 'פרסום';
    if (document.getElementById('education').checked) selectedAreas[selectedAreas.length] = 'הסברה';
    if (document.getElementById('cats').checked) selectedAreas[selectedAreas.length] = 'טיפול בחתולים';

    // מחזיר לפונקציה את כל הערכים שהוזנו
    return {
        name, phone, about, gender, selectedAreas
    };
}

// פונקציה שבודקת האם הטופס תקין ומשנה את כפתור השליחה
function checkFormValidity() {
    // שולף את הערכים מהטופס באמצעות הפונקציה הקודמת
    const { name, phone, about, gender, selectedAreas } = getFormValues();

    //  הכפתור לשליחה
    const sendFormButton = document.getElementById('sendForm');

    // תנאי: כל השדות מלאים, מגדר נבחר, ותחומי ההתנדבות לפחות אחד נבחר
    if (name !== '' && phone !== '' && about !== '' && gender !== '' && selectedAreas.length > 0) {
        // מפעיל את הכפתור שקיפות (100%)
        sendFormButton.disabled = false;
        sendFormButton.style.opacity = 1;
    } else {
        //  הכפתור לא פעיל שקיפות (50%)
        sendFormButton.disabled = true;
        sendFormButton.style.opacity = 0.5;
    }
}

// פונקציה שמציגה את תמונת המגדר לפי הבחירה, או מסתירה את שתיהן אם לא נבחר
function showGenderImage() {
    // מקבל את המגדר מתוך הפונקציה
    const { gender } = getFormValues();

    // משתנה לכל אחד מתמונות הזכר והנקבה
    const maleImage = document.getElementById('maleImage');
    const femaleImage = document.getElementById('femaleImage');

    // מתחיל מהסתרת שתי התמונות
    maleImage.style.display = 'none';
    femaleImage.style.display = 'none';

    // מציג רק את התמונה המתאימה לפי המגדר שנבחר
    if (gender == 'זכר') {
        maleImage.style.display = 'block';
    } else if (gender == 'נקבה') {
        femaleImage.style.display = 'block';
    }
    // אם לא נבחר מגדר, לא מציג כלום
}

// פונקציה ששולטת  בשקיפות של תמונות תחומי ההתנדבות בהתאם לבחירת המשתמש
function toggleVolunteerImage() {
    // יצירת משתנים למערכים של מזהי התיבות והתמונות המתאימות להם
    const volunteerCheckboxIds = ['dogs', 'marketing', 'education', 'cats'];
    const imageIds = ['dogImage', 'marketingImage', 'educationImage', 'catImage'];

    // לולאה על כל תחום התנדבות ובדיקה אם נבחר
    for (let i = 0; i < volunteerCheckboxIds.length; i++) {
        const checkbox = document.getElementById(volunteerCheckboxIds[i]);
        const image = document.getElementById(imageIds[i]);

        // אם מסומן, שקיפות מלאה (1), אחרת שקיפות מופחתת (0.3)
        if (checkbox.checked) {
            image.style.opacity = 1;
        } else {
            image.style.opacity = 0.3;
        }
    }
}

// פונקציה שמציגה את סיכום הפרטים שהמשתמש מילא בטופס
function showResults(event) {
    // מונע את שליחת הטופס הרגילה (ריענון דף)
    event.preventDefault();

    // שולף את כל הערכים מהטופס
    const { name, phone, about, gender, selectedAreas } = getFormValues();

    // משתנה להצגת הסיכום פרטי הטופס
    const feedback = document.getElementById('feedback');

    // הופך את תיבת המשוב לנראת
    feedback.style.opacity = 1;

    //   טקסט הסיכום של הטופס שנראה למשתמש
    document.getElementById('feedback').innerHTML = `
        <h3 class="endText">סיכום הפרטים:</h3>
        
        <p class="endText"><strong>שם מלא:</strong> ${name}</p>
        <p class="endText"><strong>טלפון:</strong> ${phone}</p>
        <p class="endText"><strong>ספר על עצמך:</strong> ${about}</p>
        <p class="endText"><strong>מגדר:</strong> ${gender}</p>
        <p class="endText"><strong>תחומי התנדבות:</strong> ${selectedAreas.join(', ')}</p>
    `;
}

// מאזין לטעינת הדף ומגדיר מאזינים לאירועים עבור השדות בטופס
document.addEventListener('DOMContentLoaded', () => {
    // רשימת מזהי כל השדות שמושפעים ובעלי אירועים שצריך להאזין להם
    const ids = ['name', 'phone', 'aboutYou', 'genderMale', 'genderFemale', 'dogs', 'marketing', 'education', 'cats'];

    for (let i = 0; i < ids.length; i++) {
        const id = ids[i]; // ניגש לאיבר הנוכחי במערך באמצעות האינדקס
        const el = document.getElementById(id);
        if (el) {
            // בעת שינוי בטקסט (input) בודק תקינות הטופס
            el.addEventListener('input', checkFormValidity);

            // בעת שינוי בערכי שדות מסוג checkbox/radio (change), מפעיל בדיקה וגם מעדכן תמונות
            el.addEventListener('change', () => {
                checkFormValidity();
                showGenderImage();
                toggleVolunteerImage();
            });
        }
    }
     

    // קריאה ראשונית לבדוק תקינות הטופס ולסדר את המצב ההתחלתי
    checkFormValidity();
});