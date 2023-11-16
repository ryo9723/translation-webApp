const fromText = document.querySelector('.fromText');
const toText = document.querySelector('.toText');
const fromLang = document.querySelector('.fromLang');
const toLang = document.querySelector('.toLang');
const btn = document.querySelector('.btn');

let fromVal = 'ja-JP';
let toVal = 'en-US';

fromLang.addEventListener('change', () => {
    fromVal = fromLang.value;
});

toLang.addEventListener('change', () => {
    toVal = toLang.value;
});

btn.addEventListener('click',() => {
    let sentence = fromText.value;
    fetch(
        `https://api.mymemory.translated.net/get?q=${sentence}&langpair=${fromVal}|${toVal}`
        )
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            return (toText.value = data.responseData.translatedText);
        });
});

const icons = document.querySelectorAll('.icons');
icons.forEach((icon) => {
    icon.addEventListener('click', (data) => {
        if(data.target.id === 'fromAudio') {
            voice = new SpeechSynthesisUtterance(fromText.value);//JSに標準搭載されているテキストの読み上げ機能
        }
        if(data.target.id === 'fromCopy') {
            navigator.clipboard.writeText(fromText.value);//JSに標準搭載されているテキストのコピー機能
        }
        if(data.target.id === 'toAudio') {
            voice = new SpeechSynthesisUtterance(toText.value);
        }
        if(data.target.id === 'ftoCopy') {
            navigator.clipboard.writeText(toText.value);
        }
        speechSynthesis.speak(voice);
    });
});

