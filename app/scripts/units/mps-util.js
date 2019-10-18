/*******************************************************************************
 *  Source Name:    mps-util.js
 *  Description:    유틸리티
 *  Author:         남종호
 *  Update History:
 *                  2018. 04. 27  남종호 최초 작성
 *
 ******************************************************************************/

MPS_UTIL = {
};

/**
 * 디바이스 타입 조회
 */
MPS_UTIL.getDeviceType = function() {
  return JSON.parse(localStorage.getItem('setting.deviceType'));
};

/**
 * 대상 외 주문 보이기 여부 리턴
 */
MPS_UTIL.getShowOthersOrder = function() {
  return JSON.parse(localStorage.getItem('setting.showOthersOrder'));
};

/**
 * 현재 태블릿의 호기 코드 리턴
 */
MPS_UTIL.getRegionCd = function() {
  return JSON.parse(localStorage.getItem('setting.regionCode'));
};

/**
 * 현재 태블릿의 호기명을 리턴
 */
MPS_UTIL.getRegionNm = function() {
  return JSON.parse(localStorage.getItem('setting.regionName'));
};

/**
 * 현재 태블릿의 조회 범위 존을 리턴
 */
MPS_UTIL.getZoneCd = function() {
  return JSON.parse(localStorage.getItem('setting.zoneCode'));
};

/**
 * 현재 태블릿의 작업 위치를 리턴
 */
MPS_UTIL.getSideCd = function() {
  return JSON.parse(localStorage.getItem('setting.workLocation'));
};

/**
 * 작업 위치를 로컬 스토리지에서 조회
 */
MPS_UTIL.getWorkLoc = function() {
  return JSON.parse(localStorage.getItem('setting.workLocation'));
};

/**
 * 현재 태블릿의 자동피킹 여부를 리턴
 */
MPS_UTIL.getAutoPicking = function() {
  return JSON.parse(localStorage.getItem('setting.autoPicking'));
};

/**
 * 현재 태블릿의 상품코드 전부 보기 여부를 리턴
 */
MPS_UTIL.getShowFullCode = function() {
  return JSON.parse(localStorage.getItem('setting.showFullCode'));
};

/**
 * 표시할 송장 번호 문자열의 시작 인덱스를 리턴
 */
MPS_UTIL.getInvoiceFieldSubstr = function () {
  return parseInt(JSON.parse(localStorage.getItem('setting.invoiceFieldSubstr')));
};

/**
 * 작업 유형 리턴
 */
MPS_UTIL.getJobName = function () {
  return JSON.parse(localStorage.getItem('setting.jobName'));
};

/**
 * 데이터 조회 주기
 */
MPS_UTIL.getRefreshInterval = function() {
  let interval = JSON.parse(localStorage.getItem('setting.kioskInterval'));
  interval = Number(interval) * 1000;
  return interval;
};

/**
 * 현재 키오스크 코드 타입을 리턴
 */
MPS_UTIL.getKioskCodeType = function() {
  return JSON.parse(localStorage.getItem('setting.kioskCodeType'));
};

/**
 * 현재 키오스크 Input 타입을 리턴
 */
MPS_UTIL.getKioskInputType = function() {
  return JSON.parse(localStorage.getItem('setting.kioskInputType'));
};

/**
 * 현재 키오스크 프린트 아이디 리턴
 */
MPS_UTIL.getKioskPrinterId = function() {
  return JSON.parse(localStorage.getItem('setting.kioskPrinterId'));
};

/**
 * 브로커 사이트 조회
 */
MPS_UTIL.getBrokerSiteCd = function() {
  return localStorage.getItem('setting.brokerSite');
};

/**
 * 브로커 주소 조회
 */
MPS_UTIL.getBrokerAddress = function() {
  return localStorage.getItem('setting.brokerAddress');
};

/**
 * 브로커 포트 조회
 */
MPS_UTIL.getBrokerPort = function () {
  return localStorage.getItem('setting.brokerPort');
};

/**
 * 연속 스캔 허용 여부 조회
 */
MPS_UTIL.isContinousScanAllowed = function () {
  let continousScanAllowed = localStorage.getItem('setting.continousScanAllowed');
  return continousScanAllowed === null ? false : continousScanAllowed;
};

/**
 * Warning 팝업 표시
 ******************
 * @param {String} title
 * @param {String} message
 * @param {Function} confirmCallback
 */
MPS_UTIL.showMessage = function(title, message, confirmCallback) {
  openAlert({
    title: title,
    message: message,
    confirmCallback: confirmCallback
  });
};

/**
 * Warning 팝업 표시
 ******************
 * @param {String} title
 * @param {String} message
 * @param {Function} confirmCallback
 */
MPS_UTIL.showConfirm = function(title, message, cancelCallback, confirmCallback) {
  openConfirm({
    title: title,
    message: message,
    cancelCallback: cancelCallback,
    confirmCallback: confirmCallback
  });
};

/**
 * 설정이 비어있는 경우 핸들러
 */
MPS_UTIL.handleRequiredSettingEmpty = function() {
  MPS_UTIL.showMessage('호기 선택', '호기를 선택하세요', function() {
    location.hash = '/mps_setting';
  });
};

/**
 * 설정에 호기 설정이 비어있는 지 체크
 */
MPS_UTIL.checkRequiredSettingEmpty = function() {
  if(!MPS_UTIL.getRegionCd()) {
    MPS_UTIL.handleRequiredSettingEmpty();
    return false;
  } else {
    return true;
  }
};

/**
 * 팝업 표시
 ******************
 * @param {String} title 팝업 타이틀
 * @param {Object} popup 팝업
 * @param {String} width 60%
 * @param {String} height 60%
 * @param {Function} openCallback 팝업 오픈 때 실행 될 콜백 함수
 * @param {Function} closeCallback 팝업 닫을 때 실행 될 콜백 함수
 */
MPS_UTIL.showPopup = function(title, popup, width, height, openCallback, closeCallback) {
  document.dispatchEvent(new CustomEvent('open-dialog', {
    detail: {
      content: popup,
      title: title,
      width: width,
      height: height,
      openCallback: () => {
        if(openCallback && typeof(openCallback) == 'function') {
          openCallback();
        }
      },
      closeCallback: () => {
        if(closeCallback && typeof(closeCallback) == 'function') {
          closeCallback(event.detail);
        }
      }
    }
  }));
};

/**
 * 현재 작업 위치 변경시
 ******************
 * @param {String} sideCd
 * @param {String} screen
 */
MPS_UTIL.setSideCd = function(sideCd, screen) {
  if(!sideCd) sideCd = 'F';

  screen.showFront = false;
  screen.showRear = false;
  screen.showTotal = false;

  if (sideCd === 'F' || sideCd === 'ALL' || sideCd === 'f' || sideCd === 'all') {
    screen.showFront = true;
  }

  if (sideCd === 'R' || sideCd === 'ALL' || sideCd === 'r' || sideCd === 'all') {
    screen.showRear = true;
  }

  if(sideCd === 'T') {
    screen.showTotal = true;
  }
};

/**
 * 다국어 처리된 완료 상태 값
 ******************
 */
MPS_UTIL.getFinishedStatusName = function() {
  return t('label.finished');
};

/**
 * 다국어 처리된 미완료 상태 값
 ******************
 */
MPS_UTIL.getUnfinishedStatusName = function() {
  return t('label.unfinished');
};

/**
 * items의 내용 중에 left_qty가 0인 항목이 아래로 가도록 소팅
 ******************
 * @param items
 */
MPS_UTIL.sortByLeftQty = function(items) {
  items.sort(function(a, b) {
    if(a.left_qty == b.left_qty) return 0;
    else if(a.left_qty > 0 && b.left_qty == 0) return -1;
    else return 1;
  });

  return items;
};
