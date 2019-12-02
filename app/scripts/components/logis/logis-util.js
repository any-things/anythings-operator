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
LOGIS_UTIL.getInvoiceFieldSubstr = function() {
  let invFieldSubstrIdx = LOGIS_UTIL.getLocalStorage('setting.invoiceFieldSubstr');
  return invFieldSubstrIdx ? parseInt(invFieldSubstrIdx) : -1;
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

/**
 * @description 연속 스캔 허용 여부 조회
 ********************
 * @return 연속 스캔 허용 여부
 */
LOGIS_UTIL.isContinousScanAllowed = function() {
  let continousScanAllowed = LOGIS_UTIL.getLocalStorage('setting.continousScanAllowed');
  return continousScanAllowed === null ? false : continousScanAllowed;
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
 * @description items의 내용 중에 left_qty가 0인 항목이 아래로 가도록 소팅
 ******************
 * @param items
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