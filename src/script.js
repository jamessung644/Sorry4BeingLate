function generateExcuse() {
    const api_key = config.apikey; // OpenAI API 키
    $('#loading').show(); // 로딩 화면 표시

    var from = $('#from').val();
    var to = $('#to').val();
    var intent = $('#intent').val();
    var type = $('#type').val(); // 본인의 이름
    var speech = $('#speech').val(); // 대상과의 관계
    var etc = $('#etc').val(); // 기타 정보
    var sliderValue = document.getElementById('volumeSlider').value;

    // 슬라이드 바 값을 기반으로 형용사를 가져옵니다
    var nuance = "따스한";

    var prompt = ""; // 프롬프트 초기화

    // 모든 필수 필드가 채워졌는지 확인
    if (from && to && intent) {
        // 기본 프롬프트 구성
        prompt = "부가적인 정보 없이 내가 원하는 글만 작성해야해. "+ "누가: " + from + ", 누구에게: " + to + "은 " + from + "(나는)은 대상과의 관계를 보고 적절한 말을 사용해서" + to + "에게 " + intent + "을 글로 작성해야 해.";
        
        if(type) {
            // 세부사항이 부족한 경우
            prompt += "글을 "+ type + "에 작성하야해";
        }
        else if(type && speech) {
            // 세부사항이 부족한 경우
            prompt += " 글은 " + type + "에 작성하고, 말투는 " + speech + "를 사용해.";
        }
        // 세부사항이 모두 제공되었는지 확인
        else if (type && speech && etc) {
            // 세부사항을 포함한 프롬프트
            prompt += " 글은 " + type + "에 작성하고, 말투는 " + speech + "를 사용해. 추가적인 정보는 " + etc + "야.";
        }
        
    }

    if (!prompt) {
        alert("필수 정보를 모두 입력해주세요.");
        $('#loading').hide(); // 로딩 화면 숨김
        return; // 필수 정보가 없으면 함수를 종료합니다.
    }

    const data = {
        model: 'gpt-3.5-turbo-0613',
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
        button.innerText = '복사됨!'; // Change button text to 'Copied'
        button.disabled = true; // Disable the button to prevent further clicks

        // Set a timeout to revert the button back to its original state
        setTimeout(function() {
            button.innerText = originalText; // Revert the button text to 'Copy'
            button.disabled = false; // Re-enable the button
        }, 2000); // 2000 milliseconds = 2 seconds
    }).catch(function(error) {
        // Handle any errors (optional)
        console.error('복사 실패', error);
        // Even in case of error, revert the button after 2 seconds
        setTimeout(function() {
            button.innerText = originalText;
            button.disabled = false;
        }, 2000);
    });
});
