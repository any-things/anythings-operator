/*******************************************************************************
 *  Source Name:    mqtt-manager.js
 *  Description:    mqtt 접속 및 메시지 전송
 *  Author:         이창준
 *  Update History:
 *                  2018. 04. 27  이창준 최초 작성
 *
 ******************************************************************************/

if (!(typeof WEB_MQTT === 'object')) {
  WEB_MQTT = {
    mqtt: null,

    EQUIP_TYPE: null,

    BROKER_ADDRESS: null,
    BROKER_PORT: null,

    REGION_CD: null,
    ZONE_CD: null,

    STATUS_ID: null,

    CLIENT_ID: null,
    SOURCE_ID: null,
    SITE_CD: null,
    SERVER_TOPIC: 'mps_server',
    TOPICS: null,

    ACTION: {
      CONNECT: 'EQUIP_CONNECT',
      CLOSE: 'EQUIP_CLOSE',
      REFRESH: 'EQUIP_REFRESH',
      SHOW_INFO: 'EQUIP_SHOW_INFO',
      SHOW_ERROR: 'EQUIP_SHOW_ERROR'
    },

    EVENT: {
      CONNECT: {
        equip_type: '',
        rack_cd: '',
        action: 'EQUIP_CONNECT',
        message: 'MPS 미들웨어 서버와 연결이 완료되었습니다.'
      },

      CLOSE: {
        equip_type: '',
        rack_cd: '',
        action: 'EQUIP_CLOSE',
        message: 'MPS 미들웨어 서버와 연결을 종료합니다.'
      },

      REFRESH: {
        equip_type: '',
        job_type: '',
        rack_cd: '',
        action: 'EQUIP_REFRESH',
        message: ''
      },

      SHOW_INFO: {
        equip_type: '',
        job_type: '',
        rack_cd: '',
        action: 'EQUIP_SHOW_INFO',
        message: ''
      },

      SHOW_ERROR: {
        equip_type: '',
        job_type: '',
        rack_cd: '',
        action: 'EQUIP_SHOW_ERROR',
        message: ''
      }
    }
  };

  /**
   * MQTT 접속
   *******************
   * @param {Function} openCallback
   * @param {Function} errorCallback
   */
  WEB_MQTT.initMqtt = function(openCallback, errorCallback) {
    if (this.mqtt) {
      console.log(
        'Already connected at [' + this.BROKER_ADDRESS + ']',
        this.mqtt
      );
      return;
    }
    // console.log('Mqtt connecting to [' + this.BROKER_ADDRESS + ']');

    // 미들웨어 주소 설정
    var addresses = this.BROKER_ADDRESS.split(',');
    let mwAddress = [];

    for (var i = 0; i < addresses.length; i++) {
      mwAddress[i] = { host: addresses[i], port: `${this.BROKER_PORT}/ws` };
    }

    // MQTT 접속 옵션
    let mqttConnObj = {
      servers: mwAddress,
      clientId: this.CLIENT_ID,
      clean: true,
      username: this.SITE_CD + ':admin',
      password: 'admin',
      keepalive: 10,
      reconnectPeriod: 1000
      // will : {
      //   topic : this.SERVER_TOPIC,
      //   payload : this.getSendJsonString(this.getStatusReportObject('disconnect')),
      //   qos : 0,
      //   retain : false
      // }
    };

    // 1. MQTT 생성
    // this.mqtt = mqtt.connect({'servers':mwAddress, 'clientId': this.CLIENT_ID, 'clean':true, username: this.SITE_CD +':admin', password:'admin', keepalive:10, reconnectPeriod:1000});
    this.mqtt = mqtt.connect(mqttConnObj);

    // 2. 접속 에러 발생시 ...
    this.mqtt.on('error', function(error) {
      console.log(error);
      if (errorCallback && errorCallback instanceof Function) {
        errorCallback();
      }
    });

    // 3. 연결되었을 때
    this.mqtt.on('connect', packet => {
      console.log('WEB_MQTT client connected:', this.CLIENT_ID, packet);

      // 콜백이 존재하면 호출
      if (openCallback && openCallback instanceof Function) {
        openCallback();
      }

      // 설정된 토픽을 구독
      // console.log(this.TOPICS)
      this.mqtt.subscribe(this.TOPICS, { qos: 1 }, function(err, granted) {
        console.log('WEB_MQTT client subscribe: ', err, granted);
      });

      // this.STATUS_ID = setInterval(this.statusReport, 1800000);
      this.STATUS_ID = true;
    });

    // 4. 접속 종료시
    this.mqtt.on('close', function() {
      console.log('connection closed');
    });

    // 5. 서버로 부터 메시지를 전달받은 경우
    this.mqtt.on('message', (topic, message, packet) => {
      if (message) {
        console.log(`topic: ${topic}`)
        var data = JSON.parse(message).body;
        document.dispatchEvent(
          new CustomEvent('mqtt-message-received', { detail: data })
        );
      }
    });
  };

  /**
   * 메시지 전송
   *******************
   * @param {String} msg
   */
  WEB_MQTT.sendMessage = function(msg) {
    if (msg && this.mqtt) {
      this.mqtt.publish(this.SERVER_TOPIC, this.getSendJsonString(msg), {
        qos: 1
      });
    }
  };

  /**
   * MQTT 커넥션이 체크 모니터링을 시작
   *******************
   * @param {String} rackCd
   * @param {String} zoneCd
   * @param {String} deviceType
   * @param {String} brokerAddress
   * @param {String} brokerPort
   * @param {String} brokerSiteCd
   */
  WEB_MQTT.startConnectionMonitor = function(
    rackCd,
    zoneCd,
    deviceType,
    brokerAddress,
    brokerPort,
    brokerSiteCd
  ) {
    if (!this.STATUS_ID) {
      let equipType = ''; // 장비 타입: kiosk, mobile
      let deviceTopic = []; // 장비 토픽

      if (!deviceType) {
        return;
      }

      // 장비 타입에 따라 토픽 결정
      if (deviceType.toLowerCase() == 'tablet') {
        equipType = 'mobile';
        deviceTopic.push('tablet', 'mobile');
      } else if (deviceType.toLowerCase() == 'pda') {
        equipType = 'mobile';
        deviceTopic.push('pda', 'mobile');
      } else {
        equipType = 'kiosk';
        deviceTopic.push('kiosk');
      }

      // 장비 설정 저장
      this.EQUIP_TYPE = deviceTopic[0];
      this.REGION_CD = rackCd;
      this.SITE_CD = brokerSiteCd;

      // 장비 타입에 따라 미들웨어에서 사용할 ID 설정
      if (equipType === 'mobile') {
        this.SOURCE_ID = [brokerSiteCd, this.EQUIP_TYPE, rackCd, zoneCd].join(
          '/'
        );
        this.ZONE_CD = zoneCd;
      } else {
        this.SOURCE_ID = [brokerSiteCd, this.EQUIP_TYPE, rackCd].join('/');
        this.ZONE_CD = null;
      }
      this.CLIENT_ID = [
        this.SOURCE_ID,
        Date.now(),
        Math.round(Math.random() * 100000)
      ].join('-');

      // 장비 타입에 따라 토픽 설정
      // 장비 존 토픽은 모바일 기기에서만 사용
      this.TOPICS = [];
      deviceTopic.forEach(topic => {
        this.TOPICS.push(
          [brokerSiteCd, topic].join('/'),
          [brokerSiteCd, topic, rackCd].join('/'),
          equipType === 'mobile'
            ? [brokerSiteCd, topic, rackCd, zoneCd].join('/')
            : undefined
        );
      });

      // 미들웨어 주소 설정 후 연결
      this.BROKER_ADDRESS = brokerAddress;
      this.BROKER_PORT = brokerPort;
      this.initMqtt();
    }
  };

  /**
   * 웹 소켓 커넥션 체크 모니터링을 종료
   */
  WEB_MQTT.stopConnectionMonitor = function() {
    if (this.STATUS_ID) {
      // clearInterval(this.STATUS_ID);
      this.ZONE_CD = null;
      this.REGION_CD = null;
      // this.STATUS_ID = null
      this.STATUS_ID = false;
    }

    if (this.mqtt) {
      this.mqtt.end();
      this.mqtt = null;
    }
  };

  /**
   * 웹 소켓 접속 종료
   */
  WEB_MQTT.closeMqtt = function() {
    try {
      this.stopConnectionMonitor();
    } catch (e) {
      console.error(e);
    }
  };

  /**
   * MQTT 상태 보고
   */
  WEB_MQTT.statusReport = function() {
    // if(this.STATUS_ID && this.REGION_CD ) {
    //   this.sendMessage(this.getStatusReportObject('ok'));
    // }
  };

  /**
   * MQTT 상태 보고 오브젝트 생성 후 리턴
   *******************
   * @param {String} statusMsg
   */
  WEB_MQTT.getStatusReportObject = function(statusMsg) {
    let status = {
      equip_type: this.EQUIP_TYPE.toLowerCase(),
      job_type: this.JOB_TYPE,
      rack_cd: this.REGION_CD,
      action: 'EQUIP_STATUS',
      message: statusMsg
    };

    if (this.ZONE_CD) {
      status.zone_cd = this.ZONE_CD;
    }

    return status;
  };

  /**
   * 전송 JSON 문자를 생성 후 리턴
   *******************
   * @param {Object} msgObj
   */
  WEB_MQTT.getSendJsonString = function(msgObj) {
    let sendObject = {
      properties: this.generateMessageProperties(),
      body: msgObj
    };

    return JSON.stringify(sendObject);
  };

  /**
   * 랙 코드 변경
   *******************
   * @param {String} rackCd
   * @param {String} zoneCd
   */
  WEB_MQTT.reset = function(rackCd, zoneCd) {
    this.closeMqtt();

    var deviceType = JSON.parse(localStorage.getItem('setting.deviceType'));

    if (!this.BROKER_ADDRESS) {
      return
    }

    if (!this.BROKER_PORT) {
      return
    }

    if (!this.SITE_CD) {
      return
    }

    this.startConnectionMonitor(
      rackCd,
      zoneCd,
      deviceType,
      this.BROKER_ADDRESS,
      this.BROKER_PORT,
      this.SITE_CD
    )
  };

  /**
   * 메시지 프로퍼티를 생성
   */
  WEB_MQTT.generateMessageProperties = function() {
    return {
      id: ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (
          c ^
          (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16)
      ),
      time: Date.now(),
      dest_id: this.SERVER_TOPIC,
      source_id: this.CLIENT_ID,
      is_reply: false
    };
  };
}
