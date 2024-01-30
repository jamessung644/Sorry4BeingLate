$(document).ready(function () {
    $('#loading').hide(); // 페이지 로딩 시 로딩 화면 숨김
});

function generateExcuse() {
    const api_key = config.apikey; // OpenAI API 키
    $('#loading').show(); // 로딩 화면 표시

    var situation = $('#situation').val();
    var target = $('#target').val();
    var intent = $('#intent').val();

    var prompt = "상황: " + situation + ", 대상: " + target + ", 의도: " + intent + ". 이 상황에서 " + target + "에게 어떻게 사과해야 하는지, 적절한 말투와 뉘앙스를 사용하여, " + intent + "를 은근하게 표현할 수 있는 사과문을 작성해주세요.";

    const data = {
        model: 'gpt-3.5-turbo',
        temperature: 0.7,
        max_tokens: 1000,
        messages: [
            { role: 'system', content: 'You are a creative assistant.' },
            { role: 'user', content: prompt },
        ],
    };

    $.ajax({
        url: "https://api.openai.com/v1/chat/completions",
        method: 'POST',
        headers: {
            Authorization: "Bearer " + api_key,
            'Content-Type': 'application/json',
        },
        data: JSON.stringify(data),
    }).then(function (response) {
        $('#loading').hide(); // 로딩 화면 숨김
        let result = $('#result');
        let responseText = response.choices && response.choices.length > 0 ? response.choices[0].message.content : "No response text found.";
        let pre = $('<pre>').text("\n\n" + responseText);
        result.empty().append(pre); // 결과 표시

        // 입력 필드 초기화 코드를 제거
    }).fail(function (err) {
        $('#loading').hide(); // 실패 시 로딩 화면 숨김
        console.error("API 요청 실패: ", err);
        alert("API 요청에 실패했습니다. API 키와 인터넷 연결을 확인해주세요.");
    });
}
// 상세 설정 드롭다운 토글
$('#detailSettingsBtn').click(function() {
    $('#detailSettingsDropdown').toggle();
});

// 볼륨 슬라이더 값 변경 시
$('#volumeSlider').on('input', function() {
    $('#volumeValue').text($(this).val() + '%');
});

document.getElementById('copyButton').addEventListener('click', function() {
    const button = this; // Reference to the copy button
    const originalText = button.innerText; // Save the original button text
    const resultText = document.getElementById('result').innerText; // Get the text from the result div

    // Use the Clipboard API to copy the text
    navigator.clipboard.writeText(resultText).then(function() {
        button.innerText = 'Copied'; // Change button text to 'Copied'
        button.disabled = true; // Disable the button to prevent further clicks

        // Set a timeout to revert the button back to its original state
        setTimeout(function() {
            button.innerText = originalText; // Revert the button text to 'Copy'
            button.disabled = false; // Re-enable the button
        }, 2000); // 2000 milliseconds = 2 seconds
    }).catch(function(error) {
        // Handle any errors (optional)
        console.error('Copy failed', error);
        // Even in case of error, revert the button after 2 seconds
        setTimeout(function() {
            button.innerText = originalText;
            button.disabled = false;
        }, 2000);
    });
});
