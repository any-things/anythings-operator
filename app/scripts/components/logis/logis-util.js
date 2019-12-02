/*******************************************************************************
 *  Source Name:    logis-util.js
 *  Description:    유틸리티
 *  Author:         남종호
 *  Update History:
 *                  2019. 10. 18  남종호 최초 작성
 *
 ******************************************************************************/

LOGIS_UTIL = {};

/**
 * @description key로 로컬 스토리지에서 뽑아냄
 *******************************
 * @param {String} key
 * @return 로컬 스토리지 값
 */
LOGIS_UTIL.getLocalStorage = function(key) {
  return JSON.parse(localStorage.getItem(key));
};

/**
 * @description 로컬 스토리지에서 key, value로 저장
 *******************************
 * @param {String} key
 * @param {String} value
 */
LOGIS_UTIL.setLocalStorage = function(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
};

/*******************************************************************************
 *                        장비에서 설정한 내용을 조회
 ******************************************************************************/

/**
 * @description 디바이스 타입 조회
 *******************
 * @return 디바이스 타입
 */
LOGIS_UTIL.getDeviceType = function() {
  return LOGIS_UTIL.getLocalStorage('setting.deviceType');
};

/**
 * @description 현재 설정에서 선택한 설비 유형 리턴
 ********************
 * @return 설비 유형
 */
LOGIS_UTIL.getEquipType = function() {
  return LOGIS_UTIL.getLocalStorage('setting.equipType');
};

/**
 * @description 현재 설정에서 선택한 설비 코드를 리턴
 ********************
 * @return 설비 코드
 */
LOGIS_UTIL.getEquipCd = function() {
  return LOGIS_UTIL.getLocalStorage('setting.equipCd');
};

/**
 * @description 현재 설정에서 선택한 설비 이름을 리턴
 ********************
 * @return 설비 이름
 */
LOGIS_UTIL.getEquipNm = function() {
  return LOGIS_UTIL.getLocalStorage('setting.equipNm');
};

/**
 * @description 현재 설정에서 선택한 스테이지 코드를 리턴 
 ********************
 * @return 스테이지 코드
 */
LOGIS_UTIL.getStageCd = function() {
  return LOGIS_UTIL.getLocalStorage('setting.stageCd');
};

/**
 * @description 현재 설정에서 선택한 작업 스테이션을 리턴
 ********************
 * @return 스테이션 코드
 */
LOGIS_UTIL.getStationCd = function() {
  return LOGIS_UTIL.getLocalStorage('setting.stationCd');
};

/**
 * @description 현재 설정에서 선택한 작업 사이드를 리턴
 ********************
 * @return 작업 사이드 코드
 */
LOGIS_UTIL.getWorkSideCd = function() {
  return LOGIS_UTIL.getLocalStorage('setting.workSideCd');
};

/**
 * @description 작업 유형 리턴
 ********************
 * @return 작업 유형
 */
LOGIS_UTIL.getJobType = function() {
  return LOGIS_UTIL.getLocalStorage('setting.jobType');
};

/*******************************************************************************
 *                        서버에서 장비에 대해서 설정한 내용을 조회
 ******************************************************************************/

// TODO 서버 사이드에서 정의한 모든 장비 설정 항목에 대한 API 정의 필요 ...
/**
etc	    display.invoice.shorter.enabled	송장 번호가 길어서 잘라서 표시할 지 여부	true
etc	    display.invoice.shorter.start.index	송장 번호를 잘라서 표시하는 경우 앞 몇 자리를 스킵할지 (숫자)	8
etc	    display.sku.shorter.enabled	상품 코드가 길어서 잘라서 표시할 지 여부	true
etc	    display.sku.shorter.start.index	상품 코드를 잘라서 표시하는 경우 앞 몇 자리를 스킵할지 (숫자)	9
ind	    indicator.inspection.enabled	표시기를 이용한 검수 기능 활성화 여부	true
ind	    indicator.reright.enabled	표시기 재점등 기능 활성화 여부	true
job	    job.inputbox.type	투입 박스 유형 - 박스(ID는 Unique) / 트레이 (재사용 박스, ID는 Non-Unique) (DPS)	box
job	    job.show.other.orders	설정된 작업 스테이션에 작업이 없는 경우 화면에 박스를 보여줄 지 여부 (DPS)	true
job	    job.split.fullbox.enabled	분할 Fullbox 기능 활성화 여부 (반품)	true
job	    job.transaction.enabled	작업 화면에서 작업 옵션 선택 기능 활성화 여부	true
job	    job.transaction.functions	작업 화면에서 분류 처리 할 수 있는 처리 옵션 [확정(P), 취소(C), 확정 취소(U), 수량 조절(S), Fullbox(F), Fullbox 취소(FC)	P,U,S,F
etc	    pagination.page.limit	페이지네이션 기능 시 한 페이지에 보여줄 레코드 수	50
etc	    rack.side.selection.enabled	작업 위치 앞/뒤/전체 선택 기능 활성화 여부	true
etc	    scanner.bluetooth.enabled	블루투스 스캐너 사용 활성화 여부	true
etc	    scanner.continuous.scan.enabled	연속 스캔 허용 여부 (반품)	true
etc	    screen.refresh.interval	화면 새로고침시 새로고침 주기 (초)	30
etc	    software.version	장비 소프트웨어 버전	1.0.0
validation	validation.box_barcd.rule	박스 바코드 Validation Rule - 박스 바코드 Validation을 화면에서 처리하는 경우 Validation Rule	
validation	validation.box_barcd.screen.enabled	박스 바코드 Validation을 화면에서 처리할 지 여부 - false인 경우 서버에서 Validation 처리	true
validation	validation.cell_cd.rule	셀 코드 Validation Rule - 셀 코드 Validation을 화면에서 처리하는 경우 Validation Rule	
validation	validation.cell_cd.screen.enabled	셀 코드 Validation을 화면에서 처리할 지 여부 - false인 경우 서버에서 Validation 처리	true
validation	validation.chute_cd.rule	슈트 번호 Validation Rule - 셀 코드 Validation을 화면에서 처리하는 경우 Validation Rule	
validation	validation.chute_cd.screen.enabled	슈트 번호 Validation을 화면에서 처리할 지 여부 - false인 경우 서버에서 Validation 처리	true
validation	validation.ind_cd.rule	표시기 코드 Validation Rule - 셀 코드 Validation을 화면에서 처리하는 경우 Validation Rule	
validation	validation.ind_cd.screen.enabled	표시기 코드 Validation을 화면에서 처리할 지 여부 - false인 경우 서버에서 Validation 처리	true
validation	validation.rack_cd.rule	랙 코드 Validation Rule - 랙 코드 Validation을 화면에서 처리하는 경우 Validation Rule	
validation	validation.rack_cd.screen.enabled	랙 코드 Validation을 화면에서 처리할 지 여부 - false인 경우 서버에서 Validation 처리	true
validation	validation.sku_barcd.rule	상품 바코드 Validation Rule - 상품 코드 Validation을 화면에서 처리하는 경우 Validation Rule	
validation	validation.sku_barcd.screen.enabled	상품 바코드 Validation을 화면에서 처리할 지 여부 - false인 경우 서버에서 Validation 처리	true
validation	validation.sku_cd.rule	상품 코드 Validation Rule - 상품 코드 Validation을 화면에서 처리하는 경우 Validation Rule	
validation	validation.sku_cd.screen.enabled	상품 코드 Validation을 화면에서 처리할 지 여부 - false인 경우 서버에서 Validation 처리	true
 */

/**
 * @description 디바이스 설정 리스트 조회
 *******************
 * @return 디바이스 설정 리스트
 */
LOGIS_UTIL.getDeviceSettings = function() {
  return LOGIS_UTIL.getLocalStorage('setting.deviceSettings');
};

/**
 * @description 작업 스테이션 내 대상 외 주문 정보 표시 여부 리턴 (DPS 유형 설정)
 ********************
 * @return 작업 스테이션 내 대상 외 주문 정보 표시 여부
 */
LOGIS_UTIL.getShowOthersOrder = function() {
  return LOGIS_UTIL.getLocalStorage('setting.showOthersOrder');
};

/**
 * @description 현재 태블릿의 자동피킹 여부를 리턴 (DPS 유형 설정)
 ********************
 * @return 자동 피킹 
 */
LOGIS_UTIL.getAutoPicking = function() {
  return LOGIS_UTIL.getLocalStorage('setting.autoPicking');
};

/**
 * @description 현재 태블릿의 상품 코드 전부 보기 여부를 리턴
 ********************
 * @return 상품 Full로 표시할 지 여부
 */
LOGIS_UTIL.getShowFullCode = function() {
  return LOGIS_UTIL.getLocalStorage('setting.showFullCode');
};

/**
 * @description 표시할 송장 번호 문자열의 시작 인덱스를 리턴
 ********************
 * @return 표시할 송장 번호 문자열의 시작 인덱스
 */
LOGIS_UTIL.getInvoiceNoStartIndex = function() {
  let invNoStartIdx = LOGIS_UTIL.getLocalStorage('setting.invoiceFieldSubstr');
  return invNoStartIdx ? parseInt(invNoStartIdx) : -1;
};

/**
 * @description 화면에서 데이터 리프레쉬 주기
 ********************
 * @return 데이터 리프레쉬 주기
 */
LOGIS_UTIL.getRefreshInterval = function() {
  let interval = LOGIS_UTIL.getLocalStorage('setting.refreshInterval');
  return (interval && !isNaN(interval)) ? Number(interval) * 1000 : 30 * 1000;
};

/**
 * @description 사용하는 바코드 유형을 리턴
 ********************
 * @return 바코드 유형
 */
LOGIS_UTIL.getBarcodeType = function() {
  return LOGIS_UTIL.getLocalStorage('setting.barcodeType');
};

/**
 * @description B2C 투입 박스 유형
 ********************
 * @return 투입 박스 유형
 */
LOGIS_UTIL.getB2CInputBoxType = function() {
  return LOGIS_UTIL.getLocalStorage('setting.b2cKioskInputType');
};

/**
 * @description 사용할 프린터 아이디 리턴
 ********************
 * @return 사용할 프린터 아이디
 */
LOGIS_UTIL.getPrinterId = function() {
  return LOGIS_UTIL.getLocalStorage('setting.printerId');
};


/**
 * @description 연속 스캔 허용 여부 조회 (반품 설정)
 ********************
 * @return 연속 스캔 허용 여부
 */
LOGIS_UTIL.isContinousScanAllowed = function() {
  let continousScanAllowed = LOGIS_UTIL.getLocalStorage('setting.continousScanAllowed');
  return continousScanAllowed === null ? false : continousScanAllowed;
};

/**
 * @description 메시지 브로커의 사이트 코드 조회
 ********************
 * @return 메시지 브로커의 사이트 코드
 */
LOGIS_UTIL.getBrokerSiteCd = function() {
  return LOGIS_UTIL.getLocalStorage('setting.brokerSite');
};

/**
 * @description 메시지 브로커 주소 조회
 ********************
 * @return 메시지 브로커의 주소
 */
LOGIS_UTIL.getBrokerAddress = function() {
  return LOGIS_UTIL.getLocalStorage('setting.brokerAddress');
};

/**
 * @description 메시지 브로커 포트 조회
 ********************
 * @return 메시지 브로커 포트
 */
LOGIS_UTIL.getBrokerPort = function() {
  return LOGIS_UTIL.getLocalStorage('setting.brokerPort');
};

/*******************************************************************************
 *                                  유틸리티 함수
 ******************************************************************************/

/**
 * @description Warning 팝업 표시
 ******************
 * @param {String} title
 * @param {String} message
 * @param {Function} confirmCallback
 */
LOGIS_UTIL.showMessage = function(title, message, confirmCallback) {
  openAlert({
    title: title,
    message: message,
    confirmCallback: confirmCallback
  });
};

/**
 * @description Warning 팝업 표시
 ******************
 * @param {String} title
 * @param {String} message
 * @param {Function} confirmCallback
 */
LOGIS_UTIL.showConfirm = function(title, message, cancelCallback, confirmCallback) {
  openConfirm({
    title: title,
    message: message,
    cancelCallback: cancelCallback,
    confirmCallback: confirmCallback
  });
};

/**
 * @description 설비 설정이 비어있는 경우 핸들러
 ********************
 */
LOGIS_UTIL.handleRequiredSettingEmpty = function() {
  LOGIS_UTIL.showMessage(t('text.selecting_equipment'), t('text.select_equipment'), function() {
    location.hash = '/logis_setting';
  });
};

/**
 * @description 설정에 설비 설정이 비어있는 지 체크
 ********************
 */
LOGIS_UTIL.checkRequiredSettingEmpty = function() {
  if (!LOGIS_UTIL.getEquipCd()) {
    LOGIS_UTIL.handleRequiredSettingEmpty();
    return false;
  } else {
    return true;
  }
};

/**
 * @description 팝업 표시
 ******************
 * @param {String} title 팝업 타이틀
 * @param {Object} popup 팝업
 * @param {String} width 60%
 * @param {String} height 60%
 * @param {Function} openCallback 팝업 오픈 때 실행 될 콜백 함수
 * @param {Function} closeCallback 팝업 닫을 때 실행 될 콜백 함수
 */
LOGIS_UTIL.showPopup = function(title, popup, width, height, openCallback, closeCallback) {
  document.dispatchEvent(new CustomEvent('open-dialog', {
    detail: {
      content: popup,
      title: title,
      width: width,
      height: height,
      openCallback: () => {
        if (openCallback && typeof(openCallback) == 'function') {
          openCallback();
        }
      },
      closeCallback: () => {
        if (closeCallback && typeof(closeCallback) == 'function') {
          closeCallback(event.detail);
        }
      }
    }
  }));
};

/**
 * @description 팝업 닫기
 ******************
 */
LOGIS_UTIL.closePopup = function(event) {
  document.dispatchEvent(new CustomEvent('close-dialog', event ? event : {}));
}

/**
 * @description 현재 작업 위치 변경시
 ******************
 * @param {String} workSideCd
 * @param {String} screen
 */
LOGIS_UTIL.setWorkSide = function(workSideCd, screen) {
  if (!workSideCd) {
    workSideCd = 'F';
  }

  screen.showFront = false;
  screen.showRear = false;
  screen.showTotal = false;

  if (workSideCd === 'F' || workSideCd === 'ALL' || workSideCd === 'f' || workSideCd === 'all') {
    screen.showFront = true;
  }

  if (workSideCd === 'R' || workSideCd === 'ALL' || workSideCd === 'r' || workSideCd === 'all') {
    screen.showRear = true;
  }

  if (workSideCd === 'T') {
    screen.showTotal = true;
  }
};

/**
 * @description 알림성 토스트 메시지 출력
 ******************
 * @param message
 */
LOGIS_UTIL.showToastInfoMessage = function(message) {
  LOGIS_UTIL.showToastMessage('info', message);
};

/**
 * @description 경고성 토스트 메시지 출력
 ******************
 * @param message
 */
LOGIS_UTIL.showToastWarnMessage = function(message) {
  LOGIS_UTIL.showToastMessage('warn', message);
};

/**
 * @description 오류성 토스트 메시지 출력
 ******************
 * @param message
 */
LOGIS_UTIL.showToastErrorMessage = function(message) {
  LOGIS_UTIL.showToastMessage('error', message);
};

/**
 * @description 토스트 메시지 출력
 ******************
 * @param message
 */
LOGIS_UTIL.showToastMessage = function(type, message) {
  document.dispatchEvent(new CustomEvent('show-toast', {
    detail: {
      type: type ? type : 'info',
      message: message
    }
  }));
};

/**
 * @description items의 내용 중에 left_qty가 0인 항목이 아래로 가도록 소팅
 ******************
 * @param {Array} items
 * @return {Array}
 */
LOGIS_UTIL.sortByLeftQty = function(items) {
  items.sort(function(a, b) {
    if (a.left_qty == b.left_qty) {
      return 0;
    } else if (a.left_qty > 0 && b.left_qty == 0) {
      return -1;
    } else {
      return 1;
    }
  });

  return items;
};

/**
 * @description 콤보 박스의 선택된 값을 리턴 
 ******************
 * @param {Object} combo
 * @param {String} defaultValue
 * @return {String}
 */
LOGIS_UTIL.getComboSelectValue = function(combo, defaultValue) {
  defaultValue = defaultValue ? defaultValue : null;
  if (!combo) {
    return defaultValue;
  } else {
    return combo.selectedOptions[0] ? combo.selectedOptions[0].value : defaultValue;
  }
};

/**
 * @description 콤보 박스의 선택된 텍스트를 리턴 
 ******************
 * @param {Object} combo
 * @param {String} defaultValue
 * @return {String}
 */
LOGIS_UTIL.getComboSelectText = function(combo, defaultValue) {
  defaultValue = defaultValue ? defaultValue : null;
  if (!combo) {
    return defaultValue;
  } else {
    return combo.selectedOptions[0] ? combo.selectedOptions[0].innerText : defaultValue;
  }
};