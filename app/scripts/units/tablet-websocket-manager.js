/*******************************************************************************
 *  Source Name:    tablet-websocket-manager.js
 *  Description:    Tablet 웹 소켓 접속 및 메시지 전송
 *  Author:         남종호
 *  Update History:
 *                  2018. 04. 25  남종호 최초 작성
 *
 ******************************************************************************/
TABLET_WS = {
  websocket : null,

  WEBSOCKET_URI : 'ws://' + window.location.hostname + ':9500/mps/ws/tablet',

  REGION_CD : null,

  ZONE_CD : null,

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
      equip_type : 'tablet',
      region_cd : '',
      zone_cd : '',
      command : 'CONNECT',
      message : 'MPS 서버와 웹 소켓연결이 완료되었습니다.'
    },

    CLOSE : {
      equip_type : 'tablet',
      region_cd : '',
      zone_cd : '',
      command : 'CLOSE',
      message : 'MPS 서버와 웹 소켓연결을 종료합니다.'
    },

    REFRESH: {
      equip_type : 'tablet',
      job_type : '',
      region_cd : '',
      zone_cd : '',
      command : 'REFRESH',
      message : ''
    },

    SHOW_INFO : {
      equip_type : 'tablet',
      job_type : '',
      region_cd : '',
      zone_cd : '',
      command: 'SHOW_INFO',
      message : ''
    },

    SHOW_ERROR : {
      equip_type : 'tablet',
      job_type : '',
      region_cd : '',
      zone_cd : '',
      command: 'SHOW_ERROR',
      message : ''
    }
  }
};

/**
 * 웹 소켓 접속
 */
TABLET_WS.initWebSocket = function(openCallback, errorCallback) {
  console.log('Kiosk Websocket connecting to [' + TABLET_WS.WEBSOCKET_URI + ']');
  // 1. 웹 소켓 생성
  TABLET_WS.websocket = new WebSocket(TABLET_WS.WEBSOCKET_URI);

  // 2. 연결되었을 때
  TABLET_WS.websocket.onopen = function(ev) {
    TABLET_WS.EVENT.CONNECT.region_cd = TABLET_WS.REGION_CD;
    TABLET_WS.EVENT.CONNECT.zone_cd = TABLET_WS.ZONE_CD;
    TABLET_WS.websocket.send(JSON.stringify(TABLET_WS.EVENT.CONNECT));
    if (openCallback && openCallback instanceof Function) {
      openCallback();
    }
  }.bind(this);

  // 3. 접속 종료시
  TABLET_WS.websocket.onclose = function(ev) {
    console.log('connect closed', ev);
  };

  // 4. 서버로 부터 메시지를 전달받은 경우
  TABLET_WS.websocket.onmessage = function(ev) {
    if (ev.data) {
      var data = JSON.parse(ev.data);

      switch (data.command) {
        case TABLET_WS.COMMAND.REFRESH:
          if(data.job_type == 'DAS') {
            TABLET_WS.DAS_SCREEN.refreshByWs(data.message);
          } else {
            TABLET_WS.DPS_SCREEN.refreshByWs(data.message);
          }

          break;

        case TABLET_WS.COMMAND.SHOW_INFO:
          if(data.job_type == 'DAS') {
            TABLET_WS.DAS_SCREEN.showMessage('info', '정보', data.message);
          } else {
            TABLET_WS.DPS_SCREEN.showMessage('info', '정보', data.message);
          }

          break;

        case TABLET_WS.COMMAND.SHOW_ERROR:
          if(data.job_type == 'DAS') {
            TABLET_WS.DAS_SCREEN.showMessage('error', '에러', data.message);
          } else {
            TABLET_WS.DPS_SCREEN.showMessage('error', '에러', data.message);
          }

          break;

        default:
          break;
      }
    }
  };

  // 5. 접속 에러 발생시 ...
  TABLET_WS.websocket.onerror = function(ev) {
    console.log(ev);
    if (errorCallback && errorCallback instanceof Function) {
      errorCallback();
    }
  };
};

/**
 * 메시지 전송
 */
TABLET_WS.sendMessage = function(msg) {
  if(msg && TABLET_WS.websocket && TABLET_WS.websocket.readyState == TABLET_WS.WS_STATUS.OPEN) {
    if(typeof(msg) == 'object') {
      TABLET_WS.websocket.send(JSON.stringify(msg));

    } else if(typeof(msg) == 'string') {
      TABLET_WS.websocket.send(msg);
    }
  }
};

/**
 * 웹 소켓 커넥션이 체크 모니터링을 시작
 *******************
 * @param {String} regionCd
 * @param {String} zoneCd
 */
TABLET_WS.startConnectionMonitor = function(regionCd, zoneCd) {
  if(!TABLET_WS.MONITOR_ID) {
    TABLET_WS.REGION_CD = regionCd;
    TABLET_WS.ZONE_CD = zoneCd;
    TABLET_WS.MONITOR_ID = setInterval(TABLET_WS.checkConnection, 10000);
  }
};

/**
 * 웹 소켓 커넥션 체크 모니터링을 종료
 */
TABLET_WS.stopConnectionMonitor = function() {
  if(TABLET_WS.MONITOR_ID) {
    clearInterval(TABLET_WS.MONITOR_ID);
    TABLET_WS.REGION_CD = null;
    TABLET_WS.ZONE_CD = null;
    TABLET_WS.MONITOR_ID = null;
  }
};

/**
 * 웹 소켓 커넥션 체크
 */
TABLET_WS.checkConnection = function() {
  if(TABLET_WS.MONITOR_ID && TABLET_WS.REGION_CD && TABLET_WS.ZONE_CD && (!TABLET_WS.websocket || TABLET_WS.websocket.readyState == TABLET_WS.WS_STATUS.CLOSED)) {
    TABLET_WS.initWebSocket();
  }
};

/**
 * 웹 소켓 접속 종료
 */
TABLET_WS.closeWebSocket = function() {
  try {
    TABLET_WS.stopConnectionMonitor();
    TABLET_WS.EVENT.CLOSE.region_cd = TABLET_WS.REGION_CD;
    TABLET_WS.EVENT.CLOSE.zone_cd = TABLET_WS.ZONE_CD;
    TABLET_WS.websocket.send(JSON.stringify(TABLET_WS.EVENT.CLOSE));
    TABLET_WS.websocket.close();
  } catch (error) {
    console.error(error);
  }
};

/**
 * 호기 코드 변경
 *******************
 * @param {String} regionCd
 * @param {String} zoneCd
 */
TABLET_WS.changeRegionCd = function(regionCd, zoneCd) {
  TABLET_WS.stopConnectionMonitor();
  TABLET_WS.closeWebSocket();
  TABLET_WS.startConnectionMonitor(regionCd, zoneCd);
}
