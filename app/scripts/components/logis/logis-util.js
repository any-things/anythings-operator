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
 * @description 디바이스 타입 조회
 *******************
 */
LOGIS_UTIL.getDeviceType = function() {
  return JSON.parse(localStorage.getItem('setting.deviceType'));
};

/**
 * @description 대상 외 주문 보이기 여부 리턴
 ********************
 */
LOGIS_UTIL.getShowOthersOrder = function() {
  return JSON.parse(localStorage.getItem('setting.showOthersOrder'));
};

/**
 * @description 현재 설정에서 선택한 설비 유형 리턴
 ********************
 */
LOGIS_UTIL.getEquipType = function() {
  return JSON.parse(localStorage.getItem('setting.equipType'));
};

/**
 * @description 현재 설정에서 선택한 설비 코드를 리턴
 ********************
 */
LOGIS_UTIL.getEquipCd = function() {
  return JSON.parse(localStorage.getItem('setting.equipCd'));
};

/**
 * @description 현재 설정에서 선택한 설비 이름을 리턴
 ********************
 */
LOGIS_UTIL.getEquipNm = function() {
  return JSON.parse(localStorage.getItem('setting.equipNm'));
};

/**
 * @description 현재 설정에서 선택한 스테이지 코드를 리턴 
 ********************
 */
LOGIS_UTIL.getStageCd = function() {
  return JSON.parse(localStorage.getItem('setting.stageCd'));
};

/**
 * @description 현재 설정에서 선택한 작업 스테이션을 리턴
 ********************
 */
LOGIS_UTIL.getStationCd = function() {
  return JSON.parse(localStorage.getItem('setting.stationCd'));
};

/**
 * @description 현재 설정에서 선택한 작업 사이드를 리턴
 ********************
 */
LOGIS_UTIL.getWorkSideCd = function() {
  return JSON.parse(localStorage.getItem('setting.workSideCd'));
};

/**
 * @description 현재 태블릿의 자동피킹 여부를 리턴
 ********************
 */
LOGIS_UTIL.getAutoPicking = function() {
  return JSON.parse(localStorage.getItem('setting.autoPicking'));
};

/**
 * @description 현재 태블릿의 상품코드 전부 보기 여부를 리턴
 ********************
 */
LOGIS_UTIL.getShowFullCode = function() {
  return JSON.parse(localStorage.getItem('setting.showFullCode'));
};

/**
 * @description 표시할 송장 번호 문자열의 시작 인덱스를 리턴
 ********************
 */
LOGIS_UTIL.getInvoiceFieldSubstr = function() {
  return parseInt(JSON.parse(localStorage.getItem('setting.invoiceFieldSubstr')));
};

/**
 * @description 작업 유형 리턴
 ********************
 */
LOGIS_UTIL.getJobType = function() {
  return JSON.parse(localStorage.getItem('setting.jobType'));
};

/**
 * @description 화면에서 데이터 리프레쉬 주기
 ********************
 */
LOGIS_UTIL.getRefreshInterval = function() {
  let interval = JSON.parse(localStorage.getItem('setting.refreshInterval'));
  interval = Number(interval) * 1000;
  return interval;
};

/**
 * @description 사용하는 바코드 유형을 리턴
 ********************
 */
LOGIS_UTIL.getBarcodeType = function() {
  return JSON.parse(localStorage.getItem('setting.barcodeType'));
};

/**
 * @description B2C 투입 박스 유형
 ********************
 */
LOGIS_UTIL.getB2CInputBoxType = function() {
  return JSON.parse(localStorage.getItem('setting.b2cKioskInputType'));
};

/**
 * @description 사용할 프린터 아이디 리턴
 ********************
 */
LOGIS_UTIL.getPrinterId = function() {
  return JSON.parse(localStorage.getItem('setting.printerId'));
};

/**
 * @description 메시지 브로커의 사이트 코드 조회
 ********************
 */
LOGIS_UTIL.getBrokerSiteCd = function() {
  return localStorage.getItem('setting.brokerSite');
};

/**
 * @description 메시지 브로커 주소 조회
 ********************
 */
LOGIS_UTIL.getBrokerAddress = function() {
  return localStorage.getItem('setting.brokerAddress');
};

/**
 * @description 메시지 브로커 포트 조회
 ********************
 */
LOGIS_UTIL.getBrokerPort = function() {
  return localStorage.getItem('setting.brokerPort');
};

/**
 * @description 연속 스캔 허용 여부 조회
 ********************
 */
LOGIS_UTIL.isContinousScanAllowed = function() {
  let continousScanAllowed = localStorage.getItem('setting.continousScanAllowed');
  return continousScanAllowed === null ? false : continousScanAllowed;
};

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
 * @description 설정이 비어있는 경우 핸들러
 ********************
 */
LOGIS_UTIL.handleRequiredSettingEmpty = function() {
  LOGIS_UTIL.showMessage(t('text.selecting_rack'), t('text.select_rack'), function() {
    location.hash = '/logis_setting';
  });
};

/**
 * @description 설정에 랙 설정이 비어있는 지 체크
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
 * @description 다국어 처리된 완료 상태 값
 ******************
 */
LOGIS_UTIL.getFinishedStatusName = function() {
  return t('label.finished');
};

/**
 * @description 다국어 처리된 미완료 상태 값
 ******************
 */
LOGIS_UTIL.getUnfinishedStatusName = function() {
  return t('label.unfinished');
};

/**
 * @description items의 내용 중에 left_qty가 0인 항목이 아래로 가도록 소팅
 ******************
 * @param items
 */
LOGIS_UTIL.sortByLeftQty = function(items) {
  items.sort(function(a, b) {
    if (a.left_qty == b.left_qty) return 0;
    else if (a.left_qty > 0 && b.left_qty == 0) return -1;
    else return 1;
  });

  return items;
};