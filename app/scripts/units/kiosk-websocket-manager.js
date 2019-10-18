/*******************************************************************************
 *  Source Name:    kiosk-websocket-manager.js
 *  Description:    KIOSK 웹 소켓 접속 및 메시지 전송
 *  Author:         남종호
 *  Update History:
 *                  2018. 04. 25  남종호 최초 작성
 *
 ******************************************************************************/
KIOSK_WS = {
  websocket : null,

  WEBSOCKET_URI : 'ws://' + window.location.hostname + ':9500/mps/ws/kiosk',

  REGION_CD : null,

  MONITOR_ID : null,

  DAS_SCREEN : null,

  DPS_SCREEN : null,

  WS_STATUS : {
    CONNECTING : 0,
    OPEN : 1,
    CLOSING : 2,
    CLOSED : 3
  },

  COMMAND : {
    CONNECT : 'CONNECT',
    CLOSE : 'CLOSE',
    REFRESH : 'REFRESH',
    SHOW_INFO : 'SHOW_INFO',
    SHOW_ERROR : 'SHOW_ERROR'
  },

  EVENT : {
    CONNECT : {
      equip_type : 'kiosk',
      region_cd : '',
      command : 'CONNECT',
      message : '서버와 웹 소켓 연결이 완료되었습니다.'
    },

    CLOSE : {
      equip_type : 'kiosk',
      region_cd : '',
      command : 'CLOSE',
      message : '서버와 웹 소켓 연결을 종료합니다.'
    },

    REFRESH: {
      equip_type : 'kiosk',
      job_type : '',
      region_cd : '',
      command : 'REFRESH',
      message : ''
    },

    SHOW_INFO : {
      equip_type : 'kiosk',
      job_type : '',
      region_cd : '',
      command: 'SHOW_INFO',
      message : ''
    },

    SHOW_ERROR : {
      equip_type : 'kiosk',
      job_type : '',
      region_cd : '',
      command: 'SHOW_ERROR',
      message : ''
    }
  }
};

/**
 * 웹 소켓 접속
 */
KIOSK_WS.initWebSocket = function(openCallback, errorCallback) {
  console.log('Kiosk Websocket connecting to [' + KIOSK_WS.WEBSOCKET_URI + ']');
  // 1. 웹 소켓 생성
  KIOSK_WS.websocket = new WebSocket(KIOSK_WS.WEBSOCKET_URI);

  // 2. 연결되었을 때
  KIOSK_WS.websocket.onopen = function(ev) {
    KIOSK_WS.EVENT.CONNECT.region_cd = KIOSK_WS.REGION_CD;
    KIOSK_WS.websocket.send(JSON.stringify(KIOSK_WS.EVENT.CONNECT));
    if (openCallback && openCallback instanceof Function) {
      openCallback();
    }
  }.bind(this);

  // 3. 접속 종료시
  KIOSK_WS.websocket.onclose = function(ev) {
    console.log('connect closed', ev);
  };

  // 4. 서버로 부터 메시지를 전달받은 경우
  KIOSK_WS.websocket.onmessage = function(ev) {
    if (ev.data) {
      var data = JSON.parse(ev.data);

      switch (data.command) {
        case KIOSK_WS.COMMAND.REFRESH:
          if(data.job_type == 'DAS') {
            KIOSK_WS.DAS_SCREEN.refreshByWs(JSON.parse(data.message));
          } else {
            KIOSK_WS.DPS_SCREEN.refreshByWs(JSON.parse(data.message));
          }

          break;

        case KIOSK_WS.COMMAND.SHOW_INFO:
          if(data.job_type == 'DAS') {
            KIOSK_WS.DAS_SCREEN.showMessage('info', '정보', data.message);
          } else {
            KIOSK_WS.DPS_SCREEN.showMessage('info', '정보', data.message);
          }

          break;

        case KIOSK_WS.COMMAND.SHOW_ERROR:
          if(data.job_type == 'DAS') {
            KIOSK_WS.DAS_SCREEN.showMessage('error', '에러', data.message);
          } else {
            KIOSK_WS.DPS_SCREEN.showMessage('error', '에러', data.message);
          }

          break;

        default:
          break;
      }
    }
  };

  // 5. 접속 에러 발생시 ...
  KIOSK_WS.websocket.onerror = function(ev) {
    console.log(ev);
    if (errorCallback && errorCallback instanceof Function) {
      errorCallback();
    }
  };
};

/**
 * 메시지 전송
 */
KIOSK_WS.sendMessage = function(msg) {
  if(msg && KIOSK_WS.websocket && KIOSK_WS.websocket.readyState == KIOSK_WS.WS_STATUS.OPEN) {
    if(typeof(msg) == 'object') {
      KIOSK_WS.websocket.send(JSON.stringify(msg));

    } else if(typeof(msg) == 'string') {
      KIOSK_WS.websocket.send(msg);
    }
  }
};

/**
 * 웹 소켓 커넥션이 체크 모니터링을 시작
 *******************
 * @param {String} regionCd
 */
KIOSK_WS.startConnectionMonitor = function(regionCd) {
  if(!KIOSK_WS.MONITOR_ID) {
    KIOSK_WS.REGION_CD = regionCd;
    KIOSK_WS.MONITOR_ID = setInterval(KIOSK_WS.checkConnection, 10000);
  }
};

/**
 * 웹 소켓 커넥션 체크 모니터링을 종료
 */
KIOSK_WS.stopConnectionMonitor = function() {
  if(KIOSK_WS.MONITOR_ID) {
    clearInterval(KIOSK_WS.MONITOR_ID);
    KIOSK_WS.REGION_CD = null;
    KIOSK_WS.MONITOR_ID = null;
  }
};

/**
 * 웹 소켓 커넥션 체크
 */
KIOSK_WS.checkConnection = function() {
  if(KIOSK_WS.MONITOR_ID && KIOSK_WS.REGION_CD && (!KIOSK_WS.websocket || KIOSK_WS.websocket.readyState == KIOSK_WS.WS_STATUS.CLOSED)) {
    KIOSK_WS.initWebSocket();
  }
};

/**
 * 웹 소켓 접속 종료
 */
KIOSK_WS.closeWebSocket = function() {
  try {
    KIOSK_WS.stopConnectionMonitor();
    KIOSK_WS.EVENT.CLOSE.region_cd = KIOSK_WS.REGION_CD;
    KIOSK_WS.websocket.send(JSON.stringify(KIOSK_WS.EVENT.CLOSE));
    KIOSK_WS.websocket.close();
  } catch (error) {
    console.error(error);
  }
};

/**
 * 호기 코드 변경
 *******************
 * @param {String} regionCd
 */
KIOSK_WS.changeRegionCd = function(regionCd) {
  KIOSK_WS.stopConnectionMonitor();
  KIOSK_WS.closeWebSocket();
  KIOSK_WS.startConnectionMonitor(regionCd);
}
