//경고창
function alert_basic(title, txt, url, use_button) {
    if (title == '' || title == undefined) title = '';
    if (txt == '' || txt == undefined) txt = '';
    if (url == '' || url == undefined) url = '';

    var hideButton = use_button ? false : true;
    if (url != '') {
        sweet_alert_redirect(txt, url, '', title, hideButton);
    } else {
        sweet_alert(txt, '', title, hideButton);
    }
}

function alert_auto_close_timer(title, txt, url, time) {
    if (title == '' || title == undefined) title = '';
    if (txt == '' || txt == undefined) txt = '';
    if (url == '' || url == undefined) url = '';

    if (url != '') {
        sweet_alert_autoclose(txt, '', title, true);
        setTimeout(function () { document.location.href = url; }, time);
    } else {
        sweet_alert_autoclose(txt, '', title, true);
    }
}

function alert_confirm(title, txt, callbackMethod) {
    if (title == '' || title == undefined) title = '';
    if (txt == '' || txt == undefined) txt = '';

    sweet_confirm(txt, '', title, callbackMethod);
}

var isSliding = false; // 애니메이션 상태

var slideUp = function(target, duration) {
    duration = duration || 500;
    if (isSliding) return; // 애니메이션 중일 때는 동작하지 않음
    isSliding = true; // 애니메이션 시작
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = duration + 'ms';
    target.style.boxSizing = 'border-box';
    target.style.height = target.offsetHeight + 'px';
    target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    window.setTimeout(function() {
        target.style.display = 'none';
        target.style.removeProperty('height');
        target.style.removeProperty('padding-top');
        target.style.removeProperty('padding-bottom');
        target.style.removeProperty('margin-top');
        target.style.removeProperty('margin-bottom');
        target.style.removeProperty('overflow');
        target.style.removeProperty('transition-duration');
        target.style.removeProperty('transition-property');
        isSliding = false; // 애니메이션 완료
    }, duration);
};

var slideDown = function(target, duration) {
    duration = duration || 500;
    if (isSliding) return; // 애니메이션 중일 때는 동작하지 않음
    isSliding = true; // 애니메이션 시작
    target.style.removeProperty('display');
    var display = window.getComputedStyle(target).display;
    if (display === 'none') display = 'block';
    target.style.display = display;
    var height = target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.offsetHeight;
    target.style.boxSizing = 'border-box';
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + 'ms';
    target.style.height = height + 'px';
    target.style.removeProperty('padding-top');
    target.style.removeProperty('padding-bottom');
    target.style.removeProperty('margin-top');
    target.style.removeProperty('margin-bottom');
    window.setTimeout(function() {
        target.style.removeProperty('height');
        target.style.removeProperty('overflow');
        target.style.removeProperty('transition-duration');
        target.style.removeProperty('transition-property');
        isSliding = false;
    }, duration);
};

var slideToggle = function(target, duration) {
    duration = duration || 500;
    var targetElement = typeof target === 'string' 
        ? document.querySelector(target) 
        : target;
    if (!target) return;
    if (isSliding) return;
    if (window.getComputedStyle(targetElement).display === 'none') {
        return slideDown(targetElement, duration);
    } else {
        return slideUp(targetElement, duration);
    }
};

//로딩바 생성
var lodingStatus = false;
function loading(action) {
    if(!lodingStatus){
        var loadingDiv = document.createElement("div");
        loadingDiv.classList.add("loading");
        document.body.appendChild(loadingDiv);
    
        var loadingInnerDiv = document.createElement("div");
        loadingInnerDiv.classList.add("loading_inner");
        loadingDiv.appendChild(loadingInnerDiv);
        
        lodingStatus = true;
    }
    var loadingDiv = document.querySelector('.loading');
    if (action === 'show') {
        loadingDiv.classList.add('active');
    } else if (action === 'hide') {
        loadingDiv.classList.remove('active');
    }
}

/*** 헤더 스크립트 ***/
//제휴몰 바로가기 토글
function togglePatnerLinks() {
    var hdPartner = document.getElementById('hd_partner');
    if (hdPartner.classList.contains('open')) {
        hdPartner.classList.remove('open');
    } else {
        hdPartner.classList.add('open');
    }
}

//전체메뉴 토글
function toggleGnb(status) {
    var header = document.getElementById('header');
    var gnbWrap = document.getElementById('gnb_wrap');
    var gnbAllBg = document.querySelector('.gnb_all_bg');
    if (status === 'hide') {
        gnbWrap.classList.remove('open');
        if (gnbAllBg) {
            gnbAllBg.parentNode.removeChild(gnbAllBg);
        }
    } else {
        gnbWrap.classList.add('open');
        if (!gnbAllBg) {
            var newGnbAllBg = document.createElement('span');
            newGnbAllBg.className = 'gnb_all_bg';
            if (header.nextSibling) {
                header.parentNode.insertBefore(newGnbAllBg, header.nextSibling);
            } else {
                header.parentNode.appendChild(newGnbAllBg);
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', function () {
    var btnGnbToggle = document.getElementById('btn_gnb_toggle');
    var gnbWrap = document.getElementById('gnb_wrap');

    if (btnGnbToggle) {
        btnGnbToggle.addEventListener('mouseenter', function () {
            toggleGnb('show');
        });

// 가시성 체크 함수
function checkVisibility(element) {
    while (element) {
        if (element === document.body) {
            break;
        }
        var style = window.getComputedStyle(element);
        if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') {
            return false;
        }
        element = element.parentElement;
    }
    var rect = element.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
}

//라디오, 셀렉트 디스플레이 초기화 셋
function radioSelectdisplaySet() {
    var selects = document.querySelectorAll('select.select-display');
    for (var i = 0; i < selects.length; i++) {
        if (checkVisibility(selects[i])) {
            if (selects[i].selectedIndex > -1) {
                handleSelectChange.call(selects[i]);
            }
        }
    }

    var searchSelects = document.querySelectorAll('.search_select.select-display');
    for (var j = 0; j < searchSelects.length; j++) {
        if (checkVisibility(searchSelects[j])) {
            handleSearchSelectChange.call(searchSelects[j]);
        }
    }

    var radios = document.querySelectorAll('input[radio-display]');
    for (var k = 0; k < radios.length; k++) {
        if (checkVisibility(radios[k])) {
            if (radios[k].checked) {
                handleRadioChange.call(radios[k]);
            }
        }
    }
}

//이미지 상세보기
function imageDetail(src) {
    var previewLayer = document.getElementById('image_detail').querySelector('.layer_content');
    var previewImg = document.getElementById('preview_image');
    
    if (previewImg) {
        previewImg.onerror = function() {
            box_alert('이미지를 불러올 수 없습니다.', 'info');
            closeLayer('', 'image_detail');
        };
        previewImg.onload = function() {
            var adjustment = window.innerWidth >= 1260 ? 80 : 40;
            previewLayer.style.width = (previewImg.naturalWidth + adjustment) + 'px';
        };
        previewImg.src = src;
    }
}

//토글 슬라이드
function toggleSlideItem(button, content, duration) {
    if (isSliding) return;
    var toggleSlide = findClosest(button, '.item') || findClosest(button, 'li');
    var targetSlide = null;
    targetSlide = content ? content : toggleSlide.querySelector('[slide-content]');
    toggleSlide.classList.toggle('active');
    var speed = duration !== undefined ? duration : 600;
    slideToggle(targetSlide, speed);
}

//리스트 기간설정
function dateControl(startSelector, endSelector, period) {
    var buttons = document.querySelectorAll('.date_control button');
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('active');
    }
    event.target.classList.add('active');

    var endDate = new Date();
    var startDate = new Date();
    
    switch (period) {
        case '7d':
            startDate.setDate(endDate.getDate() - 7);
            break;
        case '1m':
            startDate.setMonth(endDate.getMonth() - 1);
            break;
        case '3m':
            startDate.setMonth(endDate.getMonth() - 3);
            break;
    }
    
    function formatDate(date) {
        var year = date.getFullYear();
        var month = String(date.getMonth() + 1).padStart(2, '0');
        var day = String(date.getDate()).padStart(2, '0');
        return year + '-' + month + '-' + day;
    }
    
    document.querySelector(startSelector).value = formatDate(startDate);
    document.querySelector(endSelector).value = formatDate(endDate);
}

// IE11 String.prototype.padStart polyfill
if (!String.prototype.padStart) {
    String.prototype.padStart = function padStart(targetLength, padString) {
        targetLength = targetLength >> 0; //truncate if number, or convert non-number to 0;
        padString = String(typeof padString !== 'undefined' ? padString : ' ');
        if (this.length >= targetLength) {
            return String(this);
        } else {
            targetLength = targetLength - this.length;
            if (targetLength > padString.length) {
                padString += padString.repeat(targetLength / padString.length); //append to original to ensure we are longer than needed
            }
            return padString.slice(0, targetLength) + String(this);
        }
    };
}

// IE11 String.prototype.repeat polyfill
if (!String.prototype.repeat) {
    String.prototype.repeat = function(count) {
        'use strict';
        if (this == null) {
            throw new TypeError('can\'t convert ' + this + ' to object');
        }
        var str = '' + this;
        count = +count;
        if (count != count) {
            count = 0;
        }
        if (count < 0) {
            throw new RangeError('repeat count must be non-negative');
        }
        if (count == Infinity) {
            throw new RangeError('repeat count must be less than infinity');
        }
        count = Math.floor(count);
        if (str.length == 0 || count == 0) {
            return '';
        }
        // Ensuring count is a 31-bit integer allows us to heavily optimize the
        // main part. But anyway, most current (August 2014) browsers can't handle
        // strings 1 << 28 chars or longer, so:
        if (str.length * count >= 1 << 28) {
            throw new RangeError('repeat count must not overflow maximum string size');
        }
        var maxCount = str.length * count;
        count = Math.floor(Math.log(count) / Math.log(2));
        while (count) {
            str += str;
            count--;
        }
        str += str.substring(0, maxCount - str.length);
        return str;
    }
}

//이미지 미리보기
function previewImage(input) {
    var photoItem = findClosest(input, '.photo_item');
    var preview = photoItem.querySelector('.preview');
    var removeBtn = photoItem.querySelector('.photo_remove');
    
    if (input.files && input.files[0]) {
        var file = input.files[0];
        var allowedTypesAttr = input.getAttribute('file-type').toLowerCase();
        var allowedTypes = allowedTypesAttr.split(',');
        
        for (var i = 0; i < allowedTypes.length; i++) {
            allowedTypes[i] = allowedTypes[i].trim();
        }
        
        var fileNameParts = file.name.split('.');
        var fileType = fileNameParts[fileNameParts.length - 1].toLowerCase();
        
        var isAllowed = false;
        for (var j = 0; j < allowedTypes.length; j++) {
            if (allowedTypes[j] === fileType) {
                isAllowed = true;
                break;
            }
        }
        
        if (!isAllowed) {
            box_alert('허용되지 않는 파일 형식입니다.', 'info');
            input.value = '';
            return;
        }
        
        var maxSize = input.getAttribute('max-size') * 1024 * 1024;
        if (file.size > maxSize) {
            box_alert('파일 크기는 ' + input.getAttribute('max-size') + 'MB 이하여야 합니다.', 'info');
            input.value = '';
            return;
        }
        
        var reader = new FileReader();
        reader.onload = function (e) {
            preview.style.backgroundImage = 'url(' + e.target.result + ')';
            preview.style.display = 'block';
            removeBtn.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    var photoRemoveButtons = document.querySelectorAll('.photo_remove');
    for (var i = 0; i < photoRemoveButtons.length; i++) {
        photoRemoveButtons[i].addEventListener('click', function () {
            var photoItem = findClosest(this, '.photo_item');
            var input = photoItem.querySelector('input[type="file"]');
            var preview = photoItem.querySelector('.preview');
            input.value = '';
            preview.style.backgroundImage = '';
            preview.style.display = 'none';
            this.style.display = 'none';
        });
    }
});

// 라디오 변경에 따른 display
function handleRadioChange() {
    var groupName = this.getAttribute("name");
    var sameRadios = document.querySelectorAll('input[name="' + groupName + '"]');
    
    for (var i = 0; i < sameRadios.length; i++) {
        var target = sameRadios[i];
        var displayTargetsAttr = target.getAttribute("radio-display");
        
        if (displayTargetsAttr) {
            var displayTargets = displayTargetsAttr.split(" ");
            for (var j = 0; j < displayTargets.length; j++) {
                var elements = document.getElementsByClassName(displayTargets[j]);
                for (var k = 0; k < elements.length; k++) {
                    elements[k].style.display = "none";
                }
            }
        }
        
        if (target.getAttribute("radio-display-hide")) {
            var displayHideTargets = target.getAttribute("radio-display-hide").split(" ");
            for (var l = 0; l < displayHideTargets.length; l++) {
                var hideElements = document.getElementsByClassName(displayHideTargets[l]);
                for (var m = 0; m < hideElements.length; m++) {
                    hideElements[m].style.display = "none";
                }
            }
        }
    }
    
    var selectedTargetsAttr = this.getAttribute("radio-display");
    if (selectedTargetsAttr) {
        var selectedTargets = selectedTargetsAttr.split(" ");
        for (var n = 0; n < selectedTargets.length; n++) {
            var selectedElements = document.getElementsByClassName(selectedTargets[n]);
            for (var o = 0; o < selectedElements.length; o++) {
                selectedElements[o].style.display = "";
            }
        }
    }
}

// 셀렉트박스 변경에 따른 display
function handleSelectChange() {
    var options = this.querySelectorAll('option');

    for (var i = 0; i < options.length; i++) {
        var target = options[i];
        var displayTargetsAttr = target.getAttribute("select-display");
        
        if (displayTargetsAttr) {
            var displayTargets = displayTargetsAttr.split(" ");
            for (var j = 0; j < displayTargets.length; j++) {
                var elements = document.getElementsByClassName(displayTargets[j]);
                for (var k = 0; k < elements.length; k++) {
                    elements[k].style.display = "none";
                }
            }
        }
        
        if (target.getAttribute("select-display-hide")) {
            var displayHideTargets = target.getAttribute("select-display-hide").split(" ");
            for (var l = 0; l < displayHideTargets.length; l++) {
                var hideElements = document.getElementsByClassName(displayHideTargets[l]);
                for (var m = 0; m < hideElements.length; m++) {
                    hideElements[m].style.display = "none";
                }
            }
        }
    }

    var selectedOption = this.options[this.selectedIndex];
    var selectedTargets = selectedOption.getAttribute("select-display");
    if (selectedTargets) {
        var targetsArray = selectedTargets.split(" ");
        for (var n = 0; n < targetsArray.length; n++) {
            var selectedElements = document.getElementsByClassName(targetsArray[n]);
            for (var o = 0; o < selectedElements.length; o++) {
                selectedElements[o].style.display = "";
            }
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
    // 라디오 버튼 변경 이벤트 리스너 등록
    var radios = document.querySelectorAll('input[radio-display]');
    for (var i = 0; i < radios.length; i++) {
        radios[i].addEventListener("change", handleRadioChange);
        // 페이지 로드 시 라디오 버튼의 상태에 따라 초기 화면 설정
        if (radios[i].checked) {
            handleRadioChange.call(radios[i]); // 선택된 라디오 버튼에 대한 처리 실행
        }
    }

    // 셀렉트 디스플레이 변경 이벤트 리스너 등록
    var selects = document.querySelectorAll('select.select_display');
    for (var j = 0; j < selects.length; j++) {
        selects[j].addEventListener("change", handleSelectChange);
        // 페이지 로드 시 select 요소의 상태에 따라 초기 화면 설정
        if (checkVisibility(selects[j])) {
            if (selects[j].selectedIndex > 0) {
                handleSelectChange.call(selects[j]);
            }
        }
    }
});

//수량조절
document.addEventListener('click', function (event) {
    var target = event.target;

    // minus 버튼 클릭
    if (target.classList.contains('minus') && findClosest(target, '.lot_event')) {
        var lotControl = findClosest(target, '.lot_event');
        var input = lotControl.querySelector('input');
        var limit = parseInt(input.getAttribute('limit'), 10);
        var initialValue = input.getAttribute('db-count');

        if (parseInt(input.value, 10) > 1) {
            input.value = parseInt(input.value, 10) - 1;
            updateLotButtonStates(lotControl, input, initialValue);
        }
    }

    // plus 버튼 클릭
    if (target.classList.contains('plus') && findClosest(target, '.lot_event')) {
        var lotControl = findClosest(target, '.lot_event');
        var input = lotControl.querySelector('input');
        var limit = parseInt(input.getAttribute('limit'), 10);
        var initialValue = input.getAttribute('db-count');

        if (parseInt(input.value, 10) < limit) {
            input.value = parseInt(input.value, 10) + 1;
            updateLotButtonStates(lotControl, input, initialValue);
        }
    }
});

// input 값 변경에 대한 이벤트 위임
document.addEventListener('input', function (event) {
    var target = event.target;

    if (findClosest(target, '.lot_event')) {
        var lotControl = findClosest(target, '.lot_event');
        var limit = parseInt(target.getAttribute('limit'), 10);
        var initialValue = target.getAttribute('db-count');

        var value = parseInt(target.value, 10);
        if (isNaN(value) || value < 1) {
            target.value = 1;
        } else if (value > limit) {
            target.value = limit;
        }

        updateLotButtonStates(lotControl, target, initialValue);
    }
});

function updateLotButtonStates(lotControl, input, initialValue) {
    var minusBtn = lotControl.querySelector('.minus');
    var plusBtn = lotControl.querySelector('.plus');
    var currentValue = parseInt(input.value, 10);
    var limit = parseInt(input.getAttribute('limit'), 10);

    minusBtn.disabled = currentValue <= 1;
    plusBtn.disabled = currentValue >= limit;

    if (initialValue) {
        var changeBtn = findClosest(lotControl, '.lot_box').querySelector('.lot_change_btn');
        if (changeBtn) {
            if (input.value !== initialValue) {
                changeBtn.classList.remove('btn_gray_line');
                changeBtn.classList.add('btn_black_line');
            } else {
                changeBtn.classList.remove('btn_black_line');
                changeBtn.classList.add('btn_gray_line');
            }
        }
    }
}

//셀렉트박스
var choicesInstances = {};
function applyChoicesToSelect(element) {
    if (!findClosest(element, '.pika-single') && !element.classList.contains('choices-applied')) {
        var searchEnabled = element.hasAttribute('search-select');
        var choices = new Choices(element, {
            searchEnabled: searchEnabled,
            shouldSort: false,
            itemSelectText: '',
        });
        element.classList.add('choices-applied');
        if (element.getAttribute('product-option')) {
            choicesInstances[element.getAttribute('product-option')] = choices;
        }
    }
}

document.addEventListener('DOMContentLoaded', function () {
    var selectElements = document.querySelectorAll('select');
    for (var i = 0; i < selectElements.length; i++) {
        applyChoicesToSelect(selectElements[i]);
    }
    
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            for (var i = 0; i < mutation.addedNodes.length; i++) {
                var node = mutation.addedNodes[i];
                if (node.tagName === 'SELECT') {
                    applyChoicesToSelect(node);
                } else if (node.querySelectorAll) {
                    var newSelects = node.querySelectorAll('select');
                    for (var j = 0; j < newSelects.length; j++) {
                        applyChoicesToSelect(newSelects[j]);
                    }
                }
            }
        });
    });
    
    observer.observe(document.body, { childList: true, subtree: true });
});

//datepicker
function initializeDatepicker(element) {
    if (element.dataset.initialized === 'true') return;
    var originalValue = element.value;
    var yearRange;
    var yearAttr = element.getAttribute('data-year');
    if (yearAttr) {
        var yearParts = yearAttr.split(',');
        var years = [];
        for (var i = 0; i < yearParts.length; i++) {
            years.push(parseInt(yearParts[i].trim()));
        }
        yearRange = years;
    }
    
    var pickerOptions = {
        field: element,
        showDaysInNextAndPreviousMonths: true,
        enableSelectionDaysInNextAndPreviousMonths: true,
        format: 'YYYY-MM-DD',
        i18n: {
            previousMonth: '이전달',
            nextMonth: '다음달',
            months: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
            weekdays: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
            weekdaysShort: ['일', '월', '화', '수', '목', '금', '토']
        },
        onSelect: function (date) {
            var year = date.getFullYear();
            var month = (date.getMonth() + 1).toString().padStart(2, '0');
            var day = date.getDate().toString().padStart(2, '0');
            var formattedDate = '' + year + '-' + month + '-' + day + '';
            element.value = formattedDate;
        },
        showMonthAfterYear: true,
        defaultDate: new Date(originalValue),
        setDefaultDate: true
    };
    
    if (yearRange) {
        pickerOptions.yearRange = yearRange;
    }
    
    var picker = new Pikaday(pickerOptions);
    element.value = originalValue;
    element.dataset.initialized = 'true';
}

document.addEventListener('DOMContentLoaded', function () {
    var datepickers = document.querySelectorAll('.datepicker');
    for (var i = 0; i < datepickers.length; i++) {
        initializeDatepicker(datepickers[i]);
    }
    
    var observer2 = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            for (var i = 0; i < mutation.addedNodes.length; i++) {
                var node = mutation.addedNodes[i];
                if (node.nodeType === Node.ELEMENT_NODE) {
                    if (node.classList && node.classList.contains('datepicker')) {
                        initializeDatepicker(node);
                    }
                    var newDatepickers = node.querySelectorAll && node.querySelectorAll('.datepicker');
                    if (newDatepickers) {
                        for (var j = 0; j < newDatepickers.length; j++) {
                            initializeDatepicker(newDatepickers[j]);
                        }
                    }
                }
            }
        });
    });
    
    observer2.observe(document.body, {
        childList: true,
        subtree: true
    });
});

window.addEventListener('unload', function() {
    if (typeof observer2 !== 'undefined') {
        observer2.disconnect();
    }
});


//첨부파일
//첨부파일 싱글
function singleFileInput() {
    var fileInputs = document.querySelectorAll('.file_single');
    if (fileInputs.length > 0) {
        for (var i = 0; i < fileInputs.length; i++) {
            fileInputs[i].addEventListener('change', function (event) {
                var file = this.files[0];
                var fileNameInput = findClosest(this, '.file_input').querySelector('.file_name');

                if (!file) {
                    fileNameInput.value = '';
                    return;
                }

                // 파일 타입 체크
                var allowedTypes = this.getAttribute('file-type');
                allowedTypes = allowedTypes ? allowedTypes.split(' ') : [];
                var fileType = file.name.split('.').pop().toLowerCase();
                
                if (allowedTypes.length > 0) {
                    var isAllowed = false;
                    for (var j = 0; j < allowedTypes.length; j++) {
                        if (allowedTypes[j] === fileType) {
                            isAllowed = true;
                            break;
                        }
                    }
                    
                    if (!isAllowed) {
                        box_alert(this.getAttribute('file-type') + '만 업로드 해주세요.', 'info');
                        this.value = '';
                        fileNameInput.value = '';
                        return;
                    }
                }
                
                // 파일 크기 체크
                var maxSize = this.hasAttribute('data-max-size')
                    ? parseFloat(this.getAttribute('data-max-size')) * 1024 * 1024
                    : null;
                if (maxSize && file.size > maxSize) {
                    var maxSizeMB = this.getAttribute('data-max-size');
                    box_alert('용량 제한은 ' + maxSizeMB + 'MB 입니다.', 'info');
                    this.value = '';
                    fileNameInput.value = '';
                    return;
                }

                fileNameInput.value = file.name;
            });
        }
    }
}

document.addEventListener('DOMContentLoaded', function () {
    singleFileInput();
});
    }
    
    if (gnbWrap) {
        gnbWrap.addEventListener('mouseleave', function () {
            toggleGnb('hide');
        });
    }
});

document.addEventListener('click', function (event) {
    var hdPartner = document.getElementById('hd_partner');
    if (hdPartner && !hdPartner.contains(event.target)) {
        if (hdPartner.classList.contains('open')) {
            hdPartner.classList.remove('open');
        }
    }
});

// document.addEventListener('DOMContentLoaded', function () {
//     var swiper = new Swiper("#gnb", {
//         slidesPerView: "auto",
//     });
// });
/*** //헤더 스크립트 ***/

/* 모바일 전체메뉴 */
document.addEventListener('DOMContentLoaded', function () {
    var cateLinks = document.querySelectorAll('.cate_all .cate a');
    var subCategories = document.querySelectorAll('.cate_sub > div');

    for (var i = 0; i < cateLinks.length; i++) {
        cateLinks[i].addEventListener('click', function () {
            for (var j = 0; j < cateLinks.length; j++) {
                cateLinks[j].classList.remove('active');
            }
            this.classList.add('active');
            
            for (var k = 0; k < subCategories.length; k++) {
                subCategories[k].style.display = 'none';
            }
            
            var selectedCate = this.getAttribute('data-cate');
            var selectedSubCategory = document.querySelector('.cate_sub [data-cate-sub="' + selectedCate + '"]');
            if (selectedSubCategory) {
                selectedSubCategory.style.display = 'block';
            }
        });
    }
});

//체크박스 전체 체크 
document.addEventListener("DOMContentLoaded", function () {
    var checks = document.querySelectorAll('.label_control input[type="checkbox"]');
    for (var i = 0; i < checks.length; i++) {
        checks[i].addEventListener('change', function (event) {
            function isVisible(element) {
                return !!(element.offsetWidth || element.offsetHeight || element.getClientRects().length);
            }
            var target = event.target;
            var labelControlParent = findClosest(this, '.label_control_parent');
            var checkAllParentCheckbox = labelControlParent ? labelControlParent.querySelector('.check_all_parent') : null;
            
            if (target.matches('input[type="checkbox"]') && target.classList.contains('check_all')) {
                var isChecked = target.checked;
                var checkboxes = findClosest(this, '.label_control').querySelectorAll('input[type="checkbox"]');
                
                for (var j = 0; j < checkboxes.length; j++) {
                    if (isVisible(checkboxes[j]) && !checkboxes[j].disabled) {
                        checkboxes[j].checked = isChecked;
                    }
                }
                
                if (!isChecked) {
                    target.checked = false; // check_all 비활성화
                    if (checkAllParentCheckbox) {
                        checkAllParentCheckbox.checked = false; // check_all 비활성화
                    }
                }
            } else if (target.matches('input[type="checkbox"]:not(.check_all)') && !target.checked) {
                var checkAllCheckbox = findClosest(this, '.label_control').querySelector('.check_all');
                if (checkAllCheckbox && !checkAllCheckbox.classList.contains('optional')) {
                    checkAllCheckbox.checked = false; // check_all 비활성화
                }
                if (checkAllParentCheckbox) {
                    checkAllParentCheckbox.checked = false; // check_all 비활성화
                }
            }
        });
    }
});

// findClosest 함수 추가 (IE11 호환을 위해 closest 메서드 대체)
function findClosest(element, selector) {
    while (element && element !== document) {
        if (element.matches(selector)) return element;
        element = element.parentElement;
    }
    return null;
}

// IE11 호환을 위한 matches 폴리필
if (!Element.prototype.matches) {
    Element.prototype.matches = 
        Element.prototype.msMatchesSelector || 
        Element.prototype.webkitMatchesSelector;
}

// 이용약관 체크박스 제어
document.addEventListener("DOMContentLoaded", function () {
    var checkboxes = document.querySelectorAll('.terms_list .item input[type="checkbox"]');
    
    for (var i = 0; i < checkboxes.length; i++) {
        checkboxes[i].addEventListener('change', function (event) {
            var chk_service = document.querySelector('input[data-title="chk_service"]');
            var chk_adv = document.querySelector('input[data-title="chk_adv"]');
            var chk_sms = document.querySelector('input[data-title="chk_sms"]');
            var chk_email = document.querySelector('input[data-title="chk_email"]');

            var dataTitle = this.dataset.title;

            if(dataTitle === 'chk_service'){
                chk_adv.checked = event.target.checked;
                chk_sms.checked = event.target.checked;
                chk_email.checked = event.target.checked;
            }

            if(dataTitle === 'chk_adv' && event.target.checked){
                chk_service.checked = true;
            }

            if(dataTitle === 'chk_sms' || dataTitle === 'chk_email'){
                var checkItmes = findClosest(this, '.terms_inline');
                var checkedItems = checkItmes.querySelectorAll('.check_item input[type="checkbox"]:checked');

                if(event.target.checked){
                    chk_service.checked = true;
                    chk_adv.checked = true;
                }else{
                    if(checkedItems.length === 0){
                        chk_adv.checked = false;
                    }
                }
            }
        });
    }
});

/* 상품 탭 컨트롤 */
function itemSort(button, group, target) {
    //버튼 active
    if (findClosest(button, '.sort_btns')) {
        var allButtons = findClosest(button, '.sort_btns').querySelectorAll('a');
        for (var i = 0; i < allButtons.length; i++) {
            allButtons[i].classList.remove('active');
        }
        button.classList.add('active');
    }

    //상품 소팅
    var itemGroup = document.querySelectorAll('[data-itemgroup="' + group + '"]');
    var itemGroupSub = document.querySelectorAll('[data-itemgroup-sub="' + target + '"]');
    
    if (target === 'all') {
        for (var j = 0; j < itemGroup.length; j++) {
            itemGroup[j].style.display = 'block';
        }
        return false;
    }
    
    for (var k = 0; k < itemGroup.length; k++) {
        itemGroup[k].style.display = 'none';
    }
    
    for (var l = 0; l < itemGroupSub.length; l++) {
        itemGroupSub[l].style.display = 'block';
    }

    //상품이 슬라이드인경우 슬라이드 초기화
    if (findClosest(button, '.main_section').querySelector('.slide')) {
        for (var m = 0; m < swipers.length; m++) {
            swipers[m].update();
        }
    }
}

//퀵메뉴, 상단으로 버튼 모바일 footer밑으로 안넘어가게 제어
function adjustMobileBottomFixed() {
    var body = document.querySelector('body');
    var layout = document.getElementById('layout');
    var mobileBottomFixed = document.querySelector('.mobile_bottom_fixed');
    var footer = document.getElementById('footer');
    
    if (!mobileBottomFixed || !footer) return;
    
    var footerRect = footer.getBoundingClientRect();
    var mobileBottomFixedRect = mobileBottomFixed.getBoundingClientRect();
    var viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    var viewportWidth = window.innerWidth || document.documentElement.clientWidth;
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    //하단hidden
    var offset = viewportWidth <= 850 ? 20 : 0;
    if (footerRect.top < viewportHeight - mobileBottomFixedRect.height - offset) {
        body.classList.add('mobile_fixed_bottom_hide');
    } else {
        body.classList.remove('mobile_fixed_bottom_hide');
    }

    //상단hidden
    if (scrollTop <= 100) {
        body.classList.add('mobile_fixed_top_hide');
    } else {
        body.classList.remove('mobile_fixed_top_hide');
    }
}

document.addEventListener('DOMContentLoaded', function () {
    var mobileBottomFixed = document.querySelector('.mobile_bottom_fixed');
    if (!mobileBottomFixed) return false;
    
    document.addEventListener('scroll', adjustMobileBottomFixed);
    window.addEventListener('resize', adjustMobileBottomFixed);
    adjustMobileBottomFixed();
});

//레이어 오픈
function toggleLayer(target, auto, button) {
    if (document.querySelector(target).classList.contains('show')) {
        document.querySelector(target).classList.remove('show');
        if (auto !== 'auto') {
            document.querySelector('html').classList.remove('mobile_hidden');
        }
        if ((target === '#cate_all_mobile') || (target === '#viewed_products_mobile')) {
            document.querySelector('#floating_wrap').classList.remove('on');
        }
        if (button) {
            document.querySelector(button).classList.remove('active');
        }
    } else {
        document.querySelector(target).classList.add('show');
        if (auto !== 'auto') {
            document.querySelector('html').classList.add('mobile_hidden');
        }
        if ((target === '#cate_all_mobile') || (target === '#viewed_products_mobile')) {
            document.querySelector('#floating_wrap').classList.add('on');
        }
        if (button) {
            document.querySelector(button).classList.add('active');
        }
    }
}

function openLayer(target) {
    document.querySelector(target).classList.add('show');
    document.querySelector('html').classList.add('mobile_hidden');
}

function closeLayer(button, target) {
    if (!target && button) {
        var closestLayerPopup = findClosest(button, '.layer_popup');
        closestLayerPopup.classList.remove('show');
    } else {
        document.getElementById(target).classList.remove('show');
    }
    document.querySelector('html').classList.remove('mobile_hidden');
}

// 검색 바텀 시트 제어
function showBottomSheet(event){
    event.preventDefault();

    var bottomSheet = document.getElementById("bottom_sheet");
    bottomSheet.classList.add("show");
    document.querySelector('html').classList.add('mobile_hidden');
    updateSheetHeight(70); // 바텀 시트 최초 높이(vh)
}

function updateSheetHeight(height){
    var bottomSheet = document.getElementById("bottom_sheet");
    var sheetContent = bottomSheet.querySelector(".content");

    if(height === 100){
        var viewportHeight = window.innerHeight || document.documentElement.clientHeight;
        var calculatedHeightInVh = (viewportHeight - 30) / viewportHeight * 100; // `calc( 100vh - 30px )` 와 같은 의미
        sheetContent.style.height = calculatedHeightInVh + 'vh';
    }else{
        sheetContent.style.height = height + 'vh';
    }
    
    if (height === 100) {
        bottomSheet.classList.add("fullscreen");
    } else {
        bottomSheet.classList.remove("fullscreen");
    }
}

function hideBottomSheet(){
    var bottomSheet = document.getElementById("bottom_sheet");
    bottomSheet.classList.remove("show");
    document.querySelector('html').classList.remove('mobile_hidden');
}

var isDragging = false, startY, startHeight;

var dragStart = function(e) {
    var bottomSheet = document.getElementById("bottom_sheet");
    var sheetContent = document.querySelector("#bottom_sheet .content");
    isDragging = true;
    startY = e.pageY || (e.touches && e.touches[0] ? e.touches[0].pageY : 0);
    startHeight = parseInt(sheetContent.style.height);
    bottomSheet.classList.add("dragging");
};

var dragging = function(e) {
    if(!isDragging) return;
    var currentY = e.pageY || (e.touches && e.touches[0] ? e.touches[0].pageY : 0);
    var delta = startY - currentY;
    var newHeight = startHeight + delta / window.innerHeight * 100;
    updateSheetHeight(newHeight);
};

var dragStop = function() {
    var bottomSheet = document.getElementById("bottom_sheet");
    if(!isDragging) return;

    var sheetContent = document.querySelector("#bottom_sheet .content");
    isDragging = false;
    bottomSheet.classList.remove("dragging");
    var sheetHeight = parseInt(sheetContent.style.height);
    
    if(sheetHeight < 65) {
        hideBottomSheet();
    } else if(sheetHeight > 75) {
        updateSheetHeight(100);
    } else {
        updateSheetHeight(70);
    }
};

document.addEventListener('DOMContentLoaded', function () {
    // IE11 호환을 위해 MutationObserver 사용
    var observer = new MutationObserver(function (mutationsList, observer) {
        for (var i = 0; i < mutationsList.length; i++) {
            var mutation = mutationsList[i];
            if (mutation.type === 'childList') {
                var dragIcon = document.getElementById("search_bottom_sheet");
                
                if (dragIcon && dragIcon.querySelector(".drag-icon")) {
                    var iconElement = dragIcon.querySelector(".drag-icon");
                    
                    iconElement.addEventListener("mousedown", dragStart);
                    document.addEventListener("mousemove", dragging);
                    document.addEventListener("mouseup", dragStop);
                    
                    iconElement.addEventListener("touchstart", dragStart);
                    document.addEventListener("touchmove", dragging);
                    document.addEventListener("touchend", dragStop);
                    
                    // 요소가 존재하면 observer를 멈춤
                    observer.disconnect();
                    break;
                }
            }
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
});

//모바일 헤더 전체 카테고리 토글
function gnbMobileOpen() {
    var gnb = document.getElementById('gnb');
    if (gnb.classList.contains('mobile_open')) {
        gnb.classList.remove('mobile_open');
    } else {
        gnb.classList.add('mobile_open');
    }
}

//상단으로 이동
function toTop() {
    var startPosition = window.pageYOffset || document.documentElement.scrollTop;
    var duration = 800;
    var startTime = performance.now();
    
    function scrollStep(currentTime) {
        var timeElapsed = currentTime - startTime;
        var progress = Math.min(timeElapsed / duration, 1);
        var easeOutProgress = 1 - Math.pow(1 - progress, 3);
        var newY = startPosition * (1 - easeOutProgress);
        window.scrollTo(0, newY);
        
        if (timeElapsed < duration) {
            requestAnimationFrame(scrollStep);
        }
    }
    
    requestAnimationFrame(scrollStep);
}

//location event
document.addEventListener('DOMContentLoaded', function () {
    var locationItem = document.querySelectorAll('.location > .item');

    function closeAllLocations() {
        for (var i = 0; i < locationItem.length; i++) {
            locationItem[i].classList.remove('active');
        }
    }

    for (var i = 0; i < locationItem.length; i++) {
        (function(item) {
            var links = item.querySelector('.links');
            var itemInnerLink = item.querySelector('.item_inner > a');
            
            if (itemInnerLink) {
                itemInnerLink.addEventListener('click', function (e) {
                    e.stopPropagation();
                    if (item.classList.contains('active')) {
                        item.classList.remove('active');
                    } else {
                        closeAllLocations();
                        item.classList.add('active');
                    }
                });
            }
            
            if (links) {
                links.addEventListener('click', function (e) {
                    if (e.target.tagName === 'A') {
                        var items = findClosest(e.target, '.item').querySelectorAll('.item_inner > a');
                        for (var j = 0; j < items.length; j++) {
                            items[j].classList.remove('active');
                        }
                        e.target.classList.add('active');
                        var btnSelect = findClosest(e.target, '.item').querySelector('.item_inner > a');
                        btnSelect.textContent = e.target.textContent;
                        closeAllLocations();
                    }
                });
            }
        })(locationItem[i]);
    }
    
    document.addEventListener('click', closeAllLocations);
});

// ? info 안내문구 이벤트
document.addEventListener('DOMContentLoaded', function () {
    var infoHover = document.querySelectorAll('.info_hover');
    var btnInfoClose = document.querySelectorAll('.btn_info_close');

    if (infoHover.length > 0) {
        for (var i = 0; i < infoHover.length; i++) {
            (function(box) {
                var infoShowBtn = box.querySelector('.btn_info_show');
                if (infoShowBtn) {
                    infoShowBtn.addEventListener('click', function () {
                        if (box.classList.contains('active')) {
                            box.classList.remove('active');
                        } else {
                            box.classList.add('active');
                        }
                    });
                }
            })(infoHover[i]);
        }

        document.addEventListener('click', function (event) {
            for (var i = 0; i < infoHover.length; i++) {
                var box = infoHover[i];
                if ((!box.contains(event.target) && box.classList.contains('active')) || 
                    event.target.classList.contains('btn_info_close')) {
                    box.classList.remove('active');
                }
            }
        });
    }
});

/////////////폼 관련/////////////
//input 값이 있으면 active 추가
document.addEventListener('DOMContentLoaded', function () {
    var activeInput = document.querySelectorAll('[input-active] input');
    for (var i = 0; i < activeInput.length; i++) {
        activeInput[i].addEventListener('input', function () {
            if (this.value.length > 0) {
                findClosest(this, '.input').classList.add('input_active');
            } else {
                findClosest(this, '.input').classList.remove('input_active');
            }
        });
    }
});

//input 가격 콤마처리
function formatAmountWithComma(value) {
    value = value.replace(/[^0-9]/g, '');
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return value;
}

function numberFotmatComma() {
    var telInputs = document.querySelectorAll('input[data-amount-comma]');
    for (var i = 0; i < telInputs.length; i++) {
        telInputs[i].value = formatAmountWithComma(telInputs[i].value);
        telInputs[i].addEventListener('input', function () {
            this.value = formatAmountWithComma(this.value);
        });
    }
}

//input tel 숫자만 입력
function allowOnlyNumbersForTelInputs() {
    var telInputs = document.querySelectorAll('input[type="tel"]');
    for (var i = 0; i < telInputs.length; i++) {
        telInputs[i].addEventListener('input', function () {
            this.value = this.value.replace(/[^0-9]/g, '');
        });
    }
}

document.addEventListener('DOMContentLoaded', function () {
    allowOnlyNumbersForTelInputs();
    numberFotmatComma();
});

//input password text로 토글
document.addEventListener('DOMContentLoaded', function () {
    var btnPasswordShow = document.querySelectorAll('.btn_password_show');
    if (btnPasswordShow) {
        for (var i = 0; i < btnPasswordShow.length; i++) {
            (function(button) {
                var prevInput = findClosest(button, '.input').querySelector('input');
                button.addEventListener('click', function () {
                    if (button.classList.contains('active')) {
                        button.classList.remove('active');
                        prevInput.type = 'password';
                    } else {
                        button.classList.add('active');
                        prevInput.type = 'text';
                    }
                });
            })(btnPasswordShow[i]);
        }
    }
});

//input 최대값 계산
document.addEventListener('input', function (event) {
    if (event.target.matches('.max_text')) {
        var input = event.target;
        var text = input.value;
        var maxLength = parseInt(input.getAttribute('maxlength'));
        var lenDisplay = findClosest(input, '.input_group').querySelector('.max_len b');
        
        // IE11 호환을 위해 String.fromCodePoint 대신 문자열 길이 직접 계산
        var currentLength = text.length;
        
        if (currentLength > maxLength) {
            input.value = text.substring(0, maxLength);
            currentLength = maxLength;
        }
        
        lenDisplay.textContent = currentLength;
    }
});
/////////////폼 관련 끝/////////////

//tap show hide
document.addEventListener('DOMContentLoaded', function () {
    var tabControl = document.querySelector('[tap-control]');
    if (tabControl) {
        var tabBtns = tabControl.querySelectorAll('[tap-btns] button');
        var tabContents = tabControl.querySelectorAll('[tap-box]');

        for (var i = 0; i < tabBtns.length; i++) {
            (function(index, btn) {
                btn.addEventListener('click', function () {
                    for (var j = 0; j < tabBtns.length; j++) {
                        tabBtns[j].classList.remove('active');
                        tabContents[j].classList.remove('active');
                    }

                    btn.classList.add('active');
                    tabContents[index].classList.add('active');
                });
            })(i, tabBtns[i]);
        }

        // 기본 탭 활성화 (첫 번째 탭을 활성화)
        var hasActiveTab = false;
        for (var k = 0; k < tabBtns.length; k++) {
            if (tabBtns[k].classList.contains('active')) {
                hasActiveTab = true;
                break;
            }
        }

        var hasActiveContent = false;
        for (var l = 0; l < tabContents.length; l++) {
            if (tabContents[l].classList.contains('active')) {
                hasActiveContent = true;
                break;
            }
        }

        if (!hasActiveTab && !hasActiveContent && tabBtns.length > 0 && tabContents.length > 0) {
            tabBtns[0].classList.add('active');
            tabContents[0].classList.add('active');
        }
    }
});