const texts = ["사과를", "합의를", "축하를", "변명을", "희망을", "기다림을", "배려를", "칭찬을"];
let currentIndex = 0;

setInterval(() => {
    const animatedText = document.getElementById("animatedText");
    animatedText.style.opacity = "0"; // 텍스트를 숨깁니다 (페이드 아웃)

    // 다음 인덱스 계산, 배열 범위를 넘지 않도록
    currentIndex = (currentIndex + 1) % texts.length;

    // 페이드 아웃 후 새 텍스트로 변경하고 페이드 인
    setTimeout(() => {
        animatedText.textContent = texts[currentIndex]; // 새 텍스트로 변경
        animatedText.style.opacity = "1"; // 텍스트를 다시 보이게 합니다 (페이드 인)
    }, 1000); // 페이드 아웃이 완료된 후 텍스트 변경
}, 3000); // 전체 애니메이션 주기를 3초로 설정 (페이드 아웃
