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

function slideUp(target, duration) {
    duration = duration || 500;

    // 애니메이션 중복 방지
    if (isSliding) return; // 애니메이션 중일 때는 동작하지 않음
    isSliding = true; // 애니메이션 시작

    // 스타일 설정
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = duration + 'ms';
    target.style.boxSizing = 'border-box';
    target.style.height = target.offsetHeight + 'px';
    target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = '0';
    target.style.paddingTop = '0';
    target.style.paddingBottom = '0';
    target.style.marginTop = '0';
    target.style.marginBottom = '0';

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
}

function slideDown(target, duration) {
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

function slideToggle (target, duration) {
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
            gnbAllBg.remove();
        }
    } else {
        gnbWrap.classList.add('open');
        if (!gnbAllBg) {
            var newGnbAllBg = document.createElement('span');
            newGnbAllBg.className = 'gnb_all_bg';
            header.after(newGnbAllBg);
        }
    }
}
document.addEventListener('DOMContentLoaded', function () {
    var btnGnbToggle = document.getElementById('btn_gnb_toggle')
    var gnbWrap = document.getElementById('gnb_wrap')

    btnGnbToggle ?
        btnGnbToggle.addEventListener('mouseenter', function () {
            toggleGnb('show');
        })
        : null;
    gnbWrap ?
        gnbWrap.addEventListener('mouseleave', function () {
            toggleGnb('hide');
        })
        : null;
});

document.addEventListener('click', function (event) {
    var hdPartner = document.getElementById('hd_partner');
    if (hdPartner && !hdPartner.contains(event.target)) {
        if (hdPartner.classList.contains('open')) {
            hdPartner.classList.remove('open');
        }
    }
});

document.addEventListener('DOMContentLoaded', function () {
    var swiper = new Swiper("#gnb", {
        slidesPerView: "auto",
    });
});
/*** //헤더 스크립트 ***/

/* 모바일 전체메뉴 */
document.addEventListener('DOMContentLoaded', function () {
    var cateLinks = document.querySelectorAll('.cate_all .cate a');
    var subCategories = document.querySelectorAll('.cate_sub > div');

    // querySelectorAll은 배열이 아니므로 Array.prototype.forEach.call() 사용
    Array.prototype.forEach.call(cateLinks, function (link) {
        link.addEventListener('click', function () {
            // active 클래스 제거
            Array.prototype.forEach.call(cateLinks, function (linkItem) {
                linkItem.classList.remove('active');
            });
            
            // 현재 링크에 active 클래스 추가
            this.classList.add('active');
            
            // 모든 서브 카테고리 숨기기
            Array.prototype.forEach.call(subCategories, function (subCategory) {
                subCategory.style.display = 'none';
            });
            
            // 선택된 카테고리 찾기
            var selectedCate = this.getAttribute('data-cate');
            
            // 동적 셀렉터 대신 쿼리 변경
            var selectedSubCategory = document.querySelector('.cate_sub [data-cate-sub="' + selectedCate + '"]');
            
            if (selectedSubCategory) {
                selectedSubCategory.style.display = 'block';
            }
        });
    });
});

//체크박스 전체 체크 
document.addEventListener("DOMContentLoaded", function () {
    var checkboxList = document.querySelectorAll('.label_control input[type="checkbox"]');

    // NodeList.forEach IE11 미지원 → 일반 for 루프 사용
    for (var i = 0; i < checkboxList.length; i++) {
        (function (check) {
            check.addEventListener('change', function (event) {

                function isVisible(element) {
                    return !!(element.offsetWidth || element.offsetHeight || element.getClientRects().length);
                }

                function closestByClass(el, className) {
                    while (el && el !== document) {
                        if (el.classList && el.classList.contains(className)) {
                            return el;
                        }
                        el = el.parentElement;
                    }
                    return null;
                }

                function matches(el, selector) {
                    var proto = Element.prototype;
                    var func = proto.matches || proto.msMatchesSelector || proto.webkitMatchesSelector;
                    return func.call(el, selector);
                }

                var target = event.target || event.srcElement;
                var labelControlParent = closestByClass(check, 'label_control_parent');
                var checkAllParentCheckbox = labelControlParent ? labelControlParent.querySelector('.check_all_parent') : null;

                if (matches(target, 'input[type="checkbox"]') && target.classList.contains('check_all')) {
                    var isChecked = target.checked;
                    var labelControl = closestByClass(check, 'label_control');
                    if (labelControl) {
                        var checkboxes = labelControl.querySelectorAll('input[type="checkbox"]');
                        for (var j = 0; j < checkboxes.length; j++) {
                            var checkbox = checkboxes[j];
                            if (isVisible(checkbox) && !checkbox.disabled) {
                                checkbox.checked = isChecked;
                            }
                        }
                    }

                    if (!isChecked) {
                        target.checked = false;
                        if (checkAllParentCheckbox) {
                            checkAllParentCheckbox.checked = false;
                        }
                    }

                } else if (matches(target, 'input[type="checkbox"]:not(.check_all)') && !target.checked) {
                    var labelControl = closestByClass(check, 'label_control');
                    if (labelControl) {
                        var checkAllCheckbox = labelControl.querySelector('.check_all');
                        if (checkAllCheckbox && !checkAllCheckbox.classList.contains('optional')) {
                            checkAllCheckbox.checked = false;
                        }
                    }
                    if (checkAllParentCheckbox) {
                        checkAllParentCheckbox.checked = false;
                    }
                }
            });
        })(checkboxList[i]);
    }
});


// 이용약관 체크박스 제어
document.addEventListener("DOMContentLoaded", function () {
    var checkboxList = document.querySelectorAll('.terms_list .item input[type="checkbox"]');

    // 체크박스 루프
    for (var i = 0; i < checkboxList.length; i++) {
        (function (check) {
            var chk_service = document.querySelector('input[data-title="chk_service"]');
            var chk_adv = document.querySelector('input[data-title="chk_adv"]');
            var chk_sms = document.querySelector('input[data-title="chk_sms"]');
            var chk_email = document.querySelector('input[data-title="chk_email"]');

            check.addEventListener('change', function (event) {
                var target = event.target || event.srcElement;

                // IE11에서도 안전한 dataset 접근법
                var dataTitle = check.getAttribute('data-title');

                if (dataTitle === 'chk_service') {
                    chk_adv.checked = target.checked;
                    chk_sms.checked = target.checked;
                    chk_email.checked = target.checked;
                }

                if (dataTitle === 'chk_adv' && target.checked) {
                    chk_service.checked = true;
                }

                if (dataTitle === 'chk_sms' || dataTitle === 'chk_email') {

                    // closest('.terms_inline') 대체
                    var el = check;
                    var checkItems = null;
                    while (el && el !== document) {
                        if (el.classList && el.classList.contains('terms_inline')) {
                            checkItems = el;
                            break;
                        }
                        el = el.parentElement;
                    }

                    if (target.checked) {
                        chk_service.checked = true;
                        chk_adv.checked = true;
                    } else {
                        if (checkItems) {
                            var checkedInputs = checkItems.querySelectorAll('.check_item input[type="checkbox"]:checked');
                            if (checkedInputs.length === 0) {
                                chk_adv.checked = false;
                            }
                        }
                    }
                }
            });
        })(checkboxList[i]);
    }
});


/* 상품 탭 컨트롤 */
function itemSort(button, group, target) {
    // 버튼 active 처리
    var sortBtnsContainer = button;
    while (sortBtnsContainer && sortBtnsContainer !== document) {
        if (sortBtnsContainer.classList.contains('sort_btns')) break;
        sortBtnsContainer = sortBtnsContainer.parentElement;
    }

    if (sortBtnsContainer) {
        var sortButtons = sortBtnsContainer.querySelectorAll('a');
        for (var i = 0; i < sortButtons.length; i++) {
            sortButtons[i].classList.remove('active');
        }
        button.classList.add('active');
    }

    // 상품 소팅
    var itemGroup = document.querySelectorAll('[data-itemgroup="' + group + '"]');
    var itemGroupSub = document.querySelectorAll('[data-itemgroup-sub="' + target + '"]');

    if (target === 'all') {
        for (var i = 0; i < itemGroup.length; i++) {
            itemGroup[i].style.display = 'block';
        }
        return false;
    }

    for (var i = 0; i < itemGroup.length; i++) {
        itemGroup[i].style.display = 'none';
    }

    for (var i = 0; i < itemGroupSub.length; i++) {
        itemGroupSub[i].style.display = 'block';
    }

    // 상품이 슬라이드인 경우 슬라이드 초기화
    var mainSection = button;
    while (mainSection && mainSection !== document) {
        if (mainSection.classList.contains('main_section')) break;
        mainSection = mainSection.parentElement;
    }

    if (mainSection && mainSection.querySelector('.slide')) {
        if (window.swipers && Object.prototype.toString.call(window.swipers) === '[object Array]') {
            for (var i = 0; i < window.swipers.length; i++) {
                var swiper = window.swipers[i];
                if (swiper && typeof swiper.update === 'function') {
                    swiper.update();
                }
            }
        }
    }
}



//퀵메뉴, 상단으로 버튼 모바일 footer밑으로 안넘어가게 제어
function adjustMobileBottomFixed() {
    var body = document.querySelector('body');
    var layout = document.getElementById('layout');
    var mobileBottomFixed = document.querySelector('.mobile_bottom_fixed');
    var footer = document.getElementById('footer');
    var footerRect = footer.getBoundingClientRect();
    var mobileBottomFixedRect = mobileBottomFixed.getBoundingClientRect();
    var viewportHeight = window.innerHeight;
    var viewportWidth = window.innerWidth;
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
        var el = button;
        var closestLayerPopup = null;
        while (el && el !== document) {
            if (el.classList && el.classList.contains('layer_popup')) {
                closestLayerPopup = el;
                break;
            }
            el = el.parentElement;
        }

        if (closestLayerPopup) {
            closestLayerPopup.classList.remove('show');
        }
    } else if (target) {
        var targetEl = document.getElementById(target);
        if (targetEl) {
            targetEl.classList.remove('show');
        }
    }

    var htmlEl = document.querySelector('html');
    if (htmlEl) {
        htmlEl.classList.remove('mobile_hidden');
    }
}



// 검색 바텀 시트 제어
function showBottomSheet(event){
    event.preventDefault();

    var bottomSheet = document.getElementById("bottom_sheet");
    bottomSheet.classList.add("show");
    document.querySelector('html').classList.add('mobile_hidden');
    updateSheetHeight(70); // 바텀 시트 최초 높이(vh)
}

function updateSheetHeight(height) {
    var bottomSheet = document.getElementById("bottom_sheet");
    var sheetContent = bottomSheet.querySelector(".content");
    
    if (height === 100) {
        var viewportHeight = window.innerHeight;
        var calculatedHeightInVh = Math.round((viewportHeight - 30) / viewportHeight * 100);
        sheetContent.style.height = calculatedHeightInVh + 'vh';
    } else {
        sheetContent.style.height = height + 'vh';
    }
    
    // classList.toggle() 대신 명시적인 클래스 추가/제거
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

function dragStart(e) {
    var bottomSheet = document.getElementById("bottom_sheet");
    var sheetContent = document.querySelector("#bottom_sheet .content");
    
    isDragging = true;
    
    // 터치 이벤트와 마우스 이벤트 모두 처리
    startY = e.pageY || (e.touches && e.touches[0] ? e.touches[0].pageY : 0);
    
    // parseInt의 기본 기수 10으로 명시
    startHeight = parseInt(sheetContent.style.height || '0', 10);
    
    bottomSheet.classList.add("dragging");
}

function dragging(e) {
    if (!isDragging) return;
    
    // 터치 이벤트와 마우스 이벤트 모두 처리
    var currentY = e.pageY || (e.touches && e.touches[0] ? e.touches[0].pageY : 0);
    var delta = startY - currentY;
    var newHeight = startHeight + delta / window.innerHeight * 100;
    
    updateSheetHeight(newHeight);
}

function dragStop() {
    var bottomSheet = document.getElementById("bottom_sheet");
    var sheetContent = document.querySelector("#bottom_sheet .content");
    
    isDragging = false;
    bottomSheet.classList.remove("dragging");
    
    // parseInt의 기본 기수 10으로 명시
    var sheetHeight = parseInt(sheetContent.style.height || '0', 10);
    
    // 3항 연산자 대신 명시적인 조건문으로 변경
    if (sheetHeight < 65) {
        hideBottomSheet();
    } else if (sheetHeight > 75) {
        updateSheetHeight(100);
    } else {
        updateSheetHeight(70);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    var observer = new MutationObserver(function (mutationsList, observer) {
        var searchBottomSheet = document.getElementById("search_bottom_sheet");
        var dragIcon = searchBottomSheet ? searchBottomSheet.querySelector(".drag-icon") : null;
        
        if(dragIcon){
            dragIcon.addEventListener("mousedown", dragStart);
            document.addEventListener("mousemove", dragging);
            document.addEventListener("mouseup", dragStop);
            dragIcon.addEventListener("touchstart", dragStart);
            document.addEventListener("touchmove", dragging);
            document.addEventListener("touchend", dragStop);

            // 요소가 존재하면 observer를 멈춤
            observer.disconnect();
        }
    });

    observer.observe(document.body, { 
        childList: true, 
        subtree: true 
    });
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
    var startPosition = window.pageYOffset;
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
    var locationItems = document.querySelectorAll('.location > .item');

    function closeAllLocations() {
        // forEach 대신 Array.prototype.forEach.call 사용
        Array.prototype.forEach.call(locationItems, function(item) {
            item.classList.remove('active');
        });
    }

    // forEach 대신 Array.prototype.forEach.call 사용
    Array.prototype.forEach.call(locationItems, function(item) {
        var links = item.querySelector('.links');
        var itemInnerLink = item.querySelector('.item_inner > a');

        // 이벤트 리스너 추가
        itemInnerLink.addEventListener('click', function (e) {
            // IE의 stopPropagation 대응
            e.stopPropagation ? e.stopPropagation() : (e.cancelBubble = true);
            
            if (item.classList.contains('active')) {
                item.classList.remove('active');
            } else {
                closeAllLocations();
                item.classList.add('active');
            }
        });

        if (links) {
            links.addEventListener('click', function (e) {
                // IE의 target 대응
                var target = e.target || e.srcElement;
                
                if (target.tagName === 'A') {
                    // closest() 대체 구현
                    var parentItem = target;
                    while (parentItem && !parentItem.classList.contains('item')) {
                        parentItem = parentItem.parentElement;
                    }

                    // querySelectorAll 대응
                    var items = parentItem.querySelectorAll('.item_inner > a');
                    Array.prototype.forEach.call(items, function (item) {
                        item.classList.remove('active');
                    });

                    target.classList.add('active');
                    
                    var btnSelect = parentItem.querySelector('.item_inner > a');
                    btnSelect.textContent = target.textContent;
                    
                    closeAllLocations();
                }
            });
        }
    });

    // 외부 클릭 시 닫기
    document.addEventListener('click', closeAllLocations);
});

// Info Hover 이벤트
document.addEventListener('DOMContentLoaded', function () {
    var infoHoverElements = document.querySelectorAll('.info_hover');

    if (infoHoverElements.length > 0) {
        // forEach 대신 Array.prototype.forEach.call 사용
        Array.prototype.forEach.call(infoHoverElements, function(box) {
            var btnInfoShow = box.querySelector('.btn_info_show');
            
            btnInfoShow.addEventListener('click', function () {
                if (box.classList.contains('active')) {
                    box.classList.remove('active');
                } else {
                    box.classList.add('active');
                }
            });
        });

        document.addEventListener('click', function (event) {
            // IE의 event.target 대응
            var target = event.target || event.srcElement;
            
            Array.prototype.forEach.call(infoHoverElements, function (box) {
                // contains 메서드 대체 구현
                var isContains = box === target || box.contains(target);
                
                if ((!isContains && box.classList.contains('active')) || 
                    target.classList.contains('btn_info_close')) {
                    box.classList.remove('active');
                }
            });
        });
    }
});

// 폼 관련 - 인풋 활성화
document.addEventListener('DOMContentLoaded', function () {
    var activeInputs = document.querySelectorAll('[input-active] input');
    
    // forEach 대신 Array.prototype.forEach.call 사용
    Array.prototype.forEach.call(activeInputs, function (input) {
        input.addEventListener('input', function () {
            // closest() 대체 구현
            var inputContainer = this;
            while (inputContainer && !inputContainer.classList.contains('input')) {
                inputContainer = inputContainer.parentElement;
            }

            if (this.value.length > 0) {
                inputContainer.classList.add('input_active');
            } else {
                inputContainer.classList.remove('input_active');
            }
        });
    });
});

//input 가격 콤마처리
function formatAmountWithComma(value) {
    value = value.replace(/[^0-9]/g, '');
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return value;
}
function numberFotmatComma() {
    var telInputs = document.querySelectorAll('input[data-amount-comma]');
    telInputs.forEach(function (telInput) {
        telInput.value = formatAmountWithComma(telInput.value);
        telInput.addEventListener('input', function () {
            this.value = formatAmountWithComma(this.value);
        });
    });
}

//input tel 숫자만 입력
function allowOnlyNumbersForTelInputs() {
    var telInputs = document.querySelectorAll('input[type="tel"]');
    
    // forEach 대신 Array.prototype.forEach.call 사용
    Array.prototype.forEach.call(telInputs, function (telInput) {
        telInput.addEventListener('input', function () {
            // 정규식을 사용해 숫자 외 문자 제거
            this.value = this.value.replace(/[^0-9]/g, '');
        });
    });
}
document.addEventListener('DOMContentLoaded', function () {
    allowOnlyNumbersForTelInputs();
    numberFotmatComma();
});

//input password text로 토글
document.addEventListener('DOMContentLoaded', function () {
    var btnPasswordShow = document.querySelectorAll('.btn_password_show');
    
    if (btnPasswordShow.length > 0) {
        // forEach 대신 Array.prototype.forEach.call 사용
        Array.prototype.forEach.call(btnPasswordShow, function(button) {
            // closest() 대체 구현
            var inputContainer = button;
            while (inputContainer && !inputContainer.classList.contains('input')) {
                inputContainer = inputContainer.parentElement;
            }
            
            var prevInput = inputContainer ? inputContainer.querySelector('input') : null;
            
            if (prevInput) {
                button.addEventListener('click', function () {
                    if (button.classList.contains('active')) {
                        button.classList.remove('active');
                        prevInput.type = 'password';
                    } else {
                        button.classList.add('active');
                        prevInput.type = 'text';
                    }
                });
            }
        });
    }
});

// input 최대값 계산
document.addEventListener('input', function (event) {
    // matches() 대체 메서드
    function elementMatches(element, selector) {
        var matches = (element.document || element.ownerDocument).querySelectorAll(selector),
            i = matches.length;
        while (--i >= 0 && matches.item(i) !== element) {}
        return i > -1;
    }

    // matches 대신 수동 체크
    if (elementMatches(event.target, '.max_text')) {
        var input = event.target;
        var text = input.value;
        var maxLength = parseInt(input.getAttribute('maxlength'), 10);
        
        // closest() 대체 구현
        var inputGroup = input;
        while (inputGroup && !inputGroup.classList.contains('input_group')) {
            inputGroup = inputGroup.parentElement;
        }
        
        var lenDisplay = inputGroup ? inputGroup.querySelector('.max_len b') : null;

        // 문자열 길이 계산 (스프레드 연산자 대신)
        var currentLength = text.length;
        
        if (currentLength > maxLength) {
            // 문자열 자르기
            input.value = text.substring(0, maxLength);
            currentLength = maxLength;
        }
        
        if (lenDisplay) {
            lenDisplay.textContent = currentLength;
        }
    }
});

document.addEventListener('DOMContentLoaded', function () {
    var tabControl = document.querySelector('[tap-control]');
    
    if (tabControl) {
        var tabBtns = tabControl.querySelectorAll('[tap-btns] button');
        var tabContents = tabControl.querySelectorAll('[tap-box]');

        // forEach 대신 Array.prototype.forEach.call 사용
        Array.prototype.forEach.call(tabBtns, function(btn, index) {
            btn.addEventListener('click', function() {
                // classList 변경
                Array.prototype.forEach.call(tabBtns, function(b) {
                    b.classList.remove('active');
                });
                
                Array.prototype.forEach.call(tabContents, function(c) {
                    c.classList.remove('active');
                });

                btn.classList.add('active');
                tabContents[index].classList.add('active');
            });
        });

        // some() 대신 명시적 루프
        function hasActiveElement(elements) {
            for (var i = 0; i < elements.length; i++) {
                if (elements[i].classList.contains('active')) {
                    return true;
                }
            }
            return false;
        }

        if (!hasActiveElement(tabBtns) && !hasActiveElement(tabContents)) {
            tabBtns[0].classList.add('active');
            tabContents[0].classList.add('active');
        }
    }
});

// 수량 조절 클릭 이벤트
document.addEventListener('click', function (event) {
    var target = event.target || event.srcElement;

    // closest() 대체 함수
    function findParentByClass(element, className) {
        while (element && !element.classList.contains(className)) {
            element = element.parentElement;
        }
        return element;
    }

    // minus 버튼 클릭
    var minusLotControl = findParentByClass(target, 'lot_event');
    if (target.classList.contains('minus') && minusLotControl) {
        var input = minusLotControl.querySelector('input');
        var limit = parseInt(input.getAttribute('limit'), 10);
        var initialValue = input.getAttribute('db-count');
        var currentValue = parseInt(input.value, 10);

        if (currentValue > 1) {
            input.value = currentValue - 1;
            updateLotButtonStates(minusLotControl, input, initialValue);
        }
    }

    // plus 버튼 클릭
    var plusLotControl = findParentByClass(target, 'lot_event');
    if (target.classList.contains('plus') && plusLotControl) {
        var input = plusLotControl.querySelector('input');
        var limit = parseInt(input.getAttribute('limit'), 10);
        var initialValue = input.getAttribute('db-count');
        var currentValue = parseInt(input.value, 10);

        if (currentValue < limit) {
            input.value = currentValue + 1;
            updateLotButtonStates(plusLotControl, input, initialValue);
        }
    }
});

// input 값 변경 이벤트
document.addEventListener('input', function (event) {
    var target = event.target;

    // closest() 대체 함수
    function findParentByClass(element, className) {
        while (element && !element.classList.contains(className)) {
            element = element.parentElement;
        }
        return element;
    }

    var lotControl = findParentByClass(target, 'lot_event');
    if (lotControl) {
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
    // closest() 대체 함수
    function findParentByClass(element, className) {
        while (element && !element.classList.contains(className)) {
            element = element.parentElement;
        }
        return element;
    }

    var minusBtn = lotControl.querySelector('.minus');
    var plusBtn = lotControl.querySelector('.plus');
    var currentValue = parseInt(input.value, 10);
    var limit = parseInt(input.getAttribute('limit'), 10);

    // disabled 속성 설정
    minusBtn.disabled = currentValue <= 1;
    plusBtn.disabled = currentValue >= limit;

    if (initialValue) {
        // closest() 대신 수동 탐색
        var lotBox = findParentByClass(lotControl, 'lot_box');
        var changeBtn = lotBox ? lotBox.querySelector('.lot_change_btn') : null;
        
        if (changeBtn) {
            if (input.value !== initialValue) {
                // 클래스 토글 대신 명시적 추가/제거
                changeBtn.classList.remove('btn_gray_line');
                changeBtn.classList.add('btn_black_line');
            } else {
                changeBtn.classList.remove('btn_black_line');
                changeBtn.classList.add('btn_gray_line');
            }
        }
    }
}

// 셀렉트박스
var choicesInstances = {}; // Map 대신 일반 객체 사용 (IE11 호환)

function applyChoicesToSelect(element) {
    // closest() 대체 함수
    function findParentByClass(el, className) {
        while (el && !el.classList.contains(className)) {
            el = el.parentElement;
        }
        return el;
    }

    // 피카데이트 요소 체크
    var pikaSingle = findParentByClass(element, 'pika-single');
    
    if (!pikaSingle && !element.classList.contains('choices-applied')) {
        var searchEnabled = element.hasAttribute('search-select');
        var choices = new Choices(element, {
            searchEnabled: searchEnabled,
            shouldSort: false,
            itemSelectText: '',
        });
        
        element.classList.add('choices-applied');
        
        var productOption = element.getAttribute('product-option');
        if (productOption) {
            choicesInstances[productOption] = choices;
        }
    }
}

document.addEventListener('DOMContentLoaded', function () {
    var selectElements = document.querySelectorAll('select');
    
    // forEach 대신 for 루프 사용
    for (var i = 0; i < selectElements.length; i++) {
        applyChoicesToSelect(selectElements[i]);
    }

    var observer = new MutationObserver(function(mutations) {
        for (var j = 0; j < mutations.length; j++) {
            var mutation = mutations[j];
            
            for (var k = 0; k < mutation.addedNodes.length; k++) {
                var node = mutation.addedNodes[k];
                
                // nodeType과 tagName 체크
                if (node.nodeType === 1) { // Node.ELEMENT_NODE
                    if (node.tagName === 'SELECT') {
                        applyChoicesToSelect(node);
                    } else if (node.querySelectorAll) {
                        var newSelects = node.querySelectorAll('select');
                        for (var l = 0; l < newSelects.length; l++) {
                            applyChoicesToSelect(newSelects[l]);
                        }
                    }
                }
            }
        }
    });

    observer.observe(document.body, { 
        childList: true, 
        subtree: true 
    });
});

document.addEventListener('DOMContentLoaded', function () {
    var selectElements = document.querySelectorAll('select');
    
    // forEach 대신 Array.prototype.forEach.call 사용
    Array.prototype.forEach.call(selectElements, function(element) {
        applyChoicesToSelect(element);
    });

    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            Array.prototype.forEach.call(mutation.addedNodes, function(node) {
                // nodeType과 tagName 체크
                if (node.nodeType === 1) { // Node.ELEMENT_NODE
                    if (node.tagName === 'SELECT') {
                        applyChoicesToSelect(node);
                    } else if (node.querySelectorAll) {
                        var newSelects = node.querySelectorAll('select');
                        Array.prototype.forEach.call(newSelects, function(element) {
                            applyChoicesToSelect(element);
                        });
                    }
                }
            });
        });
    });

    observer.observe(document.body, { 
        childList: true, 
        subtree: true 
    });
});

// 데이트 피커 초기화
function initializeDatepicker(element) {
    // dataset 대신 attribute 사용
    if (element.getAttribute('data-initialized') === 'true') return;

    var originalValue = element.value;
    var yearRange;
    var yearAttr = element.getAttribute('data-year');
    
    if (yearAttr) {
        // map 대신 수동 변환
        var years = [];
        yearAttr.split(',').forEach(function(year) {
            years.push(parseInt(year.trim(), 10));
        });
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
            var month = ('0' + (date.getMonth() + 1)).slice(-2);
            var day = ('0' + date.getDate()).slice(-2);
            var formattedDate = year + '-' + month + '-' + day;
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
    
    // dataset 대신 attribute 사용
    element.setAttribute('data-initialized', 'true');
}

document.addEventListener('DOMContentLoaded', function () {
    var datepickers = document.querySelectorAll('.datepicker');
    
    // forEach 대신 Array.prototype.forEach.call 사용
    Array.prototype.forEach.call(datepickers, function(element) {
        initializeDatepicker(element);
    });

    var observer2 = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            Array.prototype.forEach.call(mutation.addedNodes, function(node) {
                // nodeType과 tagName 체크
                if (node.nodeType === 1) { // Node.ELEMENT_NODE
                    if (node.classList.contains('datepicker')) {
                        initializeDatepicker(node);
                    }
                    
                    var newDatepickers = node.querySelectorAll('.datepicker');
                    Array.prototype.forEach.call(newDatepickers, function(element) {
                        initializeDatepicker(element);
                    });
                }
            });
        });
    });

    observer2.observe(document.body, {
        childList: true,
        subtree: true
    });

    // unload 이벤트 대신 beforeunload 사용 (IE 호환)
    window.attachEvent ? window.attachEvent('onbeforeunload', function() {
        observer2.disconnect();
    }) : window.addEventListener('beforeunload', function() {
        observer2.disconnect();
    });
});

// 파일 입력 처리
function singleFileInput() {
    var fileInputs = document.querySelectorAll('.file_single');
    
    if (fileInputs.length > 0) {
        // forEach 대신 Array.prototype.forEach.call 사용
        Array.prototype.forEach.call(fileInputs, function(fileInput) {
            fileInput.addEventListener('change', function () {
                var file = this.files[0];
                
                // closest() 대체 구현
                var fileInputContainer = this;
                while (fileInputContainer && !fileInputContainer.classList.contains('file_input')) {
                    fileInputContainer = fileInputContainer.parentElement;
                }
                
                var fileNameInput = fileInputContainer ? fileInputContainer.querySelector('.file_name') : null;

                if (!file) {
                    if (fileNameInput) fileNameInput.value = '';
                    return;
                }

                // 옵셔널 체이닝 대신 명시적 null 체크
                var fileTypeAttr = this.getAttribute('file-type');
                var allowedTypes = fileTypeAttr ? fileTypeAttr.split(' ') : [];
                
                var fileType = file.name.split('.').pop().toLowerCase();
                if (allowedTypes.length > 0 && allowedTypes.indexOf(fileType) === -1) {
                    box_alert(fileTypeAttr + '만 업로드 해주세요.', 'info');
                    this.value = '';
                    if (fileNameInput) fileNameInput.value = '';
                    return;
                }

                // 파일 크기 체크
                var maxSizeAttr = this.getAttribute('data-max-size');
                var maxSize = maxSizeAttr ? parseFloat(maxSizeAttr) * 1024 * 1024 : null;
                
                if (maxSize && file.size > maxSize) {
                    box_alert('용량 제한은 ' + maxSizeAttr + 'MB 입니다.', 'info');
                    this.value = '';
                    if (fileNameInput) fileNameInput.value = '';
                    return;
                }

                if (fileNameInput) fileNameInput.value = file.name;
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', function () {
    singleFileInput();
});

// 날짜 컨트롤 함수
function dateControl(startSelector, endSelector, period) {
    var buttons = document.querySelectorAll('.date_control button');
    
    // forEach 대신 Array.prototype.forEach.call 사용
    Array.prototype.forEach.call(buttons, function(btn) {
        btn.classList.remove('active');
    });

    // event 객체를 window.event로 대체 (IE 호환)
    var targetButton = window.event ? window.event.srcElement : event.target;
    targetButton.classList.add('active');

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
        var month = ('0' + (date.getMonth() + 1)).slice(-2);
        var day = ('0' + date.getDate()).slice(-2);
        return year + '-' + month + '-' + day;
    }
    
    document.querySelector(startSelector).value = formatDate(startDate);
    document.querySelector(endSelector).value = formatDate(endDate);
}


// 이미지 미리보기
function previewImage(input) {
    // closest() 대체 함수
    function findParentByClass(el, className) {
        while (el && !el.classList.contains(className)) {
            el = el.parentElement;
        }
        return el;
    }

    var photoItem = findParentByClass(input, 'photo_item');
    var preview = photoItem.querySelector('.preview');
    var removeBtn = photoItem.querySelector('.photo_remove');

    if (input.files && input.files[0]) {
        var file = input.files[0];
        
        // map 대신 수동 배열 변환
        var allowedTypes = [];
        input.getAttribute('file-type').toLowerCase().split(',').forEach(function(type) {
            allowedTypes.push(type.trim());
        });

        var fileType = file.type.split('/')[1].toLowerCase();
        
        // includes 대신 indexOf 사용
        if (allowedTypes.indexOf(fileType) === -1) {
            box_alert('허용되지 않는 파일 형식입니다.', 'info');
            input.value = '';
            return;
        }

        var maxSize = parseInt(input.getAttribute('max-size'), 10) * 1024 * 1024;
        if (file.size > maxSize) {
            box_alert('파일 크기는 ' + input.getAttribute('max-size') + 'MB 이하여야 합니다.', 'info');
            input.value = '';
            return;
        }

        var reader = new FileReader();
        reader.onload = function (e) {
            // 템플릿 리터럴 대신 문자열 연결
            preview.style.backgroundImage = 'url(\'' + e.target.result + '\')';
            preview.style.display = 'block';
            removeBtn.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
}

// 사진 제거 버튼 이벤트
(function() {
    var removeButtons = document.querySelectorAll('.photo_remove');
    
    // forEach 대신 Array.prototype.forEach.call 사용
    Array.prototype.forEach.call(removeButtons, function(button) {
        button.addEventListener('click', function () {
            // closest() 대체 함수
            function findParentByClass(el, className) {
                while (el && !el.classList.contains(className)) {
                    el = el.parentElement;
                }
                return el;
            }

            var photoItem = findParentByClass(this, 'photo_item');
            var input = photoItem.querySelector('input[type="file"]');
            var preview = photoItem.querySelector('.preview');
            
            input.value = '';
            preview.style.backgroundImage = '';
            preview.style.display = 'none';
            this.style.display = 'none';
        });
    });
})();

// 라디오 변경에 따른 디스플레이
function handleRadioChange() {
    var groupName = this.getAttribute("name");
    var sameRadios = document.querySelectorAll('input[name="' + groupName + '"]');
    
    // forEach 대신 Array.prototype.forEach.call 사용
    Array.prototype.forEach.call(sameRadios, function (target) {
        var displayTargets = target.getAttribute("radio-display").split(" ");
        
        // forEach 대신 일반 반복문 사용
        displayTargets.forEach(function (targetClass) {
            var elements = document.getElementsByClassName(targetClass);
            for (var i = 0; i < elements.length; i++) {
                elements[i].style.display = "none";
            }
        });

        var displayHideAttr = target.getAttribute("radio-display-hide");
        if (displayHideAttr) {
            var displayHideTargets = displayHideAttr.split(" ");
            displayHideTargets.forEach(function (targetClass) {
                var elements = document.getElementsByClassName(targetClass);
                for (var i = 0; i < elements.length; i++) {
                    elements[i].style.display = "none";
                }
            });
        }
    });

    var selectedTargets = this.getAttribute("radio-display").split(" ");
    selectedTargets.forEach(function (targetClass) {
        var selectedElements = document.getElementsByClassName(targetClass);
        for (var i = 0; i < selectedElements.length; i++) {
            selectedElements[i].style.display = "";
        }
    });
}

// 셀렉트박스 변경에 따른 디스플레이
function handleSelectChange() {
    var options = this.querySelectorAll('option');
    
    // forEach 대신 Array.prototype.forEach.call 사용
    Array.prototype.forEach.call(options, function (target) {
        var displayTargets = target.getAttribute("select-display").split(" ");
        
        displayTargets.forEach(function (targetClass) {
            var elements = document.getElementsByClassName(targetClass);
            for (var i = 0; i < elements.length; i++) {
                elements[i].style.display = "none";
            }
        });

        var displayHideAttr = target.getAttribute("select-display-hide");
        if (displayHideAttr) {
            var displayHideTargets = displayHideAttr.split(" ");
            displayHideTargets.forEach(function (targetClass) {
                var elements = document.getElementsByClassName(targetClass);
                for (var i = 0; i < elements.length; i++) {
                    elements[i].style.display = "none";
                }
            });
        }
    });

    var selectedOption = this.options[this.selectedIndex];
    var selectedTargets = selectedOption.getAttribute("select-display");
    
    if (selectedTargets) {
        var targetsArray = selectedTargets.split(" ");
        targetsArray.forEach(function (targetClass) {
            var selectedElements = document.getElementsByClassName(targetClass);
            for (var i = 0; i < selectedElements.length; i++) {
                selectedElements[i].style.display = "";
            }
        });
    }
}

document.addEventListener("DOMContentLoaded", function () {
    // 라디오 버튼 변경 이벤트 리스너 등록
    var radios = document.querySelectorAll('input[radio-display]');
    
    // forEach 대신 Array.prototype.forEach.call 사용
    Array.prototype.forEach.call(radios, function (radio) {
        radio.addEventListener("change", handleRadioChange);
        
        // 페이지 로드 시 라디오 버튼의 상태에 따라 초기 화면 설정
        if (radio.checked) {
            handleRadioChange.call(radio);
        }
    });

    // 셀렉트 디스플레이 변경 이벤트 리스너 등록
    var selects = document.querySelectorAll('select.select_display');
    
    // forEach 대신 Array.prototype.forEach.call 사용
    Array.prototype.forEach.call(selects, function (select) {
        select.addEventListener("change", handleSelectChange);
        
        // 페이지 로드 시 select 요소의 상태에 따라 초기 화면 설정
        if (checkVisibility(select)) {
            if (select.selectedIndex > 0) {
                handleSelectChange.call(select);
            }
        }
    });
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

// 라디오, 셀렉트 디스플레이 초기화 셋
function radioSelectdisplaySet() {
    var selects = document.querySelectorAll('select.select-display');
    
    // forEach 대신 Array.prototype.forEach.call 사용
    Array.prototype.forEach.call(selects, function (select) {
        if (checkVisibility(select)) {
            if (select.selectedIndex > -1) {
                handleSelectChange.call(select);
            }
        }
    });

    var searchSelects = document.querySelectorAll('.search_select.select-display');
    
    // forEach 대신 Array.prototype.forEach.call 사용
    Array.prototype.forEach.call(searchSelects, function (select) {
        if (checkVisibility(select)) {
            // handleSearchSelectChange 함수 존재 여부 확인
            if (typeof handleSearchSelectChange === 'function') {
                handleSearchSelectChange.call(select);
            }
        }
    });

    var radios = document.querySelectorAll('input[radio-display]');
    
    // forEach 대신 Array.prototype.forEach.call 사용
    Array.prototype.forEach.call(radios, function (radio) {
        if (checkVisibility(radio)) {
            if (radio.checked) {
                handleRadioChange.call(radio);
            }
        }
    });
}

// 이미지 상세보기
function imageDetail(src) {
    var imageDetailEl = document.getElementById('image_detail');
    var previewLayer = imageDetailEl ? imageDetailEl.querySelector('.layer_content') : null;
    var previewImg = document.getElementById('preview_image');
    
    if (previewImg) {
        // 화살표 함수 대신 일반 함수
        previewImg.onerror = function() {
            box_alert('이미지를 불러올 수 없습니다.', 'info');
            closeLayer('', 'image_detail');
        };
        
        previewImg.onload = function() {
            var adjustment = window.innerWidth >= 1260 ? 80 : 40;
            if (previewLayer) {
                previewLayer.style.width = (previewImg.naturalWidth + adjustment) + 'px';
            }
            console.log(adjustment);
        };
        
        previewImg.src = src;
    }
}

// 토글 슬라이드
function toggleSlideItem(button, content, duration) {
    if (isSliding) return;

    // 클래스 기반 부모 탐색
    function findParentByClass(el, className) {
        while (el && !el.classList.contains(className)) {
            el = el.parentElement;
        }
        return el;
    }

    // 태그 기반 부모 탐색
    function findParentByTag(el, tagName) {
        tagName = tagName.toLowerCase();
        while (el && el.tagName && el.tagName.toLowerCase() !== tagName) {
            el = el.parentElement;
        }
        return el;
    }

    // .item 또는 <li> 부모 탐색
    var toggleSlide = findParentByClass(button, 'item') || findParentByTag(button, 'li');

    if (!toggleSlide) return;

    var targetSlide = content ? content : toggleSlide.querySelector('[slide-content]');
    
    console.log(targetSlide);

    if (!targetSlide) return;

    // classList.toggle 대체
    if (toggleSlide.classList.contains('active')) {
        toggleSlide.classList.remove('active');
    } else {
        toggleSlide.classList.add('active');
    }

    var speed = duration !== undefined ? duration : 600;
    slideToggle(targetSlide, speed);
}


function printLayer(ele) {
    var printContents = document.querySelector(ele).innerHTML;
    var popup = window.open('', 'print_open', 'width=760,height=750,top=0,left=0,resizable=no,toolbar=no,status=no,scrollbars=yes');

    popup.document.open();
    popup.document.write(
        '<!DOCTYPE html>' +
        '<html>' +
        '<head>' +
        '    <meta charset="utf-8">' +
        '    <title>프린트 미리보기</title>' +
        '    <link href="/resources/real/dist/css/normalize.css" rel="stylesheet"/>' +
        '    <link href="/resources/real/dist/css/common.css" rel="stylesheet"/>' +
        '    <link href="/resources/real/dist/css/layout.css" rel="stylesheet"/>' +
        '    <link href="/resources/real/dist/css/content.css" rel="stylesheet"/>' +
        '    <link href="/resources/real/dist/css/jquery.modal.css" rel="stylesheet"/>' +
        '    <link href="/resources/real/dist/css/swiper.min.css" rel="stylesheet"/>' +
        '    <link href="/resources/real/dist/css/pikaday.css" rel="stylesheet"/>' +
        '    <link href="/resources/real/dist/css/simplebar.css" rel="stylesheet" type="text/css" />' +
        '    <link href="/resources/real/dist/css/choices.css" rel="stylesheet" type="text/css"/>' +
        '    <link href="/resources/real/dist/css/slick.css" rel="stylesheet" type="text/css"/>' +
        '    <link rel="shortcut icon" href="/resources/static/dist/favicon.ico" type="image/x-icon">' +
        '    <link rel="icon" href="/resources/static/dist/favicon.ico" type="image/x-icon">' +
        '    <script src="/resources/real/dist/js/jquery-2.2.4.min.js"><\/script>' +
        '    <script src="/resources/real/dist/js/jquery-ui.min.js"><\/script>' +
        '    <script src="/resources/real/dist/js/litepicker.js"><\/script>' +
        '    <script src="/resources/real/dist/js/jquery.modal.min.js"><\/script>' +
        '    <script src="/resources/real/dist/js/box_alert.js"><\/script>' +
        '    <script src="/resources/real/dist/js/swiper.min.js"><\/script>' +
        '    <script src="/resources/real/dist/js/slick.min.js"><\/script>' +
        '    <script src="/resources/real/dist/js/litepicker.js"><\/script>' +
        '    <script src="/resources/real/dist/js/jquery.validate.min.js"><\/script>' +
        '    <script src="/resources/real/dist/js/simplebar.min.js"><\/script>' +
        '    <script src="/resources/real/dist/js/choices.min.js"><\/script>' +
        '    <script src="/resources/real/dist/js/common.js"><\/script>' +
        '    <script src="/resources/real/dist/js/common_dev.js"><\/script>' +
        '    <script src="/resources/real/dist/js/pikaday.js"><\/script>' +
        '    <script src="/resources/real/dist/js/jquery.cookie.js"><\/script>' +
        '    <style>' +
        '    body { font-family: "Arial", sans-serif; padding: 20px; }' +
        '    @media print {' +
        '        body { margin: 0; }' +
        '        .layer_default_title{margin-bottom:5rem; text-align:center; font-size: 1.8rem; font-weight: 600; padding-bottom: 1rem; border-bottom:2px solid #000;}' +
        '        .layer_default_close{display:none;}' +
        '        .print_no{display:none;}' +
        '        table{page-break-inside:avoid;}' +
        '        tr,td{page-break-inside:avoid;}' +
        '    }' +
        '    </style>' +
        '</head>' +
        '<body>' +
        '    <div id="printArea">' +
        printContents +
        '    </div>' +
        '</body>' +
        '</html>'
    );
    popup.document.close();
    
    // IE11에서 팝업이 완전히 로드된 후 인쇄 실행
    setTimeout(function() {
        try {
            popup.focus();
            popup.print();
            
            // 인쇄 후 창 닫기
            setTimeout(function() {
                try {
                    popup.close();
                } catch(e) {
                    // 창이 이미 닫혔을 경우 오류 무시
                }
            }, 2000);
            
        } catch(e) {
            console.error('인쇄 오류:', e);
            // 인쇄에 실패하면 수동으로 닫기
            setTimeout(function() {
                try {
                    popup.close();
                } catch(e2) {}
            }, 1000);
        }
    }, 1000); // 1초 후 인쇄 실행 (IE11에서 안정적)
}