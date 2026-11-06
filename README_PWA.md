# MEZBAAN (मेज़बान) - Kaam 2: phone ke icon wali app (GitHub par)

Isse app phone ki home screen par asli app jaisi lagti hai (icon, poori screen, bina browser ke bar ke), aur **internet band ho tab bhi khulti hai**
(aakhri saved data dikhata hai). Google ka server (Apps Script) sirf data ke liye chalta hai.

**Pehle Kaam 1 (`README_DEPLOY.md`, Hissa 1 se 5) poora karo**: Apps Script ka Web app link chahiye. Computer par karna hai, lagbhag 10 minute.

## Folder `2_github` mein kya hai
`index.html` (poori app), `config.js` (aapka Google link yahan jaayega), `sw.js` (phone par app yaad rakhne wali file),
`manifest.webmanifest` (naam, rang, icon), `icons/` (logo), `wrapper.html` (plan B, abhi kaam nahi aayegi).

## Kadam 1: apna Google link config.js mein daalo
1. `config.js` ko Notepad mein kholo.
2. `PASTE_THE_WEB_APP_URL_HERE` ki jagah apna Web app URL paste karo (`https://script.google.com/macros/s/.../exec`). Quotes (`'`) rehne do. Save.
   (Agar yeh karna bhool gaye, to app khulne par "One step left / एक कदम बाकी है" likha aayega, aur batayegi ki kya karna hai. Kuch bigadta nahi.)

## Kadam 2: GitHub par upload
1. github.com/sahadkhan78645-afk/mezbaan kholo (login karke).
2. **Add file** > **Upload files**. Folder `2_github` ke andar ki **sab files aur `icons` folder** kheench kar daalo (folder ke andar ki cheezein, folder ka naam nahi).
3. Neeche **Commit changes** dabao. Purani files agar same naam ki hain to badal jaati hain.

## Kadam 3: GitHub Pages chalu karo
1. Repo mein **Settings** > left mein **Pages**.
2. **Source: Deploy from a branch**. **Branch: main**, folder **/ (root)**. **Save**.
3. 1-2 minute ruko. Upar app ka link dikhega: `https://sahadkhan78645-afk.github.io/mezbaan/`. Yahi app ka naya link hai.

## Kadam 4: phone par app lagao
- **Android (Chrome):** link kholo > upar teen bindi (⋮) > **Install app** (ya **Add to Home screen**).
- **iPhone (Safari hi, Chrome nahi):** link kholo > neeche Share (⬆️) > **Add to Home Screen**.
Phir home screen ke **MEZBAAN icon** se kholo.

## Kadam 5: jaanch (2 minute)
1. Icon se kholo. Login screen aani chahiye. Apna mobile aur PIN daalo, Home par ghar dikhne chahiye.
2. Phone ko **Airplane mode** par karo, app band karke dobara icon se kholo. App khulni chahiye aur "You are offline" ke saath purana data dikhna chahiye.
3. Airplane mode hatao. Kuch dikkat ho (jaise "Could not load" jab ki internet hai) to mujhe screenshot bhejo.

## Baad mein app badalni ho to
Mujhse naya `index.html` lo aur GitHub par upload karo (**Add file > Upload files**; `config.js` ko mat chhoona, wo wahi rehne do). Phone par app agli baar internet ke saath khulne par apne aap naya ho jaata hai. Jo app pehle se khuli hai usme ek chhota card aata hai: **Update** dabao.
**Dhyan:** agar Apps Script ka code (`Code.gs`) bhi badla ho to pehle wahan naya version deploy karo (README_DEPLOY ka "Baad mein server badalna ho to"). Dono ka Version number ek jaisa hona chahiye; nahi hua to app khud card dikha deti hai.

## Plan B (agar GitHub wali app Google se baat na kar paaye)
Pehle Google par `Index.html` bhi paste karo (README_DEPLOY ka **Hissa 6**). Phir mujhe batao: main `wrapper.html` ko index banakar nayi files bhej dunga. Tab app phone par install hogi par internet band hone par nahi khulegi.

## Raaz ki baatein
- **GitHub par repo public hai**, to `config.js` mein likha Google link koi bhi dekh sakta hai. Jiske paas link hai wo "admin ke roop mein judh" sakta hai (yahi hamara tay kiya hua tareeka hai). Isliye link sirf admins ko do. Search mein na aaye isliye page par `noindex` laga hai, par poori guarantee nahi.
- Agar chaho to baad mein judne ke liye ek chhota code (jaise 6 ank) bhi laga sakte hain, jo sirf admins ko pata ho. Batao to jod dunga.
- Imaandaari se: yeh sab abhi computer par nakli server ke saath jaancha gaya hai. Asli Google se pehli baar baat hogi, isliye Kadam 5 zaroor karna.
