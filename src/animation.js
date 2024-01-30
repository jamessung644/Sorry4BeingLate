const texts = ["사과를", "합의를", "축하를", "변명을"];
let currentIndex = 0;

setInterval(() => {
    currentIndex = (currentIndex + 1) % texts.length; // 다음 인덱스 계산, 배열 범위를 넘지 않도록
    const animatedText = document.getElementById("animatedText");
    animatedText.style.opacity = "0"; // 텍스트를 숨깁니다 (페이드 아웃)

    setTimeout(() => {
        animatedText.textContent = texts[currentIndex]; // 새 텍스트로 변경
        animatedText.style.opacity = "1"; // 텍스트를 다시 보이게 합니다 (페이드 인)
    }, 2000); // CSS 애니메이션의 절반 시간 (1.5초) 후에 텍스트를 변경
}, 4000); // 3초마다 텍스트 변경
