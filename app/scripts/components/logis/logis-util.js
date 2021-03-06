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

/**
 * @description 사용할 프린터 아이디 리턴
 ********************
 * @return 사용할 프린터 아이디
 */
LOGIS_UTIL.getPrinterId = function() {
  return LOGIS_UTIL.getLocalStorage('setting.printerId');
};

/*******************************************************************************
 *                        서버에서 장비에 대해서 설정한 내용을 조회
 ******************************************************************************/

/**
 * @description 디바이스 설정 리스트 조회
 *******************
 * @return 디바이스 설정 리스트
 */
LOGIS_UTIL.getDeviceSettings = function() {
  return LOGIS_UTIL.getLocalStorage('setting.deviceSettings');
};

/**
 * @description 디바이스 설정 리스트에서 설정 값 조회
 ********************
 * @param {String} key 설정 명 
 */
LOGIS_UTIL.getDeviceSettingValue = function(key) {
  let settings = LOGIS_UTIL.getDeviceSettings();

  if (settings) {
    let setting = settings.find(function(setting) {
      return setting.name === key;
    });
    return setting ? setting.value : null;
  } else {
    return null;
  }
};

/**
 * @description 디바이스 설정 리스트에서 Boolean 타입의 설정 값 조회
 ********************
 * @param {String} key 설정 명 
 */
LOGIS_UTIL.getBooleanDeviceSetting = function(key) {
  let value = LOGIS_UTIL.getDeviceSettingValue(key);
  value = value ? value.toLowerCase() : 'false';
  return (value == 'true' || value == 't' || value == 'on') ? true : false;
};

/**
 * @description 디바이스 설정 리스트에서 Number 타입의 설정 값 조회
 ********************
 * @param {String} key 설정 명 
 */
LOGIS_UTIL.getNumberDeviceSetting = function(key) {
  let value = LOGIS_UTIL.getDeviceSettingValue(key);
  return (value && !isNaN(value)) ? Number(value) : 0;
};

/**
 * @description 장비 소프트웨어 버전 (공통 설정)
 ********************
 * @return 작업 스테이션 내 대상 외 주문 정보 표시 여부
 */
LOGIS_UTIL.getDeviceSwVersion = function() {
  return LOGIS_UTIL.getDeviceSettingValue('software.version');
};

/**
 * @description 메시지 브로커의 사이트 코드 조회
 ********************
 * @return 메시지 브로커의 사이트 코드
 */
LOGIS_UTIL.getBrokerSiteCd = function() {
  return LOGIS_UTIL.getDeviceSettingValue('mw.rabbitmq.site.code');
};

/**
 * @description 메시지 브로커 주소 조회
 ********************
 * @return 메시지 브로커의 주소
 */
LOGIS_UTIL.getBrokerAddress = function() {
  return LOGIS_UTIL.getDeviceSettingValue('mw.rabbitmq.broker.address');
};

/**
 * @description 메시지 브로커 포트 조회
 ********************
 * @return 메시지 브로커 포트
 */
LOGIS_UTIL.getBrokerPort = function() {
  return LOGIS_UTIL.getDeviceSettingValue('mw.rabbitmq.web.mqtt.port');
};

/**
 * @description 작업 스테이션 내 대상 외 주문 정보 표시 여부 리턴 (DPS 유형 설정)
 ********************
 * @return 작업 스테이션 내 대상 외 주문 정보 표시 여부
 */
LOGIS_UTIL.isShowOthersOrder = function() {
  return LOGIS_UTIL.getBooleanDeviceSetting('job.show.other.orders');
};

/**
 * @description 투입 박스 유형 (DPS 유형 설정) (box / tray)
 ********************
 * @return 투입 박스 유형
 */
LOGIS_UTIL.getInputBoxType = function() {
  return LOGIS_UTIL.getDeviceSettingValue('job.inputbox.type');
};

/**
 * @description 투입 박스 유형이 박스 유형인지 여부
 ********************
 * @return 박스 유형인 경우
 */
LOGIS_UTIL.isBoxTypeBoxInput = function() {
  return LOGIS_UTIL.getInputBoxType() == 'box';
};

/**
 * @description 투입 박스 유형이 트레이 유형인지 여부
 ********************
 * @return 트레이 유형인 경우
 */
LOGIS_UTIL.isTrayTypeBoxInput = function() {
  return LOGIS_UTIL.getInputBoxType() == 'tray';
};

/**
 * @description 연속 스캔 허용 여부 조회 (반품 설정)
 ********************
 * @return 연속 스캔 허용 여부
 */
LOGIS_UTIL.isContinousScanAllowed = function() {
  return LOGIS_UTIL.getBooleanDeviceSetting('scanner.continuous.scan.enabled');
};

/**
 * @description 화면에서 데이터 리프레쉬 주기
 ********************
 * @return 데이터 리프레쉬 주기
 */
LOGIS_UTIL.getRefreshInterval = function() {
  let interval = LOGIS_UTIL.getNumberDeviceSetting('screen.refresh.interval');
  return (interval == 0) ? 30 * 1000 : interval * 1000;
};

/**
 * @description 태블릿에서 현재 주문을 처리하고 난 후 다음 주문에 대한 선택을 어떻게 할 지에 대한 모드 (auto: 자동 처리 모드, scan: 박스 ID를 스캔하여 다음 주문 처리, touch: 태블릿 터치하여 주문 처리)
 ********************
 * @return 다음 주문 선택 모드 
 */
LOGIS_UTIL.getNextOrderSelectionMode = function() {
  return LOGIS_UTIL.getDeviceSettingValue('job.next.order.selection.mode');
};

/**
 * @description 현재 태블릿의 자동피킹 여부를 리턴 (DPS 유형 설정)
 ********************
 * @return 자동 피킹 
 */
LOGIS_UTIL.isAutoSelectionNextOrder = function() {
  return LOGIS_UTIL.getNextOrderSelectionMode() === 'auto';
};

/**
 * @description 현재 태블릿의 상품 코드를 전부 표시할 지 여부를 리턴 (상품 코드가 길기 때문에 전부 보여줄 지 / 일부만 보여줄 지 여부)
 ********************
 * @return 상품 코드를 전부 표시할 지 여부
 */
LOGIS_UTIL.isShowFullSkuCode = function() {
  return !LOGIS_UTIL.getBooleanDeviceSetting('display.sku.shorter.enabled');
};

/**
 * @description 현재 태블릿의 상품 코드를 일부 표시할 지 여부를 리턴 (상품 코드가 긴 경우 전부 보여줄 지 / 일부만 보여줄 지 여부)
 ********************
 * @return 상품 코드를 일부 표시할 지 여부
 */
LOGIS_UTIL.isShowShortSkuCode = function() {
  return LOGIS_UTIL.getBooleanDeviceSetting('display.sku.shorter.enabled');
};

/**
 * @description 표시할 상품 코드의 시작 인덱스를 리턴
 ********************
 * @return 표시할 상품 코드의 시작 인덱스
 */
LOGIS_UTIL.getSkuCdStartIndex = function() {
  return LOGIS_UTIL.getNumberDeviceSetting('display.sku.shorter.start.index');
};

/**
 * @description 현재 태블릿의 박스 ID를 일부 표시할 지 여부를 리턴 (박스 ID가 긴 경우 전부 보여줄 지 / 일부만 보여줄 지 여부)
 ********************
 * @return 상품 코드를 일부 표시할 지 여부
 */
LOGIS_UTIL.isShowShortBoxId = function() {
  return LOGIS_UTIL.getBooleanDeviceSetting('display.box_id.shorter.enabled');
};

/**
 * @description 현재 태블릿의 송장번호를 일부 표시할 지 여부를 리턴 (송장번호가 긴 경우 전부 보여줄 지 / 일부만 보여줄 지 여부)
 ********************
 * @return 송장번호를 일부 표시할 지 여부
 */
LOGIS_UTIL.isShowShortInvoiceNo = function() {
  return LOGIS_UTIL.getBooleanDeviceSetting('display.invoice.shorter.enabled');
};

/**
 * @description 표시할 송장 번호 문자열의 시작 인덱스를 리턴
 ********************
 * @return 표시할 송장 번호 문자열의 시작 인덱스
 */
LOGIS_UTIL.getInvoiceNoStartIndex = function() {
  return LOGIS_UTIL.getNumberDeviceSetting('display.invoice.shorter.start.index');
};

/**
 * @description 페이지네이션 처리를 위한 페이지 Limit
 ********************
 * @return 페이지네이션 처리를 위한 페이지 Limit
 */
LOGIS_UTIL.getPageLimit = function() {
  let limit = LOGIS_UTIL.getNumberDeviceSetting('pagination.page.limit');
  return limit > 0 ? limit : 50;
};

/**
 * @description 태블릿에서 블루투스 스캐너를 사용할 지 여부
 ********************
 * @return 태블릿에서 블루투스 스캐너를 사용할 지 여부
 */
LOGIS_UTIL.isUseBloothScanner = function() {
  return LOGIS_UTIL.getBooleanDeviceSetting('scanner.bluetooth.enabled');
};

/**
 * @description 작업 위치 (앞/뒤/전체) 선택 기능 활성화 여부
 ********************
 * @return 작업 위치 (앞/뒤/전체) 선택 기능 활성화 여부
 */
LOGIS_UTIL.isWorkSideEnabled = function() {
  return LOGIS_UTIL.getBooleanDeviceSetting('work.side.selection.enabled');
};

/**
 * @description 분할 Fullbox 기능 활성화 여부 (반품)
 ********************
 * @return 분할 Fullbox 기능 활성화 여부
 */
LOGIS_UTIL.isSplitFullboxEnabled = function() {
  return LOGIS_UTIL.getBooleanDeviceSetting('job.split.fullbox.enabled');
};

/**
 * @description 작업 화면에서 작업 옵션 선택 기능 활성화 여부
 ********************
 * @return 작업 화면에서 작업 옵션 선택 기능 활성화 여부
 */
LOGIS_UTIL.isJobTransactionPopupEnabled = function() {
  return LOGIS_UTIL.getBooleanDeviceSetting('job.transaction.enabled');
};

/**
 * @description 작업 화면에서 분류 처리 할 수 있는 처리 옵션 - [확정(P), 취소(C), 확정 취소(U), 수량 조절(S), Fullbox(F), Fullbox 취소(FC)
 ********************
 * @return 작업 화면에서 분류 처리 할 수 있는 처리 옵션
 */
LOGIS_UTIL.getJobTransactionList = function() {
  let functions = LOGIS_UTIL.getDeviceSettingValue('job.transaction.functions');
  return functions.split(',');
};

/**
 * @description 태블릿 피킹 화면에서 하단 투입 리스트의 방향을 설정하기 위한 작업 동선 방향 정보
 ********************
 * @return 작업 화면에서 분류 처리 할 수 있는 처리 옵션
 */
LOGIS_UTIL.getWorkFlowDirection = function() {
  return LOGIS_UTIL.getDeviceSettingValue('job.work.flow.direction');
};

/**
 * @description 테스트를 위해서 QR Code를 생성하기 위한 유형을 리턴
 ********************
 * @return 바코드 유형
 */
LOGIS_UTIL.getQrGenerateSourceType = function() {
  return LOGIS_UTIL.getDeviceSettingValue('qrcode.generate.source.type');
};

/**
 * @description 박스 바코드 Validation을 화면에서 처리할 지 여부
 ********************
 * @return
 */
LOGIS_UTIL.isBoxIdValidationEnabled = function() {
  return LOGIS_UTIL.getBooleanDeviceSetting('validation.box_barcd.screen.enabled');
};

/**
 * @description 박스 바코드 Validation Rule
 ********************
 * @return
 */
LOGIS_UTIL.getBoxIdValidationRule = function() {
  return LOGIS_UTIL.getDeviceSettingValue('validation.box_barcd.rule');
};

/**
 * @description 박스 ID 유효성 체크
 ************************
 * @param {String} boxId
 * @param {Boolean} showInvalidMsg
 * @param {Object} invalidCallback
 * @return {Boolean}
 */
LOGIS_UTIL.isBoxIdValidate = function(boxId, showInvalidMsg, invalidCallback) {
  if (!LOGIS_UTIL.isBoxIdValidationEnabled()) {
    return true;

  } else {
    let rule = new RegExp(LOGIS_UTIL.getBoxIdValidationRule());
    let isValid = rule.test(boxId);

    if (!isValid && showInvalidMsg && showInvalidMsg === true) {
      LOGIS_UTIL.showMessageWithSound('error', t('error.VALIDATION_ERROR'), t('error.box_id_invalid'), invalidCallback);
    }

    return isValid;
  }
};

/**
 * @description 셀 코드 Validation을 화면에서 처리할 지 여부
 ********************
 * @return
 */
LOGIS_UTIL.isCellCdValidationEnabled = function() {
  return LOGIS_UTIL.getBooleanDeviceSetting('validation.cell_cd.screen.enabled');
};

/**
 * @description 셀 코드 Validation Rule
 ********************
 * @return
 */
LOGIS_UTIL.getCellCdValidationRule = function() {
  return LOGIS_UTIL.getDeviceSettingValue('validation.cell_cd.rule');
};

/**
 * @description 셀 코드 유효성 체크
 ************************
 * @param {String} cellCd
 * @param {Boolean} showInvalidMsg
 * @param {Object} invalidCallback
 * @return {Boolean}
 */
LOGIS_UTIL.isCellCdValid = function(cellCd, showInvalidMsg, invalidCallback) {
  if (!LOGIS_UTIL.isCellCdValidationEnabled()) {
    return true;

  } else {
    let rule = new RegExp(LOGIS_UTIL.getCellCdValidationRule());
    let isValid = rule.test(cellCd);

    if (!isValid && showInvalidMsg && showInvalidMsg === true) {
      LOGIS_UTIL.showMessageWithSound('error', t('error.VALIDATION_ERROR'), t('error.loc_cd_invalid'), invalidCallback);
    }

    return isValid;
  }
};

/**
 * @description 슈트 코드 Validation을 화면에서 처리할 지 여부
 ********************
 * @return
 */
LOGIS_UTIL.isChuteCdValidationEnabled = function() {
  return LOGIS_UTIL.getBooleanDeviceSetting('validation.chute_cd.screen.enabled');
};

/**
 * @description 슈트 코드 Validation Rule
 ********************
 * @return
 */
LOGIS_UTIL.getChuteCdValidationRule = function() {
  return LOGIS_UTIL.getDeviceSettingValue('validation.chute_cd.rule');
};

/**
 * @description 슈트 코드 유효성 체크
 ************************
 * @param {String} chuteCd
 * @param {Boolean} showInvalidMsg
 * @param {Object} invalidCallback
 * @return {Boolean}
 */
LOGIS_UTIL.isChuteCdValid = function(chuteCd, showInvalidMsg, invalidCallback) {
  if (!LOGIS_UTIL.isChuteCdValidationEnabled()) {
    return true;

  } else {
    let rule = new RegExp(LOGIS_UTIL.getChuteCdValidationRule());
    let isValid = rule.test(chuteCd);

    if (!isValid && showInvalidMsg && showInvalidMsg === true) {
      LOGIS_UTIL.showMessageWithSound('error', t('error.VALIDATION_ERROR'), t('error.chute_cd_invalid'), invalidCallback);
    }

    return isValid;
  }
};

/**
 * @description 표시기 코드 Validation을 화면에서 처리할 지 여부
 ********************
 * @return
 */
LOGIS_UTIL.isIndCdValidationEnabled = function() {
  return LOGIS_UTIL.getBooleanDeviceSetting('validation.ind_cd.screen.enabled');
};

/**
 * @description 표시기 코드 Validation Rule
 ********************
 * @return
 */
LOGIS_UTIL.getIndCdValidationRule = function() {
  return LOGIS_UTIL.getDeviceSettingValue('validation.ind_cd.rule');
};

/**
 * @description 표시기 코드 유효성 체크
 ************************
 * @param {String} indCd
 * @param {Boolean} showInvalidMsg
 * @param {Object} invalidCallback
 * @return {Boolean}
 */
LOGIS_UTIL.isIndCdValid = function(indCd, showInvalidMsg, invalidCallback) {
  if (!LOGIS_UTIL.isIndCdValidationEnabled()) {
    return true;

  } else {
    let rule = new RegExp(LOGIS_UTIL.getIndCdValidationRule());
    let isValid = rule.test(indCd);

    if (!isValid && showInvalidMsg && showInvalidMsg === true) {
      LOGIS_UTIL.showMessageWithSound('error', t('error.VALIDATION_ERROR'), t('error.ind_cd_invalid'), invalidCallback);
    }

    return isValid;
  }
};

/**
 * @description 랙 코드 Validation을 화면에서 처리할 지 여부
 ********************
 * @return
 */
LOGIS_UTIL.isRackCdValidationEnabled = function() {
  return LOGIS_UTIL.getBooleanDeviceSetting('validation.rack_cd.screen.enabled');
};

/**
 * @description 랙 코드 Validation Rule
 ********************
 * @return
 */
LOGIS_UTIL.getRackCdValidationRule = function() {
  return LOGIS_UTIL.getDeviceSettingValue('validation.rack_cd.rule');
};

/**
 * @description 랙 코드 유효성 체크
 ************************
 * @param {String} rackCd
 * @param {Boolean} showInvalidMsg
 * @param {Object} invalidCallback
 * @return {Boolean}
 */
LOGIS_UTIL.isRackCdValid = function(rackCd, showInvalidMsg, invalidCallback) {
  if (!LOGIS_UTIL.isRackCdValidationEnabled()) {
    return true;

  } else {
    let rule = new RegExp(LOGIS_UTIL.getRackCdValidationRule());
    let isValid = rule.test(rackCd);

    if (!isValid && showInvalidMsg && showInvalidMsg === true) {
      LOGIS_UTIL.showMessageWithSound('error', t('error.VALIDATION_ERROR'), t('error.rack_cd_invalid'), invalidCallback);
    }

    return isValid;
  }
};

/**
 * @description 상품 바코드 Validation을 화면에서 처리할 지 여부
 ********************
 * @return
 */
LOGIS_UTIL.isSkuBarcdValidationEnabled = function() {
  return LOGIS_UTIL.getBooleanDeviceSetting('validation.sku_barcd.screen.enabled');
};

/**
 * @description 상품 바코드 Validation Rule
 ********************
 * @return
 */
LOGIS_UTIL.getSkuBarcdValidationRule = function() {
  return LOGIS_UTIL.getDeviceSettingValue('validation.sku_barcd.rule');
};

/**
 * @description 상품 바코드 유효성 체크
 ************************
 * @param {String} skuBarcd
 * @param {Boolean} showInvalidMsg
 * @param {Object} invalidCallback
 * @return {Boolean}
 */
LOGIS_UTIL.isSkuBarcdValid = function(skuBarcd, showInvalidMsg, invalidCallback) {
  if (!LOGIS_UTIL.isSkuBarcdValidationEnabled()) {
    return true;

  } else {
    let rule = new RegExp(LOGIS_UTIL.getSkuBarcdValidationRule());
    let isValid = rule.test(skuBarcd);

    if (!isValid && showInvalidMsg && showInvalidMsg === true) {
      LOGIS_UTIL.showMessageWithSound('error', t('error.VALIDATION_ERROR'), t('error.sku_barcd_invalid'), invalidCallback);
    }

    return isValid;
  }
};

/**
 * @description 상품 코드 Validation을 화면에서 처리할 지 여부
 ********************
 * @return
 */
LOGIS_UTIL.isSkuCdValidationEnabled = function() {
  return LOGIS_UTIL.getBooleanDeviceSetting('validation.sku_cd.screen.enabled');
};

/**
 * @description 상품 코드 Validation Rule
 ********************
 * @return
 */
LOGIS_UTIL.getSkuCdValidationRule = function() {
  return LOGIS_UTIL.getDeviceSettingValue('validation.sku_cd.rule');
};

/**
 * @description 상품 코드 유효성 체크
 ************************
 * @param {String} skuCd
 * @param {Boolean} showInvalidMsg
 * @param {Object} invalidCallback
 * @return {Boolean}
 */
LOGIS_UTIL.isSkuCdValid = function(skuCd, showInvalidMsg, invalidCallback) {
  if (!LOGIS_UTIL.isSkuCdValidationEnabled()) {
    return true;

  } else {
    let rule = new RegExp(LOGIS_UTIL.getSkuCdValidationRule());
    let isValid = rule.test(skuCd);

    if (!isValid && showInvalidMsg && showInvalidMsg === true) {
      LOGIS_UTIL.showMessageWithSound('error', t('error.VALIDATION_ERROR'), t('error.sku_cd_invalid'), invalidCallback);
    }

    return isValid;
  }
};

/**
 * 커스텀 사운드 파일 기본 경로 URL
 *****************************
 */
LOGIS_UTIL.getCustomSoundFileBaseUrl = function() {
  return LOGIS_UTIL.getDeviceSettingValue('custom.sound.file.url');
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
 * @param {Function} cancelCallback
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
 * @description 정보 / 경고 팝업 표시
 ******************
 * @param {String} type 메시지 타입 - info / error
 * @param {String} title 메시지 타이틀 
 * @param {String} message 팝업 메시지 
 * @param {Function} callback 콜백 함수
 */
LOGIS_UTIL.showMessageWithSound = function(type, title, message, callback) {
  if (type && type === 'error') {
    SOUND.playErrorSound();
  } else {
    SOUND.playInfoSound();
  }

  LOGIS_UTIL.showMessage(title, message, callback);
}

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