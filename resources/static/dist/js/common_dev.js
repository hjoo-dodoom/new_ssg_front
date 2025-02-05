//콤마찍기 함수
function fnSetComma(str) {
  str = String(str);
  return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}

//콤마풀기 함수
function fnSetUncomma(str) {
  str = String(str);
  return str.replace(/[^\d]+/g, '');
}

//여러경우의 널값들을 "" 로 치환
function fnToNotNull(val) {
	var returnVal = "";
	
	returnVal = fnToNotNullDefVal(val, ""); 
	
	return returnVal;
}

function fnToNotNullDefVal(val, defStr) {
	var returnVal = "";
	
	if (val == "null" || val == "undefined" || val == null || val == undefined || val == "") {
		if (defStr == null || defStr == undefined) {
			returnVal = "";
		} else {
			if (defStr.length == 0) {
				returnVal = "";
			} else {
				returnVal = defStr;
			}
		}
	} else {
		returnVal = val;
	}
	
	return returnVal;
}

// 전화번호, 휴대폰 번호 형식으로 치환
function fnMakeTelPhoneForm(val) {
	var returnVal = fnToNotNull(val).replace(/[^0-9]/g, '');
	
	if (returnVal != "") {
		returnVal = returnVal.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/,"$1-$2-$3");
	} else {
		returnVal = "";
	}
	
	return returnVal;
}

function fnGetByte(str) {
	var resultByte = 0;
	var val = fnToNotNull(str);
	
	for (b=i=0; c=val.charCodeAt(i);) {
		b+=c >> 7 ? 3 : 1;
		i++;
	}
	
	resultByte = b;
	
	return resultByte;
}

// 바이트 계산
function fnCutByteLen(str, limitByte) {
	var resultStr = "";
	var val = fnToNotNull(str);
	
	for (b=i=0; c=val.charCodeAt(i);) {
		b+=c >> 7 ? 3 : 1;
		
		if (b > limitByte) {
			break;
		}
		
		i++;
	}
	
	resultStr = val.substring(0, i);
	
	return resultStr;
}

//정규식 유효성 체크
function fnCmmValidateCredentials(options) {
	const reqValue = options.value;
	const reqName = options.name;
	const reqInputId = options.inputId;
	const reqPatternKeyword = fnToNotNull(options.patternKeyword).toLowerCase();
	const reqPattern = fnToNotNull(options.pattern);
	const reqMessage = fnToNotNull(options.message, "입력값이 잘못되었습니다");
	const reqRequired = options.required;
	let isValidate;

	// 패턴 초기화
	let pattern = "";

	switch (reqPatternKeyword) {
        case "id":
            pattern = /^[a-zA-Z0-9]{2,20}$/;
            break;
        case "password":
            pattern = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[~!@#$%^&*()_+.]).{8,20}$/;
            break;
        case "tel":
            pattern = /^(0[0-9])(-)?(\d{3,4})(-)?(\d{4})$/;
            break;
        case "cellphone":
            pattern = /^(01[0-9])(-)?(\d{3,4})(-)?(\d{4})$/;
            break;
        case "email":
            pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            break;
        case "number":
            pattern = /^\d+$/;
            break;
        default:
            pattern = reqPattern;
            break;
    }

    // 값이 비어있는 경우 처리
    if ("" === fnToNotNull(reqValue)) {
        if (reqRequired) {
            alert(reqName + "을(를) 입력해주세요.");
            $("#" + reqInputId).focus();
            return false;
        } else {
            return true;
        }
    }

    // 유효성 체크를 건너뛸경우
    if ("" === fnToNotNull(pattern)) {
        return true;
    }

    // 유효성 체크
    isValidate = pattern.test(reqValue);

    if (!isValidate) {
        if (!"" === reqMessage) {
            alert(reqMessage);
            $("#" + reqInputId).focus();
        }

        return false;
    }

    return true;
}

// 동적 폼 생성 함수
function fnCmmSubmitDynamicForm(options) {
	loading('show');

	try {
		// 해당 id를 가진 폼 요소가 이미 있는지 확인
		const reqFormId = options.formId;
		const reqParams = options.params;
		const reqMethod = options.method;
		const reqAction = options.action;
		const reqTarget = options.target;

		// 폼 설정
		let form = document.getElementById(reqFormId);

		// 폼이 존재하지 않을 경우
		if (!form) {
			form = document.createElement("form");
			form.id = reqFormId;
		}

		form.setAttribute("method", reqMethod);
		form.setAttribute("action", reqAction);
		form.setAttribute("target", reqTarget);

		for (const key in reqParams) {
			if (reqParams.hasOwnProperty(key)) {
				let hiddenField = form.querySelector('input[name="' + key + '"]');

				if (!hiddenField) {
					hiddenField = document.createElement("input");
					hiddenField.setAttribute("type", "hidden");
					hiddenField.setAttribute("name", key);
					form.appendChild(hiddenField);
				}

				hiddenField.setAttribute("value", reqParams[key]);
			}
		}

		// 기존 폼의 바로 위 부모 엘리먼트에 추가
		if (document.contains(form)) {
			form.parentNode.insertBefore(form, form.nextSibling); // Insert form after itself
		} else {
			document.body.appendChild(form); // 폼이 존재하지 않는 경우 body에 추가
		}

		form.submit();
	} catch (e) {
		console.error(e);
	} finally {
		setTimeout(() => {
			loading('hide');
		}, 2000);
	}
}

// 새로고침 제어
function fnCmmHandleRefresh(callback) {
    window.addEventListener('keydown', function(event) {
        const key = event.key.toLowerCase();

        if (key === 'f5' || (event.ctrlKey && key === 'r') || (event.ctrlKey && event.shiftKey && key === 'r')) {
            event.preventDefault();

            if (typeof callback === 'function') {
                callback();
            }
        }
    });
}

// Jquery Validate 커스텀 함수 추가
function fnCmmAddCustomValidators(callback) {
    $.validator.addMethod("rangeByteLength", function(value, element, param) {
        let length = fnGetByte(value);
        return this.optional(element) || (length >= param[0] && length <= param[1]);
    });

    $.validator.addMethod("regex", function(value, element, regexp) {
        if ("" === value) {
            return true;
        } else {
			const options = {
				value: value,
				pattern: regexp
			};

			return fnCmmValidateCredentials(options);
        }
    });

    if (typeof callback === 'function') {
        callback();
    }
}

// Jquery Validate 히든값 변경에 따른 유효성 검사처리
function fnCmmOnHiddenFieldChange(targetFieldIds) {
    // 감시할 특정 hidden 필드들 선택
    const targetHiddenFields = document.querySelectorAll('#' + targetFieldIds.join(', #'));

    // 각 hidden 필드에 대한 MutationObserver 설정
    targetHiddenFields.forEach(hiddenField => {
        const observer = new MutationObserver(mutationsList => {
            mutationsList.forEach(mutation => {
                // 변경된 필드의 ID 확인
                const fieldId = mutation.target.id;

                // 변경된 필드의 ID가 감지할 목록에 포함되어 있는지 체크
                if (mutation.type === 'attributes' && mutation.attributeName === 'value' && targetFieldIds.includes(fieldId)) {
                    // 해당 필드의 유효성 검사 수행
                    $("#" + fieldId).valid();
                }
            });
        });

        observer.observe(hiddenField, { attributes: true });
    });
}

// 엑셀 다운로드
function fnCmmDownloadExcel(options) {
	const reqFormId = options.formId;
	const reqMethod = options.method;
	const reqAction = options.action;
	const reqFileName = options.fileName;

	// 폼 설정
	const form = document.getElementById(reqFormId);

	// 폼 데이터를 직렬화
    const formData = new FormData(form);

    // 파일명 추가
    formData.append('cmmExcelFileName', reqFileName);

    loading('show');

    // fetch 요청에 폼 데이터 포함하여 보내기
    fetch(reqAction, {
        method: reqMethod,
        body: formData
    })
    .then(response => {
		if (!response.ok) {
			return response.json().then(errorData => {
				alert(errorData.result_msg);
				throw new Error(errorData.result_msg);
			});
		}

        return response.blob();
    })
    .then(blob => {
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = reqFileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    })
    .catch(error => {
		alert("관리자에게 문의하여 주시기 바랍니다.");
    })
    .finally(() => {
		setTimeout(() => {
			loading('hide');
		}, 1000);
    });
}

// 엑셀 업로드
function fnCmmUploadExcel(options, successCallback, failCallback) {
	const reqFormId = options.formId;
	const reqMethod = options.method;
	const reqAction = options.action;

	// 폼 설정
	const form = document.getElementById(reqFormId);

	// 폼 데이터를 직렬화
	const formData = new FormData(form);

	loading('show');

	// fetch 요청에 폼 데이터 포함하여 보내기
	fetch(reqAction, {
		method: reqMethod,
		body: formData
	})
	.then(response => {
		if (!response.ok) {
			return response.json().then(errorData => {
				throw new Error("error");
			});
		}

		return response.json();
	})
	.then(data => {
		if ("0000" === data.result_code) {
			if (typeof successCallback === 'function') {
				successCallback(data);
			}
		} else {
			alert(data.result_msg);

			if (typeof failCallback === 'function') {
				failCallback();
			}
		}
	})
	.catch(error => {
		alert("관리자에게 문의하여 주시기 바랍니다.");
	})
	.finally(() => {
		setTimeout(() => {
			loading('hide');
		}, 1000);
	});
}

// 리퀘스트 호출
function fnCmmSendRequest(options, successCallback, failCallback) {
	const reqFormId = options.formId;
	const reqMethod = options.method;
	const reqAction = options.action;
	const reqParams = options.params;

	// 폼 설정
	const form = document.getElementById(reqFormId);

	// 폼 데이터를 직렬화
	const formData = new FormData(form);

	// 추가 파라메터 설정
	for (const key in reqParams) {
		if (reqParams.hasOwnProperty(key)) {
			formData.append(key, reqParams[key]);
		}
	}

	loading('show');

	// fetch 요청에 폼 데이터 포함하여 보내기
	fetch(reqAction, {
		method: reqMethod,
		body: formData
	})
	.then(response => {
		if (!response.ok) {
			return response.json().then(errorData => {
				throw new Error("error");
			});
		}

		return response.json();
	})
	.then(data => {
		if ("0000" === data.result_code) {
			if (typeof successCallback === 'function') {
				successCallback();
			}
		} else {
			alert(data.result_msg);

			if (typeof failCallback === 'function') {
				failCallback();
			}
		}
	})
	.catch(error => {
		alert("관리자에게 문의하여 주시기 바랍니다.");
	})
	.finally(() => {
		setTimeout(() => {
			loading('hide');
		}, 1000);
	});
}

// 파일 업로드 화면에서 삭제기능 함수
function fnCmmChangeFileHadler(options) {
	const reqFormId = options.formId;
	const reqHiddenName = options.hiddenName;
	const reqFileObj = options.fileObj;
	const reqFileIdx = options.fileIdx;

	let form = document.getElementById(reqFormId);
	let hiddenField = form.querySelector('input[name="' + reqHiddenName + '"]');

	if ("" !== fnToNotNull($(reqFileObj).val()) || reqFileObj === undefined || reqFileObj === null) {
		let addFlag = false;
		const hiddenCheck = document.querySelectorAll('input[name="' + reqHiddenName + '"]');

		if (hiddenCheck.length === 0) {
			addFlag = true;
		} else {
			let duplCnt = 0;

			hiddenCheck.forEach(function(hidden) {
				if (hidden.value === reqFileIdx) {
					duplCnt++;
				}
			});

			if (duplCnt === 0) {
				addFlag = true;
			}
		}

		if (addFlag) {
			hiddenField = document.createElement("input");
			hiddenField.setAttribute("type", "hidden");
			hiddenField.setAttribute("name", reqHiddenName);
			form.appendChild(hiddenField);

			hiddenField.setAttribute("value", reqFileIdx);
		}
	}

	/*const hiddenCheck2 = document.querySelectorAll('input[name="del_file_idx"]');

    hiddenCheck2.forEach(function(hidden2) {
        console.log(hidden2.value);
    });*/
}

function fnCmmResetDocumentValues(formId) {
	let element = document.getElementById(formId) === null ? document : document.getElementById(formId);
	const inputs = element.querySelectorAll('input:not([type="hidden"])'); // 모든 input 요소를 가져옴 (hidden 제외)
	const selects = element.querySelectorAll('select'); // 모든 select 요소를 가져옴
	const radios = element.querySelectorAll('input[type="radio"]');
	const groupNames = new Set(); // 중복되지 않은 라디오 그룹 이름을 저장하기 위한 Set

	// input 값 초기화
	inputs.forEach(function(input) {
		switch(input.type) {
			case "text":
				// 빈값으로 설정하거나 원하는 값으로 설정
				input.value = "";
				break;
			case "tel":
				// 빈값으로 설정하거나 원하는 값으로 설정
				input.value = "";
				break;
			case "password":
				// 빈값으로 설정하거나 원하는 값으로 설정
				input.value = "";
				break;
			case "checkbox":
				// 체크박스 설정
				if (this.id !== "historyUse") {
					const event = new Event('change', {bubbles: true});

					input.checked = false;
					input.dispatchEvent(event)
				}
				break;
		}
	});

	// 모든 라디오 버튼을 순회하며 그룹 이름을 Set에 추가합니다.
	radios.forEach(radio => {
		groupNames.add(radio.name);
	});

	// 각 그룹의 첫 번째 라디오 버튼을 클릭하여 선택
	groupNames.forEach(groupName => {
		const firstRadioInGroup = document.querySelector(`input[type="radio"][name="` + groupName + `"]`);

		if (firstRadioInGroup) {
			firstRadioInGroup.click();
		}
	});

	// selectbox 초기화
	selects.forEach(function(select) {
		if (select.name !== 'searchMbst2') { // 공통페이지에 정의된 해당값은 예외처리
			const event = new Event('change', {bubbles: true});

			select.selectedIndex = 0; // 첫 번째 옵션으로 설정
			select.dispatchEvent(event);
		}
	});
}

// 결제정보 값 설정
function fnCmmInitWebpayForm(options, callback) {
	try {
		// 해당 id를 가진 폼 요소가 이미 있는지 확인
		const reqFormId = options.formId;
		const reqParams = options.params;
		const reqEncodeFields = options.encodeFields;

		// PG 허용제한 특수문자 8개 -> & ; \n \ | ' " ,
		const excludeChars = "[&;,\\n\\\\|'\",]";

		// 폼 설정
		let form = document.getElementById(reqFormId);
		//const korRegex = /[가-힣]/;

		for (const key in reqParams) {
			if (reqParams.hasOwnProperty(key)) {
				let hiddenField = form.querySelector('input[name="' + key + '"]');
				let hiddenValue = "";
				const isEncoded = reqEncodeFields.includes(key);

				if (hiddenField) {
					console.log(key + " = " + isEncoded);
					if (isEncoded) {
						hiddenValue = encodeURIComponent(fnCmmSanitizeValue(reqParams[key], excludeChars));
					} else {
						hiddenValue = fnCmmSanitizeValue(reqParams[key], excludeChars)
					}
					console.log(hiddenField);
					hiddenField.setAttribute("value", hiddenValue);
				}
			}
		}

		if (typeof callback === 'function') {
			callback();
		}
	} catch (e) {
		console.error(e);
	}
}

// 불필요한 값 제거함수
function fnCmmSanitizeValue(inputValue, excludeChars) {
	if ("" === fnToNotNull(inputValue)) {
		return "";
	}

	excludeChars = excludeChars || "[&;,\\n\\\\|'\",]";

	const regex = new RegExp(excludeChars, "g");

	return inputValue.replace(regex, "");
}

// 디코딩하는 함수
function fnCmmUriDecode(reqForm, reqEncodedFields) {
	console.log(reqEncodedFields);
	reqEncodedFields.forEach((field) => {
		const input = reqForm.querySelector('input[name="' + field + '"]');

		if (input) {
			input.value = decodeURIComponent(input.value);
		}

		console.log(input.value);
	});
}

function fnCmmGetDeviceType() {
    const userAgent = navigator.userAgent.toLowerCase();

    if (/mobile|android|iphone|ipod/i.test(userAgent)) {
        return "MOBILE";
    } else if (/tablet|ipad/i.test(userAgent) || (navigator.maxTouchPoints > 1 && /macintosh/.test(userAgent))) {
        return "TABLET";
    } else {
        return "PC";
    }
}