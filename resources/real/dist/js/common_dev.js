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
	var b = 0;
	var i = 0;
	var c;
	
	while (c = val.charCodeAt(i)) {
		b += c >> 7 ? 3 : 1;
		i++;
	}
	
	resultByte = b;
	
	return resultByte;
}
  
// 바이트 계산
function fnCutByteLen(str, limitByte) {
	var resultStr = "";
	var val = fnToNotNull(str);
	var b = 0;
	var i = 0;
	var c;
	
	while (c = val.charCodeAt(i)) {
		b += c >> 7 ? 3 : 1;
		
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
	var reqValue = options.value;
	var reqName = options.name;
	var reqPatternKeyword = fnToNotNull(options.patternKeyword).toLowerCase();
	var reqPattern = fnToNotNull(options.pattern);
	var reqMessage = fnToNotNull(options.message, "입력값이 잘못되었습니다");
	var reqRequired = options.required;
	var isValidate;

	// 패턴 초기화
	var pattern = "";

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
			box_alert(reqName + "을(를) 입력해주세요.", 'info');
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
		if ("" !== reqMessage) {
			box_alert(reqMessage, 'info');
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
		var reqFormId = options.formId;
		var reqParams = options.params;
		var reqMethod = options.method;
		var reqAction = options.action;
		var reqTarget = options.target;

		// 폼 설정
		var form = document.getElementById(reqFormId);

		// 폼이 존재하지 않을 경우
		if (!form) {
			form = document.createElement("form");
			form.id = reqFormId;
		}

		form.setAttribute("method", reqMethod);
		form.setAttribute("action", reqAction);

		if (reqTarget !== undefined) {
			form.setAttribute("target", reqTarget);
		}

		for (var key in reqParams) {
			if (reqParams.hasOwnProperty(key)) {
				var hiddenField = form.querySelector('input[name="' + key + '"]');

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
		console.log(e);
	} finally {
		setTimeout(function() {
			loading('hide');
		}, 2000);
	}
}
  
// 새로고침 제어
function fnCmmHandleRefresh(callback) {
	window.addEventListener('keydown', function(event) {
		var key = event.key ? event.key.toLowerCase() : '';

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
		var length = fnGetByte(value);
		return this.optional(element) || (length >= param[0] && length <= param[1]);
	});

	$.validator.addMethod("regex", function(value, element, regexp) {
		if ("" === value) {
			return true;
		} else {
			var options = {
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
  
// Jquery Validate 히든값 변경에 따른 유효성 검사처리 (MutationObserver IE11 호환 버전)
function fnCmmOnHiddenFieldChange(targetFieldIds) {
	// IE11에서는 forEach를 사용하지 않고 for 루프 사용
	for (var i = 0; i < targetFieldIds.length; i++) {
		var selector = '#' + targetFieldIds[i];
		var hiddenField = document.querySelector(selector);
		
		if (hiddenField) {
			(function(fieldId) {
				var observer = new MutationObserver(function(mutationsList) {
					for (var j = 0; j < mutationsList.length; j++) {
						var mutation = mutationsList[j];
						if (mutation.type === 'attributes' && mutation.attributeName === 'value') {
							$("#" + fieldId).valid();
						}
					}
				});
				
				observer.observe(hiddenField, { attributes: true });
			})(targetFieldIds[i]);
		}
	}
}

// 엑셀 다운로드 (XMLHttpRequest 사용 버전)
function fnCmmDownloadExcel(options) {
	var reqFormId = options.formId;
	var reqMethod = options.method;
	var reqAction = options.action;
	var reqFileName = options.fileName;

	// 폼 설정
	var form = document.getElementById(reqFormId);

	// 폼 데이터를 직렬화
	var formData = new FormData(form);

	// 파일명 추가
	formData.append('cmmExcelFileName', reqFileName);

	loading('show');

	// XMLHttpRequest 사용
	var xhr = new XMLHttpRequest();
	xhr.open(reqMethod, reqAction, true);
	
	xhr.onload = function() {
		if (xhr.status === 200) {
			var blob = xhr.response;
			// IE에서는 msSaveBlob 사용
			if (window.navigator && window.navigator.msSaveOrOpenBlob) {
				window.navigator.msSaveOrOpenBlob(blob, reqFileName);
			} else {
				var link = document.createElement('a');
				link.href = window.URL.createObjectURL(blob);
				link.download = reqFileName;
				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);
			}
		} else {
			try {
				var errorData = JSON.parse(xhr.responseText);
				alert(errorData.result_msg);
			} catch (e) {
				alert("관리자에게 문의하여 주시기 바랍니다.");
			}
		}
		
		setTimeout(function() {
			loading('hide');
		}, 1000);
	};
	
	xhr.onerror = function() {
		alert("관리자에게 문의하여 주시기 바랍니다.");
		setTimeout(function() {
			loading('hide');
		}, 1000);
	};
	
	// 응답 타입을 blob으로 설정
	xhr.responseType = 'blob';
	xhr.send(formData);
}

// 엑셀 업로드 (XMLHttpRequest 사용 버전)
function fnCmmUploadExcel(options, successCallback, failCallback) {
	var reqFormId = options.formId;
	var reqMethod = options.method;
	var reqAction = options.action;

	// 폼 설정
	var form = document.getElementById(reqFormId);

	// 폼 데이터를 직렬화
	var formData = new FormData(form);

	loading('show');

	// XMLHttpRequest 사용
	var xhr = new XMLHttpRequest();
	xhr.open(reqMethod, reqAction, true);
	
	xhr.onload = function() {
		if (xhr.status === 200) {
			try {
				var data = JSON.parse(xhr.responseText);
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
			} catch (e) {
				alert("관리자에게 문의하여 주시기 바랍니다.");
			}
		} else {
			alert("관리자에게 문의하여 주시기 바랍니다.");
			if (typeof failCallback === 'function') {
				failCallback();
			}
		}
		
		setTimeout(function() {
			loading('hide');
		}, 1000);
	};
	
	xhr.onerror = function() {
		alert("관리자에게 문의하여 주시기 바랍니다.");
		setTimeout(function() {
			loading('hide');
		}, 1000);
	};
	
	xhr.send(formData);
}

// 리퀘스트 호출 (XMLHttpRequest 사용 버전)
function fnCmmSendRequest(options, successCallback, failCallback) {
	var reqFormId = options.formId;
	var reqMethod = options.method;
	var reqAction = options.action;
	var reqParams = options.params;

	// 폼 설정
	var form = document.getElementById(reqFormId);

	// 폼 데이터를 직렬화
	var formData = new FormData(form);

	// 추가 파라메터 설정
	for (var key in reqParams) {
		if (reqParams.hasOwnProperty(key)) {
			formData.append(key, reqParams[key]);
		}
	}

	loading('show');

	// XMLHttpRequest 사용
	var xhr = new XMLHttpRequest();
	xhr.open(reqMethod, reqAction, true);
	
	xhr.onload = function() {
		if (xhr.status === 200) {
			try {
				var data = JSON.parse(xhr.responseText);
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
			} catch (e) {
				alert("관리자에게 문의하여 주시기 바랍니다.");
			}
		} else {
			alert("관리자에게 문의하여 주시기 바랍니다.");
			if (typeof failCallback === 'function') {
				failCallback();
			}
		}
		
		setTimeout(function() {
			loading('hide');
		}, 1000);
	};
	
	xhr.onerror = function() {
		alert("관리자에게 문의하여 주시기 바랍니다.");
		setTimeout(function() {
			loading('hide');
		}, 1000);
	};
	
	xhr.send(formData);
}
  
// 파일 업로드 화면에서 삭제기능 함수
function fnCmmChangeFileHadler(options) {
	var reqFormId = options.formId;
	var reqHiddenName = options.hiddenName;
	var reqFileObj = options.fileObj;
	var reqFileIdx = options.fileIdx;

	var form = document.getElementById(reqFormId);
	var hiddenField = form.querySelector('input[name="' + reqHiddenName + '"]');

	if ("" !== fnToNotNull($(reqFileObj).val()) || reqFileObj === undefined || reqFileObj === null) {
		var addFlag = false;
		var hiddenCheck = document.querySelectorAll('input[name="' + reqHiddenName + '"]');

		if (hiddenCheck.length === 0) {
			addFlag = true;
		} else {
			var duplCnt = 0;

			// IE11에서는 forEach를 직접 사용할 수 없으므로 for 루프 사용
			for (var i = 0; i < hiddenCheck.length; i++) {
				if (hiddenCheck[i].value === reqFileIdx) {
					duplCnt++;
				}
			}

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

	for (var j = 0; j < hiddenCheck2.length; j++) {
		console.log(hiddenCheck2[j].value);
	}*/
}
  
function fnCmmResetDocumentValues(formId) {
	var element = document.getElementById(formId) === null ? document : document.getElementById(formId);
	var inputs = element.querySelectorAll('input:not([type="hidden"])'); // 모든 input 요소를 가져옴 (hidden 제외)
	var selects = element.querySelectorAll('select'); // 모든 select 요소를 가져옴
	var radios = element.querySelectorAll('input[type="radio"]');
	
	// IE11에는 Set이 없을 수 있으므로, 객체를 사용해 고유한 그룹 이름을 관리
	var groupNames = {};

	// input 값 초기화
	for (var i = 0; i < inputs.length; i++) {
		var input = inputs[i];
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
					var event = document.createEvent('Event');
					event.initEvent('change', true, true);

					input.checked = false;
					input.dispatchEvent(event);
				}
				break;
		}
	}

	// 모든 라디오 버튼을 순회하며 그룹 이름을 객체에 추가
	for (var j = 0; j < radios.length; j++) {
		groupNames[radios[j].name] = true;
	}

	// 각 그룹의 첫 번째 라디오 버튼을 클릭하여 선택
	for (var groupName in groupNames) {
		if (groupNames.hasOwnProperty(groupName)) {
			var firstRadioInGroup = document.querySelector('input[type="radio"][name="' + groupName + '"]');

			if (firstRadioInGroup) {
				firstRadioInGroup.click();
			}
		}
	}

	// selectbox 초기화
	for (var k = 0; k < selects.length; k++) {
		var select = selects[k];
		if (select.name !== 'searchMbst2') { // 공통페이지에 정의된 해당값은 예외처리
			var selectEvent = document.createEvent('Event');
			selectEvent.initEvent('change', true, true);

			select.selectedIndex = 0; // 첫 번째 옵션으로 설정
			select.dispatchEvent(selectEvent);
		}
	}
}
  
// 결제정보 값 설정
function fnCmmInitWebpayForm(options, callback) {
	try {
		// 해당 id를 가진 폼 요소가 이미 있는지 확인
		var reqFormId = options.formId;
		var reqParams = options.params;
		var reqEncodeFields = options.encodeFields;

		// PG 허용제한 특수문자 8개 -> & ; \n \ | ' " ,
		var excludeChars = "[&;,\\n\\\\|'\",]";

		// 폼 설정
		var form = document.getElementById(reqFormId);

		for (var key in reqParams) {
			if (reqParams.hasOwnProperty(key)) {
				var hiddenField = form.querySelector('input[name="' + key + '"]');
				var hiddenValue = "";
				var isEncoded = false;
				
				// IE11에서는 includes 대신 indexOf 사용
				for (var i = 0; i < reqEncodeFields.length; i++) {
					if (reqEncodeFields[i] === key) {
						isEncoded = true;
						break;
					}
				}

				if (hiddenField) {
					if (isEncoded) {
						hiddenValue = encodeURIComponent(fnCmmSanitizeValue(reqParams[key], excludeChars));
					} else {
						hiddenValue = fnCmmSanitizeValue(reqParams[key], excludeChars);
					}

					hiddenField.setAttribute("value", hiddenValue);
				}
			}
		}

		if (typeof callback === 'function') {
			callback();
		}
	} catch (e) {
		console.log(e);
	}
}
  
// 불필요한 값 제거함수
function fnCmmSanitizeValue(inputValue, excludeChars) {
	if ("" === fnToNotNull(inputValue)) {
		return "";
	}

	excludeChars = excludeChars || "[&;,\\n\\\\|'\",]";

	var regex = new RegExp(excludeChars, "g");

	return inputValue.replace(regex, "");
}
  
// 디코딩하는 함수
function fnCmmUriDecode(reqForm, reqEncodedFields) {
	console.log(reqEncodedFields);
	
	// IE11에서는 forEach를 직접 사용할 수 없으므로 for 루프 사용
	for (var i = 0; i < reqEncodedFields.length; i++) {
		var field = reqEncodedFields[i];
		var input = reqForm.querySelector('input[name="' + field + '"]');

		if (input) {
			input.value = decodeURIComponent(input.value);
		}

		console.log(input.value);
	}
}
  
function fnCmmGetDeviceType() {
	var userAgent = navigator.userAgent.toLowerCase();

	if (/mobile|android|iphone|ipod/i.test(userAgent)) {
		return "MOBILE";
	} else if (/tablet|ipad/i.test(userAgent) || (navigator.maxTouchPoints > 1 && /macintosh/.test(userAgent))) {
		return "TABLET";
	} else {
		return "PC";
	}
}
  
function fnCmmSetNumberFormat(numStr) {
	var regex = /[^0-9]/g; // 숫자가 아닌 문자열을 선택하는 정규식

	if ("" !== fnToNotNull(numStr)) {
		return numStr.replace(regex, "");
	} else {
		return 0;
	}
}