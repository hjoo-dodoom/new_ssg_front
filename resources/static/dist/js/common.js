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

let isSliding = false; // 애니메이션 상태

let slideUp = (target, duration = 500) => {
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
    window.setTimeout(() => {
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

let slideDown = (target, duration = 500) => {
    if (isSliding) return; // 애니메이션 중일 때는 동작하지 않음
    isSliding = true; // 애니메이션 시작
    target.style.removeProperty('display');
    let display = window.getComputedStyle(target).display;
    if (display === 'none') display = 'block';
    target.style.display = display;
    let height = target.offsetHeight;
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
    window.setTimeout(() => {
        target.style.removeProperty('height');
        target.style.removeProperty('overflow');
        target.style.removeProperty('transition-duration');
        target.style.removeProperty('transition-property');
        isSliding = false;
    }, duration);
};

let slideToggle = (target, duration = 500) => {
    const targetElement = typeof target === 'string' 
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
    const hdPartner = document.getElementById('hd_partner');
    if (hdPartner.classList.contains('open')) {
        hdPartner.classList.remove('open');
    } else {
        hdPartner.classList.add('open');
    }
}

//전체메뉴 토글
function toggleGnb(status) {
    const header = document.getElementById('header');
    const gnbWrap = document.getElementById('gnb_wrap');
    var gnbAllBg = document.querySelector('.gnb_all_bg');
    if (status === 'hide') {
        gnbWrap.classList.remove('open');
        if (gnbAllBg) {
            gnbAllBg.remove();
        }
    } else {
        gnbWrap.classList.add('open');
        if (!gnbAllBg) {
            const newGnbAllBg = document.createElement('span');
            newGnbAllBg.className = 'gnb_all_bg';
            header.after(newGnbAllBg);
        }
    }
}
document.addEventListener('DOMContentLoaded', function () {
    const btnGnbToggle = document.getElementById('btn_gnb_toggle')
    const gnbWrap = document.getElementById('gnb_wrap')

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
    const hdPartner = document.getElementById('hd_partner');
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
    const cateLinks = document.querySelectorAll('.cate_all .cate a');
    const subCategories = document.querySelectorAll('.cate_sub > div');

    cateLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            cateLinks.forEach(function (link) {
                link.classList.remove('active');
            });
            this.classList.add('active');
            subCategories.forEach(function (subCategory) {
                subCategory.style.display = 'none';
            });
            const selectedCate = this.getAttribute('data-cate');
            const selectedSubCategory = document.querySelector(`.cate_sub [data-cate-sub="${selectedCate}"]`);
            if (selectedSubCategory) {
                selectedSubCategory.style.display = 'block';
            }
        });
    });
});

//체크박스 전체 체크 
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('.label_control input[type="checkbox"]').forEach(function (check) {
        check.addEventListener('change', function (event) {
            function isVisible(element) {
                return !!(element.offsetWidth || element.offsetHeight || element.getClientRects().length);
            }
            const target = event.target;
            const labelControlParent = check.closest('.label_control_parent');
            const checkAllParentCheckbox = labelControlParent ? labelControlParent.querySelector('.check_all_parent') : null;
            if (target.matches('input[type="checkbox"]') && target.classList.contains('check_all')) {
                const isChecked = target.checked;
                const checkboxes = check.closest('.label_control').querySelectorAll('input[type="checkbox"]');
                checkboxes.forEach(function (checkbox) {
                    if (isVisible(checkbox) && !checkbox.disabled) {
                        checkbox.checked = isChecked;
                    }
                });
                if (!isChecked) {
                    target.checked = false; // check_all 비활성화
                    if (checkAllParentCheckbox) {
                        checkAllParentCheckbox.checked = false; // check_all 비활성화
                    }
                }
            } else if (target.matches('input[type="checkbox"]:not(.check_all)') && !target.checked) {
                const checkAllCheckbox = check.closest('.label_control').querySelector('.check_all');
                if (checkAllCheckbox) {
                    checkAllCheckbox.checked = false; // check_all 비활성화
                }
                if (checkAllParentCheckbox) {
                    checkAllParentCheckbox.checked = false; // check_all 비활성화
                }
            }
        });
    });
});

/* 상품 탭 컨트롤 */
function itemSort(button, group, target) {
    //버튼 active
    if (button.closest('.sort_btns')) {
        button.closest('.sort_btns').querySelectorAll('a').forEach(function (item) {
            item.classList.remove('active');
        });
        button.classList.add('active');
    }

    //상품 소팅
    const itemGroup = document.querySelectorAll(`[data-itemgroup="${group}"]`);
    const itemGroupSub = document.querySelectorAll(`[data-itemgroup-sub="${target}"]`);
    if (target === 'all') {
        itemGroup.forEach(function (item) {
            item.style.display = 'block';
        })
        return false;
    }
    itemGroup.forEach(function (item) {
        item.style.display = 'none';
    })
    itemGroupSub.forEach(function (item) {
        item.style.display = 'block';
    })

    //상품이 슬라이드인경우 슬라이드 초기화
    if (button.closest('.main_section').querySelector('.slide')) {
        swipers.forEach(swiper => swiper.update());
    }

}


//퀵메뉴, 상단으로 버튼 모바일 footer밑으로 안넘어가게 제어
function adjustMobileBottomFixed() {
    const body = document.querySelector('body');
    const layout = document.getElementById('layout');
    const mobileBottomFixed = document.querySelector('.mobile_bottom_fixed');
    const footer = document.getElementById('footer');
    const footerRect = footer.getBoundingClientRect();
    const mobileBottomFixedRect = mobileBottomFixed.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    //하단hidden
    let offset = viewportWidth <= 850 ? 20 : 0;
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
    const mobileBottomFixed = document.querySelector('.mobile_bottom_fixed');
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
        const closestLayerPopup = button.closest('.layer_popup');
        closestLayerPopup.classList.remove('show');
    } else {
        document.getElementById(target).classList.remove('show');
    }
    document.querySelector('html').classList.remove('mobile_hidden');
}

//모바일 헤더 전체 카테고리 토글
function gnbMobileOpen() {
    const gnb = document.getElementById('gnb');
    if (gnb.classList.contains('mobile_open')) {
        gnb.classList.remove('mobile_open');
    } else {
        gnb.classList.add('mobile_open');
    }
}

//상단으로 이동
function toTop() {
    const startPosition = window.pageYOffset;
    const duration = 800;
    const startTime = performance.now();
    function scrollStep(currentTime) {
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const easeOutProgress = 1 - Math.pow(1 - progress, 3);
        const newY = startPosition * (1 - easeOutProgress);
        window.scrollTo(0, newY);
        if (timeElapsed < duration) {
            requestAnimationFrame(scrollStep);
        }
    }
    requestAnimationFrame(scrollStep);
}


//location event
document.addEventListener('DOMContentLoaded', function () {
    const locationItem = document.querySelectorAll('.location > .item');

    function closeAllLocations() {
        locationItem.forEach(item => {
            item.classList.remove('active');
        });
    }

    locationItem.forEach(item => {
        const links = item.querySelector('.links');

        item.querySelector('.item_inner > a').addEventListener('click', function (e) {
            e.stopPropagation();
            if (item.classList.contains('active')) {
                item.classList.remove('active');
            } else {
                closeAllLocations();
                item.classList.add('active');
            }
        });
        if (links) {
            links.addEventListener('click', function (e) {
                if (e.target.tagName === 'A') {
                    const items = e.target.closest('.item').querySelectorAll('.item_inner > a');
                    items.forEach(function (item) {
                        item.classList.remove('active');
                    });
                    e.target.classList.add('active');
                    const btnSelect = e.target.closest('.item').querySelector('.item_inner > a');
                    btnSelect.textContent = e.target.textContent;
                    closeAllLocations();
                }
            });
        }
    });
    document.addEventListener('click', closeAllLocations);
});


// ? info 안내문구 이벤트
document.addEventListener('DOMContentLoaded', function () {
    const infoHover = document.querySelectorAll('.info_hover');
    const btnInfoClose = document.querySelectorAll('.btn_info_close');

    if (infoHover) {
        infoHover.forEach(box => {
            box.querySelector('.btn_info_show').addEventListener('click', function () {
                if (box.classList.contains('active')) {
                    box.classList.remove('active');
                } else {
                    box.classList.add('active');
                }
            });
        });

        document.addEventListener('click', function (event) {
            infoHover.forEach(function (box) {
                if (!box.contains(event.target) && box.classList.contains('active') || event.target.classList.contains('btn_info_close')) {
                    box.classList.remove('active');
                }
            });
        });
    }
});


/////////////폼 관련/////////////
//input 값이 있으면 active 추가
document.addEventListener('DOMContentLoaded', function () {
    const activeInput = document.querySelectorAll('[input-active] input');
    activeInput.forEach(function (input) {
        input.addEventListener('input', function () {
            if (input.value.length > 0) {
                input.closest('.input').classList.add('input_active')
            } else {
                input.closest('.input').classList.remove('input_active')
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
    const telInputs = document.querySelectorAll('input[data-amount-comma]');
    telInputs.forEach(function (telInput) {
        telInput.value = formatAmountWithComma(telInput.value);
        telInput.addEventListener('input', function () {
            this.value = formatAmountWithComma(this.value);
        });
    });
}

//input tel 숫자만 입력
function allowOnlyNumbersForTelInputs() {
    const telInputs = document.querySelectorAll('input[type="tel"]');
    telInputs.forEach(function (telInput) {
        telInput.addEventListener('input', function () {
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
    const btnPasswordShow = document.querySelectorAll('.btn_password_show');
    if (btnPasswordShow) {
        btnPasswordShow.forEach(button => {
            const prevInput = button.closest('.input').querySelector('input');
            button.addEventListener('click', function () {
                if (button.classList.contains('active')) {
                    button.classList.remove('active');
                    prevInput.type = 'password';
                } else {
                    button.classList.add('active');
                    prevInput.type = 'text';
                }
            });
        });
    }
});

//input 최대값 계산
document.addEventListener('input', function (event) {
    if (event.target.matches('.max_text')) {
        let input = event.target;
        let text = input.value;
        let maxLength = parseInt(input.getAttribute('maxlength'));
        let lenDisplay = input.closest('.input_group').querySelector('.max_len b');
        let currentLength = [...text].length;
        if (currentLength > maxLength) {
            input.value = [...text].slice(0, maxLength).join('');
            currentLength = maxLength;
        }
        lenDisplay.textContent = currentLength;
    }
});
/////////////폼 관련 끝/////////////

//tap show hide
document.addEventListener('DOMContentLoaded', function () {
    const tabControl = document.querySelector('[tap-control]');
    if (tabControl) {
        const tabBtns = tabControl.querySelectorAll('[tap-btns] button');
        const tabContents = tabControl.querySelectorAll('[tap-box]');

        tabBtns.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                tabBtns.forEach(b => b.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));

                btn.classList.add('active');
                tabContents[index].classList.add('active');
            });
        });

        if (!Array.from(tabBtns).some(btn => btn.classList.contains('active')) &&
            !Array.from(tabContents).some(content => content.classList.contains('active'))) {
            tabBtns[0].classList.add('active');
            tabContents[0].classList.add('active');
        }
    }
});

//수량조절
document.addEventListener('click', function (event) {
    const target = event.target;

    // minus 버튼 클릭
    if (target.classList.contains('minus') && target.closest('.lot_event')) {
        const lotControl = target.closest('.lot_event');
        const input = lotControl.querySelector('input');
        const limit = parseInt(input.getAttribute('limit'), 10);
        const initialValue = input.getAttribute('db-count');

        if (parseInt(input.value, 10) > 1) {
            input.value = parseInt(input.value, 10) - 1;
            updateLotButtonStates(lotControl, input, initialValue);
        }
    }

    // plus 버튼 클릭
    if (target.classList.contains('plus') && target.closest('.lot_event')) {
        const lotControl = target.closest('.lot_event');
        const input = lotControl.querySelector('input');
        const limit = parseInt(input.getAttribute('limit'), 10);
        const initialValue = input.getAttribute('db-count');

        if (parseInt(input.value, 10) < limit) {
            input.value = parseInt(input.value, 10) + 1;
            updateLotButtonStates(lotControl, input, initialValue);
        }
    }
});

// input 값 변경에 대한 이벤트 위임
document.addEventListener('input', function (event) {
    const target = event.target;

    if (target.closest('.lot_event')) {
        const lotControl = target.closest('.lot_event');
        const limit = parseInt(target.getAttribute('limit'), 10);
        const initialValue = target.getAttribute('db-count');

        let value = parseInt(target.value, 10);
        if (isNaN(value) || value < 1) {
            target.value = 1;
        } else if (value > limit) {
            target.value = limit;
        }

        updateLotButtonStates(lotControl, target, initialValue);
    }
});

function updateLotButtonStates(lotControl, input, initialValue) {
    const minusBtn = lotControl.querySelector('.minus');
    const plusBtn = lotControl.querySelector('.plus');
    const currentValue = parseInt(input.value, 10);
    const limit = parseInt(input.getAttribute('limit'), 10);

    minusBtn.disabled = currentValue <= 1;
    plusBtn.disabled = currentValue >= limit;

    if (initialValue) {
        const changeBtn = lotControl.closest('.lot_box').querySelector('.lot_change_btn');
        if (changeBtn) {
            if (input.value !== initialValue) {
                changeBtn.classList.remove('btn_gray_line')
                changeBtn.classList.add('btn_black_line')
            } else {
                changeBtn.classList.remove('btn_black_line')
                changeBtn.classList.add('btn_gray_line')
            }
        }
    }
}

//셀렉트박스
const choicesInstances = new Map();
const applyChoicesToSelect = (element) => {
    if (!element.closest('.pika-single') && !element.classList.contains('choices-applied')) {
        const searchEnabled = element.hasAttribute('search-select');
        const choices = new Choices(element, {
            searchEnabled: searchEnabled,
            shouldSort: false,
            itemSelectText: '',
        });
        element.classList.add('choices-applied');
        if (element.getAttribute('product-option')) {
            choicesInstances.set(element.getAttribute('product-option'), choices);
        }
    }
};
document.addEventListener('DOMContentLoaded', function () {
    const selectElements = document.querySelectorAll('select');
    selectElements.forEach((element) => applyChoicesToSelect(element));
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.tagName === 'SELECT') {
                    applyChoicesToSelect(node);
                } else if (node.querySelectorAll) {
                    const newSelects = node.querySelectorAll('select');
                    newSelects.forEach((element) => applyChoicesToSelect(element));
                }
            });
        });
    });
    observer.observe(document.body, { childList: true, subtree: true });
});

//datepicker
function initializeDatepicker(element) {
    if (element.dataset.initialized === 'true') return;
    const originalValue = element.value;
    let yearRange;
    const yearAttr = element.getAttribute('data-year');
    if (yearAttr) {
        const years = yearAttr.split(',').map(year => parseInt(year.trim()));
        yearRange = years;
    }
    const pickerOptions = {
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
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            const formattedDate = '' + year + '-' + month + '-' + day + '';
            element.value = formattedDate;
        },
        showMonthAfterYear: true,
        defaultDate: new Date(originalValue),
        setDefaultDate: true
    };
    if (yearRange) {
        pickerOptions.yearRange = yearRange;
    }
    const picker = new Pikaday(pickerOptions);
    element.value = originalValue;
    element.dataset.initialized = 'true';
}
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.datepicker').forEach(initializeDatepicker);
    const observer2 = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    if (node.classList.contains('datepicker')) {
                        initializeDatepicker(node);
                    }
                    node.querySelectorAll('.datepicker').forEach(initializeDatepicker);
                }
            });
        });
    });
    observer2.observe(document.body, {
        childList: true,
        subtree: true
    });
});
window.addEventListener('unload', () => observer2.disconnect());


//첨부파일
//첨부파일 싱글
function singleFileInput() {
    const fileInputs = document.querySelectorAll('.file_single');
    if (fileInputs.length > 0) {
        fileInputs.forEach(fileInput => {
            fileInput.addEventListener('change', function (event) {
                const file = this.files[0];
                const fileNameInput = this.closest('.file_input').querySelector('.file_name');

                if (!file) {
                    fileNameInput.value = '';
                    return;
                }

                // 파일 타입 체크
                const allowedTypes = this.getAttribute('file-type')?.split(' ') || [];
                const fileType = file.name.split('.').pop().toLowerCase();
                if (allowedTypes.length > 0 && !allowedTypes.includes(fileType)) {
                    box_alert(this.getAttribute('file-type') + '만 업로드 해주세요.', 'info');
                    this.value = '';
                    fileNameInput.value = '';
                    return;
                }
                // 파일 크기 체크
                const maxSize = this.hasAttribute('data-max-size')
                    ? parseFloat(this.getAttribute('data-max-size')) * 1024 * 1024
                    : null;
                if (maxSize && file.size > maxSize) {
                    const maxSizeMB = this.getAttribute('data-max-size');
                    box_alert('용량 제한은 ' + maxSizeMB + 'MB 입니다.', 'info');
                    this.value = '';
                    fileNameInput.value = '';
                    return;
                }

                fileNameInput.value = file.name;
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', function () {
    singleFileInput();
});


//리스트 기간설정
function dateControl(startSelector, endSelector, period) {
    const buttons = document.querySelectorAll('.date_control button');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    const endDate = new Date();
    let startDate = new Date();
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
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    document.querySelector(startSelector).value = formatDate(startDate);
    document.querySelector(endSelector).value = formatDate(endDate);
}


//이미지 미리보기
function previewImage(input) {
    const photoItem = input.closest('.photo_item');
    const preview = photoItem.querySelector('.preview');
    const removeBtn = photoItem.querySelector('.photo_remove');
    if (input.files && input.files[0]) {
        const file = input.files[0];
        const allowedTypes = input.getAttribute('file-type').toLowerCase().split(',').map(type => type.trim());
        const fileType = file.type.split('/')[1].toLowerCase();
        if (!allowedTypes.includes(fileType)) {
            box_alert('허용되지 않는 파일 형식입니다.', 'info');
            input.value = '';
            return;
        }
        const maxSize = input.getAttribute('max-size') * 1024 * 1024;
        if (file.size > maxSize) {
            box_alert('파일 크기는 ' + input.getAttribute('max-size') + 'MB 이하여야 합니다.', 'info');
            input.value = '';
            return;
        }
        const reader = new FileReader();
        reader.onload = function (e) {
            preview.style.backgroundImage = `url('${e.target.result}')`;
            preview.style.display = 'block';
            removeBtn.style.display = 'block';
        }
        reader.readAsDataURL(file);
    }
}
document.querySelectorAll('.photo_remove').forEach(button => {
    button.addEventListener('click', function () {
        const photoItem = this.closest('.photo_item');
        const input = photoItem.querySelector('input[type="file"]');
        const preview = photoItem.querySelector('.preview');
        input.value = '';
        preview.style.backgroundImage = '';
        preview.style.display = 'none';
        this.style.display = 'none';
    });
});




// 라디오 변경에 따른 display
function handleRadioChange() {
    var groupName = this.getAttribute("name");
    var sameRadios = document.querySelectorAll('input[name="' + groupName + '"]');
    sameRadios.forEach(function (target) {
        var displayTargets = target.getAttribute("radio-display").split(" ");
        displayTargets.forEach(function (target) {
            var elements = document.getElementsByClassName(target);
            for (var i = 0; i < elements.length; i++) {
                elements[i].style.display = "none";
            }
        });
        if (target.getAttribute("radio-display-hide")) {
            var displayHideTargets = target.getAttribute("radio-display-hide").split(" ");
            displayHideTargets.forEach(function (target) {
                var elements = document.getElementsByClassName(target);
                for (var i = 0; i < elements.length; i++) {
                    elements[i].style.display = "none";
                }
            });
        }
    });
    var selectedTargets = this.getAttribute("radio-display").split(" ");
    selectedTargets.forEach(function (target) {
        var selectedElements = document.getElementsByClassName(target);
        for (var i = 0; i < selectedElements.length; i++) {
            selectedElements[i].style.display = "";
        }
    });
}

// 셀렉트박스 변경에 따른 display
function handleSelectChange() {
    var options = this.querySelectorAll('option');

    options.forEach(function (target) {
        var displayTargets = target.getAttribute("select-display").split(" ");
        displayTargets.forEach(function (target) {
            var elements = document.getElementsByClassName(target);
            for (var i = 0; i < elements.length; i++) {
                elements[i].style.display = "none";
            }
        });
        if (target.getAttribute("select-display-hide")) {
            var displayHideTargets = target.getAttribute("select-display-hide").split(" ");
            displayHideTargets.forEach(function (target) {
                var elements = document.getElementsByClassName(target);
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
        targetsArray.forEach(function (target) {
            var selectedElements = document.getElementsByClassName(target);
            for (var i = 0; i < selectedElements.length; i++) {
                selectedElements[i].style.display = "";
            }
        });
    }
}

document.addEventListener("DOMContentLoaded", function () {

    // 라디오 버튼 변경 이벤트 리스너 등록
    var radios = document.querySelectorAll('input[radio-display]');
    radios.forEach(function (radio) {
        radio.addEventListener("change", handleRadioChange);
        // 페이지 로드 시 라디오 버튼의 상태에 따라 초기 화면 설정
        if (radio.checked) {
            handleRadioChange.call(radio); // 선택된 라디오 버튼에 대한 처리 실행
        }
    });

    // 셀렉트 디스플레이 변경 이벤트 리스너 등록
    var selects = document.querySelectorAll('select.select_display');
    selects.forEach(function (select) {
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
        const style = window.getComputedStyle(element);
        if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') {
            return false;
        }
        element = element.parentElement;
    }
    const rect = element.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
}


//라디오, 셀렉트 디스플레이 초기화 셋
function radioSelectdisplaySet() {
    var selects = document.querySelectorAll('select.select-display');
    selects.forEach(function (select) {
        if (checkVisibility(select)) {
            if (select.selectedIndex > -1) {
                handleSelectChange.call(select);
            }
        }
    });

    var searchSelects = document.querySelectorAll('.search_select.select-display');
    searchSelects.forEach(function (select) {
        if (checkVisibility(select)) {
            handleSearchSelectChange.call(select);
        }
    });

    var radios = document.querySelectorAll('input[radio-display]');
    radios.forEach(function (radio) {
        if (checkVisibility(radio)) {
            if (radio.checked) {
                handleRadioChange.call(radio);
            }
        }
    });
}


//이미지 상세보기
function imageDetail(src) {
    const previewLayer = document.getElementById('image_detail').querySelector('.layer_content ');
    const previewImg = document.getElementById('preview_image');
    
    if (previewImg) {
        previewImg.onerror = () => {
            box_alert('이미지를 불러올 수 없습니다.', 'info');
            closeLayer('', 'image_detail');
        };
        previewImg.onload = () => {
            const adjustment = window.innerWidth >= 1260 ? 80 : 40;
            previewLayer.style.width = (previewImg.naturalWidth + adjustment) + 'px';
            console.log(adjustment)
        };
        previewImg.src = src;
    }
}

//토글 슬라이드
function toggleSlideItem(button, content ,duration){
    if (isSliding) return;
    const toggleSlide = button.closest('.item') || button.closest('li');
    let targetSlide = null;
    targetSlide = content ? content : toggleSlide.querySelector('[slide-content]');
    console.log(targetSlide)
    toggleSlide.classList.toggle('active');
    let speed = duration !== undefined ? duration : 600;
    slideToggle(targetSlide, speed);
}