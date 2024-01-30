document.addEventListener('DOMContentLoaded', function() {

    // adjective.js
    function getAdjectiveBySliderValue(value) {
        var adjectives = [
            "노골적인", "무례할 정도로 솔직한", "거침없는", "직접적인", "솔직한", 
            "직선적인", "명확한", "단호한", "논리적인", "냉정한",
            "동정심 많은", "감동적인", "공감적인", "이해심 있는", "배려 깊은", 
            "인정 많은", "관대한", "민감한", "따뜻한", "애정 어린"
        ];
        
        var index = Math.floor(value / 5.1); // 0에서 100 사이의 값을 0에서 19 사이의 인덱스로 변환
        return adjectives[index];
    }

    volumeSlider.addEventListener('input', function() {
        var value = this.value;
        var adjective = getAdjectiveBySliderValue(value); // Corrected function name
        volumeValue.textContent = adjective;
    });
    
});
