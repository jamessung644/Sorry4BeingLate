// Coupang Partners 광고 스크립트를 동적으로 로드하는 함수
function loadCoupangAd(adId, trackingCode, width, height, containerId) {
    // 광고 스크립트가 이미 로드되었는지 확인
    if (!window.PartnersCoupang) {
        var script = document.createElement('script');
        script.src = "https://ads-partners.coupang.com/g.js";
        script.onload = function() {
            createAd(adId, trackingCode, width, height, containerId);
        };
        document.head.appendChild(script);
    } else {
        createAd(adId, trackingCode, width, height, containerId);
    }
}

// Coupang Partners 광고를 생성하는 함수
function createAd(adId, trackingCode, width, height, containerId) {
    new PartnersCoupang.G({
        "id": adId,
        "template": "banner",
        "trackingCode": trackingCode,
        "width": width,
        "height": height,
        "containerId": containerId // 광고를 표시할 컨테이너의 ID
    });
}
