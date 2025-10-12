var Gy = Object.defineProperty;
var Wy = (Tt, v, pt) =>
  v in Tt
    ? Gy(Tt, v, { enumerable: !0, configurable: !0, writable: !0, value: pt })
    : (Tt[v] = pt);
var mt = (Tt, v, pt) => Wy(Tt, typeof v != "symbol" ? v + "" : v, pt);
define([
  "exports",
  "./client-DSmeotIp.js",
  "./dialog-DcLV_9Ft.js",
  "./game.services-8oAWB4Ys.js",
  "./index-B3vRSESA.js",
  "./TetrisLoader-ntmcNIZH.js",
  "./leaderboard.service-AatfcISI.js",
  "./localizedCountryNames.context-Iq2timGF.js",
  "./CustomImage-B67teYuL.js",
  "./debounce-Bv72PZzz.js",
  "./countryCodeMapper-Bt9flrj5.js",
  "./clsx-CTbZ6AF4.js",
  "./playerStats-kPladSmW.js",
], function (Tt, v, pt, Wc, z, ji, tt, jt, Di, qc, Hc, zc, Kc) {
  "use strict";
  const Dt = Object.create(null);
  (Dt.open = "0"),
    (Dt.close = "1"),
    (Dt.ping = "2"),
    (Dt.pong = "3"),
    (Dt.message = "4"),
    (Dt.upgrade = "5"),
    (Dt.noop = "6");
  const kr = Object.create(null);
  Object.keys(Dt).forEach((o) => {
    kr[Dt[o]] = o;
  });
  const Gi = { type: "error", data: "parser error" },
    So =
      typeof Blob == "function" ||
      (typeof Blob < "u" &&
        Object.prototype.toString.call(Blob) === "[object BlobConstructor]"),
    Co = typeof ArrayBuffer == "function",
    Ro = (o) =>
      typeof ArrayBuffer.isView == "function"
        ? ArrayBuffer.isView(o)
        : o && o.buffer instanceof ArrayBuffer,
    Wi = ({ type: o, data: n }, i, u) =>
      So && n instanceof Blob
        ? i
          ? u(n)
          : To(n, u)
        : Co && (n instanceof ArrayBuffer || Ro(n))
          ? i
            ? u(n)
            : To(new Blob([n]), u)
          : u(Dt[o] + (n || "")),
    To = (o, n) => {
      const i = new FileReader();
      return (
        (i.onload = function () {
          const u = i.result.split(",")[1];
          n("b" + (u || ""));
        }),
        i.readAsDataURL(o)
      );
    };
  function Io(o) {
    return o instanceof Uint8Array
      ? o
      : o instanceof ArrayBuffer
        ? new Uint8Array(o)
        : new Uint8Array(o.buffer, o.byteOffset, o.byteLength);
  }
  let qi;
  function Vc(o, n) {
    if (So && o.data instanceof Blob)
      return o.data.arrayBuffer().then(Io).then(n);
    if (Co && (o.data instanceof ArrayBuffer || Ro(o.data)))
      return n(Io(o.data));
    Wi(o, !1, (i) => {
      qi || (qi = new TextEncoder()), n(qi.encode(i));
    });
  }
  const Fo = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
    ur = typeof Uint8Array > "u" ? [] : new Uint8Array(256);
  for (let o = 0; o < Fo.length; o++) ur[Fo.charCodeAt(o)] = o;
  const Jc = (o) => {
      let n = o.length * 0.75,
        i = o.length,
        u,
        d = 0,
        w,
        x,
        R,
        g;
      o[o.length - 1] === "=" && (n--, o[o.length - 2] === "=" && n--);
      const p = new ArrayBuffer(n),
        _ = new Uint8Array(p);
      for (u = 0; u < i; u += 4)
        (w = ur[o.charCodeAt(u)]),
          (x = ur[o.charCodeAt(u + 1)]),
          (R = ur[o.charCodeAt(u + 2)]),
          (g = ur[o.charCodeAt(u + 3)]),
          (_[d++] = (w << 2) | (x >> 4)),
          (_[d++] = ((x & 15) << 4) | (R >> 2)),
          (_[d++] = ((R & 3) << 6) | (g & 63));
      return p;
    },
    Yc = typeof ArrayBuffer == "function",
    Hi = (o, n) => {
      if (typeof o != "string") return { type: "message", data: Bo(o, n) };
      const i = o.charAt(0);
      return i === "b"
        ? { type: "message", data: Xc(o.substring(1), n) }
        : kr[i]
          ? o.length > 1
            ? { type: kr[i], data: o.substring(1) }
            : { type: kr[i] }
          : Gi;
    },
    Xc = (o, n) => {
      if (Yc) {
        const i = Jc(o);
        return Bo(i, n);
      } else return { base64: !0, data: o };
    },
    Bo = (o, n) => {
      switch (n) {
        case "blob":
          return o instanceof Blob ? o : new Blob([o]);
        case "arraybuffer":
        default:
          return o instanceof ArrayBuffer ? o : o.buffer;
      }
    },
    Lo = "",
    $c = (o, n) => {
      const i = o.length,
        u = new Array(i);
      let d = 0;
      o.forEach((w, x) => {
        Wi(w, !1, (R) => {
          (u[x] = R), ++d === i && n(u.join(Lo));
        });
      });
    },
    Zc = (o, n) => {
      const i = o.split(Lo),
        u = [];
      for (let d = 0; d < i.length; d++) {
        const w = Hi(i[d], n);
        if ((u.push(w), w.type === "error")) break;
      }
      return u;
    };
  function Qc() {
    return new TransformStream({
      transform(o, n) {
        Vc(o, (i) => {
          const u = i.length;
          let d;
          if (u < 126)
            (d = new Uint8Array(1)), new DataView(d.buffer).setUint8(0, u);
          else if (u < 65536) {
            d = new Uint8Array(3);
            const w = new DataView(d.buffer);
            w.setUint8(0, 126), w.setUint16(1, u);
          } else {
            d = new Uint8Array(9);
            const w = new DataView(d.buffer);
            w.setUint8(0, 127), w.setBigUint64(1, BigInt(u));
          }
          o.data && typeof o.data != "string" && (d[0] |= 128),
            n.enqueue(d),
            n.enqueue(i);
        });
      },
    });
  }
  let zi;
  function Pr(o) {
    return o.reduce((n, i) => n + i.length, 0);
  }
  function Mr(o, n) {
    if (o[0].length === n) return o.shift();
    const i = new Uint8Array(n);
    let u = 0;
    for (let d = 0; d < n; d++)
      (i[d] = o[0][u++]), u === o[0].length && (o.shift(), (u = 0));
    return o.length && u < o[0].length && (o[0] = o[0].slice(u)), i;
  }
  function el(o, n) {
    zi || (zi = new TextDecoder());
    const i = [];
    let u = 0,
      d = -1,
      w = !1;
    return new TransformStream({
      transform(x, R) {
        for (i.push(x); ; ) {
          if (u === 0) {
            if (Pr(i) < 1) break;
            const g = Mr(i, 1);
            (w = (g[0] & 128) === 128),
              (d = g[0] & 127),
              d < 126 ? (u = 3) : d === 126 ? (u = 1) : (u = 2);
          } else if (u === 1) {
            if (Pr(i) < 2) break;
            const g = Mr(i, 2);
            (d = new DataView(g.buffer, g.byteOffset, g.length).getUint16(0)),
              (u = 3);
          } else if (u === 2) {
            if (Pr(i) < 8) break;
            const g = Mr(i, 8),
              p = new DataView(g.buffer, g.byteOffset, g.length),
              _ = p.getUint32(0);
            if (_ > Math.pow(2, 21) - 1) {
              R.enqueue(Gi);
              break;
            }
            (d = _ * Math.pow(2, 32) + p.getUint32(4)), (u = 3);
          } else {
            if (Pr(i) < d) break;
            const g = Mr(i, d);
            R.enqueue(Hi(w ? g : zi.decode(g), n)), (u = 0);
          }
          if (d === 0 || d > o) {
            R.enqueue(Gi);
            break;
          }
        }
      },
    });
  }
  const No = 4;
  function je(o) {
    if (o) return tl(o);
  }
  function tl(o) {
    for (var n in je.prototype) o[n] = je.prototype[n];
    return o;
  }
  (je.prototype.on = je.prototype.addEventListener =
    function (o, n) {
      return (
        (this._callbacks = this._callbacks || {}),
        (this._callbacks["$" + o] = this._callbacks["$" + o] || []).push(n),
        this
      );
    }),
    (je.prototype.once = function (o, n) {
      function i() {
        this.off(o, i), n.apply(this, arguments);
      }
      return (i.fn = n), this.on(o, i), this;
    }),
    (je.prototype.off =
      je.prototype.removeListener =
      je.prototype.removeAllListeners =
      je.prototype.removeEventListener =
        function (o, n) {
          if (
            ((this._callbacks = this._callbacks || {}), arguments.length == 0)
          )
            return (this._callbacks = {}), this;
          var i = this._callbacks["$" + o];
          if (!i) return this;
          if (arguments.length == 1)
            return delete this._callbacks["$" + o], this;
          for (var u, d = 0; d < i.length; d++)
            if (((u = i[d]), u === n || u.fn === n)) {
              i.splice(d, 1);
              break;
            }
          return i.length === 0 && delete this._callbacks["$" + o], this;
        }),
    (je.prototype.emit = function (o) {
      this._callbacks = this._callbacks || {};
      for (
        var n = new Array(arguments.length - 1),
          i = this._callbacks["$" + o],
          u = 1;
        u < arguments.length;
        u++
      )
        n[u - 1] = arguments[u];
      if (i) {
        i = i.slice(0);
        for (var u = 0, d = i.length; u < d; ++u) i[u].apply(this, n);
      }
      return this;
    }),
    (je.prototype.emitReserved = je.prototype.emit),
    (je.prototype.listeners = function (o) {
      return (
        (this._callbacks = this._callbacks || {}),
        this._callbacks["$" + o] || []
      );
    }),
    (je.prototype.hasListeners = function (o) {
      return !!this.listeners(o).length;
    });
  const Ur =
      typeof Promise == "function" && typeof Promise.resolve == "function"
        ? (n) => Promise.resolve().then(n)
        : (n, i) => i(n, 0),
    gt =
      typeof self < "u"
        ? self
        : typeof window < "u"
          ? window
          : Function("return this")(),
    nl = "arraybuffer";
  function qy() {}
  function Oo(o, ...n) {
    return n.reduce((i, u) => (o.hasOwnProperty(u) && (i[u] = o[u]), i), {});
  }
  const rl = gt.setTimeout,
    il = gt.clearTimeout;
  function jr(o, n) {
    n.useNativeTimers
      ? ((o.setTimeoutFn = rl.bind(gt)), (o.clearTimeoutFn = il.bind(gt)))
      : ((o.setTimeoutFn = gt.setTimeout.bind(gt)),
        (o.clearTimeoutFn = gt.clearTimeout.bind(gt)));
  }
  const sl = 1.33;
  function ol(o) {
    return typeof o == "string"
      ? al(o)
      : Math.ceil((o.byteLength || o.size) * sl);
  }
  function al(o) {
    let n = 0,
      i = 0;
    for (let u = 0, d = o.length; u < d; u++)
      (n = o.charCodeAt(u)),
        n < 128
          ? (i += 1)
          : n < 2048
            ? (i += 2)
            : n < 55296 || n >= 57344
              ? (i += 3)
              : (u++, (i += 4));
    return i;
  }
  function ko() {
    return (
      Date.now().toString(36).substring(3) +
      Math.random().toString(36).substring(2, 5)
    );
  }
  function ul(o) {
    let n = "";
    for (let i in o)
      o.hasOwnProperty(i) &&
        (n.length && (n += "&"),
        (n += encodeURIComponent(i) + "=" + encodeURIComponent(o[i])));
    return n;
  }
  function cl(o) {
    let n = {},
      i = o.split("&");
    for (let u = 0, d = i.length; u < d; u++) {
      let w = i[u].split("=");
      n[decodeURIComponent(w[0])] = decodeURIComponent(w[1]);
    }
    return n;
  }
  class ll extends Error {
    constructor(n, i, u) {
      super(n),
        (this.description = i),
        (this.context = u),
        (this.type = "TransportError");
    }
  }
  class Ki extends je {
    constructor(n) {
      super(),
        (this.writable = !1),
        jr(this, n),
        (this.opts = n),
        (this.query = n.query),
        (this.socket = n.socket),
        (this.supportsBinary = !n.forceBase64);
    }
    onError(n, i, u) {
      return super.emitReserved("error", new ll(n, i, u)), this;
    }
    open() {
      return (this.readyState = "opening"), this.doOpen(), this;
    }
    close() {
      return (
        (this.readyState === "opening" || this.readyState === "open") &&
          (this.doClose(), this.onClose()),
        this
      );
    }
    send(n) {
      this.readyState === "open" && this.write(n);
    }
    onOpen() {
      (this.readyState = "open"),
        (this.writable = !0),
        super.emitReserved("open");
    }
    onData(n) {
      const i = Hi(n, this.socket.binaryType);
      this.onPacket(i);
    }
    onPacket(n) {
      super.emitReserved("packet", n);
    }
    onClose(n) {
      (this.readyState = "closed"), super.emitReserved("close", n);
    }
    pause(n) {}
    createUri(n, i = {}) {
      return (
        n +
        "://" +
        this._hostname() +
        this._port() +
        this.opts.path +
        this._query(i)
      );
    }
    _hostname() {
      const n = this.opts.hostname;
      return n.indexOf(":") === -1 ? n : "[" + n + "]";
    }
    _port() {
      return this.opts.port &&
        ((this.opts.secure && +(this.opts.port !== 443)) ||
          (!this.opts.secure && Number(this.opts.port) !== 80))
        ? ":" + this.opts.port
        : "";
    }
    _query(n) {
      const i = ul(n);
      return i.length ? "?" + i : "";
    }
  }
  class hl extends Ki {
    constructor() {
      super(...arguments), (this._polling = !1);
    }
    get name() {
      return "polling";
    }
    doOpen() {
      this._poll();
    }
    pause(n) {
      this.readyState = "pausing";
      const i = () => {
        (this.readyState = "paused"), n();
      };
      if (this._polling || !this.writable) {
        let u = 0;
        this._polling &&
          (u++,
          this.once("pollComplete", function () {
            --u || i();
          })),
          this.writable ||
            (u++,
            this.once("drain", function () {
              --u || i();
            }));
      } else i();
    }
    _poll() {
      (this._polling = !0), this.doPoll(), this.emitReserved("poll");
    }
    onData(n) {
      const i = (u) => {
        if (
          (this.readyState === "opening" && u.type === "open" && this.onOpen(),
          u.type === "close")
        )
          return (
            this.onClose({ description: "transport closed by the server" }), !1
          );
        this.onPacket(u);
      };
      Zc(n, this.socket.binaryType).forEach(i),
        this.readyState !== "closed" &&
          ((this._polling = !1),
          this.emitReserved("pollComplete"),
          this.readyState === "open" && this._poll());
    }
    doClose() {
      const n = () => {
        this.write([{ type: "close" }]);
      };
      this.readyState === "open" ? n() : this.once("open", n);
    }
    write(n) {
      (this.writable = !1),
        $c(n, (i) => {
          this.doWrite(i, () => {
            (this.writable = !0), this.emitReserved("drain");
          });
        });
    }
    uri() {
      const n = this.opts.secure ? "https" : "http",
        i = this.query || {};
      return (
        this.opts.timestampRequests !== !1 &&
          (i[this.opts.timestampParam] = ko()),
        !this.supportsBinary && !i.sid && (i.b64 = 1),
        this.createUri(n, i)
      );
    }
  }
  let Po = !1;
  try {
    Po =
      typeof XMLHttpRequest < "u" && "withCredentials" in new XMLHttpRequest();
  } catch {}
  const fl = Po;
  function dl() {}
  class ml extends hl {
    constructor(n) {
      if ((super(n), typeof location < "u")) {
        const i = location.protocol === "https:";
        let u = location.port;
        u || (u = i ? "443" : "80"),
          (this.xd =
            (typeof location < "u" && n.hostname !== location.hostname) ||
            u !== n.port);
      }
    }
    doWrite(n, i) {
      const u = this.request({ method: "POST", data: n });
      u.on("success", i),
        u.on("error", (d, w) => {
          this.onError("xhr post error", d, w);
        });
    }
    doPoll() {
      const n = this.request();
      n.on("data", this.onData.bind(this)),
        n.on("error", (i, u) => {
          this.onError("xhr poll error", i, u);
        }),
        (this.pollXhr = n);
    }
  }
  class Gt extends je {
    constructor(n, i, u) {
      super(),
        (this.createRequest = n),
        jr(this, u),
        (this._opts = u),
        (this._method = u.method || "GET"),
        (this._uri = i),
        (this._data = u.data !== void 0 ? u.data : null),
        this._create();
    }
    _create() {
      var n;
      const i = Oo(
        this._opts,
        "agent",
        "pfx",
        "key",
        "passphrase",
        "cert",
        "ca",
        "ciphers",
        "rejectUnauthorized",
        "autoUnref",
      );
      i.xdomain = !!this._opts.xd;
      const u = (this._xhr = this.createRequest(i));
      try {
        u.open(this._method, this._uri, !0);
        try {
          if (this._opts.extraHeaders) {
            u.setDisableHeaderCheck && u.setDisableHeaderCheck(!0);
            for (let d in this._opts.extraHeaders)
              this._opts.extraHeaders.hasOwnProperty(d) &&
                u.setRequestHeader(d, this._opts.extraHeaders[d]);
          }
        } catch {}
        if (this._method === "POST")
          try {
            u.setRequestHeader("Content-type", "text/plain;charset=UTF-8");
          } catch {}
        try {
          u.setRequestHeader("Accept", "*/*");
        } catch {}
        (n = this._opts.cookieJar) === null || n === void 0 || n.addCookies(u),
          "withCredentials" in u &&
            (u.withCredentials = this._opts.withCredentials),
          this._opts.requestTimeout && (u.timeout = this._opts.requestTimeout),
          (u.onreadystatechange = () => {
            var d;
            u.readyState === 3 &&
              ((d = this._opts.cookieJar) === null ||
                d === void 0 ||
                d.parseCookies(u.getResponseHeader("set-cookie"))),
              u.readyState === 4 &&
                (u.status === 200 || u.status === 1223
                  ? this._onLoad()
                  : this.setTimeoutFn(() => {
                      this._onError(typeof u.status == "number" ? u.status : 0);
                    }, 0));
          }),
          u.send(this._data);
      } catch (d) {
        this.setTimeoutFn(() => {
          this._onError(d);
        }, 0);
        return;
      }
      typeof document < "u" &&
        ((this._index = Gt.requestsCount++), (Gt.requests[this._index] = this));
    }
    _onError(n) {
      this.emitReserved("error", n, this._xhr), this._cleanup(!0);
    }
    _cleanup(n) {
      if (!(typeof this._xhr > "u" || this._xhr === null)) {
        if (((this._xhr.onreadystatechange = dl), n))
          try {
            this._xhr.abort();
          } catch {}
        typeof document < "u" && delete Gt.requests[this._index],
          (this._xhr = null);
      }
    }
    _onLoad() {
      const n = this._xhr.responseText;
      n !== null &&
        (this.emitReserved("data", n),
        this.emitReserved("success"),
        this._cleanup());
    }
    abort() {
      this._cleanup();
    }
  }
  if (((Gt.requestsCount = 0), (Gt.requests = {}), typeof document < "u")) {
    if (typeof attachEvent == "function") attachEvent("onunload", Mo);
    else if (typeof addEventListener == "function") {
      const o = "onpagehide" in gt ? "pagehide" : "unload";
      addEventListener(o, Mo, !1);
    }
  }
  function Mo() {
    for (let o in Gt.requests)
      Gt.requests.hasOwnProperty(o) && Gt.requests[o].abort();
  }
  const pl = (function () {
    const o = Uo({ xdomain: !1 });
    return o && o.responseType !== null;
  })();
  class gl extends ml {
    constructor(n) {
      super(n);
      const i = n && n.forceBase64;
      this.supportsBinary = pl && !i;
    }
    request(n = {}) {
      return (
        Object.assign(n, { xd: this.xd }, this.opts), new Gt(Uo, this.uri(), n)
      );
    }
  }
  function Uo(o) {
    const n = o.xdomain;
    try {
      if (typeof XMLHttpRequest < "u" && (!n || fl))
        return new XMLHttpRequest();
    } catch {}
    if (!n)
      try {
        return new gt[["Active"].concat("Object").join("X")](
          "Microsoft.XMLHTTP",
        );
      } catch {}
  }
  const jo =
    typeof navigator < "u" &&
    typeof navigator.product == "string" &&
    navigator.product.toLowerCase() === "reactnative";
  class _l extends Ki {
    get name() {
      return "websocket";
    }
    doOpen() {
      const n = this.uri(),
        i = this.opts.protocols,
        u = jo
          ? {}
          : Oo(
              this.opts,
              "agent",
              "perMessageDeflate",
              "pfx",
              "key",
              "passphrase",
              "cert",
              "ca",
              "ciphers",
              "rejectUnauthorized",
              "localAddress",
              "protocolVersion",
              "origin",
              "maxPayload",
              "family",
              "checkServerIdentity",
            );
      this.opts.extraHeaders && (u.headers = this.opts.extraHeaders);
      try {
        this.ws = this.createSocket(n, i, u);
      } catch (d) {
        return this.emitReserved("error", d);
      }
      (this.ws.binaryType = this.socket.binaryType), this.addEventListeners();
    }
    addEventListeners() {
      (this.ws.onopen = () => {
        this.opts.autoUnref && this.ws._socket.unref(), this.onOpen();
      }),
        (this.ws.onclose = (n) =>
          this.onClose({
            description: "websocket connection closed",
            context: n,
          })),
        (this.ws.onmessage = (n) => this.onData(n.data)),
        (this.ws.onerror = (n) => this.onError("websocket error", n));
    }
    write(n) {
      this.writable = !1;
      for (let i = 0; i < n.length; i++) {
        const u = n[i],
          d = i === n.length - 1;
        Wi(u, this.supportsBinary, (w) => {
          try {
            this.doWrite(u, w);
          } catch {}
          d &&
            Ur(() => {
              (this.writable = !0), this.emitReserved("drain");
            }, this.setTimeoutFn);
        });
      }
    }
    doClose() {
      typeof this.ws < "u" &&
        ((this.ws.onerror = () => {}), this.ws.close(), (this.ws = null));
    }
    uri() {
      const n = this.opts.secure ? "wss" : "ws",
        i = this.query || {};
      return (
        this.opts.timestampRequests && (i[this.opts.timestampParam] = ko()),
        this.supportsBinary || (i.b64 = 1),
        this.createUri(n, i)
      );
    }
  }
  const Vi = gt.WebSocket || gt.MozWebSocket;
  let yl = class extends _l {
    createSocket(n, i, u) {
      return jo ? new Vi(n, i, u) : i ? new Vi(n, i) : new Vi(n);
    }
    doWrite(n, i) {
      this.ws.send(i);
    }
  };
  class xl extends Ki {
    get name() {
      return "webtransport";
    }
    doOpen() {
      try {
        this._transport = new WebTransport(
          this.createUri("https"),
          this.opts.transportOptions[this.name],
        );
      } catch (n) {
        return this.emitReserved("error", n);
      }
      this._transport.closed
        .then(() => {
          this.onClose();
        })
        .catch((n) => {
          this.onError("webtransport error", n);
        }),
        this._transport.ready.then(() => {
          this._transport.createBidirectionalStream().then((n) => {
            const i = el(Number.MAX_SAFE_INTEGER, this.socket.binaryType),
              u = n.readable.pipeThrough(i).getReader(),
              d = Qc();
            d.readable.pipeTo(n.writable),
              (this._writer = d.writable.getWriter());
            const w = () => {
              u.read()
                .then(({ done: R, value: g }) => {
                  R || (this.onPacket(g), w());
                })
                .catch((R) => {});
            };
            w();
            const x = { type: "open" };
            this.query.sid && (x.data = `{"sid":"${this.query.sid}"}`),
              this._writer.write(x).then(() => this.onOpen());
          });
        });
    }
    write(n) {
      this.writable = !1;
      for (let i = 0; i < n.length; i++) {
        const u = n[i],
          d = i === n.length - 1;
        this._writer.write(u).then(() => {
          d &&
            Ur(() => {
              (this.writable = !0), this.emitReserved("drain");
            }, this.setTimeoutFn);
        });
      }
    }
    doClose() {
      var n;
      (n = this._transport) === null || n === void 0 || n.close();
    }
  }
  const vl = { websocket: yl, webtransport: xl, polling: gl },
    El =
      /^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
    wl = [
      "source",
      "protocol",
      "authority",
      "userInfo",
      "user",
      "password",
      "host",
      "port",
      "relative",
      "path",
      "directory",
      "file",
      "query",
      "anchor",
    ];
  function Ji(o) {
    if (o.length > 8e3) throw "URI too long";
    const n = o,
      i = o.indexOf("["),
      u = o.indexOf("]");
    i != -1 &&
      u != -1 &&
      (o =
        o.substring(0, i) +
        o.substring(i, u).replace(/:/g, ";") +
        o.substring(u, o.length));
    let d = El.exec(o || ""),
      w = {},
      x = 14;
    for (; x--; ) w[wl[x]] = d[x] || "";
    return (
      i != -1 &&
        u != -1 &&
        ((w.source = n),
        (w.host = w.host.substring(1, w.host.length - 1).replace(/;/g, ":")),
        (w.authority = w.authority
          .replace("[", "")
          .replace("]", "")
          .replace(/;/g, ":")),
        (w.ipv6uri = !0)),
      (w.pathNames = bl(w, w.path)),
      (w.queryKey = Al(w, w.query)),
      w
    );
  }
  function bl(o, n) {
    const i = /\/{2,9}/g,
      u = n.replace(i, "/").split("/");
    return (
      (n.slice(0, 1) == "/" || n.length === 0) && u.splice(0, 1),
      n.slice(-1) == "/" && u.splice(u.length - 1, 1),
      u
    );
  }
  function Al(o, n) {
    const i = {};
    return (
      n.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function (u, d, w) {
        d && (i[d] = w);
      }),
      i
    );
  }
  const Yi =
      typeof addEventListener == "function" &&
      typeof removeEventListener == "function",
    Dr = [];
  Yi &&
    addEventListener(
      "offline",
      () => {
        Dr.forEach((o) => o());
      },
      !1,
    );
  class cn extends je {
    constructor(n, i) {
      if (
        (super(),
        (this.binaryType = nl),
        (this.writeBuffer = []),
        (this._prevBufferLen = 0),
        (this._pingInterval = -1),
        (this._pingTimeout = -1),
        (this._maxPayload = -1),
        (this._pingTimeoutTime = 1 / 0),
        n && typeof n == "object" && ((i = n), (n = null)),
        n)
      ) {
        const u = Ji(n);
        (i.hostname = u.host),
          (i.secure = u.protocol === "https" || u.protocol === "wss"),
          (i.port = u.port),
          u.query && (i.query = u.query);
      } else i.host && (i.hostname = Ji(i.host).host);
      jr(this, i),
        (this.secure =
          i.secure != null
            ? i.secure
            : typeof location < "u" && location.protocol === "https:"),
        i.hostname && !i.port && (i.port = this.secure ? "443" : "80"),
        (this.hostname =
          i.hostname ||
          (typeof location < "u" ? location.hostname : "localhost")),
        (this.port =
          i.port ||
          (typeof location < "u" && location.port
            ? location.port
            : this.secure
              ? "443"
              : "80")),
        (this.transports = []),
        (this._transportsByName = {}),
        i.transports.forEach((u) => {
          const d = u.prototype.name;
          this.transports.push(d), (this._transportsByName[d] = u);
        }),
        (this.opts = Object.assign(
          {
            path: "/engine.io",
            agent: !1,
            withCredentials: !1,
            upgrade: !0,
            timestampParam: "t",
            rememberUpgrade: !1,
            addTrailingSlash: !0,
            rejectUnauthorized: !0,
            perMessageDeflate: { threshold: 1024 },
            transportOptions: {},
            closeOnBeforeunload: !1,
          },
          i,
        )),
        (this.opts.path =
          this.opts.path.replace(/\/$/, "") +
          (this.opts.addTrailingSlash ? "/" : "")),
        typeof this.opts.query == "string" &&
          (this.opts.query = cl(this.opts.query)),
        Yi &&
          (this.opts.closeOnBeforeunload &&
            ((this._beforeunloadEventListener = () => {
              this.transport &&
                (this.transport.removeAllListeners(), this.transport.close());
            }),
            addEventListener(
              "beforeunload",
              this._beforeunloadEventListener,
              !1,
            )),
          this.hostname !== "localhost" &&
            ((this._offlineEventListener = () => {
              this._onClose("transport close", {
                description: "network connection lost",
              });
            }),
            Dr.push(this._offlineEventListener))),
        this.opts.withCredentials && (this._cookieJar = void 0),
        this._open();
    }
    createTransport(n) {
      const i = Object.assign({}, this.opts.query);
      (i.EIO = No), (i.transport = n), this.id && (i.sid = this.id);
      const u = Object.assign(
        {},
        this.opts,
        {
          query: i,
          socket: this,
          hostname: this.hostname,
          secure: this.secure,
          port: this.port,
        },
        this.opts.transportOptions[n],
      );
      return new this._transportsByName[n](u);
    }
    _open() {
      if (this.transports.length === 0) {
        this.setTimeoutFn(() => {
          this.emitReserved("error", "No transports available");
        }, 0);
        return;
      }
      const n =
        this.opts.rememberUpgrade &&
        cn.priorWebsocketSuccess &&
        this.transports.indexOf("websocket") !== -1
          ? "websocket"
          : this.transports[0];
      this.readyState = "opening";
      const i = this.createTransport(n);
      i.open(), this.setTransport(i);
    }
    setTransport(n) {
      this.transport && this.transport.removeAllListeners(),
        (this.transport = n),
        n
          .on("drain", this._onDrain.bind(this))
          .on("packet", this._onPacket.bind(this))
          .on("error", this._onError.bind(this))
          .on("close", (i) => this._onClose("transport close", i));
    }
    onOpen() {
      (this.readyState = "open"),
        (cn.priorWebsocketSuccess = this.transport.name === "websocket"),
        this.emitReserved("open"),
        this.flush();
    }
    _onPacket(n) {
      if (
        this.readyState === "opening" ||
        this.readyState === "open" ||
        this.readyState === "closing"
      )
        switch (
          (this.emitReserved("packet", n),
          this.emitReserved("heartbeat"),
          n.type)
        ) {
          case "open":
            this.onHandshake(JSON.parse(n.data));
            break;
          case "ping":
            this._sendPacket("pong"),
              this.emitReserved("ping"),
              this.emitReserved("pong"),
              this._resetPingTimeout();
            break;
          case "error":
            const i = new Error("server error");
            (i.code = n.data), this._onError(i);
            break;
          case "message":
            this.emitReserved("data", n.data),
              this.emitReserved("message", n.data);
            break;
        }
    }
    onHandshake(n) {
      this.emitReserved("handshake", n),
        (this.id = n.sid),
        (this.transport.query.sid = n.sid),
        (this._pingInterval = n.pingInterval),
        (this._pingTimeout = n.pingTimeout),
        (this._maxPayload = n.maxPayload),
        this.onOpen(),
        this.readyState !== "closed" && this._resetPingTimeout();
    }
    _resetPingTimeout() {
      this.clearTimeoutFn(this._pingTimeoutTimer);
      const n = this._pingInterval + this._pingTimeout;
      (this._pingTimeoutTime = Date.now() + n),
        (this._pingTimeoutTimer = this.setTimeoutFn(() => {
          this._onClose("ping timeout");
        }, n)),
        this.opts.autoUnref && this._pingTimeoutTimer.unref();
    }
    _onDrain() {
      this.writeBuffer.splice(0, this._prevBufferLen),
        (this._prevBufferLen = 0),
        this.writeBuffer.length === 0
          ? this.emitReserved("drain")
          : this.flush();
    }
    flush() {
      if (
        this.readyState !== "closed" &&
        this.transport.writable &&
        !this.upgrading &&
        this.writeBuffer.length
      ) {
        const n = this._getWritablePackets();
        this.transport.send(n),
          (this._prevBufferLen = n.length),
          this.emitReserved("flush");
      }
    }
    _getWritablePackets() {
      if (
        !(
          this._maxPayload &&
          this.transport.name === "polling" &&
          this.writeBuffer.length > 1
        )
      )
        return this.writeBuffer;
      let i = 1;
      for (let u = 0; u < this.writeBuffer.length; u++) {
        const d = this.writeBuffer[u].data;
        if ((d && (i += ol(d)), u > 0 && i > this._maxPayload))
          return this.writeBuffer.slice(0, u);
        i += 2;
      }
      return this.writeBuffer;
    }
    _hasPingExpired() {
      if (!this._pingTimeoutTime) return !0;
      const n = Date.now() > this._pingTimeoutTime;
      return (
        n &&
          ((this._pingTimeoutTime = 0),
          Ur(() => {
            this._onClose("ping timeout");
          }, this.setTimeoutFn)),
        n
      );
    }
    write(n, i, u) {
      return this._sendPacket("message", n, i, u), this;
    }
    send(n, i, u) {
      return this._sendPacket("message", n, i, u), this;
    }
    _sendPacket(n, i, u, d) {
      if (
        (typeof i == "function" && ((d = i), (i = void 0)),
        typeof u == "function" && ((d = u), (u = null)),
        this.readyState === "closing" || this.readyState === "closed")
      )
        return;
      (u = u || {}), (u.compress = u.compress !== !1);
      const w = { type: n, data: i, options: u };
      this.emitReserved("packetCreate", w),
        this.writeBuffer.push(w),
        d && this.once("flush", d),
        this.flush();
    }
    close() {
      const n = () => {
          this._onClose("forced close"), this.transport.close();
        },
        i = () => {
          this.off("upgrade", i), this.off("upgradeError", i), n();
        },
        u = () => {
          this.once("upgrade", i), this.once("upgradeError", i);
        };
      return (
        (this.readyState === "opening" || this.readyState === "open") &&
          ((this.readyState = "closing"),
          this.writeBuffer.length
            ? this.once("drain", () => {
                this.upgrading ? u() : n();
              })
            : this.upgrading
              ? u()
              : n()),
        this
      );
    }
    _onError(n) {
      if (
        ((cn.priorWebsocketSuccess = !1),
        this.opts.tryAllTransports &&
          this.transports.length > 1 &&
          this.readyState === "opening")
      )
        return this.transports.shift(), this._open();
      this.emitReserved("error", n), this._onClose("transport error", n);
    }
    _onClose(n, i) {
      if (
        this.readyState === "opening" ||
        this.readyState === "open" ||
        this.readyState === "closing"
      ) {
        if (
          (this.clearTimeoutFn(this._pingTimeoutTimer),
          this.transport.removeAllListeners("close"),
          this.transport.close(),
          this.transport.removeAllListeners(),
          Yi &&
            (this._beforeunloadEventListener &&
              removeEventListener(
                "beforeunload",
                this._beforeunloadEventListener,
                !1,
              ),
            this._offlineEventListener))
        ) {
          const u = Dr.indexOf(this._offlineEventListener);
          u !== -1 && Dr.splice(u, 1);
        }
        (this.readyState = "closed"),
          (this.id = null),
          this.emitReserved("close", n, i),
          (this.writeBuffer = []),
          (this._prevBufferLen = 0);
      }
    }
  }
  cn.protocol = No;
  class Sl extends cn {
    constructor() {
      super(...arguments), (this._upgrades = []);
    }
    onOpen() {
      if ((super.onOpen(), this.readyState === "open" && this.opts.upgrade))
        for (let n = 0; n < this._upgrades.length; n++)
          this._probe(this._upgrades[n]);
    }
    _probe(n) {
      let i = this.createTransport(n),
        u = !1;
      cn.priorWebsocketSuccess = !1;
      const d = () => {
        u ||
          (i.send([{ type: "ping", data: "probe" }]),
          i.once("packet", (T) => {
            if (!u)
              if (T.type === "pong" && T.data === "probe") {
                if (
                  ((this.upgrading = !0), this.emitReserved("upgrading", i), !i)
                )
                  return;
                (cn.priorWebsocketSuccess = i.name === "websocket"),
                  this.transport.pause(() => {
                    u ||
                      (this.readyState !== "closed" &&
                        (_(),
                        this.setTransport(i),
                        i.send([{ type: "upgrade" }]),
                        this.emitReserved("upgrade", i),
                        (i = null),
                        (this.upgrading = !1),
                        this.flush()));
                  });
              } else {
                const b = new Error("probe error");
                (b.transport = i.name), this.emitReserved("upgradeError", b);
              }
          }));
      };
      function w() {
        u || ((u = !0), _(), i.close(), (i = null));
      }
      const x = (T) => {
        const b = new Error("probe error: " + T);
        (b.transport = i.name), w(), this.emitReserved("upgradeError", b);
      };
      function R() {
        x("transport closed");
      }
      function g() {
        x("socket closed");
      }
      function p(T) {
        i && T.name !== i.name && w();
      }
      const _ = () => {
        i.removeListener("open", d),
          i.removeListener("error", x),
          i.removeListener("close", R),
          this.off("close", g),
          this.off("upgrading", p);
      };
      i.once("open", d),
        i.once("error", x),
        i.once("close", R),
        this.once("close", g),
        this.once("upgrading", p),
        this._upgrades.indexOf("webtransport") !== -1 && n !== "webtransport"
          ? this.setTimeoutFn(() => {
              u || i.open();
            }, 200)
          : i.open();
    }
    onHandshake(n) {
      (this._upgrades = this._filterUpgrades(n.upgrades)), super.onHandshake(n);
    }
    _filterUpgrades(n) {
      const i = [];
      for (let u = 0; u < n.length; u++)
        ~this.transports.indexOf(n[u]) && i.push(n[u]);
      return i;
    }
  }
  let Cl = class extends Sl {
    constructor(n, i = {}) {
      const u = typeof n == "object" ? n : i;
      (!u.transports || (u.transports && typeof u.transports[0] == "string")) &&
        (u.transports = (
          u.transports || ["polling", "websocket", "webtransport"]
        )
          .map((d) => vl[d])
          .filter((d) => !!d)),
        super(n, u);
    }
  };
  function Rl(o, n = "", i) {
    let u = o;
    (i = i || (typeof location < "u" && location)),
      o == null && (o = i.protocol + "//" + i.host),
      typeof o == "string" &&
        (o.charAt(0) === "/" &&
          (o.charAt(1) === "/" ? (o = i.protocol + o) : (o = i.host + o)),
        /^(https?|wss?):\/\//.test(o) ||
          (typeof i < "u" ? (o = i.protocol + "//" + o) : (o = "https://" + o)),
        (u = Ji(o))),
      u.port ||
        (/^(http|ws)$/.test(u.protocol)
          ? (u.port = "80")
          : /^(http|ws)s$/.test(u.protocol) && (u.port = "443")),
      (u.path = u.path || "/");
    const w = u.host.indexOf(":") !== -1 ? "[" + u.host + "]" : u.host;
    return (
      (u.id = u.protocol + "://" + w + ":" + u.port + n),
      (u.href =
        u.protocol + "://" + w + (i && i.port === u.port ? "" : ":" + u.port)),
      u
    );
  }
  const Tl = typeof ArrayBuffer == "function",
    Il = (o) =>
      typeof ArrayBuffer.isView == "function"
        ? ArrayBuffer.isView(o)
        : o.buffer instanceof ArrayBuffer,
    Do = Object.prototype.toString,
    Fl =
      typeof Blob == "function" ||
      (typeof Blob < "u" && Do.call(Blob) === "[object BlobConstructor]"),
    Bl =
      typeof File == "function" ||
      (typeof File < "u" && Do.call(File) === "[object FileConstructor]");
  function Xi(o) {
    return (
      (Tl && (o instanceof ArrayBuffer || Il(o))) ||
      (Fl && o instanceof Blob) ||
      (Bl && o instanceof File)
    );
  }
  function Gr(o, n) {
    if (!o || typeof o != "object") return !1;
    if (Array.isArray(o)) {
      for (let i = 0, u = o.length; i < u; i++) if (Gr(o[i])) return !0;
      return !1;
    }
    if (Xi(o)) return !0;
    if (o.toJSON && typeof o.toJSON == "function" && arguments.length === 1)
      return Gr(o.toJSON(), !0);
    for (const i in o)
      if (Object.prototype.hasOwnProperty.call(o, i) && Gr(o[i])) return !0;
    return !1;
  }
  function Ll(o) {
    const n = [],
      i = o.data,
      u = o;
    return (
      (u.data = $i(i, n)), (u.attachments = n.length), { packet: u, buffers: n }
    );
  }
  function $i(o, n) {
    if (!o) return o;
    if (Xi(o)) {
      const i = { _placeholder: !0, num: n.length };
      return n.push(o), i;
    } else if (Array.isArray(o)) {
      const i = new Array(o.length);
      for (let u = 0; u < o.length; u++) i[u] = $i(o[u], n);
      return i;
    } else if (typeof o == "object" && !(o instanceof Date)) {
      const i = {};
      for (const u in o)
        Object.prototype.hasOwnProperty.call(o, u) && (i[u] = $i(o[u], n));
      return i;
    }
    return o;
  }
  function Nl(o, n) {
    return (o.data = Zi(o.data, n)), delete o.attachments, o;
  }
  function Zi(o, n) {
    if (!o) return o;
    if (o && o._placeholder === !0) {
      if (typeof o.num == "number" && o.num >= 0 && o.num < n.length)
        return n[o.num];
      throw new Error("illegal attachments");
    } else if (Array.isArray(o))
      for (let i = 0; i < o.length; i++) o[i] = Zi(o[i], n);
    else if (typeof o == "object")
      for (const i in o)
        Object.prototype.hasOwnProperty.call(o, i) && (o[i] = Zi(o[i], n));
    return o;
  }
  const Ol = [
      "connect",
      "connect_error",
      "disconnect",
      "disconnecting",
      "newListener",
      "removeListener",
    ],
    kl = 5;
  var he;
  (function (o) {
    (o[(o.CONNECT = 0)] = "CONNECT"),
      (o[(o.DISCONNECT = 1)] = "DISCONNECT"),
      (o[(o.EVENT = 2)] = "EVENT"),
      (o[(o.ACK = 3)] = "ACK"),
      (o[(o.CONNECT_ERROR = 4)] = "CONNECT_ERROR"),
      (o[(o.BINARY_EVENT = 5)] = "BINARY_EVENT"),
      (o[(o.BINARY_ACK = 6)] = "BINARY_ACK");
  })(he || (he = {}));
  class Pl {
    constructor(n) {
      this.replacer = n;
    }
    encode(n) {
      return (n.type === he.EVENT || n.type === he.ACK) && Gr(n)
        ? this.encodeAsBinary({
            type: n.type === he.EVENT ? he.BINARY_EVENT : he.BINARY_ACK,
            nsp: n.nsp,
            data: n.data,
            id: n.id,
          })
        : [this.encodeAsString(n)];
    }
    encodeAsString(n) {
      let i = "" + n.type;
      return (
        (n.type === he.BINARY_EVENT || n.type === he.BINARY_ACK) &&
          (i += n.attachments + "-"),
        n.nsp && n.nsp !== "/" && (i += n.nsp + ","),
        n.id != null && (i += n.id),
        n.data != null && (i += JSON.stringify(n.data, this.replacer)),
        i
      );
    }
    encodeAsBinary(n) {
      const i = Ll(n),
        u = this.encodeAsString(i.packet),
        d = i.buffers;
      return d.unshift(u), d;
    }
  }
  function Go(o) {
    return Object.prototype.toString.call(o) === "[object Object]";
  }
  class Qi extends je {
    constructor(n) {
      super(), (this.reviver = n);
    }
    add(n) {
      let i;
      if (typeof n == "string") {
        if (this.reconstructor)
          throw new Error("got plaintext data when reconstructing a packet");
        i = this.decodeString(n);
        const u = i.type === he.BINARY_EVENT;
        u || i.type === he.BINARY_ACK
          ? ((i.type = u ? he.EVENT : he.ACK),
            (this.reconstructor = new Ml(i)),
            i.attachments === 0 && super.emitReserved("decoded", i))
          : super.emitReserved("decoded", i);
      } else if (Xi(n) || n.base64)
        if (this.reconstructor)
          (i = this.reconstructor.takeBinaryData(n)),
            i &&
              ((this.reconstructor = null), super.emitReserved("decoded", i));
        else
          throw new Error("got binary data when not reconstructing a packet");
      else throw new Error("Unknown type: " + n);
    }
    decodeString(n) {
      let i = 0;
      const u = { type: Number(n.charAt(0)) };
      if (he[u.type] === void 0)
        throw new Error("unknown packet type " + u.type);
      if (u.type === he.BINARY_EVENT || u.type === he.BINARY_ACK) {
        const w = i + 1;
        for (; n.charAt(++i) !== "-" && i != n.length; );
        const x = n.substring(w, i);
        if (x != Number(x) || n.charAt(i) !== "-")
          throw new Error("Illegal attachments");
        u.attachments = Number(x);
      }
      if (n.charAt(i + 1) === "/") {
        const w = i + 1;
        for (; ++i && !(n.charAt(i) === "," || i === n.length); );
        u.nsp = n.substring(w, i);
      } else u.nsp = "/";
      const d = n.charAt(i + 1);
      if (d !== "" && Number(d) == d) {
        const w = i + 1;
        for (; ++i; ) {
          const x = n.charAt(i);
          if (x == null || Number(x) != x) {
            --i;
            break;
          }
          if (i === n.length) break;
        }
        u.id = Number(n.substring(w, i + 1));
      }
      if (n.charAt(++i)) {
        const w = this.tryParse(n.substr(i));
        if (Qi.isPayloadValid(u.type, w)) u.data = w;
        else throw new Error("invalid payload");
      }
      return u;
    }
    tryParse(n) {
      try {
        return JSON.parse(n, this.reviver);
      } catch {
        return !1;
      }
    }
    static isPayloadValid(n, i) {
      switch (n) {
        case he.CONNECT:
          return Go(i);
        case he.DISCONNECT:
          return i === void 0;
        case he.CONNECT_ERROR:
          return typeof i == "string" || Go(i);
        case he.EVENT:
        case he.BINARY_EVENT:
          return (
            Array.isArray(i) &&
            (typeof i[0] == "number" ||
              (typeof i[0] == "string" && Ol.indexOf(i[0]) === -1))
          );
        case he.ACK:
        case he.BINARY_ACK:
          return Array.isArray(i);
      }
    }
    destroy() {
      this.reconstructor &&
        (this.reconstructor.finishedReconstruction(),
        (this.reconstructor = null));
    }
  }
  class Ml {
    constructor(n) {
      (this.packet = n), (this.buffers = []), (this.reconPack = n);
    }
    takeBinaryData(n) {
      if (
        (this.buffers.push(n),
        this.buffers.length === this.reconPack.attachments)
      ) {
        const i = Nl(this.reconPack, this.buffers);
        return this.finishedReconstruction(), i;
      }
      return null;
    }
    finishedReconstruction() {
      (this.reconPack = null), (this.buffers = []);
    }
  }
  const Ul = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        Decoder: Qi,
        Encoder: Pl,
        get PacketType() {
          return he;
        },
        protocol: kl,
      },
      Symbol.toStringTag,
      { value: "Module" },
    ),
  );
  function It(o, n, i) {
    return (
      o.on(n, i),
      function () {
        o.off(n, i);
      }
    );
  }
  const jl = Object.freeze({
    connect: 1,
    connect_error: 1,
    disconnect: 1,
    disconnecting: 1,
    newListener: 1,
    removeListener: 1,
  });
  class Wo extends je {
    constructor(n, i, u) {
      super(),
        (this.connected = !1),
        (this.recovered = !1),
        (this.receiveBuffer = []),
        (this.sendBuffer = []),
        (this._queue = []),
        (this._queueSeq = 0),
        (this.ids = 0),
        (this.acks = {}),
        (this.flags = {}),
        (this.io = n),
        (this.nsp = i),
        u && u.auth && (this.auth = u.auth),
        (this._opts = Object.assign({}, u)),
        this.io._autoConnect && this.open();
    }
    get disconnected() {
      return !this.connected;
    }
    subEvents() {
      if (this.subs) return;
      const n = this.io;
      this.subs = [
        It(n, "open", this.onopen.bind(this)),
        It(n, "packet", this.onpacket.bind(this)),
        It(n, "error", this.onerror.bind(this)),
        It(n, "close", this.onclose.bind(this)),
      ];
    }
    get active() {
      return !!this.subs;
    }
    connect() {
      return this.connected
        ? this
        : (this.subEvents(),
          this.io._reconnecting || this.io.open(),
          this.io._readyState === "open" && this.onopen(),
          this);
    }
    open() {
      return this.connect();
    }
    send(...n) {
      return n.unshift("message"), this.emit.apply(this, n), this;
    }
    emit(n, ...i) {
      var u, d, w;
      if (jl.hasOwnProperty(n))
        throw new Error('"' + n.toString() + '" is a reserved event name');
      if (
        (i.unshift(n),
        this._opts.retries && !this.flags.fromQueue && !this.flags.volatile)
      )
        return this._addToQueue(i), this;
      const x = { type: he.EVENT, data: i };
      if (
        ((x.options = {}),
        (x.options.compress = this.flags.compress !== !1),
        typeof i[i.length - 1] == "function")
      ) {
        const _ = this.ids++,
          T = i.pop();
        this._registerAckCallback(_, T), (x.id = _);
      }
      const R =
          (d =
            (u = this.io.engine) === null || u === void 0
              ? void 0
              : u.transport) === null || d === void 0
            ? void 0
            : d.writable,
        g =
          this.connected &&
          !(
            !((w = this.io.engine) === null || w === void 0) &&
            w._hasPingExpired()
          );
      return (
        (this.flags.volatile && !R) ||
          (g
            ? (this.notifyOutgoingListeners(x), this.packet(x))
            : this.sendBuffer.push(x)),
        (this.flags = {}),
        this
      );
    }
    _registerAckCallback(n, i) {
      var u;
      const d =
        (u = this.flags.timeout) !== null && u !== void 0
          ? u
          : this._opts.ackTimeout;
      if (d === void 0) {
        this.acks[n] = i;
        return;
      }
      const w = this.io.setTimeoutFn(() => {
          delete this.acks[n];
          for (let R = 0; R < this.sendBuffer.length; R++)
            this.sendBuffer[R].id === n && this.sendBuffer.splice(R, 1);
          i.call(this, new Error("operation has timed out"));
        }, d),
        x = (...R) => {
          this.io.clearTimeoutFn(w), i.apply(this, R);
        };
      (x.withError = !0), (this.acks[n] = x);
    }
    emitWithAck(n, ...i) {
      return new Promise((u, d) => {
        const w = (x, R) => (x ? d(x) : u(R));
        (w.withError = !0), i.push(w), this.emit(n, ...i);
      });
    }
    _addToQueue(n) {
      let i;
      typeof n[n.length - 1] == "function" && (i = n.pop());
      const u = {
        id: this._queueSeq++,
        tryCount: 0,
        pending: !1,
        args: n,
        flags: Object.assign({ fromQueue: !0 }, this.flags),
      };
      n.push((d, ...w) =>
        u !== this._queue[0]
          ? void 0
          : (d !== null
              ? u.tryCount > this._opts.retries &&
                (this._queue.shift(), i && i(d))
              : (this._queue.shift(), i && i(null, ...w)),
            (u.pending = !1),
            this._drainQueue()),
      ),
        this._queue.push(u),
        this._drainQueue();
    }
    _drainQueue(n = !1) {
      if (!this.connected || this._queue.length === 0) return;
      const i = this._queue[0];
      (i.pending && !n) ||
        ((i.pending = !0),
        i.tryCount++,
        (this.flags = i.flags),
        this.emit.apply(this, i.args));
    }
    packet(n) {
      (n.nsp = this.nsp), this.io._packet(n);
    }
    onopen() {
      typeof this.auth == "function"
        ? this.auth((n) => {
            this._sendConnectPacket(n);
          })
        : this._sendConnectPacket(this.auth);
    }
    _sendConnectPacket(n) {
      this.packet({
        type: he.CONNECT,
        data: this._pid
          ? Object.assign({ pid: this._pid, offset: this._lastOffset }, n)
          : n,
      });
    }
    onerror(n) {
      this.connected || this.emitReserved("connect_error", n);
    }
    onclose(n, i) {
      (this.connected = !1),
        delete this.id,
        this.emitReserved("disconnect", n, i),
        this._clearAcks();
    }
    _clearAcks() {
      Object.keys(this.acks).forEach((n) => {
        if (!this.sendBuffer.some((u) => String(u.id) === n)) {
          const u = this.acks[n];
          delete this.acks[n],
            u.withError &&
              u.call(this, new Error("socket has been disconnected"));
        }
      });
    }
    onpacket(n) {
      if (n.nsp === this.nsp)
        switch (n.type) {
          case he.CONNECT:
            n.data && n.data.sid
              ? this.onconnect(n.data.sid, n.data.pid)
              : this.emitReserved(
                  "connect_error",
                  new Error(
                    "It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)",
                  ),
                );
            break;
          case he.EVENT:
          case he.BINARY_EVENT:
            this.onevent(n);
            break;
          case he.ACK:
          case he.BINARY_ACK:
            this.onack(n);
            break;
          case he.DISCONNECT:
            this.ondisconnect();
            break;
          case he.CONNECT_ERROR:
            this.destroy();
            const u = new Error(n.data.message);
            (u.data = n.data.data), this.emitReserved("connect_error", u);
            break;
        }
    }
    onevent(n) {
      const i = n.data || [];
      n.id != null && i.push(this.ack(n.id)),
        this.connected
          ? this.emitEvent(i)
          : this.receiveBuffer.push(Object.freeze(i));
    }
    emitEvent(n) {
      if (this._anyListeners && this._anyListeners.length) {
        const i = this._anyListeners.slice();
        for (const u of i) u.apply(this, n);
      }
      super.emit.apply(this, n),
        this._pid &&
          n.length &&
          typeof n[n.length - 1] == "string" &&
          (this._lastOffset = n[n.length - 1]);
    }
    ack(n) {
      const i = this;
      let u = !1;
      return function (...d) {
        u || ((u = !0), i.packet({ type: he.ACK, id: n, data: d }));
      };
    }
    onack(n) {
      const i = this.acks[n.id];
      typeof i == "function" &&
        (delete this.acks[n.id],
        i.withError && n.data.unshift(null),
        i.apply(this, n.data));
    }
    onconnect(n, i) {
      (this.id = n),
        (this.recovered = i && this._pid === i),
        (this._pid = i),
        (this.connected = !0),
        this.emitBuffered(),
        this.emitReserved("connect"),
        this._drainQueue(!0);
    }
    emitBuffered() {
      this.receiveBuffer.forEach((n) => this.emitEvent(n)),
        (this.receiveBuffer = []),
        this.sendBuffer.forEach((n) => {
          this.notifyOutgoingListeners(n), this.packet(n);
        }),
        (this.sendBuffer = []);
    }
    ondisconnect() {
      this.destroy(), this.onclose("io server disconnect");
    }
    destroy() {
      this.subs && (this.subs.forEach((n) => n()), (this.subs = void 0)),
        this.io._destroy(this);
    }
    disconnect() {
      return (
        this.connected && this.packet({ type: he.DISCONNECT }),
        this.destroy(),
        this.connected && this.onclose("io client disconnect"),
        this
      );
    }
    close() {
      return this.disconnect();
    }
    compress(n) {
      return (this.flags.compress = n), this;
    }
    get volatile() {
      return (this.flags.volatile = !0), this;
    }
    timeout(n) {
      return (this.flags.timeout = n), this;
    }
    onAny(n) {
      return (
        (this._anyListeners = this._anyListeners || []),
        this._anyListeners.push(n),
        this
      );
    }
    prependAny(n) {
      return (
        (this._anyListeners = this._anyListeners || []),
        this._anyListeners.unshift(n),
        this
      );
    }
    offAny(n) {
      if (!this._anyListeners) return this;
      if (n) {
        const i = this._anyListeners;
        for (let u = 0; u < i.length; u++)
          if (n === i[u]) return i.splice(u, 1), this;
      } else this._anyListeners = [];
      return this;
    }
    listenersAny() {
      return this._anyListeners || [];
    }
    onAnyOutgoing(n) {
      return (
        (this._anyOutgoingListeners = this._anyOutgoingListeners || []),
        this._anyOutgoingListeners.push(n),
        this
      );
    }
    prependAnyOutgoing(n) {
      return (
        (this._anyOutgoingListeners = this._anyOutgoingListeners || []),
        this._anyOutgoingListeners.unshift(n),
        this
      );
    }
    offAnyOutgoing(n) {
      if (!this._anyOutgoingListeners) return this;
      if (n) {
        const i = this._anyOutgoingListeners;
        for (let u = 0; u < i.length; u++)
          if (n === i[u]) return i.splice(u, 1), this;
      } else this._anyOutgoingListeners = [];
      return this;
    }
    listenersAnyOutgoing() {
      return this._anyOutgoingListeners || [];
    }
    notifyOutgoingListeners(n) {
      if (this._anyOutgoingListeners && this._anyOutgoingListeners.length) {
        const i = this._anyOutgoingListeners.slice();
        for (const u of i) u.apply(this, n.data);
      }
    }
  }
  function Dn(o) {
    (o = o || {}),
      (this.ms = o.min || 100),
      (this.max = o.max || 1e4),
      (this.factor = o.factor || 2),
      (this.jitter = o.jitter > 0 && o.jitter <= 1 ? o.jitter : 0),
      (this.attempts = 0);
  }
  (Dn.prototype.duration = function () {
    var o = this.ms * Math.pow(this.factor, this.attempts++);
    if (this.jitter) {
      var n = Math.random(),
        i = Math.floor(n * this.jitter * o);
      o = (Math.floor(n * 10) & 1) == 0 ? o - i : o + i;
    }
    return Math.min(o, this.max) | 0;
  }),
    (Dn.prototype.reset = function () {
      this.attempts = 0;
    }),
    (Dn.prototype.setMin = function (o) {
      this.ms = o;
    }),
    (Dn.prototype.setMax = function (o) {
      this.max = o;
    }),
    (Dn.prototype.setJitter = function (o) {
      this.jitter = o;
    });
  class es extends je {
    constructor(n, i) {
      var u;
      super(),
        (this.nsps = {}),
        (this.subs = []),
        n && typeof n == "object" && ((i = n), (n = void 0)),
        (i = i || {}),
        (i.path = i.path || "/socket.io"),
        (this.opts = i),
        jr(this, i),
        this.reconnection(i.reconnection !== !1),
        this.reconnectionAttempts(i.reconnectionAttempts || 1 / 0),
        this.reconnectionDelay(i.reconnectionDelay || 1e3),
        this.reconnectionDelayMax(i.reconnectionDelayMax || 5e3),
        this.randomizationFactor(
          (u = i.randomizationFactor) !== null && u !== void 0 ? u : 0.5,
        ),
        (this.backoff = new Dn({
          min: this.reconnectionDelay(),
          max: this.reconnectionDelayMax(),
          jitter: this.randomizationFactor(),
        })),
        this.timeout(i.timeout == null ? 2e4 : i.timeout),
        (this._readyState = "closed"),
        (this.uri = n);
      const d = i.parser || Ul;
      (this.encoder = new d.Encoder()),
        (this.decoder = new d.Decoder()),
        (this._autoConnect = i.autoConnect !== !1),
        this._autoConnect && this.open();
    }
    reconnection(n) {
      return arguments.length
        ? ((this._reconnection = !!n), n || (this.skipReconnect = !0), this)
        : this._reconnection;
    }
    reconnectionAttempts(n) {
      return n === void 0
        ? this._reconnectionAttempts
        : ((this._reconnectionAttempts = n), this);
    }
    reconnectionDelay(n) {
      var i;
      return n === void 0
        ? this._reconnectionDelay
        : ((this._reconnectionDelay = n),
          (i = this.backoff) === null || i === void 0 || i.setMin(n),
          this);
    }
    randomizationFactor(n) {
      var i;
      return n === void 0
        ? this._randomizationFactor
        : ((this._randomizationFactor = n),
          (i = this.backoff) === null || i === void 0 || i.setJitter(n),
          this);
    }
    reconnectionDelayMax(n) {
      var i;
      return n === void 0
        ? this._reconnectionDelayMax
        : ((this._reconnectionDelayMax = n),
          (i = this.backoff) === null || i === void 0 || i.setMax(n),
          this);
    }
    timeout(n) {
      return arguments.length ? ((this._timeout = n), this) : this._timeout;
    }
    maybeReconnectOnOpen() {
      !this._reconnecting &&
        this._reconnection &&
        this.backoff.attempts === 0 &&
        this.reconnect();
    }
    open(n) {
      if (~this._readyState.indexOf("open")) return this;
      this.engine = new Cl(this.uri, this.opts);
      const i = this.engine,
        u = this;
      (this._readyState = "opening"), (this.skipReconnect = !1);
      const d = It(i, "open", function () {
          u.onopen(), n && n();
        }),
        w = (R) => {
          this.cleanup(),
            (this._readyState = "closed"),
            this.emitReserved("error", R),
            n ? n(R) : this.maybeReconnectOnOpen();
        },
        x = It(i, "error", w);
      if (this._timeout !== !1) {
        const R = this._timeout,
          g = this.setTimeoutFn(() => {
            d(), w(new Error("timeout")), i.close();
          }, R);
        this.opts.autoUnref && g.unref(),
          this.subs.push(() => {
            this.clearTimeoutFn(g);
          });
      }
      return this.subs.push(d), this.subs.push(x), this;
    }
    connect(n) {
      return this.open(n);
    }
    onopen() {
      this.cleanup(), (this._readyState = "open"), this.emitReserved("open");
      const n = this.engine;
      this.subs.push(
        It(n, "ping", this.onping.bind(this)),
        It(n, "data", this.ondata.bind(this)),
        It(n, "error", this.onerror.bind(this)),
        It(n, "close", this.onclose.bind(this)),
        It(this.decoder, "decoded", this.ondecoded.bind(this)),
      );
    }
    onping() {
      this.emitReserved("ping");
    }
    ondata(n) {
      try {
        this.decoder.add(n);
      } catch (i) {
        this.onclose("parse error", i);
      }
    }
    ondecoded(n) {
      Ur(() => {
        this.emitReserved("packet", n);
      }, this.setTimeoutFn);
    }
    onerror(n) {
      this.emitReserved("error", n);
    }
    socket(n, i) {
      let u = this.nsps[n];
      return (
        u
          ? this._autoConnect && !u.active && u.connect()
          : ((u = new Wo(this, n, i)), (this.nsps[n] = u)),
        u
      );
    }
    _destroy(n) {
      const i = Object.keys(this.nsps);
      for (const u of i) if (this.nsps[u].active) return;
      this._close();
    }
    _packet(n) {
      const i = this.encoder.encode(n);
      for (let u = 0; u < i.length; u++) this.engine.write(i[u], n.options);
    }
    cleanup() {
      this.subs.forEach((n) => n()),
        (this.subs.length = 0),
        this.decoder.destroy();
    }
    _close() {
      (this.skipReconnect = !0),
        (this._reconnecting = !1),
        this.onclose("forced close");
    }
    disconnect() {
      return this._close();
    }
    onclose(n, i) {
      var u;
      this.cleanup(),
        (u = this.engine) === null || u === void 0 || u.close(),
        this.backoff.reset(),
        (this._readyState = "closed"),
        this.emitReserved("close", n, i),
        this._reconnection && !this.skipReconnect && this.reconnect();
    }
    reconnect() {
      if (this._reconnecting || this.skipReconnect) return this;
      const n = this;
      if (this.backoff.attempts >= this._reconnectionAttempts)
        this.backoff.reset(),
          this.emitReserved("reconnect_failed"),
          (this._reconnecting = !1);
      else {
        const i = this.backoff.duration();
        this._reconnecting = !0;
        const u = this.setTimeoutFn(() => {
          n.skipReconnect ||
            (this.emitReserved("reconnect_attempt", n.backoff.attempts),
            !n.skipReconnect &&
              n.open((d) => {
                d
                  ? ((n._reconnecting = !1),
                    n.reconnect(),
                    this.emitReserved("reconnect_error", d))
                  : n.onreconnect();
              }));
        }, i);
        this.opts.autoUnref && u.unref(),
          this.subs.push(() => {
            this.clearTimeoutFn(u);
          });
      }
    }
    onreconnect() {
      const n = this.backoff.attempts;
      (this._reconnecting = !1),
        this.backoff.reset(),
        this.emitReserved("reconnect", n);
    }
  }
  const cr = {};
  function Wr(o, n) {
    typeof o == "object" && ((n = o), (o = void 0)), (n = n || {});
    const i = Rl(o, n.path || "/socket.io"),
      u = i.source,
      d = i.id,
      w = i.path,
      x = cr[d] && w in cr[d].nsps,
      R = n.forceNew || n["force new connection"] || n.multiplex === !1 || x;
    let g;
    return (
      R ? (g = new es(u, n)) : (cr[d] || (cr[d] = new es(u, n)), (g = cr[d])),
      i.query && !n.query && (n.query = i.queryKey),
      g.socket(i.path, n)
    );
  }
  Object.assign(Wr, { Manager: es, Socket: Wo, io: Wr, connect: Wr });
  var qo = {},
    qr = {};
  (qr.byteLength = Wl), (qr.toByteArray = Hl), (qr.fromByteArray = Vl);
  for (
    var Wt = [],
      _t = [],
      Dl = typeof Uint8Array < "u" ? Uint8Array : Array,
      ts = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
      Gn = 0,
      Gl = ts.length;
    Gn < Gl;
    ++Gn
  )
    (Wt[Gn] = ts[Gn]), (_t[ts.charCodeAt(Gn)] = Gn);
  (_t[45] = 62), (_t[95] = 63);
  function Ho(o) {
    var n = o.length;
    if (n % 4 > 0)
      throw new Error("Invalid string. Length must be a multiple of 4");
    var i = o.indexOf("=");
    i === -1 && (i = n);
    var u = i === n ? 0 : 4 - (i % 4);
    return [i, u];
  }
  function Wl(o) {
    var n = Ho(o),
      i = n[0],
      u = n[1];
    return ((i + u) * 3) / 4 - u;
  }
  function ql(o, n, i) {
    return ((n + i) * 3) / 4 - i;
  }
  function Hl(o) {
    var n,
      i = Ho(o),
      u = i[0],
      d = i[1],
      w = new Dl(ql(o, u, d)),
      x = 0,
      R = d > 0 ? u - 4 : u,
      g;
    for (g = 0; g < R; g += 4)
      (n =
        (_t[o.charCodeAt(g)] << 18) |
        (_t[o.charCodeAt(g + 1)] << 12) |
        (_t[o.charCodeAt(g + 2)] << 6) |
        _t[o.charCodeAt(g + 3)]),
        (w[x++] = (n >> 16) & 255),
        (w[x++] = (n >> 8) & 255),
        (w[x++] = n & 255);
    return (
      d === 2 &&
        ((n = (_t[o.charCodeAt(g)] << 2) | (_t[o.charCodeAt(g + 1)] >> 4)),
        (w[x++] = n & 255)),
      d === 1 &&
        ((n =
          (_t[o.charCodeAt(g)] << 10) |
          (_t[o.charCodeAt(g + 1)] << 4) |
          (_t[o.charCodeAt(g + 2)] >> 2)),
        (w[x++] = (n >> 8) & 255),
        (w[x++] = n & 255)),
      w
    );
  }
  function zl(o) {
    return (
      Wt[(o >> 18) & 63] + Wt[(o >> 12) & 63] + Wt[(o >> 6) & 63] + Wt[o & 63]
    );
  }
  function Kl(o, n, i) {
    for (var u, d = [], w = n; w < i; w += 3)
      (u =
        ((o[w] << 16) & 16711680) +
        ((o[w + 1] << 8) & 65280) +
        (o[w + 2] & 255)),
        d.push(zl(u));
    return d.join("");
  }
  function Vl(o) {
    for (
      var n, i = o.length, u = i % 3, d = [], w = 16383, x = 0, R = i - u;
      x < R;
      x += w
    )
      d.push(Kl(o, x, x + w > R ? R : x + w));
    return (
      u === 1
        ? ((n = o[i - 1]), d.push(Wt[n >> 2] + Wt[(n << 4) & 63] + "=="))
        : u === 2 &&
          ((n = (o[i - 2] << 8) + o[i - 1]),
          d.push(Wt[n >> 10] + Wt[(n >> 4) & 63] + Wt[(n << 2) & 63] + "=")),
      d.join("")
    );
  }
  var ns = {};
  /*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */ (ns.read =
    function (o, n, i, u, d) {
      var w,
        x,
        R = d * 8 - u - 1,
        g = (1 << R) - 1,
        p = g >> 1,
        _ = -7,
        T = i ? d - 1 : 0,
        b = i ? -1 : 1,
        B = o[n + T];
      for (
        T += b, w = B & ((1 << -_) - 1), B >>= -_, _ += R;
        _ > 0;
        w = w * 256 + o[n + T], T += b, _ -= 8
      );
      for (
        x = w & ((1 << -_) - 1), w >>= -_, _ += u;
        _ > 0;
        x = x * 256 + o[n + T], T += b, _ -= 8
      );
      if (w === 0) w = 1 - p;
      else {
        if (w === g) return x ? NaN : (B ? -1 : 1) * (1 / 0);
        (x = x + Math.pow(2, u)), (w = w - p);
      }
      return (B ? -1 : 1) * x * Math.pow(2, w - u);
    }),
    (ns.write = function (o, n, i, u, d, w) {
      var x,
        R,
        g,
        p = w * 8 - d - 1,
        _ = (1 << p) - 1,
        T = _ >> 1,
        b = d === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
        B = u ? 0 : w - 1,
        D = u ? 1 : -1,
        I = n < 0 || (n === 0 && 1 / n < 0) ? 1 : 0;
      for (
        n = Math.abs(n),
          isNaN(n) || n === 1 / 0
            ? ((R = isNaN(n) ? 1 : 0), (x = _))
            : ((x = Math.floor(Math.log(n) / Math.LN2)),
              n * (g = Math.pow(2, -x)) < 1 && (x--, (g *= 2)),
              x + T >= 1 ? (n += b / g) : (n += b * Math.pow(2, 1 - T)),
              n * g >= 2 && (x++, (g /= 2)),
              x + T >= _
                ? ((R = 0), (x = _))
                : x + T >= 1
                  ? ((R = (n * g - 1) * Math.pow(2, d)), (x = x + T))
                  : ((R = n * Math.pow(2, T - 1) * Math.pow(2, d)), (x = 0)));
        d >= 8;
        o[i + B] = R & 255, B += D, R /= 256, d -= 8
      );
      for (
        x = (x << d) | R, p += d;
        p > 0;
        o[i + B] = x & 255, B += D, x /= 256, p -= 8
      );
      o[i + B - D] |= I * 128;
    });
  /*!
   * The buffer module from node.js, for the browser.
   *
   * @author   Feross Aboukhadijeh <https://feross.org>
   * @license  MIT
   */ (function (o) {
    const n = qr,
      i = ns,
      u =
        typeof Symbol == "function" && typeof Symbol.for == "function"
          ? Symbol.for("nodejs.util.inspect.custom")
          : null;
    (o.Buffer = _), (o.SlowBuffer = Z), (o.INSPECT_MAX_BYTES = 50);
    const d = 2147483647;
    o.kMaxLength = d;
    const { Uint8Array: w, ArrayBuffer: x, SharedArrayBuffer: R } = globalThis;
    (_.TYPED_ARRAY_SUPPORT = g()),
      !_.TYPED_ARRAY_SUPPORT &&
        typeof console < "u" &&
        typeof console.error == "function" &&
        console.error(
          "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.",
        );
    function g() {
      try {
        const h = new w(1),
          a = {
            foo: function () {
              return 42;
            },
          };
        return (
          Object.setPrototypeOf(a, w.prototype),
          Object.setPrototypeOf(h, a),
          h.foo() === 42
        );
      } catch {
        return !1;
      }
    }
    Object.defineProperty(_.prototype, "parent", {
      enumerable: !0,
      get: function () {
        if (_.isBuffer(this)) return this.buffer;
      },
    }),
      Object.defineProperty(_.prototype, "offset", {
        enumerable: !0,
        get: function () {
          if (_.isBuffer(this)) return this.byteOffset;
        },
      });
    function p(h) {
      if (h > d)
        throw new RangeError(
          'The value "' + h + '" is invalid for option "size"',
        );
      const a = new w(h);
      return Object.setPrototypeOf(a, _.prototype), a;
    }
    function _(h, a, c) {
      if (typeof h == "number") {
        if (typeof a == "string")
          throw new TypeError(
            'The "string" argument must be of type string. Received type number',
          );
        return D(h);
      }
      return T(h, a, c);
    }
    _.poolSize = 8192;
    function T(h, a, c) {
      if (typeof h == "string") return I(h, a);
      if (x.isView(h)) return X(h);
      if (h == null)
        throw new TypeError(
          "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
            typeof h,
        );
      if (
        Ke(h, x) ||
        (h && Ke(h.buffer, x)) ||
        (typeof R < "u" && (Ke(h, R) || (h && Ke(h.buffer, R))))
      )
        return ae(h, a, c);
      if (typeof h == "number")
        throw new TypeError(
          'The "value" argument must not be of type number. Received type number',
        );
      const y = h.valueOf && h.valueOf();
      if (y != null && y !== h) return _.from(y, a, c);
      const S = K(h);
      if (S) return S;
      if (
        typeof Symbol < "u" &&
        Symbol.toPrimitive != null &&
        typeof h[Symbol.toPrimitive] == "function"
      )
        return _.from(h[Symbol.toPrimitive]("string"), a, c);
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
          typeof h,
      );
    }
    (_.from = function (h, a, c) {
      return T(h, a, c);
    }),
      Object.setPrototypeOf(_.prototype, w.prototype),
      Object.setPrototypeOf(_, w);
    function b(h) {
      if (typeof h != "number")
        throw new TypeError('"size" argument must be of type number');
      if (h < 0)
        throw new RangeError(
          'The value "' + h + '" is invalid for option "size"',
        );
    }
    function B(h, a, c) {
      return (
        b(h),
        h <= 0
          ? p(h)
          : a !== void 0
            ? typeof c == "string"
              ? p(h).fill(a, c)
              : p(h).fill(a)
            : p(h)
      );
    }
    _.alloc = function (h, a, c) {
      return B(h, a, c);
    };
    function D(h) {
      return b(h), p(h < 0 ? 0 : $(h) | 0);
    }
    (_.allocUnsafe = function (h) {
      return D(h);
    }),
      (_.allocUnsafeSlow = function (h) {
        return D(h);
      });
    function I(h, a) {
      if (
        ((typeof a != "string" || a === "") && (a = "utf8"), !_.isEncoding(a))
      )
        throw new TypeError("Unknown encoding: " + a);
      const c = fe(h, a) | 0;
      let y = p(c);
      const S = y.write(h, a);
      return S !== c && (y = y.slice(0, S)), y;
    }
    function j(h) {
      const a = h.length < 0 ? 0 : $(h.length) | 0,
        c = p(a);
      for (let y = 0; y < a; y += 1) c[y] = h[y] & 255;
      return c;
    }
    function X(h) {
      if (Ke(h, w)) {
        const a = new w(h);
        return ae(a.buffer, a.byteOffset, a.byteLength);
      }
      return j(h);
    }
    function ae(h, a, c) {
      if (a < 0 || h.byteLength < a)
        throw new RangeError('"offset" is outside of buffer bounds');
      if (h.byteLength < a + (c || 0))
        throw new RangeError('"length" is outside of buffer bounds');
      let y;
      return (
        a === void 0 && c === void 0
          ? (y = new w(h))
          : c === void 0
            ? (y = new w(h, a))
            : (y = new w(h, a, c)),
        Object.setPrototypeOf(y, _.prototype),
        y
      );
    }
    function K(h) {
      if (_.isBuffer(h)) {
        const a = $(h.length) | 0,
          c = p(a);
        return c.length === 0 || h.copy(c, 0, 0, a), c;
      }
      if (h.length !== void 0)
        return typeof h.length != "number" || yr(h.length) ? p(0) : j(h);
      if (h.type === "Buffer" && Array.isArray(h.data)) return j(h.data);
    }
    function $(h) {
      if (h >= d)
        throw new RangeError(
          "Attempt to allocate Buffer larger than maximum size: 0x" +
            d.toString(16) +
            " bytes",
        );
      return h | 0;
    }
    function Z(h) {
      return +h != h && (h = 0), _.alloc(+h);
    }
    (_.isBuffer = function (a) {
      return a != null && a._isBuffer === !0 && a !== _.prototype;
    }),
      (_.compare = function (a, c) {
        if (
          (Ke(a, w) && (a = _.from(a, a.offset, a.byteLength)),
          Ke(c, w) && (c = _.from(c, c.offset, c.byteLength)),
          !_.isBuffer(a) || !_.isBuffer(c))
        )
          throw new TypeError(
            'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array',
          );
        if (a === c) return 0;
        let y = a.length,
          S = c.length;
        for (let L = 0, k = Math.min(y, S); L < k; ++L)
          if (a[L] !== c[L]) {
            (y = a[L]), (S = c[L]);
            break;
          }
        return y < S ? -1 : S < y ? 1 : 0;
      }),
      (_.isEncoding = function (a) {
        switch (String(a).toLowerCase()) {
          case "hex":
          case "utf8":
          case "utf-8":
          case "ascii":
          case "latin1":
          case "binary":
          case "base64":
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return !0;
          default:
            return !1;
        }
      }),
      (_.concat = function (a, c) {
        if (!Array.isArray(a))
          throw new TypeError('"list" argument must be an Array of Buffers');
        if (a.length === 0) return _.alloc(0);
        let y;
        if (c === void 0)
          for (c = 0, y = 0; y < a.length; ++y) c += a[y].length;
        const S = _.allocUnsafe(c);
        let L = 0;
        for (y = 0; y < a.length; ++y) {
          let k = a[y];
          if (Ke(k, w))
            L + k.length > S.length
              ? (_.isBuffer(k) || (k = _.from(k)), k.copy(S, L))
              : w.prototype.set.call(S, k, L);
          else if (_.isBuffer(k)) k.copy(S, L);
          else
            throw new TypeError('"list" argument must be an Array of Buffers');
          L += k.length;
        }
        return S;
      });
    function fe(h, a) {
      if (_.isBuffer(h)) return h.length;
      if (x.isView(h) || Ke(h, x)) return h.byteLength;
      if (typeof h != "string")
        throw new TypeError(
          'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' +
            typeof h,
        );
      const c = h.length,
        y = arguments.length > 2 && arguments[2] === !0;
      if (!y && c === 0) return 0;
      let S = !1;
      for (;;)
        switch (a) {
          case "ascii":
          case "latin1":
          case "binary":
            return c;
          case "utf8":
          case "utf-8":
            return Ot(h).length;
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return c * 2;
          case "hex":
            return c >>> 1;
          case "base64":
            return In(h).length;
          default:
            if (S) return y ? -1 : Ot(h).length;
            (a = ("" + a).toLowerCase()), (S = !0);
        }
    }
    _.byteLength = fe;
    function H(h, a, c) {
      let y = !1;
      if (
        ((a === void 0 || a < 0) && (a = 0),
        a > this.length ||
          ((c === void 0 || c > this.length) && (c = this.length), c <= 0) ||
          ((c >>>= 0), (a >>>= 0), c <= a))
      )
        return "";
      for (h || (h = "utf8"); ; )
        switch (h) {
          case "hex":
            return _r(this, a, c);
          case "utf8":
          case "utf-8":
            return Ye(this, a, c);
          case "ascii":
            return Xt(this, a, c);
          case "latin1":
          case "binary":
            return Xe(this, a, c);
          case "base64":
            return Sn(this, a, c);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return Kn(this, a, c);
          default:
            if (y) throw new TypeError("Unknown encoding: " + h);
            (h = (h + "").toLowerCase()), (y = !0);
        }
    }
    _.prototype._isBuffer = !0;
    function ee(h, a, c) {
      const y = h[a];
      (h[a] = h[c]), (h[c] = y);
    }
    (_.prototype.swap16 = function () {
      const a = this.length;
      if (a % 2 !== 0)
        throw new RangeError("Buffer size must be a multiple of 16-bits");
      for (let c = 0; c < a; c += 2) ee(this, c, c + 1);
      return this;
    }),
      (_.prototype.swap32 = function () {
        const a = this.length;
        if (a % 4 !== 0)
          throw new RangeError("Buffer size must be a multiple of 32-bits");
        for (let c = 0; c < a; c += 4)
          ee(this, c, c + 3), ee(this, c + 1, c + 2);
        return this;
      }),
      (_.prototype.swap64 = function () {
        const a = this.length;
        if (a % 8 !== 0)
          throw new RangeError("Buffer size must be a multiple of 64-bits");
        for (let c = 0; c < a; c += 8)
          ee(this, c, c + 7),
            ee(this, c + 1, c + 6),
            ee(this, c + 2, c + 5),
            ee(this, c + 3, c + 4);
        return this;
      }),
      (_.prototype.toString = function () {
        const a = this.length;
        return a === 0
          ? ""
          : arguments.length === 0
            ? Ye(this, 0, a)
            : H.apply(this, arguments);
      }),
      (_.prototype.toLocaleString = _.prototype.toString),
      (_.prototype.equals = function (a) {
        if (!_.isBuffer(a)) throw new TypeError("Argument must be a Buffer");
        return this === a ? !0 : _.compare(this, a) === 0;
      }),
      (_.prototype.inspect = function () {
        let a = "";
        const c = o.INSPECT_MAX_BYTES;
        return (
          (a = this.toString("hex", 0, c)
            .replace(/(.{2})/g, "$1 ")
            .trim()),
          this.length > c && (a += " ... "),
          "<Buffer " + a + ">"
        );
      }),
      u && (_.prototype[u] = _.prototype.inspect),
      (_.prototype.compare = function (a, c, y, S, L) {
        if (
          (Ke(a, w) && (a = _.from(a, a.offset, a.byteLength)), !_.isBuffer(a))
        )
          throw new TypeError(
            'The "target" argument must be one of type Buffer or Uint8Array. Received type ' +
              typeof a,
          );
        if (
          (c === void 0 && (c = 0),
          y === void 0 && (y = a ? a.length : 0),
          S === void 0 && (S = 0),
          L === void 0 && (L = this.length),
          c < 0 || y > a.length || S < 0 || L > this.length)
        )
          throw new RangeError("out of range index");
        if (S >= L && c >= y) return 0;
        if (S >= L) return -1;
        if (c >= y) return 1;
        if (((c >>>= 0), (y >>>= 0), (S >>>= 0), (L >>>= 0), this === a))
          return 0;
        let k = L - S,
          ie = y - c;
        const Ie = Math.min(k, ie),
          Se = this.slice(S, L),
          Fe = a.slice(c, y);
        for (let ge = 0; ge < Ie; ++ge)
          if (Se[ge] !== Fe[ge]) {
            (k = Se[ge]), (ie = Fe[ge]);
            break;
          }
        return k < ie ? -1 : ie < k ? 1 : 0;
      });
    function Pe(h, a, c, y, S) {
      if (h.length === 0) return -1;
      if (
        (typeof c == "string"
          ? ((y = c), (c = 0))
          : c > 2147483647
            ? (c = 2147483647)
            : c < -2147483648 && (c = -2147483648),
        (c = +c),
        yr(c) && (c = S ? 0 : h.length - 1),
        c < 0 && (c = h.length + c),
        c >= h.length)
      ) {
        if (S) return -1;
        c = h.length - 1;
      } else if (c < 0)
        if (S) c = 0;
        else return -1;
      if ((typeof a == "string" && (a = _.from(a, y)), _.isBuffer(a)))
        return a.length === 0 ? -1 : De(h, a, c, y, S);
      if (typeof a == "number")
        return (
          (a = a & 255),
          typeof w.prototype.indexOf == "function"
            ? S
              ? w.prototype.indexOf.call(h, a, c)
              : w.prototype.lastIndexOf.call(h, a, c)
            : De(h, [a], c, y, S)
        );
      throw new TypeError("val must be string, number or Buffer");
    }
    function De(h, a, c, y, S) {
      let L = 1,
        k = h.length,
        ie = a.length;
      if (
        y !== void 0 &&
        ((y = String(y).toLowerCase()),
        y === "ucs2" || y === "ucs-2" || y === "utf16le" || y === "utf-16le")
      ) {
        if (h.length < 2 || a.length < 2) return -1;
        (L = 2), (k /= 2), (ie /= 2), (c /= 2);
      }
      function Ie(Fe, ge) {
        return L === 1 ? Fe[ge] : Fe.readUInt16BE(ge * L);
      }
      let Se;
      if (S) {
        let Fe = -1;
        for (Se = c; Se < k; Se++)
          if (Ie(h, Se) === Ie(a, Fe === -1 ? 0 : Se - Fe)) {
            if ((Fe === -1 && (Fe = Se), Se - Fe + 1 === ie)) return Fe * L;
          } else Fe !== -1 && (Se -= Se - Fe), (Fe = -1);
      } else
        for (c + ie > k && (c = k - ie), Se = c; Se >= 0; Se--) {
          let Fe = !0;
          for (let ge = 0; ge < ie; ge++)
            if (Ie(h, Se + ge) !== Ie(a, ge)) {
              Fe = !1;
              break;
            }
          if (Fe) return Se;
        }
      return -1;
    }
    (_.prototype.includes = function (a, c, y) {
      return this.indexOf(a, c, y) !== -1;
    }),
      (_.prototype.indexOf = function (a, c, y) {
        return Pe(this, a, c, y, !0);
      }),
      (_.prototype.lastIndexOf = function (a, c, y) {
        return Pe(this, a, c, y, !1);
      });
    function we(h, a, c, y) {
      c = Number(c) || 0;
      const S = h.length - c;
      y ? ((y = Number(y)), y > S && (y = S)) : (y = S);
      const L = a.length;
      y > L / 2 && (y = L / 2);
      let k;
      for (k = 0; k < y; ++k) {
        const ie = parseInt(a.substr(k * 2, 2), 16);
        if (yr(ie)) return k;
        h[c + k] = ie;
      }
      return k;
    }
    function Le(h, a, c, y) {
      return Vn(Ot(a, h.length - c), h, c, y);
    }
    function An(h, a, c, y) {
      return Vn(at(a), h, c, y);
    }
    function Ae(h, a, c, y) {
      return Vn(In(a), h, c, y);
    }
    function zn(h, a, c, y) {
      return Vn(Tn(a, h.length - c), h, c, y);
    }
    (_.prototype.write = function (a, c, y, S) {
      if (c === void 0) (S = "utf8"), (y = this.length), (c = 0);
      else if (y === void 0 && typeof c == "string")
        (S = c), (y = this.length), (c = 0);
      else if (isFinite(c))
        (c = c >>> 0),
          isFinite(y)
            ? ((y = y >>> 0), S === void 0 && (S = "utf8"))
            : ((S = y), (y = void 0));
      else
        throw new Error(
          "Buffer.write(string, encoding, offset[, length]) is no longer supported",
        );
      const L = this.length - c;
      if (
        ((y === void 0 || y > L) && (y = L),
        (a.length > 0 && (y < 0 || c < 0)) || c > this.length)
      )
        throw new RangeError("Attempt to write outside buffer bounds");
      S || (S = "utf8");
      let k = !1;
      for (;;)
        switch (S) {
          case "hex":
            return we(this, a, c, y);
          case "utf8":
          case "utf-8":
            return Le(this, a, c, y);
          case "ascii":
          case "latin1":
          case "binary":
            return An(this, a, c, y);
          case "base64":
            return Ae(this, a, c, y);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return zn(this, a, c, y);
          default:
            if (k) throw new TypeError("Unknown encoding: " + S);
            (S = ("" + S).toLowerCase()), (k = !0);
        }
    }),
      (_.prototype.toJSON = function () {
        return {
          type: "Buffer",
          data: Array.prototype.slice.call(this._arr || this, 0),
        };
      });
    function Sn(h, a, c) {
      return a === 0 && c === h.length
        ? n.fromByteArray(h)
        : n.fromByteArray(h.slice(a, c));
    }
    function Ye(h, a, c) {
      c = Math.min(h.length, c);
      const y = [];
      let S = a;
      for (; S < c; ) {
        const L = h[S];
        let k = null,
          ie = L > 239 ? 4 : L > 223 ? 3 : L > 191 ? 2 : 1;
        if (S + ie <= c) {
          let Ie, Se, Fe, ge;
          switch (ie) {
            case 1:
              L < 128 && (k = L);
              break;
            case 2:
              (Ie = h[S + 1]),
                (Ie & 192) === 128 &&
                  ((ge = ((L & 31) << 6) | (Ie & 63)), ge > 127 && (k = ge));
              break;
            case 3:
              (Ie = h[S + 1]),
                (Se = h[S + 2]),
                (Ie & 192) === 128 &&
                  (Se & 192) === 128 &&
                  ((ge = ((L & 15) << 12) | ((Ie & 63) << 6) | (Se & 63)),
                  ge > 2047 && (ge < 55296 || ge > 57343) && (k = ge));
              break;
            case 4:
              (Ie = h[S + 1]),
                (Se = h[S + 2]),
                (Fe = h[S + 3]),
                (Ie & 192) === 128 &&
                  (Se & 192) === 128 &&
                  (Fe & 192) === 128 &&
                  ((ge =
                    ((L & 15) << 18) |
                    ((Ie & 63) << 12) |
                    ((Se & 63) << 6) |
                    (Fe & 63)),
                  ge > 65535 && ge < 1114112 && (k = ge));
          }
        }
        k === null
          ? ((k = 65533), (ie = 1))
          : k > 65535 &&
            ((k -= 65536),
            y.push(((k >>> 10) & 1023) | 55296),
            (k = 56320 | (k & 1023))),
          y.push(k),
          (S += ie);
      }
      return gr(y);
    }
    const xt = 4096;
    function gr(h) {
      const a = h.length;
      if (a <= xt) return String.fromCharCode.apply(String, h);
      let c = "",
        y = 0;
      for (; y < a; )
        c += String.fromCharCode.apply(String, h.slice(y, (y += xt)));
      return c;
    }
    function Xt(h, a, c) {
      let y = "";
      c = Math.min(h.length, c);
      for (let S = a; S < c; ++S) y += String.fromCharCode(h[S] & 127);
      return y;
    }
    function Xe(h, a, c) {
      let y = "";
      c = Math.min(h.length, c);
      for (let S = a; S < c; ++S) y += String.fromCharCode(h[S]);
      return y;
    }
    function _r(h, a, c) {
      const y = h.length;
      (!a || a < 0) && (a = 0), (!c || c < 0 || c > y) && (c = y);
      let S = "";
      for (let L = a; L < c; ++L) S += Fn[h[L]];
      return S;
    }
    function Kn(h, a, c) {
      const y = h.slice(a, c);
      let S = "";
      for (let L = 0; L < y.length - 1; L += 2)
        S += String.fromCharCode(y[L] + y[L + 1] * 256);
      return S;
    }
    _.prototype.slice = function (a, c) {
      const y = this.length;
      (a = ~~a),
        (c = c === void 0 ? y : ~~c),
        a < 0 ? ((a += y), a < 0 && (a = 0)) : a > y && (a = y),
        c < 0 ? ((c += y), c < 0 && (c = 0)) : c > y && (c = y),
        c < a && (c = a);
      const S = this.subarray(a, c);
      return Object.setPrototypeOf(S, _.prototype), S;
    };
    function Oe(h, a, c) {
      if (h % 1 !== 0 || h < 0) throw new RangeError("offset is not uint");
      if (h + a > c)
        throw new RangeError("Trying to access beyond buffer length");
    }
    (_.prototype.readUintLE = _.prototype.readUIntLE =
      function (a, c, y) {
        (a = a >>> 0), (c = c >>> 0), y || Oe(a, c, this.length);
        let S = this[a],
          L = 1,
          k = 0;
        for (; ++k < c && (L *= 256); ) S += this[a + k] * L;
        return S;
      }),
      (_.prototype.readUintBE = _.prototype.readUIntBE =
        function (a, c, y) {
          (a = a >>> 0), (c = c >>> 0), y || Oe(a, c, this.length);
          let S = this[a + --c],
            L = 1;
          for (; c > 0 && (L *= 256); ) S += this[a + --c] * L;
          return S;
        }),
      (_.prototype.readUint8 = _.prototype.readUInt8 =
        function (a, c) {
          return (a = a >>> 0), c || Oe(a, 1, this.length), this[a];
        }),
      (_.prototype.readUint16LE = _.prototype.readUInt16LE =
        function (a, c) {
          return (
            (a = a >>> 0),
            c || Oe(a, 2, this.length),
            this[a] | (this[a + 1] << 8)
          );
        }),
      (_.prototype.readUint16BE = _.prototype.readUInt16BE =
        function (a, c) {
          return (
            (a = a >>> 0),
            c || Oe(a, 2, this.length),
            (this[a] << 8) | this[a + 1]
          );
        }),
      (_.prototype.readUint32LE = _.prototype.readUInt32LE =
        function (a, c) {
          return (
            (a = a >>> 0),
            c || Oe(a, 4, this.length),
            (this[a] | (this[a + 1] << 8) | (this[a + 2] << 16)) +
              this[a + 3] * 16777216
          );
        }),
      (_.prototype.readUint32BE = _.prototype.readUInt32BE =
        function (a, c) {
          return (
            (a = a >>> 0),
            c || Oe(a, 4, this.length),
            this[a] * 16777216 +
              ((this[a + 1] << 16) | (this[a + 2] << 8) | this[a + 3])
          );
        }),
      (_.prototype.readBigUInt64LE = $e(function (a) {
        (a = a >>> 0), xe(a, "offset");
        const c = this[a],
          y = this[a + 7];
        (c === void 0 || y === void 0) && ve(a, this.length - 8);
        const S =
            c + this[++a] * 2 ** 8 + this[++a] * 2 ** 16 + this[++a] * 2 ** 24,
          L =
            this[++a] + this[++a] * 2 ** 8 + this[++a] * 2 ** 16 + y * 2 ** 24;
        return BigInt(S) + (BigInt(L) << BigInt(32));
      })),
      (_.prototype.readBigUInt64BE = $e(function (a) {
        (a = a >>> 0), xe(a, "offset");
        const c = this[a],
          y = this[a + 7];
        (c === void 0 || y === void 0) && ve(a, this.length - 8);
        const S =
            c * 2 ** 24 + this[++a] * 2 ** 16 + this[++a] * 2 ** 8 + this[++a],
          L =
            this[++a] * 2 ** 24 + this[++a] * 2 ** 16 + this[++a] * 2 ** 8 + y;
        return (BigInt(S) << BigInt(32)) + BigInt(L);
      })),
      (_.prototype.readIntLE = function (a, c, y) {
        (a = a >>> 0), (c = c >>> 0), y || Oe(a, c, this.length);
        let S = this[a],
          L = 1,
          k = 0;
        for (; ++k < c && (L *= 256); ) S += this[a + k] * L;
        return (L *= 128), S >= L && (S -= Math.pow(2, 8 * c)), S;
      }),
      (_.prototype.readIntBE = function (a, c, y) {
        (a = a >>> 0), (c = c >>> 0), y || Oe(a, c, this.length);
        let S = c,
          L = 1,
          k = this[a + --S];
        for (; S > 0 && (L *= 256); ) k += this[a + --S] * L;
        return (L *= 128), k >= L && (k -= Math.pow(2, 8 * c)), k;
      }),
      (_.prototype.readInt8 = function (a, c) {
        return (
          (a = a >>> 0),
          c || Oe(a, 1, this.length),
          this[a] & 128 ? (255 - this[a] + 1) * -1 : this[a]
        );
      }),
      (_.prototype.readInt16LE = function (a, c) {
        (a = a >>> 0), c || Oe(a, 2, this.length);
        const y = this[a] | (this[a + 1] << 8);
        return y & 32768 ? y | 4294901760 : y;
      }),
      (_.prototype.readInt16BE = function (a, c) {
        (a = a >>> 0), c || Oe(a, 2, this.length);
        const y = this[a + 1] | (this[a] << 8);
        return y & 32768 ? y | 4294901760 : y;
      }),
      (_.prototype.readInt32LE = function (a, c) {
        return (
          (a = a >>> 0),
          c || Oe(a, 4, this.length),
          this[a] |
            (this[a + 1] << 8) |
            (this[a + 2] << 16) |
            (this[a + 3] << 24)
        );
      }),
      (_.prototype.readInt32BE = function (a, c) {
        return (
          (a = a >>> 0),
          c || Oe(a, 4, this.length),
          (this[a] << 24) |
            (this[a + 1] << 16) |
            (this[a + 2] << 8) |
            this[a + 3]
        );
      }),
      (_.prototype.readBigInt64LE = $e(function (a) {
        (a = a >>> 0), xe(a, "offset");
        const c = this[a],
          y = this[a + 7];
        (c === void 0 || y === void 0) && ve(a, this.length - 8);
        const S =
          this[a + 4] +
          this[a + 5] * 2 ** 8 +
          this[a + 6] * 2 ** 16 +
          (y << 24);
        return (
          (BigInt(S) << BigInt(32)) +
          BigInt(
            c + this[++a] * 2 ** 8 + this[++a] * 2 ** 16 + this[++a] * 2 ** 24,
          )
        );
      })),
      (_.prototype.readBigInt64BE = $e(function (a) {
        (a = a >>> 0), xe(a, "offset");
        const c = this[a],
          y = this[a + 7];
        (c === void 0 || y === void 0) && ve(a, this.length - 8);
        const S =
          (c << 24) + this[++a] * 2 ** 16 + this[++a] * 2 ** 8 + this[++a];
        return (
          (BigInt(S) << BigInt(32)) +
          BigInt(
            this[++a] * 2 ** 24 + this[++a] * 2 ** 16 + this[++a] * 2 ** 8 + y,
          )
        );
      })),
      (_.prototype.readFloatLE = function (a, c) {
        return (
          (a = a >>> 0), c || Oe(a, 4, this.length), i.read(this, a, !0, 23, 4)
        );
      }),
      (_.prototype.readFloatBE = function (a, c) {
        return (
          (a = a >>> 0), c || Oe(a, 4, this.length), i.read(this, a, !1, 23, 4)
        );
      }),
      (_.prototype.readDoubleLE = function (a, c) {
        return (
          (a = a >>> 0), c || Oe(a, 8, this.length), i.read(this, a, !0, 52, 8)
        );
      }),
      (_.prototype.readDoubleBE = function (a, c) {
        return (
          (a = a >>> 0), c || Oe(a, 8, this.length), i.read(this, a, !1, 52, 8)
        );
      });
    function Te(h, a, c, y, S, L) {
      if (!_.isBuffer(h))
        throw new TypeError('"buffer" argument must be a Buffer instance');
      if (a > S || a < L)
        throw new RangeError('"value" argument is out of bounds');
      if (c + y > h.length) throw new RangeError("Index out of range");
    }
    (_.prototype.writeUintLE = _.prototype.writeUIntLE =
      function (a, c, y, S) {
        if (((a = +a), (c = c >>> 0), (y = y >>> 0), !S)) {
          const ie = Math.pow(2, 8 * y) - 1;
          Te(this, a, c, y, ie, 0);
        }
        let L = 1,
          k = 0;
        for (this[c] = a & 255; ++k < y && (L *= 256); )
          this[c + k] = (a / L) & 255;
        return c + y;
      }),
      (_.prototype.writeUintBE = _.prototype.writeUIntBE =
        function (a, c, y, S) {
          if (((a = +a), (c = c >>> 0), (y = y >>> 0), !S)) {
            const ie = Math.pow(2, 8 * y) - 1;
            Te(this, a, c, y, ie, 0);
          }
          let L = y - 1,
            k = 1;
          for (this[c + L] = a & 255; --L >= 0 && (k *= 256); )
            this[c + L] = (a / k) & 255;
          return c + y;
        }),
      (_.prototype.writeUint8 = _.prototype.writeUInt8 =
        function (a, c, y) {
          return (
            (a = +a),
            (c = c >>> 0),
            y || Te(this, a, c, 1, 255, 0),
            (this[c] = a & 255),
            c + 1
          );
        }),
      (_.prototype.writeUint16LE = _.prototype.writeUInt16LE =
        function (a, c, y) {
          return (
            (a = +a),
            (c = c >>> 0),
            y || Te(this, a, c, 2, 65535, 0),
            (this[c] = a & 255),
            (this[c + 1] = a >>> 8),
            c + 2
          );
        }),
      (_.prototype.writeUint16BE = _.prototype.writeUInt16BE =
        function (a, c, y) {
          return (
            (a = +a),
            (c = c >>> 0),
            y || Te(this, a, c, 2, 65535, 0),
            (this[c] = a >>> 8),
            (this[c + 1] = a & 255),
            c + 2
          );
        }),
      (_.prototype.writeUint32LE = _.prototype.writeUInt32LE =
        function (a, c, y) {
          return (
            (a = +a),
            (c = c >>> 0),
            y || Te(this, a, c, 4, 4294967295, 0),
            (this[c + 3] = a >>> 24),
            (this[c + 2] = a >>> 16),
            (this[c + 1] = a >>> 8),
            (this[c] = a & 255),
            c + 4
          );
        }),
      (_.prototype.writeUint32BE = _.prototype.writeUInt32BE =
        function (a, c, y) {
          return (
            (a = +a),
            (c = c >>> 0),
            y || Te(this, a, c, 4, 4294967295, 0),
            (this[c] = a >>> 24),
            (this[c + 1] = a >>> 16),
            (this[c + 2] = a >>> 8),
            (this[c + 3] = a & 255),
            c + 4
          );
        });
    function $t(h, a, c, y, S) {
      me(a, y, S, h, c, 7);
      let L = Number(a & BigInt(4294967295));
      (h[c++] = L),
        (L = L >> 8),
        (h[c++] = L),
        (L = L >> 8),
        (h[c++] = L),
        (L = L >> 8),
        (h[c++] = L);
      let k = Number((a >> BigInt(32)) & BigInt(4294967295));
      return (
        (h[c++] = k),
        (k = k >> 8),
        (h[c++] = k),
        (k = k >> 8),
        (h[c++] = k),
        (k = k >> 8),
        (h[c++] = k),
        c
      );
    }
    function Cn(h, a, c, y, S) {
      me(a, y, S, h, c, 7);
      let L = Number(a & BigInt(4294967295));
      (h[c + 7] = L),
        (L = L >> 8),
        (h[c + 6] = L),
        (L = L >> 8),
        (h[c + 5] = L),
        (L = L >> 8),
        (h[c + 4] = L);
      let k = Number((a >> BigInt(32)) & BigInt(4294967295));
      return (
        (h[c + 3] = k),
        (k = k >> 8),
        (h[c + 2] = k),
        (k = k >> 8),
        (h[c + 1] = k),
        (k = k >> 8),
        (h[c] = k),
        c + 8
      );
    }
    (_.prototype.writeBigUInt64LE = $e(function (a, c = 0) {
      return $t(this, a, c, BigInt(0), BigInt("0xffffffffffffffff"));
    })),
      (_.prototype.writeBigUInt64BE = $e(function (a, c = 0) {
        return Cn(this, a, c, BigInt(0), BigInt("0xffffffffffffffff"));
      })),
      (_.prototype.writeIntLE = function (a, c, y, S) {
        if (((a = +a), (c = c >>> 0), !S)) {
          const Ie = Math.pow(2, 8 * y - 1);
          Te(this, a, c, y, Ie - 1, -Ie);
        }
        let L = 0,
          k = 1,
          ie = 0;
        for (this[c] = a & 255; ++L < y && (k *= 256); )
          a < 0 && ie === 0 && this[c + L - 1] !== 0 && (ie = 1),
            (this[c + L] = (((a / k) >> 0) - ie) & 255);
        return c + y;
      }),
      (_.prototype.writeIntBE = function (a, c, y, S) {
        if (((a = +a), (c = c >>> 0), !S)) {
          const Ie = Math.pow(2, 8 * y - 1);
          Te(this, a, c, y, Ie - 1, -Ie);
        }
        let L = y - 1,
          k = 1,
          ie = 0;
        for (this[c + L] = a & 255; --L >= 0 && (k *= 256); )
          a < 0 && ie === 0 && this[c + L + 1] !== 0 && (ie = 1),
            (this[c + L] = (((a / k) >> 0) - ie) & 255);
        return c + y;
      }),
      (_.prototype.writeInt8 = function (a, c, y) {
        return (
          (a = +a),
          (c = c >>> 0),
          y || Te(this, a, c, 1, 127, -128),
          a < 0 && (a = 255 + a + 1),
          (this[c] = a & 255),
          c + 1
        );
      }),
      (_.prototype.writeInt16LE = function (a, c, y) {
        return (
          (a = +a),
          (c = c >>> 0),
          y || Te(this, a, c, 2, 32767, -32768),
          (this[c] = a & 255),
          (this[c + 1] = a >>> 8),
          c + 2
        );
      }),
      (_.prototype.writeInt16BE = function (a, c, y) {
        return (
          (a = +a),
          (c = c >>> 0),
          y || Te(this, a, c, 2, 32767, -32768),
          (this[c] = a >>> 8),
          (this[c + 1] = a & 255),
          c + 2
        );
      }),
      (_.prototype.writeInt32LE = function (a, c, y) {
        return (
          (a = +a),
          (c = c >>> 0),
          y || Te(this, a, c, 4, 2147483647, -2147483648),
          (this[c] = a & 255),
          (this[c + 1] = a >>> 8),
          (this[c + 2] = a >>> 16),
          (this[c + 3] = a >>> 24),
          c + 4
        );
      }),
      (_.prototype.writeInt32BE = function (a, c, y) {
        return (
          (a = +a),
          (c = c >>> 0),
          y || Te(this, a, c, 4, 2147483647, -2147483648),
          a < 0 && (a = 4294967295 + a + 1),
          (this[c] = a >>> 24),
          (this[c + 1] = a >>> 16),
          (this[c + 2] = a >>> 8),
          (this[c + 3] = a & 255),
          c + 4
        );
      }),
      (_.prototype.writeBigInt64LE = $e(function (a, c = 0) {
        return $t(
          this,
          a,
          c,
          -BigInt("0x8000000000000000"),
          BigInt("0x7fffffffffffffff"),
        );
      })),
      (_.prototype.writeBigInt64BE = $e(function (a, c = 0) {
        return Cn(
          this,
          a,
          c,
          -BigInt("0x8000000000000000"),
          BigInt("0x7fffffffffffffff"),
        );
      }));
    function Bt(h, a, c, y, S, L) {
      if (c + y > h.length) throw new RangeError("Index out of range");
      if (c < 0) throw new RangeError("Index out of range");
    }
    function Lt(h, a, c, y, S) {
      return (
        (a = +a),
        (c = c >>> 0),
        S || Bt(h, a, c, 4),
        i.write(h, a, c, y, 23, 4),
        c + 4
      );
    }
    (_.prototype.writeFloatLE = function (a, c, y) {
      return Lt(this, a, c, !0, y);
    }),
      (_.prototype.writeFloatBE = function (a, c, y) {
        return Lt(this, a, c, !1, y);
      });
    function Rn(h, a, c, y, S) {
      return (
        (a = +a),
        (c = c >>> 0),
        S || Bt(h, a, c, 8),
        i.write(h, a, c, y, 52, 8),
        c + 8
      );
    }
    (_.prototype.writeDoubleLE = function (a, c, y) {
      return Rn(this, a, c, !0, y);
    }),
      (_.prototype.writeDoubleBE = function (a, c, y) {
        return Rn(this, a, c, !1, y);
      }),
      (_.prototype.copy = function (a, c, y, S) {
        if (!_.isBuffer(a)) throw new TypeError("argument should be a Buffer");
        if (
          (y || (y = 0),
          !S && S !== 0 && (S = this.length),
          c >= a.length && (c = a.length),
          c || (c = 0),
          S > 0 && S < y && (S = y),
          S === y || a.length === 0 || this.length === 0)
        )
          return 0;
        if (c < 0) throw new RangeError("targetStart out of bounds");
        if (y < 0 || y >= this.length)
          throw new RangeError("Index out of range");
        if (S < 0) throw new RangeError("sourceEnd out of bounds");
        S > this.length && (S = this.length),
          a.length - c < S - y && (S = a.length - c + y);
        const L = S - y;
        return (
          this === a && typeof w.prototype.copyWithin == "function"
            ? this.copyWithin(c, y, S)
            : w.prototype.set.call(a, this.subarray(y, S), c),
          L
        );
      }),
      (_.prototype.fill = function (a, c, y, S) {
        if (typeof a == "string") {
          if (
            (typeof c == "string"
              ? ((S = c), (c = 0), (y = this.length))
              : typeof y == "string" && ((S = y), (y = this.length)),
            S !== void 0 && typeof S != "string")
          )
            throw new TypeError("encoding must be a string");
          if (typeof S == "string" && !_.isEncoding(S))
            throw new TypeError("Unknown encoding: " + S);
          if (a.length === 1) {
            const k = a.charCodeAt(0);
            ((S === "utf8" && k < 128) || S === "latin1") && (a = k);
          }
        } else
          typeof a == "number"
            ? (a = a & 255)
            : typeof a == "boolean" && (a = Number(a));
        if (c < 0 || this.length < c || this.length < y)
          throw new RangeError("Out of range index");
        if (y <= c) return this;
        (c = c >>> 0), (y = y === void 0 ? this.length : y >>> 0), a || (a = 0);
        let L;
        if (typeof a == "number") for (L = c; L < y; ++L) this[L] = a;
        else {
          const k = _.isBuffer(a) ? a : _.from(a, S),
            ie = k.length;
          if (ie === 0)
            throw new TypeError(
              'The value "' + a + '" is invalid for argument "value"',
            );
          for (L = 0; L < y - c; ++L) this[L + c] = k[L % ie];
        }
        return this;
      });
    const nt = {};
    function Nt(h, a, c) {
      nt[h] = class extends c {
        constructor() {
          super(),
            Object.defineProperty(this, "message", {
              value: a.apply(this, arguments),
              writable: !0,
              configurable: !0,
            }),
            (this.name = `${this.name} [${h}]`),
            this.stack,
            delete this.name;
        }
        get code() {
          return h;
        }
        set code(S) {
          Object.defineProperty(this, "code", {
            configurable: !0,
            enumerable: !0,
            value: S,
            writable: !0,
          });
        }
        toString() {
          return `${this.name} [${h}]: ${this.message}`;
        }
      };
    }
    Nt(
      "ERR_BUFFER_OUT_OF_BOUNDS",
      function (h) {
        return h
          ? `${h} is outside of buffer bounds`
          : "Attempt to access memory outside buffer bounds";
      },
      RangeError,
    ),
      Nt(
        "ERR_INVALID_ARG_TYPE",
        function (h, a) {
          return `The "${h}" argument must be of type number. Received type ${typeof a}`;
        },
        TypeError,
      ),
      Nt(
        "ERR_OUT_OF_RANGE",
        function (h, a, c) {
          let y = `The value of "${h}" is out of range.`,
            S = c;
          return (
            Number.isInteger(c) && Math.abs(c) > 2 ** 32
              ? (S = Q(String(c)))
              : typeof c == "bigint" &&
                ((S = String(c)),
                (c > BigInt(2) ** BigInt(32) ||
                  c < -(BigInt(2) ** BigInt(32))) &&
                  (S = Q(S)),
                (S += "n")),
            (y += ` It must be ${a}. Received ${S}`),
            y
          );
        },
        RangeError,
      );
    function Q(h) {
      let a = "",
        c = h.length;
      const y = h[0] === "-" ? 1 : 0;
      for (; c >= y + 4; c -= 3) a = `_${h.slice(c - 3, c)}${a}`;
      return `${h.slice(0, c)}${a}`;
    }
    function te(h, a, c) {
      xe(a, "offset"),
        (h[a] === void 0 || h[a + c] === void 0) && ve(a, h.length - (c + 1));
    }
    function me(h, a, c, y, S, L) {
      if (h > c || h < a) {
        const k = typeof a == "bigint" ? "n" : "";
        let ie;
        throw (
          (a === 0 || a === BigInt(0)
            ? (ie = `>= 0${k} and < 2${k} ** ${(L + 1) * 8}${k}`)
            : (ie = `>= -(2${k} ** ${(L + 1) * 8 - 1}${k}) and < 2 ** ${(L + 1) * 8 - 1}${k}`),
          new nt.ERR_OUT_OF_RANGE("value", ie, h))
        );
      }
      te(y, S, L);
    }
    function xe(h, a) {
      if (typeof h != "number")
        throw new nt.ERR_INVALID_ARG_TYPE(a, "number", h);
    }
    function ve(h, a, c) {
      throw Math.floor(h) !== h
        ? (xe(h, c), new nt.ERR_OUT_OF_RANGE("offset", "an integer", h))
        : a < 0
          ? new nt.ERR_BUFFER_OUT_OF_BOUNDS()
          : new nt.ERR_OUT_OF_RANGE("offset", `>= 0 and <= ${a}`, h);
    }
    const Zt = /[^+/0-9A-Za-z-_]/g;
    function hn(h) {
      if (((h = h.split("=")[0]), (h = h.trim().replace(Zt, "")), h.length < 2))
        return "";
      for (; h.length % 4 !== 0; ) h = h + "=";
      return h;
    }
    function Ot(h, a) {
      a = a || 1 / 0;
      let c;
      const y = h.length;
      let S = null;
      const L = [];
      for (let k = 0; k < y; ++k) {
        if (((c = h.charCodeAt(k)), c > 55295 && c < 57344)) {
          if (!S) {
            if (c > 56319) {
              (a -= 3) > -1 && L.push(239, 191, 189);
              continue;
            } else if (k + 1 === y) {
              (a -= 3) > -1 && L.push(239, 191, 189);
              continue;
            }
            S = c;
            continue;
          }
          if (c < 56320) {
            (a -= 3) > -1 && L.push(239, 191, 189), (S = c);
            continue;
          }
          c = (((S - 55296) << 10) | (c - 56320)) + 65536;
        } else S && (a -= 3) > -1 && L.push(239, 191, 189);
        if (((S = null), c < 128)) {
          if ((a -= 1) < 0) break;
          L.push(c);
        } else if (c < 2048) {
          if ((a -= 2) < 0) break;
          L.push((c >> 6) | 192, (c & 63) | 128);
        } else if (c < 65536) {
          if ((a -= 3) < 0) break;
          L.push((c >> 12) | 224, ((c >> 6) & 63) | 128, (c & 63) | 128);
        } else if (c < 1114112) {
          if ((a -= 4) < 0) break;
          L.push(
            (c >> 18) | 240,
            ((c >> 12) & 63) | 128,
            ((c >> 6) & 63) | 128,
            (c & 63) | 128,
          );
        } else throw new Error("Invalid code point");
      }
      return L;
    }
    function at(h) {
      const a = [];
      for (let c = 0; c < h.length; ++c) a.push(h.charCodeAt(c) & 255);
      return a;
    }
    function Tn(h, a) {
      let c, y, S;
      const L = [];
      for (let k = 0; k < h.length && !((a -= 2) < 0); ++k)
        (c = h.charCodeAt(k)),
          (y = c >> 8),
          (S = c % 256),
          L.push(S),
          L.push(y);
      return L;
    }
    function In(h) {
      return n.toByteArray(hn(h));
    }
    function Vn(h, a, c, y) {
      let S;
      for (S = 0; S < y && !(S + c >= a.length || S >= h.length); ++S)
        a[S + c] = h[S];
      return S;
    }
    function Ke(h, a) {
      return (
        h instanceof a ||
        (h != null &&
          h.constructor != null &&
          h.constructor.name != null &&
          h.constructor.name === a.name)
      );
    }
    function yr(h) {
      return h !== h;
    }
    const Fn = (function () {
      const h = "0123456789abcdef",
        a = new Array(256);
      for (let c = 0; c < 16; ++c) {
        const y = c * 16;
        for (let S = 0; S < 16; ++S) a[y + S] = h[c] + h[S];
      }
      return a;
    })();
    function $e(h) {
      return typeof BigInt > "u" ? xr : h;
    }
    function xr() {
      throw new Error("BigInt not supported");
    }
  })(qo);
  const lr = qo.Buffer;
  var Hr = {},
    zr = { exports: {} },
    Jl = zr.exports,
    zo;
  function Yl() {
    return (
      zo ||
        ((zo = 1),
        (function (o) {
          (function (n) {
            i(Math.pow(36, 5)),
              i(Math.pow(16, 7)),
              i(Math.pow(10, 9)),
              i(Math.pow(2, 30)),
              i(36),
              i(16),
              i(10),
              i(2);
            function i(x, R) {
              if (!(this instanceof i)) return new i(x, R);
              if (
                ((this._low = 0),
                (this._high = 0),
                (this.remainder = null),
                typeof R > "u")
              )
                return d.call(this, x);
              if (typeof x == "string") return w.call(this, x, R);
              u.call(this, x, R);
            }
            function u(x, R) {
              return (this._low = x | 0), (this._high = R | 0), this;
            }
            i.prototype.fromBits = u;
            function d(x) {
              return (this._low = x & 65535), (this._high = x >>> 16), this;
            }
            i.prototype.fromNumber = d;
            function w(x, R) {
              var g = parseInt(x, R || 10);
              return (this._low = g & 65535), (this._high = g >>> 16), this;
            }
            (i.prototype.fromString = w),
              (i.prototype.toNumber = function () {
                return this._high * 65536 + this._low;
              }),
              (i.prototype.toString = function (x) {
                return this.toNumber().toString(x || 10);
              }),
              (i.prototype.add = function (x) {
                var R = this._low + x._low,
                  g = R >>> 16;
                return (
                  (g += this._high + x._high),
                  (this._low = R & 65535),
                  (this._high = g & 65535),
                  this
                );
              }),
              (i.prototype.subtract = function (x) {
                return this.add(x.clone().negate());
              }),
              (i.prototype.multiply = function (x) {
                var R = this._high,
                  g = this._low,
                  p = x._high,
                  _ = x._low,
                  T,
                  b;
                return (
                  (b = g * _),
                  (T = b >>> 16),
                  (T += R * _),
                  (T &= 65535),
                  (T += g * p),
                  (this._low = b & 65535),
                  (this._high = T & 65535),
                  this
                );
              }),
              (i.prototype.div = function (x) {
                if (x._low == 0 && x._high == 0)
                  throw Error("division by zero");
                if (x._high == 0 && x._low == 1)
                  return (this.remainder = new i(0)), this;
                if (x.gt(this))
                  return (
                    (this.remainder = this.clone()),
                    (this._low = 0),
                    (this._high = 0),
                    this
                  );
                if (this.eq(x))
                  return (
                    (this.remainder = new i(0)),
                    (this._low = 1),
                    (this._high = 0),
                    this
                  );
                for (var R = x.clone(), g = -1; !this.lt(R); )
                  R.shiftLeft(1, !0), g++;
                for (
                  this.remainder = this.clone(), this._low = 0, this._high = 0;
                  g >= 0;
                  g--
                )
                  R.shiftRight(1),
                    this.remainder.lt(R) ||
                      (this.remainder.subtract(R),
                      g >= 16
                        ? (this._high |= 1 << (g - 16))
                        : (this._low |= 1 << g));
                return this;
              }),
              (i.prototype.negate = function () {
                var x = (~this._low & 65535) + 1;
                return (
                  (this._low = x & 65535),
                  (this._high = (~this._high + (x >>> 16)) & 65535),
                  this
                );
              }),
              (i.prototype.equals = i.prototype.eq =
                function (x) {
                  return this._low == x._low && this._high == x._high;
                }),
              (i.prototype.greaterThan = i.prototype.gt =
                function (x) {
                  return this._high > x._high
                    ? !0
                    : this._high < x._high
                      ? !1
                      : this._low > x._low;
                }),
              (i.prototype.lessThan = i.prototype.lt =
                function (x) {
                  return this._high < x._high
                    ? !0
                    : this._high > x._high
                      ? !1
                      : this._low < x._low;
                }),
              (i.prototype.or = function (x) {
                return (this._low |= x._low), (this._high |= x._high), this;
              }),
              (i.prototype.and = function (x) {
                return (this._low &= x._low), (this._high &= x._high), this;
              }),
              (i.prototype.not = function () {
                return (
                  (this._low = ~this._low & 65535),
                  (this._high = ~this._high & 65535),
                  this
                );
              }),
              (i.prototype.xor = function (x) {
                return (this._low ^= x._low), (this._high ^= x._high), this;
              }),
              (i.prototype.shiftRight = i.prototype.shiftr =
                function (x) {
                  return (
                    x > 16
                      ? ((this._low = this._high >> (x - 16)), (this._high = 0))
                      : x == 16
                        ? ((this._low = this._high), (this._high = 0))
                        : ((this._low =
                            (this._low >> x) |
                            ((this._high << (16 - x)) & 65535)),
                          (this._high >>= x)),
                    this
                  );
                }),
              (i.prototype.shiftLeft = i.prototype.shiftl =
                function (x, R) {
                  return (
                    x > 16
                      ? ((this._high = this._low << (x - 16)),
                        (this._low = 0),
                        R || (this._high &= 65535))
                      : x == 16
                        ? ((this._high = this._low), (this._low = 0))
                        : ((this._high =
                            (this._high << x) | (this._low >> (16 - x))),
                          (this._low = (this._low << x) & 65535),
                          R || (this._high &= 65535)),
                    this
                  );
                }),
              (i.prototype.rotateLeft = i.prototype.rotl =
                function (x) {
                  var R = (this._high << 16) | this._low;
                  return (
                    (R = (R << x) | (R >>> (32 - x))),
                    (this._low = R & 65535),
                    (this._high = R >>> 16),
                    this
                  );
                }),
              (i.prototype.rotateRight = i.prototype.rotr =
                function (x) {
                  var R = (this._high << 16) | this._low;
                  return (
                    (R = (R >>> x) | (R << (32 - x))),
                    (this._low = R & 65535),
                    (this._high = R >>> 16),
                    this
                  );
                }),
              (i.prototype.clone = function () {
                return new i(this._low, this._high);
              }),
              o.exports ? (o.exports = i) : (n.UINT32 = i);
          })(Jl);
        })(zr)),
      zr.exports
    );
  }
  var Kr = { exports: {} },
    Xl = Kr.exports,
    Ko;
  function $l() {
    return (
      Ko ||
        ((Ko = 1),
        (function (o) {
          (function (n) {
            var i = {
                16: d(Math.pow(16, 5)),
                10: d(Math.pow(10, 5)),
                2: d(Math.pow(2, 5)),
              },
              u = { 16: d(16), 10: d(10), 2: d(2) };
            function d(g, p, _, T) {
              if (!(this instanceof d)) return new d(g, p, _, T);
              if (((this.remainder = null), typeof g == "string"))
                return R.call(this, g, p);
              if (typeof p > "u") return x.call(this, g);
              w.apply(this, arguments);
            }
            function w(g, p, _, T) {
              return typeof _ > "u"
                ? ((this._a00 = g & 65535),
                  (this._a16 = g >>> 16),
                  (this._a32 = p & 65535),
                  (this._a48 = p >>> 16),
                  this)
                : ((this._a00 = g | 0),
                  (this._a16 = p | 0),
                  (this._a32 = _ | 0),
                  (this._a48 = T | 0),
                  this);
            }
            d.prototype.fromBits = w;
            function x(g) {
              return (
                (this._a00 = g & 65535),
                (this._a16 = g >>> 16),
                (this._a32 = 0),
                (this._a48 = 0),
                this
              );
            }
            d.prototype.fromNumber = x;
            function R(g, p) {
              (p = p || 10),
                (this._a00 = 0),
                (this._a16 = 0),
                (this._a32 = 0),
                (this._a48 = 0);
              for (
                var _ = i[p] || new d(Math.pow(p, 5)), T = 0, b = g.length;
                T < b;
                T += 5
              ) {
                var B = Math.min(5, b - T),
                  D = parseInt(g.slice(T, T + B), p);
                this.multiply(B < 5 ? new d(Math.pow(p, B)) : _).add(new d(D));
              }
              return this;
            }
            (d.prototype.fromString = R),
              (d.prototype.toNumber = function () {
                return this._a16 * 65536 + this._a00;
              }),
              (d.prototype.toString = function (g) {
                g = g || 10;
                var p = u[g] || new d(g);
                if (!this.gt(p)) return this.toNumber().toString(g);
                for (
                  var _ = this.clone(), T = new Array(64), b = 63;
                  b >= 0 &&
                  (_.div(p),
                  (T[b] = _.remainder.toNumber().toString(g)),
                  !!_.gt(p));
                  b--
                );
                return (T[b - 1] = _.toNumber().toString(g)), T.join("");
              }),
              (d.prototype.add = function (g) {
                var p = this._a00 + g._a00,
                  _ = p >>> 16;
                _ += this._a16 + g._a16;
                var T = _ >>> 16;
                T += this._a32 + g._a32;
                var b = T >>> 16;
                return (
                  (b += this._a48 + g._a48),
                  (this._a00 = p & 65535),
                  (this._a16 = _ & 65535),
                  (this._a32 = T & 65535),
                  (this._a48 = b & 65535),
                  this
                );
              }),
              (d.prototype.subtract = function (g) {
                return this.add(g.clone().negate());
              }),
              (d.prototype.multiply = function (g) {
                var p = this._a00,
                  _ = this._a16,
                  T = this._a32,
                  b = this._a48,
                  B = g._a00,
                  D = g._a16,
                  I = g._a32,
                  j = g._a48,
                  X = p * B,
                  ae = X >>> 16;
                ae += p * D;
                var K = ae >>> 16;
                (ae &= 65535), (ae += _ * B), (K += ae >>> 16), (K += p * I);
                var $ = K >>> 16;
                return (
                  (K &= 65535),
                  (K += _ * D),
                  ($ += K >>> 16),
                  (K &= 65535),
                  (K += T * B),
                  ($ += K >>> 16),
                  ($ += p * j),
                  ($ &= 65535),
                  ($ += _ * I),
                  ($ &= 65535),
                  ($ += T * D),
                  ($ &= 65535),
                  ($ += b * B),
                  (this._a00 = X & 65535),
                  (this._a16 = ae & 65535),
                  (this._a32 = K & 65535),
                  (this._a48 = $ & 65535),
                  this
                );
              }),
              (d.prototype.div = function (g) {
                if (g._a16 == 0 && g._a32 == 0 && g._a48 == 0) {
                  if (g._a00 == 0) throw Error("division by zero");
                  if (g._a00 == 1) return (this.remainder = new d(0)), this;
                }
                if (g.gt(this))
                  return (
                    (this.remainder = this.clone()),
                    (this._a00 = 0),
                    (this._a16 = 0),
                    (this._a32 = 0),
                    (this._a48 = 0),
                    this
                  );
                if (this.eq(g))
                  return (
                    (this.remainder = new d(0)),
                    (this._a00 = 1),
                    (this._a16 = 0),
                    (this._a32 = 0),
                    (this._a48 = 0),
                    this
                  );
                for (var p = g.clone(), _ = -1; !this.lt(p); )
                  p.shiftLeft(1, !0), _++;
                for (
                  this.remainder = this.clone(),
                    this._a00 = 0,
                    this._a16 = 0,
                    this._a32 = 0,
                    this._a48 = 0;
                  _ >= 0;
                  _--
                )
                  p.shiftRight(1),
                    this.remainder.lt(p) ||
                      (this.remainder.subtract(p),
                      _ >= 48
                        ? (this._a48 |= 1 << (_ - 48))
                        : _ >= 32
                          ? (this._a32 |= 1 << (_ - 32))
                          : _ >= 16
                            ? (this._a16 |= 1 << (_ - 16))
                            : (this._a00 |= 1 << _));
                return this;
              }),
              (d.prototype.negate = function () {
                var g = (~this._a00 & 65535) + 1;
                return (
                  (this._a00 = g & 65535),
                  (g = (~this._a16 & 65535) + (g >>> 16)),
                  (this._a16 = g & 65535),
                  (g = (~this._a32 & 65535) + (g >>> 16)),
                  (this._a32 = g & 65535),
                  (this._a48 = (~this._a48 + (g >>> 16)) & 65535),
                  this
                );
              }),
              (d.prototype.equals = d.prototype.eq =
                function (g) {
                  return (
                    this._a48 == g._a48 &&
                    this._a00 == g._a00 &&
                    this._a32 == g._a32 &&
                    this._a16 == g._a16
                  );
                }),
              (d.prototype.greaterThan = d.prototype.gt =
                function (g) {
                  return this._a48 > g._a48
                    ? !0
                    : this._a48 < g._a48
                      ? !1
                      : this._a32 > g._a32
                        ? !0
                        : this._a32 < g._a32
                          ? !1
                          : this._a16 > g._a16
                            ? !0
                            : this._a16 < g._a16
                              ? !1
                              : this._a00 > g._a00;
                }),
              (d.prototype.lessThan = d.prototype.lt =
                function (g) {
                  return this._a48 < g._a48
                    ? !0
                    : this._a48 > g._a48
                      ? !1
                      : this._a32 < g._a32
                        ? !0
                        : this._a32 > g._a32
                          ? !1
                          : this._a16 < g._a16
                            ? !0
                            : this._a16 > g._a16
                              ? !1
                              : this._a00 < g._a00;
                }),
              (d.prototype.or = function (g) {
                return (
                  (this._a00 |= g._a00),
                  (this._a16 |= g._a16),
                  (this._a32 |= g._a32),
                  (this._a48 |= g._a48),
                  this
                );
              }),
              (d.prototype.and = function (g) {
                return (
                  (this._a00 &= g._a00),
                  (this._a16 &= g._a16),
                  (this._a32 &= g._a32),
                  (this._a48 &= g._a48),
                  this
                );
              }),
              (d.prototype.xor = function (g) {
                return (
                  (this._a00 ^= g._a00),
                  (this._a16 ^= g._a16),
                  (this._a32 ^= g._a32),
                  (this._a48 ^= g._a48),
                  this
                );
              }),
              (d.prototype.not = function () {
                return (
                  (this._a00 = ~this._a00 & 65535),
                  (this._a16 = ~this._a16 & 65535),
                  (this._a32 = ~this._a32 & 65535),
                  (this._a48 = ~this._a48 & 65535),
                  this
                );
              }),
              (d.prototype.shiftRight = d.prototype.shiftr =
                function (g) {
                  return (
                    (g %= 64),
                    g >= 48
                      ? ((this._a00 = this._a48 >> (g - 48)),
                        (this._a16 = 0),
                        (this._a32 = 0),
                        (this._a48 = 0))
                      : g >= 32
                        ? ((g -= 32),
                          (this._a00 =
                            ((this._a32 >> g) | (this._a48 << (16 - g))) &
                            65535),
                          (this._a16 = (this._a48 >> g) & 65535),
                          (this._a32 = 0),
                          (this._a48 = 0))
                        : g >= 16
                          ? ((g -= 16),
                            (this._a00 =
                              ((this._a16 >> g) | (this._a32 << (16 - g))) &
                              65535),
                            (this._a16 =
                              ((this._a32 >> g) | (this._a48 << (16 - g))) &
                              65535),
                            (this._a32 = (this._a48 >> g) & 65535),
                            (this._a48 = 0))
                          : ((this._a00 =
                              ((this._a00 >> g) | (this._a16 << (16 - g))) &
                              65535),
                            (this._a16 =
                              ((this._a16 >> g) | (this._a32 << (16 - g))) &
                              65535),
                            (this._a32 =
                              ((this._a32 >> g) | (this._a48 << (16 - g))) &
                              65535),
                            (this._a48 = (this._a48 >> g) & 65535)),
                    this
                  );
                }),
              (d.prototype.shiftLeft = d.prototype.shiftl =
                function (g, p) {
                  return (
                    (g %= 64),
                    g >= 48
                      ? ((this._a48 = this._a00 << (g - 48)),
                        (this._a32 = 0),
                        (this._a16 = 0),
                        (this._a00 = 0))
                      : g >= 32
                        ? ((g -= 32),
                          (this._a48 =
                            (this._a16 << g) | (this._a00 >> (16 - g))),
                          (this._a32 = (this._a00 << g) & 65535),
                          (this._a16 = 0),
                          (this._a00 = 0))
                        : g >= 16
                          ? ((g -= 16),
                            (this._a48 =
                              (this._a32 << g) | (this._a16 >> (16 - g))),
                            (this._a32 =
                              ((this._a16 << g) | (this._a00 >> (16 - g))) &
                              65535),
                            (this._a16 = (this._a00 << g) & 65535),
                            (this._a00 = 0))
                          : ((this._a48 =
                              (this._a48 << g) | (this._a32 >> (16 - g))),
                            (this._a32 =
                              ((this._a32 << g) | (this._a16 >> (16 - g))) &
                              65535),
                            (this._a16 =
                              ((this._a16 << g) | (this._a00 >> (16 - g))) &
                              65535),
                            (this._a00 = (this._a00 << g) & 65535)),
                    p || (this._a48 &= 65535),
                    this
                  );
                }),
              (d.prototype.rotateLeft = d.prototype.rotl =
                function (g) {
                  if (((g %= 64), g == 0)) return this;
                  if (g >= 32) {
                    var p = this._a00;
                    if (
                      ((this._a00 = this._a32),
                      (this._a32 = p),
                      (p = this._a48),
                      (this._a48 = this._a16),
                      (this._a16 = p),
                      g == 32)
                    )
                      return this;
                    g -= 32;
                  }
                  var _ = (this._a48 << 16) | this._a32,
                    T = (this._a16 << 16) | this._a00,
                    b = (_ << g) | (T >>> (32 - g)),
                    B = (T << g) | (_ >>> (32 - g));
                  return (
                    (this._a00 = B & 65535),
                    (this._a16 = B >>> 16),
                    (this._a32 = b & 65535),
                    (this._a48 = b >>> 16),
                    this
                  );
                }),
              (d.prototype.rotateRight = d.prototype.rotr =
                function (g) {
                  if (((g %= 64), g == 0)) return this;
                  if (g >= 32) {
                    var p = this._a00;
                    if (
                      ((this._a00 = this._a32),
                      (this._a32 = p),
                      (p = this._a48),
                      (this._a48 = this._a16),
                      (this._a16 = p),
                      g == 32)
                    )
                      return this;
                    g -= 32;
                  }
                  var _ = (this._a48 << 16) | this._a32,
                    T = (this._a16 << 16) | this._a00,
                    b = (_ >>> g) | (T << (32 - g)),
                    B = (T >>> g) | (_ << (32 - g));
                  return (
                    (this._a00 = B & 65535),
                    (this._a16 = B >>> 16),
                    (this._a32 = b & 65535),
                    (this._a48 = b >>> 16),
                    this
                  );
                }),
              (d.prototype.clone = function () {
                return new d(this._a00, this._a16, this._a32, this._a48);
              }),
              o.exports ? (o.exports = d) : (n.UINT64 = d);
          })(Xl);
        })(Kr)),
      Kr.exports
    );
  }
  var Vo;
  function Jo() {
    return Vo || ((Vo = 1), (Hr.UINT32 = Yl()), (Hr.UINT64 = $l())), Hr;
  }
  var rs, Yo;
  function Zl() {
    if (Yo) return rs;
    Yo = 1;
    var o = Jo().UINT32;
    o.prototype.xxh_update = function (p, _) {
      var T = i._low,
        b = i._high,
        B,
        D;
      (D = p * T), (B = D >>> 16), (B += _ * T), (B &= 65535), (B += p * b);
      var I = this._low + (D & 65535),
        j = I >>> 16;
      j += this._high + (B & 65535);
      var X = (j << 16) | (I & 65535);
      (X = (X << 13) | (X >>> 19)),
        (I = X & 65535),
        (j = X >>> 16),
        (T = n._low),
        (b = n._high),
        (D = I * T),
        (B = D >>> 16),
        (B += j * T),
        (B &= 65535),
        (B += I * b),
        (this._low = D & 65535),
        (this._high = B & 65535);
    };
    var n = o("2654435761"),
      i = o("2246822519"),
      u = o("3266489917"),
      d = o("668265263"),
      w = o("374761393");
    function x(p) {
      for (var _ = [], T = 0, b = p.length; T < b; T++) {
        var B = p.charCodeAt(T);
        B < 128
          ? _.push(B)
          : B < 2048
            ? _.push(192 | (B >> 6), 128 | (B & 63))
            : B < 55296 || B >= 57344
              ? _.push(224 | (B >> 12), 128 | ((B >> 6) & 63), 128 | (B & 63))
              : (T++,
                (B = 65536 + (((B & 1023) << 10) | (p.charCodeAt(T) & 1023))),
                _.push(
                  240 | (B >> 18),
                  128 | ((B >> 12) & 63),
                  128 | ((B >> 6) & 63),
                  128 | (B & 63),
                ));
      }
      return new Uint8Array(_);
    }
    function R() {
      if (arguments.length == 2)
        return new R(arguments[1]).update(arguments[0]).digest();
      if (!(this instanceof R)) return new R(arguments[0]);
      g.call(this, arguments[0]);
    }
    function g(p) {
      return (
        (this.seed = p instanceof o ? p.clone() : o(p)),
        (this.v1 = this.seed.clone().add(n).add(i)),
        (this.v2 = this.seed.clone().add(i)),
        (this.v3 = this.seed.clone()),
        (this.v4 = this.seed.clone().subtract(n)),
        (this.total_len = 0),
        (this.memsize = 0),
        (this.memory = null),
        this
      );
    }
    return (
      (R.prototype.init = g),
      (R.prototype.update = function (p) {
        var _ = typeof p == "string",
          T;
        _ && ((p = x(p)), (_ = !1), (T = !0)),
          typeof ArrayBuffer < "u" &&
            p instanceof ArrayBuffer &&
            ((T = !0), (p = new Uint8Array(p)));
        var b = 0,
          B = p.length,
          D = b + B;
        if (B == 0) return this;
        if (
          ((this.total_len += B),
          this.memsize == 0 &&
            (_
              ? (this.memory = "")
              : T
                ? (this.memory = new Uint8Array(16))
                : (this.memory = new lr(16))),
          this.memsize + B < 16)
        )
          return (
            _
              ? (this.memory += p)
              : T
                ? this.memory.set(p.subarray(0, B), this.memsize)
                : p.copy(this.memory, this.memsize, 0, B),
            (this.memsize += B),
            this
          );
        if (this.memsize > 0) {
          _
            ? (this.memory += p.slice(0, 16 - this.memsize))
            : T
              ? this.memory.set(p.subarray(0, 16 - this.memsize), this.memsize)
              : p.copy(this.memory, this.memsize, 0, 16 - this.memsize);
          var I = 0;
          _
            ? (this.v1.xxh_update(
                (this.memory.charCodeAt(I + 1) << 8) |
                  this.memory.charCodeAt(I),
                (this.memory.charCodeAt(I + 3) << 8) |
                  this.memory.charCodeAt(I + 2),
              ),
              (I += 4),
              this.v2.xxh_update(
                (this.memory.charCodeAt(I + 1) << 8) |
                  this.memory.charCodeAt(I),
                (this.memory.charCodeAt(I + 3) << 8) |
                  this.memory.charCodeAt(I + 2),
              ),
              (I += 4),
              this.v3.xxh_update(
                (this.memory.charCodeAt(I + 1) << 8) |
                  this.memory.charCodeAt(I),
                (this.memory.charCodeAt(I + 3) << 8) |
                  this.memory.charCodeAt(I + 2),
              ),
              (I += 4),
              this.v4.xxh_update(
                (this.memory.charCodeAt(I + 1) << 8) |
                  this.memory.charCodeAt(I),
                (this.memory.charCodeAt(I + 3) << 8) |
                  this.memory.charCodeAt(I + 2),
              ))
            : (this.v1.xxh_update(
                (this.memory[I + 1] << 8) | this.memory[I],
                (this.memory[I + 3] << 8) | this.memory[I + 2],
              ),
              (I += 4),
              this.v2.xxh_update(
                (this.memory[I + 1] << 8) | this.memory[I],
                (this.memory[I + 3] << 8) | this.memory[I + 2],
              ),
              (I += 4),
              this.v3.xxh_update(
                (this.memory[I + 1] << 8) | this.memory[I],
                (this.memory[I + 3] << 8) | this.memory[I + 2],
              ),
              (I += 4),
              this.v4.xxh_update(
                (this.memory[I + 1] << 8) | this.memory[I],
                (this.memory[I + 3] << 8) | this.memory[I + 2],
              )),
            (b += 16 - this.memsize),
            (this.memsize = 0),
            _ && (this.memory = "");
        }
        if (b <= D - 16) {
          var j = D - 16;
          do
            _
              ? (this.v1.xxh_update(
                  (p.charCodeAt(b + 1) << 8) | p.charCodeAt(b),
                  (p.charCodeAt(b + 3) << 8) | p.charCodeAt(b + 2),
                ),
                (b += 4),
                this.v2.xxh_update(
                  (p.charCodeAt(b + 1) << 8) | p.charCodeAt(b),
                  (p.charCodeAt(b + 3) << 8) | p.charCodeAt(b + 2),
                ),
                (b += 4),
                this.v3.xxh_update(
                  (p.charCodeAt(b + 1) << 8) | p.charCodeAt(b),
                  (p.charCodeAt(b + 3) << 8) | p.charCodeAt(b + 2),
                ),
                (b += 4),
                this.v4.xxh_update(
                  (p.charCodeAt(b + 1) << 8) | p.charCodeAt(b),
                  (p.charCodeAt(b + 3) << 8) | p.charCodeAt(b + 2),
                ))
              : (this.v1.xxh_update(
                  (p[b + 1] << 8) | p[b],
                  (p[b + 3] << 8) | p[b + 2],
                ),
                (b += 4),
                this.v2.xxh_update(
                  (p[b + 1] << 8) | p[b],
                  (p[b + 3] << 8) | p[b + 2],
                ),
                (b += 4),
                this.v3.xxh_update(
                  (p[b + 1] << 8) | p[b],
                  (p[b + 3] << 8) | p[b + 2],
                ),
                (b += 4),
                this.v4.xxh_update(
                  (p[b + 1] << 8) | p[b],
                  (p[b + 3] << 8) | p[b + 2],
                )),
              (b += 4);
          while (b <= j);
        }
        return (
          b < D &&
            (_
              ? (this.memory += p.slice(b))
              : T
                ? this.memory.set(p.subarray(b, D), this.memsize)
                : p.copy(this.memory, this.memsize, b, D),
            (this.memsize = D - b)),
          this
        );
      }),
      (R.prototype.digest = function () {
        var p = this.memory,
          _ = typeof p == "string",
          T = 0,
          b = this.memsize,
          B,
          D,
          I = new o();
        for (
          this.total_len >= 16
            ? (B = this.v1
                .rotl(1)
                .add(
                  this.v2.rotl(7).add(this.v3.rotl(12).add(this.v4.rotl(18))),
                ))
            : (B = this.seed.clone().add(w)),
            B.add(I.fromNumber(this.total_len));
          T <= b - 4;

        )
          _
            ? I.fromBits(
                (p.charCodeAt(T + 1) << 8) | p.charCodeAt(T),
                (p.charCodeAt(T + 3) << 8) | p.charCodeAt(T + 2),
              )
            : I.fromBits((p[T + 1] << 8) | p[T], (p[T + 3] << 8) | p[T + 2]),
            B.add(I.multiply(u)).rotl(17).multiply(d),
            (T += 4);
        for (; T < b; )
          I.fromBits(_ ? p.charCodeAt(T++) : p[T++], 0),
            B.add(I.multiply(w)).rotl(11).multiply(n);
        return (
          (D = B.clone().shiftRight(15)),
          B.xor(D).multiply(i),
          (D = B.clone().shiftRight(13)),
          B.xor(D).multiply(u),
          (D = B.clone().shiftRight(16)),
          B.xor(D),
          this.init(this.seed),
          B
        );
      }),
      (rs = R),
      rs
    );
  }
  var is, Xo;
  function Ql() {
    if (Xo) return is;
    Xo = 1;
    var o = Jo().UINT64,
      n = o("11400714785074694791"),
      i = o("14029467366897019727"),
      u = o("1609587929392839161"),
      d = o("9650029242287828579"),
      w = o("2870177450012600261");
    function x(p) {
      for (var _ = [], T = 0, b = p.length; T < b; T++) {
        var B = p.charCodeAt(T);
        B < 128
          ? _.push(B)
          : B < 2048
            ? _.push(192 | (B >> 6), 128 | (B & 63))
            : B < 55296 || B >= 57344
              ? _.push(224 | (B >> 12), 128 | ((B >> 6) & 63), 128 | (B & 63))
              : (T++,
                (B = 65536 + (((B & 1023) << 10) | (p.charCodeAt(T) & 1023))),
                _.push(
                  240 | (B >> 18),
                  128 | ((B >> 12) & 63),
                  128 | ((B >> 6) & 63),
                  128 | (B & 63),
                ));
      }
      return new Uint8Array(_);
    }
    function R() {
      if (arguments.length == 2)
        return new R(arguments[1]).update(arguments[0]).digest();
      if (!(this instanceof R)) return new R(arguments[0]);
      g.call(this, arguments[0]);
    }
    function g(p) {
      return (
        (this.seed = p instanceof o ? p.clone() : o(p)),
        (this.v1 = this.seed.clone().add(n).add(i)),
        (this.v2 = this.seed.clone().add(i)),
        (this.v3 = this.seed.clone()),
        (this.v4 = this.seed.clone().subtract(n)),
        (this.total_len = 0),
        (this.memsize = 0),
        (this.memory = null),
        this
      );
    }
    return (
      (R.prototype.init = g),
      (R.prototype.update = function (p) {
        var _ = typeof p == "string",
          T;
        _ && ((p = x(p)), (_ = !1), (T = !0)),
          typeof ArrayBuffer < "u" &&
            p instanceof ArrayBuffer &&
            ((T = !0), (p = new Uint8Array(p)));
        var b = 0,
          B = p.length,
          D = b + B;
        if (B == 0) return this;
        if (
          ((this.total_len += B),
          this.memsize == 0 &&
            (_
              ? (this.memory = "")
              : T
                ? (this.memory = new Uint8Array(32))
                : (this.memory = new lr(32))),
          this.memsize + B < 32)
        )
          return (
            _
              ? (this.memory += p)
              : T
                ? this.memory.set(p.subarray(0, B), this.memsize)
                : p.copy(this.memory, this.memsize, 0, B),
            (this.memsize += B),
            this
          );
        if (this.memsize > 0) {
          _
            ? (this.memory += p.slice(0, 32 - this.memsize))
            : T
              ? this.memory.set(p.subarray(0, 32 - this.memsize), this.memsize)
              : p.copy(this.memory, this.memsize, 0, 32 - this.memsize);
          var I = 0;
          if (_) {
            var j;
            (j = o(
              (this.memory.charCodeAt(I + 1) << 8) | this.memory.charCodeAt(I),
              (this.memory.charCodeAt(I + 3) << 8) |
                this.memory.charCodeAt(I + 2),
              (this.memory.charCodeAt(I + 5) << 8) |
                this.memory.charCodeAt(I + 4),
              (this.memory.charCodeAt(I + 7) << 8) |
                this.memory.charCodeAt(I + 6),
            )),
              this.v1.add(j.multiply(i)).rotl(31).multiply(n),
              (I += 8),
              (j = o(
                (this.memory.charCodeAt(I + 1) << 8) |
                  this.memory.charCodeAt(I),
                (this.memory.charCodeAt(I + 3) << 8) |
                  this.memory.charCodeAt(I + 2),
                (this.memory.charCodeAt(I + 5) << 8) |
                  this.memory.charCodeAt(I + 4),
                (this.memory.charCodeAt(I + 7) << 8) |
                  this.memory.charCodeAt(I + 6),
              )),
              this.v2.add(j.multiply(i)).rotl(31).multiply(n),
              (I += 8),
              (j = o(
                (this.memory.charCodeAt(I + 1) << 8) |
                  this.memory.charCodeAt(I),
                (this.memory.charCodeAt(I + 3) << 8) |
                  this.memory.charCodeAt(I + 2),
                (this.memory.charCodeAt(I + 5) << 8) |
                  this.memory.charCodeAt(I + 4),
                (this.memory.charCodeAt(I + 7) << 8) |
                  this.memory.charCodeAt(I + 6),
              )),
              this.v3.add(j.multiply(i)).rotl(31).multiply(n),
              (I += 8),
              (j = o(
                (this.memory.charCodeAt(I + 1) << 8) |
                  this.memory.charCodeAt(I),
                (this.memory.charCodeAt(I + 3) << 8) |
                  this.memory.charCodeAt(I + 2),
                (this.memory.charCodeAt(I + 5) << 8) |
                  this.memory.charCodeAt(I + 4),
                (this.memory.charCodeAt(I + 7) << 8) |
                  this.memory.charCodeAt(I + 6),
              )),
              this.v4.add(j.multiply(i)).rotl(31).multiply(n);
          } else {
            var j;
            (j = o(
              (this.memory[I + 1] << 8) | this.memory[I],
              (this.memory[I + 3] << 8) | this.memory[I + 2],
              (this.memory[I + 5] << 8) | this.memory[I + 4],
              (this.memory[I + 7] << 8) | this.memory[I + 6],
            )),
              this.v1.add(j.multiply(i)).rotl(31).multiply(n),
              (I += 8),
              (j = o(
                (this.memory[I + 1] << 8) | this.memory[I],
                (this.memory[I + 3] << 8) | this.memory[I + 2],
                (this.memory[I + 5] << 8) | this.memory[I + 4],
                (this.memory[I + 7] << 8) | this.memory[I + 6],
              )),
              this.v2.add(j.multiply(i)).rotl(31).multiply(n),
              (I += 8),
              (j = o(
                (this.memory[I + 1] << 8) | this.memory[I],
                (this.memory[I + 3] << 8) | this.memory[I + 2],
                (this.memory[I + 5] << 8) | this.memory[I + 4],
                (this.memory[I + 7] << 8) | this.memory[I + 6],
              )),
              this.v3.add(j.multiply(i)).rotl(31).multiply(n),
              (I += 8),
              (j = o(
                (this.memory[I + 1] << 8) | this.memory[I],
                (this.memory[I + 3] << 8) | this.memory[I + 2],
                (this.memory[I + 5] << 8) | this.memory[I + 4],
                (this.memory[I + 7] << 8) | this.memory[I + 6],
              )),
              this.v4.add(j.multiply(i)).rotl(31).multiply(n);
          }
          (b += 32 - this.memsize), (this.memsize = 0), _ && (this.memory = "");
        }
        if (b <= D - 32) {
          var X = D - 32;
          do {
            if (_) {
              var j;
              (j = o(
                (p.charCodeAt(b + 1) << 8) | p.charCodeAt(b),
                (p.charCodeAt(b + 3) << 8) | p.charCodeAt(b + 2),
                (p.charCodeAt(b + 5) << 8) | p.charCodeAt(b + 4),
                (p.charCodeAt(b + 7) << 8) | p.charCodeAt(b + 6),
              )),
                this.v1.add(j.multiply(i)).rotl(31).multiply(n),
                (b += 8),
                (j = o(
                  (p.charCodeAt(b + 1) << 8) | p.charCodeAt(b),
                  (p.charCodeAt(b + 3) << 8) | p.charCodeAt(b + 2),
                  (p.charCodeAt(b + 5) << 8) | p.charCodeAt(b + 4),
                  (p.charCodeAt(b + 7) << 8) | p.charCodeAt(b + 6),
                )),
                this.v2.add(j.multiply(i)).rotl(31).multiply(n),
                (b += 8),
                (j = o(
                  (p.charCodeAt(b + 1) << 8) | p.charCodeAt(b),
                  (p.charCodeAt(b + 3) << 8) | p.charCodeAt(b + 2),
                  (p.charCodeAt(b + 5) << 8) | p.charCodeAt(b + 4),
                  (p.charCodeAt(b + 7) << 8) | p.charCodeAt(b + 6),
                )),
                this.v3.add(j.multiply(i)).rotl(31).multiply(n),
                (b += 8),
                (j = o(
                  (p.charCodeAt(b + 1) << 8) | p.charCodeAt(b),
                  (p.charCodeAt(b + 3) << 8) | p.charCodeAt(b + 2),
                  (p.charCodeAt(b + 5) << 8) | p.charCodeAt(b + 4),
                  (p.charCodeAt(b + 7) << 8) | p.charCodeAt(b + 6),
                )),
                this.v4.add(j.multiply(i)).rotl(31).multiply(n);
            } else {
              var j;
              (j = o(
                (p[b + 1] << 8) | p[b],
                (p[b + 3] << 8) | p[b + 2],
                (p[b + 5] << 8) | p[b + 4],
                (p[b + 7] << 8) | p[b + 6],
              )),
                this.v1.add(j.multiply(i)).rotl(31).multiply(n),
                (b += 8),
                (j = o(
                  (p[b + 1] << 8) | p[b],
                  (p[b + 3] << 8) | p[b + 2],
                  (p[b + 5] << 8) | p[b + 4],
                  (p[b + 7] << 8) | p[b + 6],
                )),
                this.v2.add(j.multiply(i)).rotl(31).multiply(n),
                (b += 8),
                (j = o(
                  (p[b + 1] << 8) | p[b],
                  (p[b + 3] << 8) | p[b + 2],
                  (p[b + 5] << 8) | p[b + 4],
                  (p[b + 7] << 8) | p[b + 6],
                )),
                this.v3.add(j.multiply(i)).rotl(31).multiply(n),
                (b += 8),
                (j = o(
                  (p[b + 1] << 8) | p[b],
                  (p[b + 3] << 8) | p[b + 2],
                  (p[b + 5] << 8) | p[b + 4],
                  (p[b + 7] << 8) | p[b + 6],
                )),
                this.v4.add(j.multiply(i)).rotl(31).multiply(n);
            }
            b += 8;
          } while (b <= X);
        }
        return (
          b < D &&
            (_
              ? (this.memory += p.slice(b))
              : T
                ? this.memory.set(p.subarray(b, D), this.memsize)
                : p.copy(this.memory, this.memsize, b, D),
            (this.memsize = D - b)),
          this
        );
      }),
      (R.prototype.digest = function () {
        var p = this.memory,
          _ = typeof p == "string",
          T = 0,
          b = this.memsize,
          B,
          D,
          I = new o();
        for (
          this.total_len >= 32
            ? ((B = this.v1.clone().rotl(1)),
              B.add(this.v2.clone().rotl(7)),
              B.add(this.v3.clone().rotl(12)),
              B.add(this.v4.clone().rotl(18)),
              B.xor(this.v1.multiply(i).rotl(31).multiply(n)),
              B.multiply(n).add(d),
              B.xor(this.v2.multiply(i).rotl(31).multiply(n)),
              B.multiply(n).add(d),
              B.xor(this.v3.multiply(i).rotl(31).multiply(n)),
              B.multiply(n).add(d),
              B.xor(this.v4.multiply(i).rotl(31).multiply(n)),
              B.multiply(n).add(d))
            : (B = this.seed.clone().add(w)),
            B.add(I.fromNumber(this.total_len));
          T <= b - 8;

        )
          _
            ? I.fromBits(
                (p.charCodeAt(T + 1) << 8) | p.charCodeAt(T),
                (p.charCodeAt(T + 3) << 8) | p.charCodeAt(T + 2),
                (p.charCodeAt(T + 5) << 8) | p.charCodeAt(T + 4),
                (p.charCodeAt(T + 7) << 8) | p.charCodeAt(T + 6),
              )
            : I.fromBits(
                (p[T + 1] << 8) | p[T],
                (p[T + 3] << 8) | p[T + 2],
                (p[T + 5] << 8) | p[T + 4],
                (p[T + 7] << 8) | p[T + 6],
              ),
            I.multiply(i).rotl(31).multiply(n),
            B.xor(I).rotl(27).multiply(n).add(d),
            (T += 8);
        for (
          T + 4 <= b &&
          (_
            ? I.fromBits(
                (p.charCodeAt(T + 1) << 8) | p.charCodeAt(T),
                (p.charCodeAt(T + 3) << 8) | p.charCodeAt(T + 2),
                0,
                0,
              )
            : I.fromBits(
                (p[T + 1] << 8) | p[T],
                (p[T + 3] << 8) | p[T + 2],
                0,
                0,
              ),
          B.xor(I.multiply(n)).rotl(23).multiply(i).add(u),
          (T += 4));
          T < b;

        )
          I.fromBits(_ ? p.charCodeAt(T++) : p[T++], 0, 0, 0),
            B.xor(I.multiply(w)).rotl(11).multiply(n);
        return (
          (D = B.clone().shiftRight(33)),
          B.xor(D).multiply(i),
          (D = B.clone().shiftRight(29)),
          B.xor(D).multiply(u),
          (D = B.clone().shiftRight(32)),
          B.xor(D),
          this.init(this.seed),
          B
        );
      }),
      (is = R),
      is
    );
  }
  var ss, $o;
  function eh() {
    return $o || (($o = 1), (ss = { h32: Zl(), h64: Ql() })), ss;
  }
  var th = eh();
  const os = (() => {
    const o = document.querySelector("comment#tetris-event-bus");
    if (o) return o;
    const n = new Comment("tetris-event-bus");
    return document.body.appendChild(n), n;
  })();
  function nh(o) {
    return "detail" in o;
  }
  function ln(o, n) {
    const i = n ? new CustomEvent(o, { detail: n }) : new CustomEvent(o);
    os.dispatchEvent(i);
  }
  function En(o, n) {
    const i = (u) => {
      if (nh(u)) {
        const d = u.detail;
        n(d);
      }
    };
    return (
      os.addEventListener(o, i),
      () => {
        os.removeEventListener(o, i);
      }
    );
  }
  const Zo = { goldenTetrominoToCollect: 4 };
  "ReceiveMessageValuesFromGame" in window ||
    (window.ReceiveMessageValuesFromGame = (o) => {
      if (Array.isArray(o)) {
        let n = o;
        as("SE", n), ta(n);
      }
    }),
    "ReceiveEncryptedMessageValuesFromGame" in window ||
      (window.ReceiveEncryptedMessageValuesFromGame = (o) => {
        if (Array.isArray(o)) {
          const n = o;
          n.length > 16 ? as("GE", n) : (as("SE", n), ta(n));
        }
      }),
    "TetrisStore" in window ||
      (window.TetrisStore = {
        backendEvents: [],
        goldenTetrominos: 0,
        clearBackendEvents: () => (window.TetrisStore.backendEvents = []),
        eventPerSessionSequence: 0,
        clearEventPerSessionSequence: () =>
          (window.TetrisStore.eventPerSessionSequence = 0),
      });
  // Add this near the ReceiveMessageValuesFromGame function
  const originalReceiveMessage = window.ReceiveMessageValuesFromGame;
  window.ReceiveMessageValuesFromGame = function (o) {
    if (Array.isArray(o)) {
      console.log("Game message received:", o);
      // Look for score-related events (event type 31 is game over with score)
      if (o[0] === 31 && o[1] !== undefined) {
        console.log("🎯 FINAL SCORE:", o[1]);
      }
    }
    originalReceiveMessage && originalReceiveMessage(o);
  };
  function Qo() {
    return window.TetrisStore.eventPerSessionSequence++;
  }
  function as(o, n) {
    if (o === "GE") {
      const i = n.slice(0, 16),
        u = n.slice(16),
        d = lr.from(i).toString("base64"),
        w = Qo(),
        x = lr.from(u).toString("base64"),
        R = `GE${String(w).padStart(4, "0")}${Date.now()}${d}:${x}`;
      window.TetrisStore.backendEvents.push(R),
        ln("BACKEND_EVENTS_CHANGED", {
          events: window.TetrisStore.backendEvents,
        });
    } else if (o === "SE") {
      const [i, ...u] = n,
        d = Qo();
      let w = `SE${String(d).padStart(4, "0")}${Date.now()}${i.toString(2).padStart(5, "0")}${u.length >= 1 ? "D" + u.join("D") : ""}`;
      window.TetrisStore.backendEvents.push(w),
        ln("BACKEND_EVENTS_CHANGED", {
          events: window.TetrisStore.backendEvents,
        });
    }
  }
  function ea() {
    var n;
    return (
      (((n = window.TetrisStore) == null ? void 0 : n.goldenTetrominos) || 0) >=
      Zo.goldenTetrominoToCollect
    );
  }
  function ta(o) {
    function n() {
      const g = window.TetrisStore.goldenTetrominos++;
      g >= Zo.goldenTetrominoToCollect &&
        ln("TETRIS_GOLDEN_TETROMINO_CLEARED", { goldenTetrominos: g });
    }
    n.eventType = 23;
    function i() {
      ln("TETRIS_GAME_CANCELLED");
    }
    i.eventType = 30;
    function u(g) {
      const p = {
        score: g,
        goldenTetrominoCollected: ea(),
        gameFinishedAt: new Date().toISOString(),
        gameSessionId: window.GetSID ? window.GetSID() : "",
      };
      if (!p.gameSessionId) throw new Error("Game session ID is not defined");
      const _ = JSON.parse(localStorage.getItem("TETRIS_GAMES") || "{}");
      (_[p.gameSessionId] = p),
        localStorage.setItem("TETRIS_GAMES", JSON.stringify(_)),
        ln("TETRIS_GAME_OVER", {
          score: g,
          goldenTetrominoCollected: ea(),
          gameFinishedAt: new Date().toISOString(),
          gameSessionId: window.GetSID ? window.GetSID() : "",
        }),
        (window.TetrisStore.goldenTetrominos = 0);
    }
    u.eventType = 31;
    function d() {
      ln("TETRIS_GAME_MAIN_MENU_LOADED");
    }
    d.eventType = 3;
    function w() {
      ln("TETRIS_GAME_STARTED");
    }
    w.eventType = 21;
    const [x, ...R] = o;
    if (Number.isNaN(x)) {
      console.error("Invalid event type: ", x);
      return;
    }
    switch (x) {
      case n.eventType:
        n();
        break;
      case i.eventType:
        i();
        break;
      case u.eventType:
        u(R[0]);
        break;
      case d.eventType:
        d();
        break;
      case w.eventType:
        w();
        break;
    }
  }
  function rh() {
    return JSON.parse(localStorage.getItem("TETRIS_GAMES") || "{}");
  }
  function ih() {
    if (!("TetrisStore" in window))
      throw new Error("TetrisStore is not defined");
    if (!("ReceiveMessageValuesFromGame" in window))
      throw new Error("ReceiveMessageValuesFromGame is not defined");
    if (!("ReceiveEncryptedMessageValuesFromGame" in window))
      throw new Error("ReceiveEncryptedMessageValuesFromGame is not defined");
    return {
      tetrisStore: window.TetrisStore,
      receiveMessageValuesFromGame: window.ReceiveMessageValuesFromGame,
      receiveEncryptedMessageValuesFromGame:
        window.ReceiveEncryptedMessageValuesFromGame,
    };
  }
  const Ft = class Ft {
    constructor({
      leaderboardId: n,
      gameBackendMaxBatchSize: i,
      userAuthToken: u,
      languageCode: d,
    }) {
      mt(this, "globalTetrisStore");
      mt(this, "leaderboardId");
      mt(this, "gameBackendSessionId");
      mt(this, "gameBackendMaxBatchSize", 25);
      mt(this, "gameBackendPacketSequence", 1);
      mt(this, "gamePlayerId");
      mt(this, "gameEventsSubscriptions", []);
      mt(this, "userAuthToken");
      mt(this, "nationalLeaderboard");
      mt(this, "playingLeaderboard");
      mt(this, "languageCode");
      const { tetrisStore: w } = ih();
      (this.globalTetrisStore = w),
        (this.leaderboardId = n),
        (this.userAuthToken = u),
        (this.languageCode = d),
        i && (this.gameBackendMaxBatchSize = i),
        this.subscribeToGameEvents(),
        Ft.gameBackendSocket ||
          (Ft.gameBackendSocket = Wr(`${tt.GAME_BACKEND_URL}/ws`, {
            path: "/session",
            transports: ["websocket"],
          })),
        Ft.gameBackendSocket &&
          (Ft.gameBackendSocket.connect(),
          Ft.gameBackendSocket.on("disconnected", () => {
            ln("SESSION_DISCONNECTED");
          }));
    }
    setGameBackendSessionId(n) {
      (this.gameBackendSessionId = n),
        this.globalTetrisStore.clearEventPerSessionSequence(),
        (window.GetSID = () => this.gameBackendSessionId);
    }
    sendGameEventsToBackend(n, i, u = this.gameBackendMaxBatchSize) {
      if (n.length < u && n.length > 0) return;
      const w = n.slice(0);
      this.globalTetrisStore.clearBackendEvents();
      const x = th.h64(0);
      try {
        const R = w.join(""),
          g = x.update(JSON.stringify(R)).digest().toString(16),
          p = `${i}${String(this.gameBackendPacketSequence).padStart(3, "0")}${String(n.length).padStart(2, "0")}${(this.gamePlayerId ?? "").padStart(36, " ")}${g.padStart(16, " ")}${R}`;
        Ft.gameBackendSocket.emit("gameEvent", p, () => {
          this.gameBackendPacketSequence++;
        });
      } catch (R) {
        this.globalTetrisStore.backendEvents.unshift(...w),
          console.error("Could not send game event packet:", R);
      }
    }
    subscribeToGameEvents() {
      this.gameEventsSubscriptions.length === 0 &&
        (this.gameEventsSubscriptions = [
          En("BACKEND_EVENTS_CHANGED", ({ events: n }) => {
            this.gameBackendSessionId &&
              this.sendGameEventsToBackend(n, this.gameBackendSessionId);
          }),
          En("TETRIS_GAME_OVER", (n) => {
            this.sendGameEventsToBackend(
              this.globalTetrisStore.backendEvents,
              n.gameSessionId,
              0,
            );
          }),
        ]);
    }
    async loadLeaderboards() {
      const n = await tt.getNationalLeaderboard(this.leaderboardId);
      return (
        (this.nationalLeaderboard = n),
        n.id === this.leaderboardId
          ? (this.playingLeaderboard = n)
          : (this.playingLeaderboard = await tt.getLeaderboard(
              this.leaderboardId,
            )),
        {
          nationalLeaderboard: this.nationalLeaderboard,
          playingLeaderboard: this.playingLeaderboard,
        }
      );
    }
    async loadSubmissionConfig() {
      if (!this.nationalLeaderboard)
        throw new Error("National leaderboard not found");
      return await Wc.getNationalGameConfig(
        this.nationalLeaderboard.id,
        this.languageCode,
      );
    }
    async loadGamePlayer() {
      const n = await tt.getGamePlayer(this.userAuthToken);
      return (this.gamePlayerId = n == null ? void 0 : n.id), n;
    }
    loadGameSession() {
      return new Promise((n, i) => {
        if (!this.nationalLeaderboard || !this.playingLeaderboard) {
          i(new Error("Failed loading leaderboards"));
          return;
        }
        Ft.gameBackendSocket.emit(
          "startSession",
          {
            leaderboardId: this.playingLeaderboard.id,
            userId: this.gamePlayerId || null,
            nationalLeaderboardId: this.nationalLeaderboard.id,
            isSweepstakes: this.nationalLeaderboard.isSweepstakesAllowed,
          },
          (u) => {
            if (!u) {
              i(new Error("Failed to start session"));
              return;
            }
            const d = u.id;
            this.setGameBackendSessionId(d), n(d);
          },
        );
      });
    }
    async refreshGameSession() {
      if ((await this.loadGameSession(), this.gameBackendSessionId))
        return (
          this.globalTetrisStore.clearBackendEvents(),
          (this.gameBackendPacketSequence = 1),
          this.gameBackendSessionId
        );
      throw new Error("Failed to start game session");
    }
    async startGameSession() {
      if (this.gameBackendSessionId)
        return (
          await this.refreshGameSession(),
          {
            gameSessionId: this.gameBackendSessionId,
            nationalLeaderboard: this.nationalLeaderboard,
            playingLeaderboard: this.playingLeaderboard,
          }
        );
      if (
        (await this.loadLeaderboards(),
        await this.loadGamePlayer(),
        await this.loadGameSession(),
        this.gameBackendSessionId)
      )
        return {
          gameSessionId: this.gameBackendSessionId,
          nationalLeaderboard: this.nationalLeaderboard,
          playingLeaderboard: this.playingLeaderboard,
        };
      throw new Error("Failed to start game session");
    }
    onSessionDisconnected(n) {
      const i = En("SESSION_DISCONNECTED", () => {
        n();
      });
      this.gameEventsSubscriptions.push(i);
    }
    onGameOver(n, i, u) {
      const d = En("TETRIS_GAME_OVER", () => {
        if (!this.gameBackendSessionId)
          throw new Error("Game backend session id not found");
        n();
        const x = this.getGameScores()[this.gameBackendSessionId];
        if (!x) throw new Error("gameScore not found");
        Promise.all([
          this.checkBackendEventsAreSent(),
          this.loadSubmissionConfig(),
          this.refreshGameSession(),
        ])
          .then(([R, g, p]) => {
            R && i(p, g, x);
          })
          .catch(u);
      });
      this.gameEventsSubscriptions.push(d);
    }
    checkBackendEventsAreSent() {
      const n = () => this.globalTetrisStore.backendEvents.length === 0;
      return new Promise((i, u) => {
        if (n()) {
          i(!0);
          return;
        }
        setTimeout(() => {
          this.globalTetrisStore.backendEvents.length === 0 && i(!0),
            u(new Error("Network error"));
        }, 2e3);
      });
    }
    onGameCancelled(n, i) {
      const u = En("TETRIS_GAME_CANCELLED", () => {
        n(),
          this.refreshGameSession().then((d) => {
            i(d);
          });
      });
      this.gameEventsSubscriptions.push(u);
    }
    onGameMainMenuLoaded(n) {
      const i = En("TETRIS_GAME_MAIN_MENU_LOADED", () => {
        n();
      });
      this.gameEventsSubscriptions.push(i);
    }
    onGameStarted(n) {
      const i = En("TETRIS_GAME_STARTED", () => {
        n();
      });
      this.gameEventsSubscriptions.push(i);
    }
    getGameScores() {
      return rh();
    }
    async destroy() {
      (this.gameBackendSessionId = void 0),
        this.gameEventsSubscriptions.forEach((n) => n()),
        Ft.gameBackendSocket.disconnect();
    }
  };
  mt(Ft, "gameBackendSocket");
  let us = Ft;
  function sh() {
    return (
      new URLSearchParams(window.location.search).get("inGamePlayingMode") ===
      "true"
    );
  }
  let yt = null;
  function oh({
    leaderboardId: o,
    languageCode: n,
    onSessionDisconnected: i,
    onGameStarted: u,
    onGameOverError: d,
  }) {
    const { rbAccount: w } = jt.useRbAccount(),
      [x, R] = v.reactExports.useState(null),
      [g, p] = v.reactExports.useState(!1),
      [_, T] = v.reactExports.useState(null),
      [b, B] = v.reactExports.useState(!1);
    v.reactExports.useEffect(() => {
      D();
    }, []),
      v.reactExports.useEffect(() => {
        b === !1 &&
          (R(null),
          yt == null ||
            yt
              .startGameSession()
              .then(
                ({
                  gameSessionId: ae,
                  nationalLeaderboard: K,
                  playingLeaderboard: $,
                }) => {
                  R(ae), T({ nationalLeaderboard: K, playingLeaderboard: $ });
                },
              ));
      }, [b]);
    async function D() {
      const ae = await w.RBAccounts.getJwt();
      yt ||
        ((yt = new us({
          leaderboardId: o,
          userAuthToken: ae,
          languageCode: n,
        })),
        yt
          .startGameSession()
          .then(
            ({
              gameSessionId: K,
              nationalLeaderboard: $,
              playingLeaderboard: Z,
            }) => {
              R(K), T({ nationalLeaderboard: $, playingLeaderboard: Z });
            },
          ),
        j(yt),
        I(yt));
    }
    function I(ae) {
      ae.onSessionDisconnected(i);
    }
    function j(ae) {
      ae.onGameStarted(u),
        ae.onGameOver(
          () => R(null),
          (K, $, Z) => {
            B({ submissionConfig: $, gameScore: Z }), R(K);
          },
          d,
        ),
        ae.onGameCancelled(
          () => R(null),
          (K) => {
            R(K), B(!1);
          },
        ),
        ae.onGameMainMenuLoaded(() => {
          p(!0);
        });
    }
    function X() {
      B(!1), R(null), yt == null || yt.destroy(), (yt = null);
    }
    return {
      gameOver: b,
      gameSessionId: x,
      setGameOver: B,
      exitGame: X,
      leaderboards: _,
      gameMainMenuLoaded: g,
      setGameMainMenuLoaded: p,
    };
  }
  const Vr = Object.keys({
      "/public/tetris/Build/2f95df53f77bda1fdfccc67f5164d299.wasm": 0,
      "/public/tetris/Build/8ba45b6e20413327bf0fd9b18798aca4.framework.js": 0,
      "/public/tetris/Build/c51a76e927363cb11210e64514ab3223.loader.js": 0,
      "/public/tetris/Build/f138187ee31f8f396c9a5c40785ac542.data": 0,
    }),
    ah = Vr.find((o) => o.endsWith("loader.js")),
    uh = Vr.find((o) => o.endsWith("framework.js")),
    ch = Vr.find((o) => o.endsWith("data")),
    lh = Vr.find((o) => o.endsWith("wasm")),
    Jr = "https://p-p.redbull.com/rb-red-bull-tetris-7k-ff-prod".replace(
      /\/$/,
      "",
    ),
    hh = {
      loaderUrl: ah.replace("/public", Jr),
      frameworkUrl: uh.replace("/public", Jr),
      dataUrl: ch.replace("/public", Jr),
      codeUrl: lh.replace("/public", Jr),
    };
  function Wn(o, n, i, u) {
    function d(w) {
      return w instanceof i
        ? w
        : new i(function (x) {
            x(w);
          });
    }
    return new (i || (i = Promise))(function (w, x) {
      function R(_) {
        try {
          p(u.next(_));
        } catch (T) {
          x(T);
        }
      }
      function g(_) {
        try {
          p(u.throw(_));
        } catch (T) {
          x(T);
        }
      }
      function p(_) {
        _.done ? w(_.value) : d(_.value).then(R, g);
      }
      p((u = u.apply(o, [])).next());
    });
  }
  function ye(o, n, i, u) {
    if (typeof n == "function" ? o !== n || !0 : !n.has(o))
      throw new TypeError(
        "Cannot read private member from an object whose class did not declare it",
      );
    return i === "m" ? u : i === "a" ? u.call(o) : u ? u.value : n.get(o);
  }
  function qt(o, n, i, u, d) {
    if (typeof n == "function" ? o !== n || !0 : !n.has(o))
      throw new TypeError(
        "Cannot write private member to an object whose class did not declare it",
      );
    return n.set(o, i), i;
  }
  typeof SuppressedError == "function" && SuppressedError;
  class fh {
    constructor(n) {
      this.config = n;
    }
  }
  class na extends Error {
    constructor(n, i, u) {
      super(u),
        (this.name = "ApiError"),
        (this.url = i.url),
        (this.status = i.status),
        (this.statusText = i.statusText),
        (this.body = i.body),
        (this.request = n);
    }
  }
  var Jt, Yt, Ht, wn, qn, hr, bn;
  class dh extends Error {
    constructor(n) {
      super(n), (this.name = "CancelError");
    }
    get isCancelled() {
      return !0;
    }
  }
  class mh {
    constructor(n) {
      Jt.set(this, void 0),
        Yt.set(this, void 0),
        Ht.set(this, void 0),
        wn.set(this, void 0),
        qn.set(this, void 0),
        hr.set(this, void 0),
        bn.set(this, void 0),
        qt(this, Jt, !1),
        qt(this, Yt, !1),
        qt(this, Ht, !1),
        qt(this, wn, []),
        qt(
          this,
          qn,
          new Promise((i, u) => {
            qt(this, hr, i, "f"), qt(this, bn, u, "f");
            const d = (R) => {
                ye(this, Jt, "f") ||
                  ye(this, Yt, "f") ||
                  ye(this, Ht, "f") ||
                  (qt(this, Jt, !0, "f"),
                  ye(this, hr, "f") && ye(this, hr, "f").call(this, R));
              },
              w = (R) => {
                ye(this, Jt, "f") ||
                  ye(this, Yt, "f") ||
                  ye(this, Ht, "f") ||
                  (qt(this, Yt, !0, "f"),
                  ye(this, bn, "f") && ye(this, bn, "f").call(this, R));
              },
              x = (R) => {
                ye(this, Jt, "f") ||
                  ye(this, Yt, "f") ||
                  ye(this, Ht, "f") ||
                  ye(this, wn, "f").push(R);
              };
            return (
              Object.defineProperty(x, "isResolved", {
                get: () => ye(this, Jt, "f"),
              }),
              Object.defineProperty(x, "isRejected", {
                get: () => ye(this, Yt, "f"),
              }),
              Object.defineProperty(x, "isCancelled", {
                get: () => ye(this, Ht, "f"),
              }),
              n(d, w, x)
            );
          }),
        );
    }
    get [((Jt = new WeakMap()),
    (Yt = new WeakMap()),
    (Ht = new WeakMap()),
    (wn = new WeakMap()),
    (qn = new WeakMap()),
    (hr = new WeakMap()),
    (bn = new WeakMap()),
    Symbol.toStringTag)]() {
      return "Cancellable Promise";
    }
    then(n, i) {
      return ye(this, qn, "f").then(n, i);
    }
    catch(n) {
      return ye(this, qn, "f").catch(n);
    }
    finally(n) {
      return ye(this, qn, "f").finally(n);
    }
    cancel() {
      if (!(ye(this, Jt, "f") || ye(this, Yt, "f") || ye(this, Ht, "f"))) {
        if ((qt(this, Ht, !0), ye(this, wn, "f").length))
          try {
            for (const n of ye(this, wn, "f")) n();
          } catch (n) {
            console.warn("Cancellation threw an error", n);
            return;
          }
        (ye(this, wn, "f").length = 0),
          ye(this, bn, "f") &&
            ye(this, bn, "f").call(this, new dh("Request aborted"));
      }
    }
    get isCancelled() {
      return ye(this, Ht, "f");
    }
  }
  const cs = (o) => o != null,
    fr = (o) => typeof o == "string",
    ls = (o) => fr(o) && o !== "",
    hs = (o) =>
      typeof o == "object" &&
      typeof o.type == "string" &&
      typeof o.stream == "function" &&
      typeof o.arrayBuffer == "function" &&
      typeof o.constructor == "function" &&
      typeof o.constructor.name == "string" &&
      /^(Blob|File)$/.test(o.constructor.name) &&
      /^(Blob|File)$/.test(o[Symbol.toStringTag]),
    ra = (o) => o instanceof FormData,
    ph = (o) => {
      try {
        return btoa(o);
      } catch {
        return lr.from(o).toString("base64");
      }
    },
    gh = (o) => {
      const n = [],
        i = (d, w) => {
          n.push(`${encodeURIComponent(d)}=${encodeURIComponent(String(w))}`);
        },
        u = (d, w) => {
          cs(w) &&
            (Array.isArray(w)
              ? w.forEach((x) => {
                  u(d, x);
                })
              : typeof w == "object"
                ? Object.entries(w).forEach(([x, R]) => {
                    u(`${d}[${x}]`, R);
                  })
                : i(d, w));
        };
      return (
        Object.entries(o).forEach(([d, w]) => {
          u(d, w);
        }),
        n.length > 0 ? `?${n.join("&")}` : ""
      );
    },
    _h = (o, n) => {
      const i = o.ENCODE_PATH || encodeURI,
        u = n.url
          .replace("{api-version}", o.VERSION)
          .replace(/{(.*?)}/g, (w, x) => {
            var R;
            return !((R = n.path) === null || R === void 0) &&
              R.hasOwnProperty(x)
              ? i(String(n.path[x]))
              : w;
          }),
        d = `${o.BASE}${u}`;
      return n.query ? `${d}${gh(n.query)}` : d;
    },
    yh = (o) => {
      if (o.formData) {
        const n = new FormData(),
          i = (u, d) => {
            fr(d) || hs(d) ? n.append(u, d) : n.append(u, JSON.stringify(d));
          };
        return (
          Object.entries(o.formData)
            .filter(([u, d]) => cs(d))
            .forEach(([u, d]) => {
              Array.isArray(d) ? d.forEach((w) => i(u, w)) : i(u, d);
            }),
          n
        );
      }
    },
    Yr = (o, n) =>
      Wn(void 0, void 0, void 0, function* () {
        return typeof n == "function" ? n(o) : n;
      }),
    xh = (o, n) =>
      Wn(void 0, void 0, void 0, function* () {
        const [i, u, d, w] = yield Promise.all([
            Yr(n, o.TOKEN),
            Yr(n, o.USERNAME),
            Yr(n, o.PASSWORD),
            Yr(n, o.HEADERS),
          ]),
          x = Object.entries(
            Object.assign(
              Object.assign({ Accept: "application/json" }, w),
              n.headers,
            ),
          )
            .filter(([R, g]) => cs(g))
            .reduce(
              (R, [g, p]) =>
                Object.assign(Object.assign({}, R), { [g]: String(p) }),
              {},
            );
        if ((ls(i) && (x.Authorization = `Bearer ${i}`), ls(u) && ls(d))) {
          const R = ph(`${u}:${d}`);
          x.Authorization = `Basic ${R}`;
        }
        return (
          n.body !== void 0 &&
            (n.mediaType
              ? (x["Content-Type"] = n.mediaType)
              : hs(n.body)
                ? (x["Content-Type"] =
                    n.body.type || "application/octet-stream")
                : fr(n.body)
                  ? (x["Content-Type"] = "text/plain")
                  : ra(n.body) || (x["Content-Type"] = "application/json")),
          new Headers(x)
        );
      }),
    vh = (o) => {
      var n;
      if (o.body !== void 0)
        return !((n = o.mediaType) === null || n === void 0) &&
          n.includes("/json")
          ? JSON.stringify(o.body)
          : fr(o.body) || hs(o.body) || ra(o.body)
            ? o.body
            : JSON.stringify(o.body);
    },
    Eh = (o, n, i, u, d, w, x) =>
      Wn(void 0, void 0, void 0, function* () {
        const R = new AbortController(),
          g = { headers: w, body: u ?? d, method: n.method, signal: R.signal };
        return (
          o.WITH_CREDENTIALS && (g.credentials = o.CREDENTIALS),
          x(() => R.abort()),
          yield fetch(i, g)
        );
      }),
    wh = (o, n) => {
      if (n) {
        const i = o.headers.get(n);
        if (fr(i)) return i;
      }
    },
    bh = (o) =>
      Wn(void 0, void 0, void 0, function* () {
        if (o.status !== 204)
          try {
            const n = o.headers.get("Content-Type");
            if (n)
              return ["application/json", "application/problem+json"].some(
                (d) => n.toLowerCase().startsWith(d),
              )
                ? yield o.json()
                : yield o.text();
          } catch (n) {
            console.error(n);
          }
      }),
    Ah = (o, n) => {
      var i, u;
      const w = Object.assign(
        {
          400: "Bad Request",
          401: "Unauthorized",
          403: "Forbidden",
          404: "Not Found",
          500: "Internal Server Error",
          502: "Bad Gateway",
          503: "Service Unavailable",
        },
        o.errors,
      )[n.status];
      if (w) throw new na(o, n, w);
      if (!n.ok) {
        const x = (i = n.status) !== null && i !== void 0 ? i : "unknown",
          R = (u = n.statusText) !== null && u !== void 0 ? u : "unknown",
          g = (() => {
            try {
              return JSON.stringify(n.body, null, 2);
            } catch {
              return;
            }
          })();
        throw new na(
          o,
          n,
          `Generic Error: status: ${x}; status text: ${R}; body: ${g}`,
        );
      }
    },
    Sh = (o, n) =>
      new mh((i, u, d) =>
        Wn(void 0, void 0, void 0, function* () {
          try {
            const w = _h(o, n),
              x = yh(n),
              R = vh(n),
              g = yield xh(o, n);
            if (!d.isCancelled) {
              const p = yield Eh(o, n, w, R, x, g, d),
                _ = yield bh(p),
                T = wh(p, n.responseHeader),
                b = {
                  url: w,
                  ok: p.ok,
                  status: p.status,
                  statusText: p.statusText,
                  body: T ?? _,
                };
              Ah(n, b), i(b.body);
            }
          } catch (w) {
            u(w);
          }
        }),
      );
  class Ch extends fh {
    constructor(n) {
      super(n);
    }
    request(n) {
      return Sh(this.config, n);
    }
  }
  class Rh {
    constructor(n) {
      this.httpRequest = n;
    }
    submitCustomForm(n, i) {
      return this.httpRequest.request({
        method: "POST",
        url: "/public/v1/forms/{formAlias}/submissions",
        path: { formAlias: n },
        body: i,
        mediaType: "application/json",
      });
    }
    listForms(n, i) {
      return this.httpRequest.request({
        method: "GET",
        url: "/public/v1/forms",
        headers: { "X-Jotform-Username": n },
        query: { connectable: i },
      });
    }
    retrieveForm(n, i) {
      return this.httpRequest.request({
        method: "GET",
        url: "/public/v1/forms/{formAlias}",
        path: { formAlias: n },
        headers: { "X-Jotform-Username": i },
      });
    }
    retrieveRequiredItemsForFormSubmissions(n, i, u, d) {
      return this.httpRequest.request({
        method: "GET",
        url: "/public/v1/forms/{formAlias}/required-items",
        path: { formAlias: n },
        headers: { "CloudFront-Viewer-Country": d },
        query: { language: i, country: u },
        errors: {
          404: "When the form or the respective consent items cannot be loaded.",
          412: "When the policies for the form are not available.",
        },
      });
    }
  }
  class Th {
    constructor(n) {
      this.httpRequest = n;
    }
    getJotformIntegration(n, i) {
      return this.httpRequest.request({
        method: "GET",
        url: "/public/v1/integrations/jotform/form-connections/{jotformFormId}",
        path: { jotformFormId: n },
        headers: { "X-Jotform-Username": i },
        errors: { 404: "No Jotform connection found for this Jotform form id" },
      });
    }
    createOrUpdateJotformIntegration(n, i, u) {
      return this.httpRequest.request({
        method: "PUT",
        url: "/public/v1/integrations/jotform/form-connections/{jotformFormId}",
        path: { jotformFormId: n },
        headers: { "X-Jotform-Username": i },
        body: u,
        mediaType: "application/json",
      });
    }
    disconnectJotformIntegration(n, i) {
      return this.httpRequest.request({
        method: "DELETE",
        url: "/public/v1/integrations/jotform/form-connections/{jotformFormId}",
        path: { jotformFormId: n },
        headers: { "X-Jotform-Username": i },
      });
    }
    authenticateJotformIntegration(n) {
      return this.httpRequest.request({
        method: "POST",
        url: "/public/v1/integrations/jotform/authenticate",
        headers: { "X-Jotform-Username": n },
        errors: { 401: "Wrong credentials" },
      });
    }
  }
  class Ih {
    constructor(n, i = Ch) {
      var u, d, w, x;
      (this.request = new i({
        BASE:
          (u = n == null ? void 0 : n.BASE) !== null && u !== void 0
            ? u
            : "https://abs-gateway.redbull.com/form-service",
        VERSION:
          (d = n == null ? void 0 : n.VERSION) !== null && d !== void 0
            ? d
            : "2.0",
        WITH_CREDENTIALS:
          (w = n == null ? void 0 : n.WITH_CREDENTIALS) !== null && w !== void 0
            ? w
            : !1,
        CREDENTIALS:
          (x = n == null ? void 0 : n.CREDENTIALS) !== null && x !== void 0
            ? x
            : "include",
        TOKEN: n == null ? void 0 : n.TOKEN,
        USERNAME: n == null ? void 0 : n.USERNAME,
        PASSWORD: n == null ? void 0 : n.PASSWORD,
        HEADERS: n == null ? void 0 : n.HEADERS,
        ENCODE_PATH: n == null ? void 0 : n.ENCODE_PATH,
      })),
        (this.form = new Rh(this.request)),
        (this.jotformIntegration = new Th(this.request));
    }
  }
  var ia;
  (function (o) {
    (function (n) {
      (n.CHECKBOX = "CHECKBOX"), (n.TEXT_ONLY = "TEXT_ONLY");
    })(o.render || (o.render = {}));
  })(ia || (ia = {}));
  var sa;
  (function (o) {
    (function (n) {
      (n.TERMS = "TERMS"),
        (n.PRIVACY = "PRIVACY"),
        (n.PARTICIPATION = "PARTICIPATION"),
        (n.DISCLAIMER = "DISCLAIMER"),
        (n.OVERSEAS_TRANSFER = "OVERSEAS_TRANSFER"),
        (n.COLLECTION_STATEMENT = "COLLECTION_STATEMENT"),
        (n.SENSITIVE_DATA = "SENSITIVE_DATA"),
        (n.ORGANIZER_PRIVACY = "ORGANIZER_PRIVACY"),
        (n.TICKETSELLER_PRIVACY = "TICKETSELLER_PRIVACY"),
        (n.BOOKING_TERMS = "BOOKING_TERMS");
    })(o.type || (o.type = {}));
  })(sa || (sa = {}));
  var oa;
  (function (o) {
    (function (n) {
      (n.TERMS = "TERMS"),
        (n.PRIVACY = "PRIVACY"),
        (n.PARTICIPATION = "PARTICIPATION"),
        (n.DISCLAIMER = "DISCLAIMER"),
        (n.OVERSEAS_TRANSFER = "OVERSEAS_TRANSFER"),
        (n.COLLECTION_STATEMENT = "COLLECTION_STATEMENT"),
        (n.SENSITIVE_DATA = "SENSITIVE_DATA"),
        (n.ORGANIZER_PRIVACY = "ORGANIZER_PRIVACY"),
        (n.TICKETSELLER_PRIVACY = "TICKETSELLER_PRIVACY"),
        (n.BOOKING_TERMS = "BOOKING_TERMS");
    })(o.type || (o.type = {}));
  })(oa || (oa = {}));
  var aa;
  (function (o) {
    (function (n) {
      (n.CHECKBOX = "CHECKBOX"), (n.TEXT_ONLY = "TEXT_ONLY");
    })(o.render || (o.render = {}));
  })(aa || (aa = {}));
  class Fh {
    constructor(n) {
      this.client = new Ih({ BASE: n });
    }
    getPolicies(n, i) {
      return Wn(this, void 0, void 0, function* () {
        return yield this.client.form.retrieveRequiredItemsForFormSubmissions(
          n,
          i == null ? void 0 : i.language,
          i == null ? void 0 : i.country,
        );
      });
    }
  }
  const ua = {
      FirstName: "first_name",
      LastName: "last_name",
      EmailAddress: "email",
      BirthDate: "birth_date",
      Region: "region",
      region: "region",
      YY1_IC_UNIVERSITY_ENH: "university",
      MobileNumber: "phone",
      soft_promotional_consent: "soft_promotional_consent",
      open_question: "open_question",
      CityName: "city",
    },
    Hn = {
      AL: {
        sq: {
          first_name: "Emri i ",
          last_name: "Mbiemri",
          email: "Email",
          phone: "Numri i Telefonit ",
          university: "Universiteti",
          region: "Qyteti",
        },
      },
      AR: {
        es: {
          first_name: "Nombre",
          last_name: "Apellidos",
          email: "Correo electrónico",
          phone: "Número de teléfono móvil",
          university: "Universidad",
          region: "Ciudad",
        },
      },
      AU: {
        en: {
          first_name: "First name",
          last_name: "Last name",
          email: "Email",
          phone: "Mobile Phone Number",
          university: "University",
          region: "Region",
        },
      },
      AT: {
        de: {
          first_name: "Vorname",
          last_name: "Nachname",
          email: "E-mail",
          phone: "Handynummer",
          university: "Universität",
          region: "Stadt",
          soft_promotional_consent:
            "Ja! Red Bull darf die von mir bereitgestellten Daten (z. B. Name, E-Mail-Adresse) verarbeiten, um mich per E-Mail über Neuigkeiten und Updates zu Red Bull Tetris und seinen Partnern zu informieren. Ich kann mich jederzeit über den Abmeldelink wieder abmelden.",
        },
      },
      AZ: {
        az: {
          soft_promotional_consent:
            '"Veysəloğlu" MMC mənim təqdim etdiyim məlumatları (ad, e-poçt ünvanı və s.) Red Bull Tetris haqqında yeniliklər və xəbərlərlə bağlı əlaqə saxlamaya bilər. İstənilən vaxt "abonəliyi ləğv et" linkinə klikləyərək abunəlikdən çıxa bilərəm.',
        },
      },
      BY: {
        ru: {
          first_name: "Імя",
          last_name: "Прозвішча",
          email: "Электронная пошта",
          phone: "Нумар мабільнага тэлефона",
          university: "Універсітэт",
          region: "Горад",
          soft_promotional_consent:
            'Я даю согласие на обработку Персональных данных с целью участия в Конкурсе со стороны ООО "Тибетрэй" и ООО" Платун Гейминг',
        },
      },
      BE: {
        fr: {
          first_name: "Prénom",
          last_name: "Nom de famille",
          email: "E-mail",
          phone: "Numéro de téléphone mobile",
          university: "Université",
          region: "Ville",
        },
        nl: {
          first_name: "Voornaam",
          last_name: "Achternaam",
          email: "E-mail",
          phone: "Mobiel telefoonnummer",
          university: "Universiteit",
          region: "Stad",
        },
      },
      BA: {
        bs: {
          first_name: "Ime",
          last_name: "Prezime",
          email: "Email",
          phone: "Broj mobilnog telefona",
          university: "Univerzitet",
          region: "Grad",
          soft_promotional_consent:
            "Da! Planet d.o.o može obrađivati podatke koje dostavim (npr. ime, e-mail adresa) kako bi me putem e-maila obavijestio o novostima i ažuriranjima vezanim za Red Bull Tetris i njegove partnere. U svakom trenutku se mogu odjaviti klikom na opciju za odjavu.",
        },
      },
      BR: {
        pt: {
          first_name: "Primeiro Nome",
          last_name: "Sobrenome",
          email: "E-mail",
          phone: "Número de Celular",
          university: "Universidade",
          region: "Cidade",
          soft_promotional_consent:
            "Sim! A Red Bull do Brasil Ltda. pode processar os dados que eu fornecer (nome, endereço de e-mail, etc.) para me informar sobre notícias e atualizações sobre o Red Bull Tetris e seus parceiros via e-mail. Eu posso cancelar a inscrição a qualquer momento clicando em 'Unsubscribe'.",
        },
      },
      BG: {
        bg: {
          first_name: "Собствено име",
          last_name: "Фамилия",
          email: "Имейл",
          phone: "Мобилен телефонен номер",
          university: "Университет",
          region: "Град",
        },
      },
      CA: {
        en: {
          first_name: "First name",
          last_name: "Last name",
          email: "Email",
          phone: "Mobile Phone Number",
          university: "University ",
          region: "Region",
        },
        fr: {
          first_name: "Prénom",
          last_name: "Nom de famille",
          email: "E-mail",
          phone: "Numéro de téléphone mobile",
          university: "Université",
          region: "Ville",
        },
      },
      CL: {
        es: {
          first_name: "Nombre",
          last_name: "Apellidos",
          email: "Correo electrónico",
          phone: "Número de teléfono móvil",
          university: "Universidad",
          region: "Ciudad",
        },
      },
      CO: {
        es: {
          first_name: "Nombre",
          last_name: "Apellidos",
          email: "Correo electrónico",
          phone: "Número de teléfono móvil",
          university: "Universidad",
          region: "Departamento",
        },
      },
      CR: {
        es: {
          first_name: "Nombre",
          last_name: "Apellidos",
          email: "Correo electrónico",
          phone: "Número de teléfono móvil",
          university: "Universidad",
          region: "Ciudad",
          soft_promotional_consent:
            '¡Sí! DIPO S.A., como representante legal de Red Bull Costa Rica, podrá tratar los datos que proporciono (es decir, nombre y correo electrónico) para informarme sobre noticias y novedades de Red Bull Tetris y sus socios por correo electrónico. Puedo darme de baja en cualquier momento haciendo clic en "Cancelar suscripción".',
        },
      },
      HR: {
        hr: {
          first_name: "Ime",
          last_name: "Prezime",
          email: "E-mail",
          phone: "Broj mobilnog telefona",
          university: "Sveučilište",
          region: "Grad",
          soft_promotional_consent:
            "Da, potvrđujem da Red Bull Adria d.o.o. smije koristiti podatke koje navedem (npr. ime i prezime, email adresu, moje interese) u svrhu informiranja o događaju Red Bull Tetris i njegovim partnerima putem emaila. Molimo imajte na umu da je naša komunikacija podložna našem Pravilniku o privatnosti. U svakom se trenutku možete odjaviti klikom na poveznicu za odjavu.",
        },
      },
      CZ: {
        cs: {
          first_name: "Křestní jméno",
          last_name: "Příjmení",
          email: "Email",
          phone: "Mobilní telefon",
          university: "Univerzita",
          region: "Město",
          soft_promotional_consent:
            "Ano, potvrzuji, že společnost Red Bull Česká republika může využít údaje, které poskytnu (např. jméno a příjmení, e-mailovou adresu, mé zájmy), za účelem informování o akci Red Bull Tetris a jejích partnerech prostřednictvím e-mailu. Upozorňujeme, že naše komunikace podléhá našim Zásadám ochrany osobních údajů. Z odběru se můžete kdykoliv odhlásit kliknutím na odkaz pro odhlášení.",
        },
      },
      DK: {
        da: {
          first_name: "Fornavn",
          last_name: "Efternavn",
          email: "E-mail",
          phone: "Telefonnummer",
          university: "Universitet",
          region: "Postnummer",
        },
      },
      DO: {
        es: {
          first_name: "Nombre",
          last_name: "Apellidos",
          email: "Correo electrónico",
          phone: "Número de teléfono móvil",
          university: "Universidad",
          region: "Ciudad",
        },
      },
      EG: {
        en: {
          first_name: "First name",
          last_name: "Last name",
          email: "Email",
          phone: "Mobile Phone Number",
          university: "University ",
          region: "Region",
        },
      },
      EE: {
        et: {
          first_name: "Eesnimi",
          last_name: "Perekonnanimi",
          email: "E-post",
          phone: "Mobiiltelefoni number",
          university: "Ülikool",
          soft_promotional_consent:
            'Jah! Tridens AS võib töödelda minu esitatud andmeid (sh nimi, e-posti aadress), et teavitada mind Red Bull Tetrisest ja selle partneritest uudistest ja värskendustest e-posti teel. Ma võin igal ajal tellimuse tühistada, klõpsates nupul „Tühista tellimus".',
        },
      },
      FI: {
        fi: {
          first_name: "Etunimi",
          last_name: "Sukunimi",
          email: "Sähköposti",
          phone: "Matkapuhelinnumero",
          university: "Yliopisto",
          region: "Kaupunki",
          soft_promotional_consent:
            'Kyllä! Red Bull Suomi saa käsitellä antamiani tietoja (esim. nimi, sähköpostiosoite) lähettääkseen minulle uutisia ja päivityksiä Red Bull Tetris -tapahtumasta ja sen kumppaneista sähköpostitse. Voin peruuttaa tilaukseni milloin tahansa napsauttamalla "Peruuta tilaus" -painiketta.',
        },
      },
      FR: {
        fr: {
          first_name: "Prénom",
          last_name: "Nom de famille",
          email: "E-mail",
          phone: "Numéro de téléphone mobile",
          university: "Université",
          region: "Ville",
        },
      },
      DE: {
        de: {
          first_name: "Vorname",
          last_name: "Nachname",
          email: "E-mail",
          phone: "Handynummer",
          university: "Universität",
          region: "Bundesland",
        },
      },
      GB: {
        en: {
          first_name: "First name",
          last_name: "Last name",
          email: "Email",
          phone: "Mobile Phone Number",
          university: "University",
          region: "Region",
        },
      },
      GR: {
        el: {
          first_name: "Ονομα",
          last_name: "Επίθετο",
          email: "ΗΛΕΚΤΡΟΝΙΚΗ ΔΙΕΥΘΥΝΣΗ",
          phone: "Αριθμός κινητού τηλεφώνου",
          university: "Πανεπιστήμιο",
          region: "Πόλη",
        },
      },
      GT: {
        es: {
          first_name: "Nombre",
          last_name: "Apellidos",
          email: "Correo electrónico",
          phone: "Número de teléfono móvil",
          university: "Universidad",
          birthdate: "Date of birth",
        },
      },
      HK: {
        zh: {
          first_name: "名",
          last_name: "姓",
          email: "電郵",
          phone: "手機號碼",
          university: "大學",
          soft_promotional_consent:
            "Yes! Red Bull Hong Kong may process the data I provide (i.e., name, e-mail address) to inform me about news and updates about Red Bull Tetris and its partners via email. I can unsubscribe at any time by clicking unsubscribe.",
        },
      },
      HU: {
        hu: {
          first_name: "Keresztnév",
          last_name: "Vezetéknév",
          email: "Email",
          phone: "Mobiltelefonszám",
          university: "Egyetem",
          region: "Város",
        },
      },
      IN: {
        en: {
          first_name: "First name",
          last_name: "Last name",
          email: "Email",
          phone: "Mobile Phone Number",
          university: "University",
          region: "City",
        },
      },
      IE: {
        en: {
          first_name: "First name",
          last_name: "Last name",
          email: "Email",
          phone: "Mobile Phone Number",
          university: "University",
          region: "Region",
        },
      },
      IT: {
        it: {
          first_name: "Nome",
          last_name: "Cognome",
          email: "Email",
          phone: "Numero di cellulare",
          university: `Frequenti l'Università? Se sì, specifica quale. Se no, rispondi "No"`,
          region: "Città",
          open_question:
            "Perché vuoi partecipare alla finale mondiale di Red Bull Tetris?",
        },
      },
      JP: {
        ja: {
          first_name: "ファーストネーム",
          last_name: "苗字",
          email: "Eメール",
          phone: "携帯電話番号",
          university: "大学",
          region: "市",
        },
      },
      KZ: {
        ru: {
          first_name: "Имя",
          last_name: "Фамилия",
          email: "Электронная почта",
          phone: "Номер телефона",
          university: "Университет",
          region: "Ваш Город",
          soft_promotional_consent:
            "Да! ТОО Red Bull Kazakhstan может обрабатывать предоставленные мной данные (имя, адрес электронной почты), чтобы информировать меня о новостях и обновлениях Red Bull Tetris и его партнёров по электронной почте. Я могу отписаться в любое время, нажав «отписаться».",
        },
      },
      XK: {
        sq: {
          first_name: "Emri i ",
          last_name: "Mbiemri",
          email: "Email",
          phone: "Numri",
          university: "Universiteti",
        },
      },
      KW: {
        ar: {
          first_name: "الاسم الأول",
          last_name: "اسم العائلة",
          email: "البريد إلكتروني",
          phone: "رقم التليفون",
          university: "الجامعة",
          region: "المدينة",
        },
      },
      LV: {
        lv: {
          first_name: "Vārds",
          last_name: "Uzvārds",
          email: "E-pasts",
          phone: "Mobilā tālruņa numurs",
          university: "Universitāte",
          region: "Pilsēta",
        },
      },
      LT: {
        lt: {
          first_name: "Pirmas vardas",
          last_name: "Pavardė",
          email: "El. paštas",
          phone: "Mobilaus telefono numeris",
          university: "Universitetas",
          soft_promotional_consent:
            'Taip! Sutinku, kad UAB MV Group Distribution galėtų saugoti mano pateiktus asmens duomenis (vardą, pavardę, el. pašto adresą ir kt.) bei el. paštu siųsti man svarbią informaciją apie Red Bull Tetris ir jo partnerius. Suprantu, kad bet kada galiu atšaukti šį sutikimą, pavyzdžiui, spustelėdama(-s) kiekviename tokiame el. laiške pateiktą mygtuką "Atsisakyti prenumeratos".',
        },
      },
      MK: {
        mk: {
          first_name: "Име",
          last_name: "Презиме",
          email: "Е-пошта",
          phone: "Телефонски број",
          university: "Универзитет",
          region: "Град",
        },
      },
      MV: {
        en: {
          first_name: "First name",
          last_name: "Last name",
          email: "Email",
          phone: "Mobile Phone Number",
          university: "University ",
          region: "State",
        },
      },
      MX: {
        es: {
          first_name: "Nombre",
          last_name: "Apellidos",
          email: "Correo electrónico",
          phone: "Número de teléfono móvil",
          university: "Universidad",
          region: "Ciudad",
        },
      },
      MD: {
        ro: {
          first_name: "Nume",
          last_name: "Nume",
          email: "E-mail",
          phone: "Numar de telefon mobil",
          university: "Universitate",
          region: "Oraș",
          soft_promotional_consent:
            'Da! Acvilin Grup poate procesa datele indicate de mine (nume, adresa de e-mail) pentru a mă informa pe mine despre noutăți, actualizări ce țin de evenimentul Red Bull Tetris și partenerii săi prin email. Eu mă pot dezabona în orice moment prin click pe "dezabonează-te".',
        },
      },
      NL: {
        nl: {
          first_name: "Voornaam",
          last_name: "Achternaam",
          email: "E-mail",
          phone: "Mobiel telefoonnummer",
          university: "Universiteit",
        },
      },
      NZ: {
        en: {
          first_name: "First name",
          last_name: "Last name",
          email: "Email",
          phone: "Mobile Phone Number",
          region: "Region",
          soft_promotional_consent:
            "Yes! Red Bull New Zealand Ltd may process the data I provide (i.e., name, e-mail address) to inform me about news and updates about Red Bull Tetris and its partners via email. I can unsubscribe at any time by clicking unsubscribe.",
        },
      },
      NO: {
        no: {
          first_name: "Fornavn",
          last_name: "Etternavn",
          email: "E-post",
          phone: "Telefonnummer",
          university: "Universitet",
          region: "By",
        },
      },
      PE: {
        es: {
          first_name: "Nombre",
          last_name: "Apellidos",
          email: "Correo electrónico",
          phone: "Número de teléfono móvil",
          university: "Universidad",
          region: "Ciudad",
          soft_promotional_consent:
            '¡Sí! Perufarma S.A. podrá tratar los datos que proporciono (p. ej., nombre y correo electrónico) para informarme sobre noticias y novedades de Red Bull Tetris y sus socios por correo electrónico. Puedo darme de baja en cualquier momento haciendo clic en "Cancelar suscripción".',
        },
      },
      PL: {
        pl: {
          first_name: "Imię",
          last_name: "Nazwisko",
          email: "E-mail",
          phone: "Numer telefonu",
          university: "Uczelnia",
          region: "Miasto",
          open_question:
            "Jeśli grasz w aktywacji Żabki, wpisz kod za zakup Red Bulli w aplikacji.",
          soft_promotional_consent:
            "Tak, Red Bull Sp. z o.o. może przetwarzać dane, które podaję (np. imię, nazwisko, adres e-mail), aby informować mnie o Red Bull Tetris, a także o partnerach Red Bull, za pośrednictwem poczty elektronicznej. Mogę zrezygnować w dowolnym momencie, klikając opcję wypisania się. Szczegóły znajdują się w Polityce Prywatności.",
        },
      },
      PT: {
        pt: {
          first_name: "Primeiro Nome",
          last_name: "Apelido",
          email: "E-mail",
          phone: "Número de telemóvel",
          university: "Universidade",
          region: "Cidade",
        },
      },
      QA: {
        ar: {
          first_name: "الاسم الأول",
          last_name: "اسم العائلة",
          email: "البريد إلكتروني",
          phone: "رقم التليفون",
          university: "الجامعة",
          soft_promotional_consent:
            "Yes! Salam Studio & Stores may process the data I provide (i.e., name, e-mail address) to inform me about news and updates about Red Bull Tetris and its partners via email. I can unsubscribe at any time by clicking unsubscribe",
        },
      },
      RO: {
        ro: {
          first_name: "Nume",
          last_name: "Nume",
          email: "E-mail",
          phone: "Numar de telefon mobil",
          university: "Universitate",
          region: "Oraș",
          soft_promotional_consent:
            "Da! Red Bull România S.R.L. poate stoca datele personale pe care le furnizez (nume, prenume, adresă de email etc.) și îmi poate trimite informații importante despre Red Bull Tetris și partenerii săi prin email. Înțeleg că pot retrage acest consimțământ în orice moment făcând click pe butonul „Dezabonare",
        },
      },
      RS: {
        sr: {
          first_name: "Име",
          last_name: "Презиме",
          email: "Емаил",
          phone: "Број мобилног телефона",
          university: "Универзитет",
          region: "Цити",
        },
      },
      SK: {
        sk: {
          first_name: "Krstné meno",
          last_name: "Priezvisko",
          email: "Email",
          phone: "Telefónne číslo",
          university: "Názov univerzity",
          region: "Bydlisko",
          soft_promotional_consent:
            "Áno! Red Bull Slovensko môže spracúvať údaje, ktoré poskytnem (t. j. meno, e-mailovú adresu), aby ma informoval o novinkách a aktualizáciách týkajúcich sa Red Bull Tetris a jeho partnerov prostredníctvom e-mailu. Kedykoľvek sa môžem odhlásiť kliknutím na odkaz na odhlásenie.",
        },
      },
      ZA: {
        en: {
          first_name: "First name",
          last_name: "Last name",
          email: "Email",
          phone: "Mobile Phone Number",
          university: "University ",
          region: "Region",
          soft_promotional_consent:
            "Yes! Red Bull South Africa (Pty) Ltd may process the data I provide (i.e. e.g. name, phone number) to inform me about news and updates around Red Bull Tetris via email, instant messaging or other means of electronic communication. I can unsubscribe opt-out at any time by sending STOP. For details, please see the Privacy Policy.",
        },
      },
      KR: {
        ko: {
          first_name: "이름",
          last_name: "성",
          email: "이메일",
          phone: "휴대전화 번호",
          university: "대학교",
          region: "도시",
        },
      },
      ES: {
        es: {
          first_name: "Nombre",
          last_name: "Apellidos",
          email: "Correo electrónico",
          phone: "Número de teléfono móvil",
          university: "Universidad",
          region: "Indica tu región",
        },
      },
      SE: {
        en: {
          first_name: "First name",
          last_name: "Last name",
          email: "Email",
          phone: "Mobile Phone Number",
          university: "University",
          region: "Region",
          soft_promotional_consent:
            "Yes! Red Bull Sweden AB may process the data I provide (i.e., name, e-mail address) to inform me about news and updates about Red Bull Tetris via email. I can unsubscribe at any time by clicking unsubscribe.",
        },
      },
      CH: {
        de: {
          first_name: "Vorname",
          last_name: "Nachname",
          email: "E-mail",
          phone: "Handynummer",
          university: "Universität",
          region: "Stadt",
        },
        fr: {
          first_name: "Prénom",
          last_name: "Nom de famille",
          email: "E-mail",
          phone: "Numéro de téléphone mobile",
          university: "Université",
          region: "Ville",
        },
      },
      TW: {
        zh: {
          first_name: "名",
          last_name: "姓",
          email: "電郵",
          phone: "手機號碼",
          university: "大學",
          region: "城市",
        },
      },
      TR: {
        tr: {
          first_name: "İlk adı",
          last_name: "Soy isim",
          email: "E-posta",
          phone: "Cep telefonu numarası",
          university: "Üniversite",
          region: "Şehir",
        },
      },
      AE: {
        en: {
          first_name: "First name",
          last_name: "Last name",
          email: "Email",
          phone: "Mobile Phone Number",
          university: "University ",
          region: "State",
          soft_promotional_consent:
            "Yes! Red Bull FZE may process the data I provide (i.e., name, e-mail address) to inform me about news and updates about Red Bull Tetris & partners via email. I can unsubscribe at any time by clicking unsubscribe.",
        },
      },
      US: {
        en: {
          first_name: "First name",
          last_name: "Last name",
          email: "Email",
          phone: "Mobile Phone Number",
          university: "University ",
          region: "State",
          soft_promotional_consent:
            "I want to stay updated on news, invitations and offers from Red Bull via email.",
        },
      },
      UZ: {
        ru: {
          first_name: "Имя",
          last_name: "Фамилия",
          email: "Электронная почта",
          phone: "Номер мобильного телефона",
          university: "Университет",
          region: "Город",
          soft_promotional_consent:
            "Да! ООО «Ritz Unique INC» может обрабатывать предоставленные мной данные (например, имя, адрес электронной почты) с целью информирования меня о новостях и обновлениях, связанных с Red Bull Tetris и его партнёрами, по электронной почте. Я могу в любой момент отказаться от подписки, нажав на ссылку «Отписаться».",
        },
      },
    },
    ca = {
      AG: "+1",
      AI: "+1",
      AS: "+1",
      BB: "+1",
      BM: "+1",
      BS: "+1",
      CA: "+1",
      DM: "+1",
      DO: "+1",
      GD: "+1",
      GU: "+1",
      JM: "+1",
      KN: "+1",
      KY: "+1",
      LC: "+1",
      MP: "+1",
      MS: "+1",
      PR: "+1",
      SX: "+1",
      TC: "+1",
      TT: "+1",
      US: "+1",
      VC: "+1",
      VG: "+1",
      VI: "+1",
      EG: "+20",
      SS: "+211",
      EH: "+212",
      MA: "+212",
      DZ: "+213",
      TN: "+216",
      LY: "+218",
      GM: "+220",
      SN: "+221",
      MR: "+222",
      ML: "+223",
      GN: "+224",
      CI: "+225",
      BF: "+226",
      NE: "+227",
      TG: "+228",
      BJ: "+229",
      MU: "+230",
      LR: "+231",
      SL: "+232",
      GH: "+233",
      NG: "+234",
      TD: "+235",
      CF: "+236",
      CM: "+237",
      CV: "+238",
      ST: "+239",
      GQ: "+240",
      GA: "+241",
      CG: "+242",
      CD: "+243",
      AO: "+244",
      GW: "+245",
      IO: "+246",
      SC: "+248",
      SD: "+249",
      RW: "+250",
      ET: "+251",
      SO: "+252",
      DJ: "+253",
      KE: "+254",
      TZ: "+255",
      UG: "+256",
      BI: "+257",
      MZ: "+258",
      ZM: "+260",
      MG: "+261",
      RE: "+262",
      YT: "+262",
      ZW: "+263",
      NA: "+264",
      MW: "+265",
      LS: "+266",
      BW: "+267",
      SZ: "+268",
      KM: "+269",
      ZA: "+27",
      SH: "+290",
      ER: "+291",
      AW: "+297",
      FO: "+298",
      GL: "+299",
      GR: "+30",
      NL: "+31",
      BE: "+32",
      FR: "+33",
      ES: "+34",
      GI: "+350",
      PT: "+351",
      LU: "+352",
      IE: "+353",
      IS: "+354",
      AL: "+355",
      MT: "+356",
      CY: "+357",
      AX: "+358",
      FI: "+358",
      BG: "+359",
      HU: "+36",
      LT: "+370",
      LV: "+371",
      EE: "+372",
      MD: "+373",
      AM: "+374",
      BY: "+375",
      AD: "+376",
      MC: "+377",
      SM: "+378",
      UA: "+380",
      RS: "+381",
      ME: "+382",
      XK: "+383",
      HR: "+385",
      SI: "+386",
      BA: "+387",
      MK: "+389",
      IT: "+39",
      VA: "+39",
      RO: "+40",
      CH: "+41",
      CZ: "+420",
      SK: "+421",
      LI: "+423",
      AT: "+43",
      GB: "+44",
      GG: "+44",
      IM: "+44",
      JE: "+44",
      DK: "+45",
      SE: "+46",
      NO: "+47",
      SJ: "+47",
      PL: "+48",
      DE: "+49",
      FK: "+500",
      BZ: "+501",
      GT: "+502",
      SV: "+503",
      HN: "+504",
      NI: "+505",
      CR: "+506",
      PA: "+507",
      PM: "+508",
      HT: "+509",
      PE: "+51",
      MX: "+52",
      CU: "+53",
      AR: "+54",
      BR: "+55",
      CL: "+56",
      CO: "+57",
      VE: "+58",
      BL: "+590",
      GP: "+590",
      MF: "+590",
      BO: "+591",
      GY: "+592",
      EC: "+593",
      GF: "+594",
      PY: "+595",
      MQ: "+596",
      SR: "+597",
      UY: "+598",
      BQ: "+599",
      CW: "+599",
      MY: "+60",
      AU: "+61",
      CC: "+61",
      CX: "+61",
      ID: "+62",
      PH: "+63",
      NZ: "+64",
      SG: "+65",
      TH: "+66",
      TL: "+670",
      NF: "+672",
      BN: "+673",
      NR: "+674",
      PG: "+675",
      TO: "+676",
      SB: "+677",
      VU: "+678",
      FJ: "+679",
      PW: "+680",
      WF: "+681",
      CK: "+682",
      NU: "+683",
      WS: "+685",
      KI: "+686",
      NC: "+687",
      TV: "+688",
      PF: "+689",
      TK: "+690",
      FM: "+691",
      MH: "+692",
      KZ: "+7",
      RU: "+7",
      JP: "+81",
      KR: "+82",
      VN: "+84",
      KP: "+850",
      HK: "+852",
      MO: "+853",
      KH: "+855",
      LA: "+856",
      CN: "+86",
      BD: "+880",
      TW: "+886",
      TR: "+90",
      IN: "+91",
      PK: "+92",
      AF: "+93",
      LK: "+94",
      MM: "+95",
      MV: "+960",
      LB: "+961",
      JO: "+962",
      SY: "+963",
      IQ: "+964",
      KW: "+965",
      SA: "+966",
      YE: "+967",
      OM: "+968",
      PS: "+970",
      AE: "+971",
      IL: "+972",
      BH: "+973",
      QA: "+974",
      BT: "+975",
      MN: "+976",
      NP: "+977",
      IR: "+98",
      TJ: "+992",
      TM: "+993",
      AZ: "+994",
      GE: "+995",
      KG: "+996",
      UZ: "+998",
    },
    Bh = "en-US",
    Lh = "en",
    la = v.reactExports.createContext(void 0),
    Nh = ({
      children: o,
      initialCountryCode: n = Bh,
      initialLanguage: i = Lh,
      assetType: u,
    }) => {
      const [d, w] = v.reactExports.useState(Hc.countryCodeMapper(n)),
        [x, R] = v.reactExports.useState(i),
        g = {
          countryCode: d,
          language: x,
          setCountryCode: w,
          setLanguage: R,
          assetType: u,
        };
      return v.jsxRuntimeExports.jsx(la.Provider, { value: g, children: o });
    },
    Xr = () => {
      const o = v.reactExports.useContext(la);
      if (o === void 0)
        throw new Error("useLocale must be used within a LocaleProvider");
      return o;
    };
  function Oh({
    field: o,
    fieldLabel: n,
    fieldPlaceholder: i,
    fieldIdentifier: u,
    formData: d,
    setFormData: w,
    wtiTranslations: x,
    invalid: R = !1,
    defaultTranslations: g,
  }) {
    const p = v.reactExports.useRef(null),
      _ = v.reactExports.useRef(null),
      [T, b] = v.reactExports.useState(!1),
      [B, D] = v.reactExports.useState(""),
      [I, j] = v.reactExports.useState(""),
      [X, ae] = v.reactExports.useState([]),
      K = Xr();
    v.reactExports.useEffect(() => {
      const Z = async () => {
          var Pe, De;
          await new Promise((we) => setTimeout(we, 100));
          const H =
              (De = (Pe = p.current) == null ? void 0 : Pe.shadowRoot) == null
                ? void 0
                : De.querySelector(".cosmos-input div:nth-child(2)"),
            ee = _.current;
          H == null || H.style.setProperty("gap", "16px"),
            H == null || H.style.setProperty("align-items", "center"),
            H == null || H.style.setProperty("display", "flex"),
            ee == null || ee.style.setProperty("width", "calc(45% - 8px)"),
            H == null || H.prepend(ee),
            await new Promise((we) => setTimeout(we, 100)),
            b(!0);
        },
        fe = () => {
          const H = Object.entries(ca),
            ee = H.findIndex(
              ([De]) => De === (K == null ? void 0 : K.countryCode),
            ),
            Pe = ee > -1 ? [H[ee], ...H.slice(0, ee), ...H.slice(ee + 1)] : H;
          ae(Pe);
        };
      u === "phone" && (Z(), fe());
    }, []);
    const $ = v.reactExports.useMemo(
      () =>
        qc.debounce((Z) => {
          let fe = Z;
          const H = Object.values(ca).find((Pe) => fe.startsWith(Pe));
          let ee = B;
          H && ((ee = H), D(H)),
            (fe = fe.replace(ee, "")),
            j(fe),
            w({ ...d, [u]: ee + fe });
        }, 500),
      [u, B, d],
    );
    return (
      v.reactExports.useEffect(() => {
        $(I);
      }, [I]),
      v.reactExports.useEffect(() => () => $.cancel(), [$]),
      v.jsxRuntimeExports.jsxs("div", {
        className: zc.clsx("w-full", { hidden: !T, visible: T }),
        children: [
          v.jsxRuntimeExports.jsx(z.CosmosSelect, {
            ref: _,
            className: "w-1/2",
            required: o.isMandatory,
            onInputchange: (Z) => {
              const fe = Z.detail.value;
              D(fe),
                setTimeout(() => {
                  var H;
                  (H = p.current) == null || H.inputFocus();
                }, 200);
            },
            invalid: R,
            children: X.map(([Z, fe]) =>
              v.jsxRuntimeExports.jsxs(z.CosmosOption, {
                value: fe,
                selected: B === fe,
                children: [
                  v.jsxRuntimeExports.jsx(z.CosmosFlag, {
                    slot: "prefix",
                    code: Z,
                    children: Z,
                  }),
                  fe,
                ],
              }),
            ),
          }),
          v.jsxRuntimeExports.jsx(z.CosmosInput, {
            ref: p,
            className: "loop-formfield loop-formfield--phone",
            label: n,
            type: "tel",
            autocomplete: "tel",
            inputMode: "tel",
            placeholder: i,
            required: o.isMandatory,
            optionalLabel: g.optional || "Optional (fallback)",
            value: I,
            name: u,
            onInputinput: (Z) => j(Z.detail.value),
            invalid: R,
            "validation-message": R ? x.invalid : x.required,
          }),
        ],
      })
    );
  }
  function kh({
    field: o,
    formData: n,
    setFormData: i,
    isoCountryCodeAlpha2: u,
    isoLanguageCode: d,
    defaultTranslations: w,
    invalid: x = !1,
  }) {
    var X, ae, K, $;
    const { getTranslation: R } = tt.useRbTranslations(),
      [g, p] = v.reactExports.useState(null),
      [_, T] = v.reactExports.useState(null),
      b =
        ua[o.dataEngineKey || o.pdbKey || o.name] ||
        o.dataEngineKey ||
        o.pdbKey ||
        o.name,
      B =
        ((ae = (X = Hn == null ? void 0 : Hn[u]) == null ? void 0 : X[d]) ==
        null
          ? void 0
          : ae[b]) || o.name,
      D =
        ($ = (K = Hn == null ? void 0 : Hn[u]) == null ? void 0 : K[d]) == null
          ? void 0
          : $[b],
      I = {
        required: R(
          "rbtetris.form.invalid_region",
          ".Please fill out this field.",
        ),
        invalid: R(
          "rbtetris.form.invalid_phone_number",
          ".Invalid phone number. E.164 (e.g., +4211234567890) format required.",
        ),
      };
    if (
      !B &&
      !["legal_activation_terms", "legal_activation_terms_link"].includes(b)
    )
      return (
        console.error(`Field label not found for ${b}`),
        v.jsxRuntimeExports.jsxs(z.CosmosText, {
          color: "negative",
          children: ["Unknown field: ", b],
        })
      );
    const j =
      (b === "region" && u === "DE") ||
      (b === "region" && u === "FR") ||
      (b === "region" && u === "BR") ||
      (b === "university" && u === "BR") ||
      (b === "region" && u === "US");
    if (
      (v.reactExports.useEffect(() => {
        j &&
          (async () => {
            var H;
            if (!g) {
              const Pe = await (
                await fetch(
                  "https://p-p.redbull.com/rb-red-bull-tetris-7k-ff-prod/dropdowns/data.json",
                )
              ).json();
              p((H = Pe[`${u}_${b}`]) == null ? void 0 : H.options);
            }
            if (!g) return;
            const fe = v.jsxRuntimeExports.jsx(z.CosmosSelect, {
              className: "loop-formfield",
              label: B,
              placeholder: D,
              required: o.isMandatory,
              optionalLabel: w.optional || "Optional (fallback)",
              name: b,
              "validation-message": I.required,
              onInputchange: (ee) => {
                i({ ...n, [b]: ee.detail.value });
              },
              children: g.map((ee) =>
                v.jsxRuntimeExports.jsx(z.CosmosOption, {
                  value: ee,
                  children: ee,
                }),
              ),
            });
            T(fe);
          })();
      }, [n, g]),
      j)
    )
      return _;
    switch (b) {
      case "first_name":
      case "last_name":
      case "email":
        return v.jsxRuntimeExports.jsx(z.CosmosInput, {
          label: B,
          placeholder: D,
          name: b,
          readonly: !0,
          value: n[b],
        });
      case "birth_date":
        return v.jsxRuntimeExports.jsx(z.CosmosInput, {
          className: "loop-formfield",
          label: B,
          type: "date",
          placeholder: D,
          required: o.isMandatory,
          optionalLabel: w.optional || "Optional (fallback)",
          name: b,
          "required-message": I.required,
          onInputinput: (Z) => {
            i({ ...n, [b]: Z.detail.value });
          },
        });
      case "university":
      case "region":
      case "open_question":
      case "city":
        return v.jsxRuntimeExports.jsx(z.CosmosInput, {
          className: "loop-formfield",
          label: B,
          type: "text",
          placeholder: D,
          required: o.isMandatory,
          optionalLabel: w.optional || "Optional (fallback)",
          name: b,
          onInputinput: (Z) => {
            i({ ...n, [b]: Z.detail.value });
          },
          invalid: x,
          "validation-message": x ? I.invalid : I.required,
        });
      case "phone":
        return v.jsxRuntimeExports.jsx(Oh, {
          field: o,
          fieldPlaceholder: D,
          fieldLabel: B,
          fieldIdentifier: b,
          formData: n,
          setFormData: i,
          isoCountryCodeAlpha2: u,
          isoLanguageCode: d,
          wtiTranslations: I,
          invalid: x,
          defaultTranslations: w,
        });
      case "soft_promotional_consent":
        return v.jsxRuntimeExports.jsx(z.CosmosCheckbox, {
          className: "loop-formfield",
          name: b,
          value: n[b],
          required: o.isMandatory,
          onInputchange: (Z) => {
            i({ ...n, [b]: Z.detail.checked ? "true" : "false" });
          },
          children: B,
        });
      case "legal_activation_terms":
      case "legal_activation_terms_link":
        return null;
      default:
        return v.jsxRuntimeExports.jsxs(z.CosmosText, {
          color: "negative",
          children: ["Unknown field: ", b],
        });
    }
  }
  function Ph({ rendering: o, formData: n, setFormData: i, type: u }) {
    const { getTranslation: d } = tt.useRbTranslations(),
      w = {
        requiredPolicy: d(
          "rbtetris.form.invalid_checkbox",
          ".Please check this box if you want to proceed.",
        ),
      };
    return o.render === "CHECKBOX"
      ? v.jsxRuntimeExports.jsx(z.CosmosCheckbox, {
          required: !0,
          checked: n.policies[u][o.snippetTranslationId],
          "validation-message": w.requiredPolicy,
          onInputchange: (x) =>
            i({
              ...n,
              policies: {
                ...n.policies,
                [u]: {
                  ...n.policies[u],
                  [o.snippetTranslationId]: x.detail.checked,
                },
              },
            }),
          children: v.jsxRuntimeExports.jsx("span", {
            className: "[&_a]:underline",
            dangerouslySetInnerHTML: { __html: o.displayText },
          }),
        })
      : o.render === "TEXT_ONLY"
        ? v.jsxRuntimeExports.jsx(z.CosmosText, {
            size: "small",
            children: v.jsxRuntimeExports.jsx("span", {
              className: "[&_a]:underline",
              dangerouslySetInnerHTML: { __html: o.displayText },
            }),
          })
        : null;
  }
  function Mh() {
    const { rbAccount: o } = jt.useRbAccount(),
      { getTranslation: n } = tt.useRbTranslations(),
      [i, u] = v.reactExports.useState(!1),
      { gameOver: d, exitGame: w } = v.reactExports.useContext(pr),
      x = {
        loginTitle: n("rbtetris.form.see_stats_text", ".Login to participate!"),
        loginText: n(
          "rbtetris.form.see_stats_subtext",
          ".Please login to participate in the competition.",
        ),
        loginButton: n("rbtetris.popup.button.login", ".Login"),
        cancelButton: n("rbtetris.popup.button.cancel", ".Cancel"),
      },
      R = () => {
        localStorage.setItem("game-login-session", JSON.stringify(d)),
          u(!0),
          o.RBAccounts.login();
      },
      g = () => {
        localStorage.removeItem("game-login-session"), w();
      };
    return v.jsxRuntimeExports.jsx("div", {
      className: "items-center col-span-1 col-start-1 row-span-1 row-start-1",
      children: v.jsxRuntimeExports.jsx("div", {
        className:
          "gap-xtight px-xxloose py-xloose flex flex-col items-center justify-center w-full h-full",
        children: v.jsxRuntimeExports.jsxs("div", {
          className: "max-w-[600px] flex flex-col gap-xxloose items-center",
          children: [
            v.jsxRuntimeExports.jsxs("div", {
              className:
                "flex flex-col gap-normal items-center min-h-[300px] justify-center",
              children: [
                v.jsxRuntimeExports.jsx(z.CosmosTitle, {
                  size: "medium",
                  className: "text-center",
                  children: x.loginTitle,
                }),
                v.jsxRuntimeExports.jsx(z.CosmosText, {
                  size: "small",
                  className: "text-center",
                  children: x.loginText,
                }),
              ],
            }),
            v.jsxRuntimeExports.jsxs("div", {
              className: "gap-xtight flex flex-col items-center w-full",
              children: [
                v.jsxRuntimeExports.jsx(z.CosmosButton, {
                  size: "large",
                  width: "full",
                  onClick: R,
                  busy: i,
                  children: x.loginButton,
                }),
                v.jsxRuntimeExports.jsx(z.CosmosButton, {
                  kind: "secondary",
                  onClick: g,
                  children: x.cancelButton,
                }),
              ],
            }),
          ],
        }),
      }),
    });
  }
  function Uh({ onSuccess: o, onError: n, visible: i }) {
    const u = v.reactExports.useRef(null);
    return (
      v.reactExports.useEffect(() => {
        if (i) {
          if (!window.AwsWafCaptcha) {
            console.error("AWS WAF Captcha not found");
            return;
          }
          if (!u.current) {
            console.error("Captcha container not found");
            return;
          }
          window.AwsWafCaptcha.renderCaptcha(u.current, {
            apiKey:
              "eUnLQkeGd+djBqcK7+JSpZvecW6hOe41KAytXTdnPMcnzhsrY0w0rvJaU5Q8/bY7dDerWXHShWUVIxo9knyQoL78tTQez047RWcMKsnXISTzRAupJhbAKrYe+9ghF65qRC56nnJmf9G2hpA4ws4CLluQvDEZJkR08UgzsZnqmdRHijp15j4k06lxtKHTR1/qwp6XwBRIdKbqg0hbsKI/fbMMUMDruWMqtruKVzcRyWt7P1yw2KAQJ/WgVWhEt8c5zEakj6K2+DHj5SwQ8vFPjgOOFYMQ6fvXzUNGLEdK2YgD3GGiRvRfRb8nEMVxUgvAA2zHMrUY2DyTemO2/TbWkSixe09QlF9LJ7ZW3H3ivgR6oQdXulZqgWW89us0C59wylZkVa/TSWEAy439kIOMnQouLy2VCIvdP8DG7hjF4tGgj9ekPY7i9WPFKolfXOUgSNclhcNoHmRdVEGh4F7s6HF5ieeDSdiW3ULHgNUs+S2HtWfUH8AUGIaCjmNmEQag1W0lpNrcEAz8ogcnSloionH+0eteKyVcfcocvbPGp05DCDN71eAtu8k69DoeunC/dZ5x7rrJ9WRTWKz+0LEUTmITTKsWTnoSjj9ntmf4v5cKYoY8p1PgenJGImxWO7vKjyMJN/6bjOska8qjbtwSVNwelCFM2D6Y7C4rDyYbWvI=_0_1",
            onSuccess: (d) => {
              o(d);
            },
            onError: (d) => {
              n(d), console.error("AWS WAF Captcha error", d);
            },
          });
        }
      }, [i]),
      i
        ? v.jsxRuntimeExports.jsx("div", {
            className:
              "w-screen h-screen fixed top-0 left-0 z-[999999] bg-black/50 flex items-center justify-center",
            id: "captcha-modal-tetris",
            children: v.jsxRuntimeExports.jsx("div", {
              ref: u,
              className: "bg-white rounded-md p-8",
            }),
          })
        : null
    );
  }
  const jh =
      "https://p-p.redbull.com/rb-red-bull-tetris-7k-ff-prod/assets/controller-DwPG2B5E.png",
    Dh =
      "data:image/webp;base64,UklGRkAOAABXRUJQVlA4WAoAAAAQAAAAswAAswAAQUxQSCIFAAABoINsmyM5+oOKOpBrJjsjM9mGMgNy5y/zNzAg770iPyCzRudvaZh8woVz8tKEE8o1i/zA3tLQyAx01nTWUDt/UF013VXVv/wRERMAb6C6aSLGaYVUKH3pxWQOhWpJmC0Lw/BJGIbJcsqsxdxrL5GYUM1vscDoAZ8Hvt/Lr+f7wZdA0AYWvoEi9eIa/wdkg8Dz4sIWiqzunv+zi7l3/zzfXU0QBgAwkl8VAIDRI3NtfjWBqvlwkuHD6eknI+SaB8TNaTF1auRyqosXf5vP6vcWi9V5FNmCiJjmkaJ0J0XqQrENivxQXJ0aTsWdt6G4DY5bcShxDhGRF8UREUcp0RT0PPIShwFjsE+fncAYsPKDNvKUc104Tzm2gYCTqL1HspYdmBlMNqrfORkzCqJEkde1gekkTpIkiVOuXRonmTfA7ARVNbqLxt81LC6paYt8JGNFMOGGeTcEptV7cSgNwlmuFAWhGI1CoTfCcDY1L50Jn9wFrRdj4V4xIVozssxkMUFJzSuuKXMKG5TESOj7d4vr3/DFu1NQmOEa1VDrHsnuEoAJVb18gdmJI2KsBXx04/Llrl7J1OVOG+yEnfOXp/TYgojItRJDW80DAKZFQ9A/sNV7oCETvjRjRsYkfUss1gE+anu/dMxITnnepOd5bZDuaza39M3q7Ww2f5mnxSgiIjdCkWUxAADfrPOg7RHB7BSU75rV0YIJO83DhUozAjeBC10t4MtzzcMdC/zUbP7iSI54k6dm0cjp0cnWTj3aiIjcOI6IWMliAAB/mnEOAIBp0RIs6WZlnjejJRTOhF8sMk+pK+O6cKGtBazdUP+8Y5ENPzR2OpJm97w49RC1ffjn+e5OPW4gInJrcETEkSwG0p36bAEAYFqcFyxbzVJs6nNE0HLhfwTg+p1Abp+vltfWOko7g7t+UAjO3M2c3aLNdrRvioi4VoUBAKwuZjFIWXll1lQy68XUZNpaa/lQjdy4Ae9VF5+w1VeLq+KIK/kqCjLDoTAMgni5XgEicjulKJ3MYiB1h3NBex/t38xSrA63+MXHdV2YLoFTjltx1Hg8JNcswlLkiIhtJdPDcsj0XpqdA8YYIxZH5NgFYmVeLrMByebM+VPGzGHmqA/04nFmMgMGf1X/KDLP0NCkBG04KJ0nVjB0VmDU4jNBOAPUEpMXqX65xQIz4Em5cf/u3R65RG5Cn2RR+aVg4KnJZmKbwUAz/uf58915ejEACGyjPUdErOglhiWXadBccdxirjn5xvuaiqOY65wlKnYJQHVeGkVROpQtLfNEKXOWCv1huFo8XJ8Koy3vVKSCd0c9eWt0uNGWdypSmispBgBwQ+kcKLNhGADADSVb6pfpK7XU8vWp0FNqF/eQCl7nsry7szivc3mqL5sbIA5yGeDAdg6os6IcAIApmSXNMPGyZdyS6JDMe+jf6FukUg4OAMApamV6L81Go1AMIkoxkH5EKcU6yRo0S5M44cbwOElSt4TEETQ2hRKvmcNZiS0n2WrkKU+pBYyx95BcAFB9dcEREcmVOK5bAXIBAV9hxCRLXppxMs1J+tVarUamgSQEImoiD0gWvnYWkStsHDmyj1w3AAAYtXyBihr1yBWMtlpHyPUnAACj1mWBkpp0STQ3GMzJgvOd7ikSqY8CADBqeQI1NWiRq39juneEIiOIvICdAACMIM6Wj5ICmgJR4+G47BRhek/CMAyUMAozo8N0YZCpVgUpI0s2U1suoy7jSjUyJaq4nEqv7QJWUDgg+AgAAHAwAJ0BKrQAtAA+nU6hS6WkoyKkVRo4sBOJZ27duv/NAfyVtt+V89J7JOA6/2vtv/1PL45wTNH+g4Y+AR6x/029A6X5h3sB9h7/HUCyAP08/4PqN/wPD7+tf5H2AP49/a/1y9jb/s/y/oz+qPYK/XfrZENdFIvokBpE0VuoPCl998AtpktrrhlGhHtXwVwC2mjbLFRkQGJOw2VXV3ttIUkz7W/onN7pnUWEIMBURSipRZfHiIJfHO5aezhKlcey38TbP6RgO5Xmx3r30B/Km4tS4mtqeMoFKU/kh6Kf9w2B9+11RreUJEp/CjINCsEWYYIDt76vno1O40mbwe+R55C33RQBy0XPQ086n4gtuayNTtAOx34ViVa6PYa/H1eOFccQkWn19oeFZlzLfIsg1boY3uUSn+VVwHarKd+wG6i5AbAMV267BM0t3sKJUz9FJwYvc6/1+noyUIKWErKXv8sHbjig0r5w26JYFiCbbI4VVQ26D+/WHvzgaUup1FuV22XMKWKRtWqwATFssAD++dBAHSPLb377FRM+5iLn/bO+r5zCMQXHvywGjwgm4tJ8NjCm3z4sSDu5u/ciwFPhL1TnRLlQuJYp9p9zDfXovAXtgU5eEiMOtuF+Mh9o2d0UgL+l6lQawMlF73bhTcCfSlC9RntF+4D+CGZOy9PrV7PrZP5KP6/46A994x0P7ajzoiYWgYQfC95IiDktjwCw0aeE7GSJKzl8ENQOT7PDGIHc5xua5WixIAyL5Jj8IJJJ3Hn1UKKbSH+REV3ZumHrhI2D2/nIH7WUxqjda1AQVhNtWstGJfQElxYuHArynOJerAYI67w3dnRVPZeQHWKJnRV9o2X0Q2wR0MWYpGdKkcqmB9d7N4JQT0Ub4ffJX/YkEdlvgjiwo+BR83JKIS2jJZ6B1Bx16ueZ7w5uRoW3h0EFRS5QgGtSBROwNmBvAo6G7J0vujB8C7cnnsCnj1zwrI2VEH/QT3bAJdtODHHCsB8/tH/rYvH5mHNmS/ZaHw/D1QdWWPh8xCrTWff83RZDpg9VIaeuYxHQq3gAKbJv/V2S7XgVvvMKAA9PhJMfPbRWgvR3wwNYWnXtSzpP3cKDy89ctoy8Ge4eOo2Nl4dH7a4a6n18OFV+XjHK7mWvHnuDCAc8lWyZzGUTRqcw1TxVdrQrvJVEVETFkuhabhhWYDshzdVsEfnIOtSSOK1dv5XhHnv5/6Ld6LiU/HDr1enYrwkDb7FCuOOsX8BsfXScOy4vb8cokoOZ4C9xHc07VkLcOthEl7f57eHJBCLC9hrDuzfcwlM93qcZ4vP4hHTX0qMTA5m77nk5FEchCFe69FX+rz/Ux/VJMFqIls38PlhoyNh3xnrojbyiHrmvIZRoo5ACkg/yciCKmugezPLmyEhrw3njT02D3Rgq7YTmjBryttk1UdHK3eP6HZevI61U2mIPJW/Viuwp/uQV3f3B1bOjY+6tBfHPy6l8zby6j45Vj77NS/kfLPy5dHrwK+YMLYFzjXHeJWXhAd79tm1VhFCDYM2Pz0JxWr35RfYlbFawFSod87cqL1Dh9L32I6tZFxOB+mITmE4xLifhcdh7H44Y128dkMpfGpNq1ZBRHbx/19AQJRXVK676X8Cl15vyjvBfl+Thmpu4oHVjDRv8dUXNTP8mE8nw874v03ZSEtGeghe+q2LTEdDEmrb908srQGrHZCGBPlUtFe7+9gG0hhWJvRaYoR+x7QG5x2LeQ4FWvmLsedHdGy1foKr77zv6sBvMNYV3sXs64N9Jz1Qm6qfxKqxhH4CGceZgs8j84c3rdOYhLkIz3fkt6HKlDbLGqbOA8KcUw43izpuQIiFFHefRnq1VrON03mLB6XyE3WRyzYmzN/H0gi2F0LHHGzW9cWWPhUXodRG9fGM1TguPeUn3UAHkR+bfq2orDeffpS64pPSrLc/mkYD2M7skHMSPEZT/rWTTVHCI1qpEICPOw2o3Jb/+levRV5ULCe03/89emrskiIZIKCQY9Ji8LG2sLqlkJdNIozmxAxrsyiS0RpmmH73I9rxjNSnzKG5m0Jabhq2okHhJU5y/mA0l+6pUGQIMGH7H5k6XCu+C4fMnbKwtslSdRrnHWy11hW5EUha7+Yxc7Xv8aL6Jt93WYjOITjBkGx58nnaX+TAFnh+PKbHwK6DDSHdio/LT6I+ycHOMZ0sFmRujjG8EyHP8bn88oddP5yVOJfWW7raXd87iT2uCKDwRe/PP9t9AQ+ZH3NWppQOaNklGrhwh09AOVfck+u0xJ2J0PrlYaPhqqn5C31uq3bzP4qXHDoS/9tGcCE7AO5vxaLH3N3ulwHIeG6aCKhPzCeCgf1ICO4xN3JYHQ78yCV8rfhlJomG5N7iq5wnL/lQXftptt6jwa8gdGCrceCn/nUpGn1M++OaPnY9jqM3bUHUG2Dm+tvu2fmZH8nkFmRaxIoDBgvozv8v7RzmJ5mBwaclU16I3yayc74SCn21htF3LKry3pVApL/pQcEmgf6Hib4o8Psv4MjmxGyae4qTz1KOMI0ccwIWyD/7QAAc9F4Q+5yBfUufJ81edF3ohAzezqJyfYteCEImQsnCGoWnGWHMz5fbbsRJOamFZsDIYvmiyKyFpWdCkhWs+Q8BlhXQHmqYAtbVEhZna91l7HDh2baaAjg/yGYTQZX/5873ZUksvCXANE2PDhPAgsS1fkZ9KXElLXY4j1A8uSCURH1mP9h8hz71CDiEFftP4V43fEX8nV0ZAPD2+AUa45LqBoCpG4grto7DilRE0/aLx4SKYVMZ9MC9Om7R5XYxA5sjM8BNeIuhAhO8ONHijT2a+woeHXsUGhd0xwnrpMlY8qPvEZAdx0WE+wCwBCUfibxkCcZBK7AKNmAJLieotRTWyCsRBC1ImrQxh9seXInOu0mxvKUmFz8+vD4JsqOr/bq+QfpT3NTJePQiVygmFpDKL9CBLeHaxIemFfKahxUgTynF3wa480giIBAAD/6/XHWb7z80slebbKGe/JiCvkIbZcTrprgFq1Ex8jxOAXH55YZMMg19mAAAAAAA=",
    Gh =
      "https://p-p.redbull.com/rb-red-bull-tetris-7k-ff-prod/assets/trophy-CNbfhK0z.png",
    Wh =
      "https://p-p.redbull.com/rb-red-bull-tetris-7k-ff-prod/assets/trophy.png-DHMp8wQM.webp";
  var dr = { exports: {} };
  /**
   * @license
   * Lodash <https://lodash.com/>
   * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
   * Released under MIT license <https://lodash.com/license>
   * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
   * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
   */ var qh = dr.exports,
    ha;
  function Hh() {
    return (
      ha ||
        ((ha = 1),
        (function (o, n) {
          (function () {
            var i,
              u = "4.17.21",
              d = 200,
              w =
                "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.",
              x = "Expected a function",
              R = "Invalid `variable` option passed into `_.template`",
              g = "__lodash_hash_undefined__",
              p = 500,
              _ = "__lodash_placeholder__",
              T = 1,
              b = 2,
              B = 4,
              D = 1,
              I = 2,
              j = 1,
              X = 2,
              ae = 4,
              K = 8,
              $ = 16,
              Z = 32,
              fe = 64,
              H = 128,
              ee = 256,
              Pe = 512,
              De = 30,
              we = "...",
              Le = 800,
              An = 16,
              Ae = 1,
              zn = 2,
              Sn = 3,
              Ye = 1 / 0,
              xt = 9007199254740991,
              gr = 17976931348623157e292,
              Xt = NaN,
              Xe = 4294967295,
              _r = Xe - 1,
              Kn = Xe >>> 1,
              Oe = [
                ["ary", H],
                ["bind", j],
                ["bindKey", X],
                ["curry", K],
                ["curryRight", $],
                ["flip", Pe],
                ["partial", Z],
                ["partialRight", fe],
                ["rearg", ee],
              ],
              Te = "[object Arguments]",
              $t = "[object Array]",
              Cn = "[object AsyncFunction]",
              Bt = "[object Boolean]",
              Lt = "[object Date]",
              Rn = "[object DOMException]",
              nt = "[object Error]",
              Nt = "[object Function]",
              Q = "[object GeneratorFunction]",
              te = "[object Map]",
              me = "[object Number]",
              xe = "[object Null]",
              ve = "[object Object]",
              Zt = "[object Promise]",
              hn = "[object Proxy]",
              Ot = "[object RegExp]",
              at = "[object Set]",
              Tn = "[object String]",
              In = "[object Symbol]",
              Vn = "[object Undefined]",
              Ke = "[object WeakMap]",
              yr = "[object WeakSet]",
              Fn = "[object ArrayBuffer]",
              $e = "[object DataView]",
              xr = "[object Float32Array]",
              h = "[object Float64Array]",
              a = "[object Int8Array]",
              c = "[object Int16Array]",
              y = "[object Int32Array]",
              S = "[object Uint8Array]",
              L = "[object Uint8ClampedArray]",
              k = "[object Uint16Array]",
              ie = "[object Uint32Array]",
              Ie = /\b__p \+= '';/g,
              Se = /\b(__p \+=) '' \+/g,
              Fe = /(__e\(.*?\)|\b__t\)) \+\n'';/g,
              ge = /&(?:amp|lt|gt|quot|#39);/g,
              ma = /[&<>"']/g,
              hf = RegExp(ge.source),
              ff = RegExp(ma.source),
              df = /<%-([\s\S]+?)%>/g,
              mf = /<%([\s\S]+?)%>/g,
              pa = /<%=([\s\S]+?)%>/g,
              pf = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
              gf = /^\w*$/,
              _f =
                /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
              fs = /[\\^$.*+?()[\]{}|]/g,
              yf = RegExp(fs.source),
              ds = /^\s+/,
              xf = /\s/,
              vf = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/,
              Ef = /\{\n\/\* \[wrapped with (.+)\] \*/,
              wf = /,? & /,
              bf = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g,
              Af = /[()=,{}\[\]\/\s]/,
              Sf = /\\(\\)?/g,
              Cf = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,
              ga = /\w*$/,
              Rf = /^[-+]0x[0-9a-f]+$/i,
              Tf = /^0b[01]+$/i,
              If = /^\[object .+?Constructor\]$/,
              Ff = /^0o[0-7]+$/i,
              Bf = /^(?:0|[1-9]\d*)$/,
              Lf = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,
              $r = /($^)/,
              Nf = /['\n\r\u2028\u2029\\]/g,
              Zr = "\\ud800-\\udfff",
              Of = "\\u0300-\\u036f",
              kf = "\\ufe20-\\ufe2f",
              Pf = "\\u20d0-\\u20ff",
              _a = Of + kf + Pf,
              ya = "\\u2700-\\u27bf",
              xa = "a-z\\xdf-\\xf6\\xf8-\\xff",
              Mf = "\\xac\\xb1\\xd7\\xf7",
              Uf = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf",
              jf = "\\u2000-\\u206f",
              Df =
                " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000",
              va = "A-Z\\xc0-\\xd6\\xd8-\\xde",
              Ea = "\\ufe0e\\ufe0f",
              wa = Mf + Uf + jf + Df,
              ms = "['’]",
              Gf = "[" + Zr + "]",
              ba = "[" + wa + "]",
              Qr = "[" + _a + "]",
              Aa = "\\d+",
              Wf = "[" + ya + "]",
              Sa = "[" + xa + "]",
              Ca = "[^" + Zr + wa + Aa + ya + xa + va + "]",
              ps = "\\ud83c[\\udffb-\\udfff]",
              qf = "(?:" + Qr + "|" + ps + ")",
              Ra = "[^" + Zr + "]",
              gs = "(?:\\ud83c[\\udde6-\\uddff]){2}",
              _s = "[\\ud800-\\udbff][\\udc00-\\udfff]",
              Jn = "[" + va + "]",
              Ta = "\\u200d",
              Ia = "(?:" + Sa + "|" + Ca + ")",
              Hf = "(?:" + Jn + "|" + Ca + ")",
              Fa = "(?:" + ms + "(?:d|ll|m|re|s|t|ve))?",
              Ba = "(?:" + ms + "(?:D|LL|M|RE|S|T|VE))?",
              La = qf + "?",
              Na = "[" + Ea + "]?",
              zf =
                "(?:" +
                Ta +
                "(?:" +
                [Ra, gs, _s].join("|") +
                ")" +
                Na +
                La +
                ")*",
              Kf = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])",
              Vf = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])",
              Oa = Na + La + zf,
              Jf = "(?:" + [Wf, gs, _s].join("|") + ")" + Oa,
              Yf = "(?:" + [Ra + Qr + "?", Qr, gs, _s, Gf].join("|") + ")",
              Xf = RegExp(ms, "g"),
              $f = RegExp(Qr, "g"),
              ys = RegExp(ps + "(?=" + ps + ")|" + Yf + Oa, "g"),
              Zf = RegExp(
                [
                  Jn +
                    "?" +
                    Sa +
                    "+" +
                    Fa +
                    "(?=" +
                    [ba, Jn, "$"].join("|") +
                    ")",
                  Hf + "+" + Ba + "(?=" + [ba, Jn + Ia, "$"].join("|") + ")",
                  Jn + "?" + Ia + "+" + Fa,
                  Jn + "+" + Ba,
                  Vf,
                  Kf,
                  Aa,
                  Jf,
                ].join("|"),
                "g",
              ),
              Qf = RegExp("[" + Ta + Zr + _a + Ea + "]"),
              ed =
                /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/,
              td = [
                "Array",
                "Buffer",
                "DataView",
                "Date",
                "Error",
                "Float32Array",
                "Float64Array",
                "Function",
                "Int8Array",
                "Int16Array",
                "Int32Array",
                "Map",
                "Math",
                "Object",
                "Promise",
                "RegExp",
                "Set",
                "String",
                "Symbol",
                "TypeError",
                "Uint8Array",
                "Uint8ClampedArray",
                "Uint16Array",
                "Uint32Array",
                "WeakMap",
                "_",
                "clearTimeout",
                "isFinite",
                "parseInt",
                "setTimeout",
              ],
              nd = -1,
              Re = {};
            (Re[xr] =
              Re[h] =
              Re[a] =
              Re[c] =
              Re[y] =
              Re[S] =
              Re[L] =
              Re[k] =
              Re[ie] =
                !0),
              (Re[Te] =
                Re[$t] =
                Re[Fn] =
                Re[Bt] =
                Re[$e] =
                Re[Lt] =
                Re[nt] =
                Re[Nt] =
                Re[te] =
                Re[me] =
                Re[ve] =
                Re[Ot] =
                Re[at] =
                Re[Tn] =
                Re[Ke] =
                  !1);
            var Ce = {};
            (Ce[Te] =
              Ce[$t] =
              Ce[Fn] =
              Ce[$e] =
              Ce[Bt] =
              Ce[Lt] =
              Ce[xr] =
              Ce[h] =
              Ce[a] =
              Ce[c] =
              Ce[y] =
              Ce[te] =
              Ce[me] =
              Ce[ve] =
              Ce[Ot] =
              Ce[at] =
              Ce[Tn] =
              Ce[In] =
              Ce[S] =
              Ce[L] =
              Ce[k] =
              Ce[ie] =
                !0),
              (Ce[nt] = Ce[Nt] = Ce[Ke] = !1);
            var rd = {
                À: "A",
                Á: "A",
                Â: "A",
                Ã: "A",
                Ä: "A",
                Å: "A",
                à: "a",
                á: "a",
                â: "a",
                ã: "a",
                ä: "a",
                å: "a",
                Ç: "C",
                ç: "c",
                Ð: "D",
                ð: "d",
                È: "E",
                É: "E",
                Ê: "E",
                Ë: "E",
                è: "e",
                é: "e",
                ê: "e",
                ë: "e",
                Ì: "I",
                Í: "I",
                Î: "I",
                Ï: "I",
                ì: "i",
                í: "i",
                î: "i",
                ï: "i",
                Ñ: "N",
                ñ: "n",
                Ò: "O",
                Ó: "O",
                Ô: "O",
                Õ: "O",
                Ö: "O",
                Ø: "O",
                ò: "o",
                ó: "o",
                ô: "o",
                õ: "o",
                ö: "o",
                ø: "o",
                Ù: "U",
                Ú: "U",
                Û: "U",
                Ü: "U",
                ù: "u",
                ú: "u",
                û: "u",
                ü: "u",
                Ý: "Y",
                ý: "y",
                ÿ: "y",
                Æ: "Ae",
                æ: "ae",
                Þ: "Th",
                þ: "th",
                ß: "ss",
                Ā: "A",
                Ă: "A",
                Ą: "A",
                ā: "a",
                ă: "a",
                ą: "a",
                Ć: "C",
                Ĉ: "C",
                Ċ: "C",
                Č: "C",
                ć: "c",
                ĉ: "c",
                ċ: "c",
                č: "c",
                Ď: "D",
                Đ: "D",
                ď: "d",
                đ: "d",
                Ē: "E",
                Ĕ: "E",
                Ė: "E",
                Ę: "E",
                Ě: "E",
                ē: "e",
                ĕ: "e",
                ė: "e",
                ę: "e",
                ě: "e",
                Ĝ: "G",
                Ğ: "G",
                Ġ: "G",
                Ģ: "G",
                ĝ: "g",
                ğ: "g",
                ġ: "g",
                ģ: "g",
                Ĥ: "H",
                Ħ: "H",
                ĥ: "h",
                ħ: "h",
                Ĩ: "I",
                Ī: "I",
                Ĭ: "I",
                Į: "I",
                İ: "I",
                ĩ: "i",
                ī: "i",
                ĭ: "i",
                į: "i",
                ı: "i",
                Ĵ: "J",
                ĵ: "j",
                Ķ: "K",
                ķ: "k",
                ĸ: "k",
                Ĺ: "L",
                Ļ: "L",
                Ľ: "L",
                Ŀ: "L",
                Ł: "L",
                ĺ: "l",
                ļ: "l",
                ľ: "l",
                ŀ: "l",
                ł: "l",
                Ń: "N",
                Ņ: "N",
                Ň: "N",
                Ŋ: "N",
                ń: "n",
                ņ: "n",
                ň: "n",
                ŋ: "n",
                Ō: "O",
                Ŏ: "O",
                Ő: "O",
                ō: "o",
                ŏ: "o",
                ő: "o",
                Ŕ: "R",
                Ŗ: "R",
                Ř: "R",
                ŕ: "r",
                ŗ: "r",
                ř: "r",
                Ś: "S",
                Ŝ: "S",
                Ş: "S",
                Š: "S",
                ś: "s",
                ŝ: "s",
                ş: "s",
                š: "s",
                Ţ: "T",
                Ť: "T",
                Ŧ: "T",
                ţ: "t",
                ť: "t",
                ŧ: "t",
                Ũ: "U",
                Ū: "U",
                Ŭ: "U",
                Ů: "U",
                Ű: "U",
                Ų: "U",
                ũ: "u",
                ū: "u",
                ŭ: "u",
                ů: "u",
                ű: "u",
                ų: "u",
                Ŵ: "W",
                ŵ: "w",
                Ŷ: "Y",
                ŷ: "y",
                Ÿ: "Y",
                Ź: "Z",
                Ż: "Z",
                Ž: "Z",
                ź: "z",
                ż: "z",
                ž: "z",
                Ĳ: "IJ",
                ĳ: "ij",
                Œ: "Oe",
                œ: "oe",
                ŉ: "'n",
                ſ: "s",
              },
              id = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;",
              },
              sd = {
                "&amp;": "&",
                "&lt;": "<",
                "&gt;": ">",
                "&quot;": '"',
                "&#39;": "'",
              },
              od = {
                "\\": "\\",
                "'": "'",
                "\n": "n",
                "\r": "r",
                "\u2028": "u2028",
                "\u2029": "u2029",
              },
              ad = parseFloat,
              ud = parseInt,
              ka =
                typeof v.commonjsGlobal == "object" &&
                v.commonjsGlobal &&
                v.commonjsGlobal.Object === Object &&
                v.commonjsGlobal,
              cd =
                typeof self == "object" &&
                self &&
                self.Object === Object &&
                self,
              He = ka || cd || Function("return this")(),
              xs = n && !n.nodeType && n,
              Bn = xs && !0 && o && !o.nodeType && o,
              Pa = Bn && Bn.exports === xs,
              vs = Pa && ka.process,
              vt = (function () {
                try {
                  var C = Bn && Bn.require && Bn.require("util").types;
                  return C || (vs && vs.binding && vs.binding("util"));
                } catch {}
              })(),
              Ma = vt && vt.isArrayBuffer,
              Ua = vt && vt.isDate,
              ja = vt && vt.isMap,
              Da = vt && vt.isRegExp,
              Ga = vt && vt.isSet,
              Wa = vt && vt.isTypedArray;
            function ut(C, O, N) {
              switch (N.length) {
                case 0:
                  return C.call(O);
                case 1:
                  return C.call(O, N[0]);
                case 2:
                  return C.call(O, N[0], N[1]);
                case 3:
                  return C.call(O, N[0], N[1], N[2]);
              }
              return C.apply(O, N);
            }
            function ld(C, O, N, W) {
              for (var ne = -1, pe = C == null ? 0 : C.length; ++ne < pe; ) {
                var Ge = C[ne];
                O(W, Ge, N(Ge), C);
              }
              return W;
            }
            function Et(C, O) {
              for (
                var N = -1, W = C == null ? 0 : C.length;
                ++N < W && O(C[N], N, C) !== !1;

              );
              return C;
            }
            function hd(C, O) {
              for (
                var N = C == null ? 0 : C.length;
                N-- && O(C[N], N, C) !== !1;

              );
              return C;
            }
            function qa(C, O) {
              for (var N = -1, W = C == null ? 0 : C.length; ++N < W; )
                if (!O(C[N], N, C)) return !1;
              return !0;
            }
            function fn(C, O) {
              for (
                var N = -1, W = C == null ? 0 : C.length, ne = 0, pe = [];
                ++N < W;

              ) {
                var Ge = C[N];
                O(Ge, N, C) && (pe[ne++] = Ge);
              }
              return pe;
            }
            function ei(C, O) {
              var N = C == null ? 0 : C.length;
              return !!N && Yn(C, O, 0) > -1;
            }
            function Es(C, O, N) {
              for (var W = -1, ne = C == null ? 0 : C.length; ++W < ne; )
                if (N(O, C[W])) return !0;
              return !1;
            }
            function Be(C, O) {
              for (
                var N = -1, W = C == null ? 0 : C.length, ne = Array(W);
                ++N < W;

              )
                ne[N] = O(C[N], N, C);
              return ne;
            }
            function dn(C, O) {
              for (var N = -1, W = O.length, ne = C.length; ++N < W; )
                C[ne + N] = O[N];
              return C;
            }
            function ws(C, O, N, W) {
              var ne = -1,
                pe = C == null ? 0 : C.length;
              for (W && pe && (N = C[++ne]); ++ne < pe; )
                N = O(N, C[ne], ne, C);
              return N;
            }
            function fd(C, O, N, W) {
              var ne = C == null ? 0 : C.length;
              for (W && ne && (N = C[--ne]); ne--; ) N = O(N, C[ne], ne, C);
              return N;
            }
            function bs(C, O) {
              for (var N = -1, W = C == null ? 0 : C.length; ++N < W; )
                if (O(C[N], N, C)) return !0;
              return !1;
            }
            var dd = As("length");
            function md(C) {
              return C.split("");
            }
            function pd(C) {
              return C.match(bf) || [];
            }
            function Ha(C, O, N) {
              var W;
              return (
                N(C, function (ne, pe, Ge) {
                  if (O(ne, pe, Ge)) return (W = pe), !1;
                }),
                W
              );
            }
            function ti(C, O, N, W) {
              for (
                var ne = C.length, pe = N + (W ? 1 : -1);
                W ? pe-- : ++pe < ne;

              )
                if (O(C[pe], pe, C)) return pe;
              return -1;
            }
            function Yn(C, O, N) {
              return O === O ? Rd(C, O, N) : ti(C, za, N);
            }
            function gd(C, O, N, W) {
              for (var ne = N - 1, pe = C.length; ++ne < pe; )
                if (W(C[ne], O)) return ne;
              return -1;
            }
            function za(C) {
              return C !== C;
            }
            function Ka(C, O) {
              var N = C == null ? 0 : C.length;
              return N ? Cs(C, O) / N : Xt;
            }
            function As(C) {
              return function (O) {
                return O == null ? i : O[C];
              };
            }
            function Ss(C) {
              return function (O) {
                return C == null ? i : C[O];
              };
            }
            function Va(C, O, N, W, ne) {
              return (
                ne(C, function (pe, Ge, be) {
                  N = W ? ((W = !1), pe) : O(N, pe, Ge, be);
                }),
                N
              );
            }
            function _d(C, O) {
              var N = C.length;
              for (C.sort(O); N--; ) C[N] = C[N].value;
              return C;
            }
            function Cs(C, O) {
              for (var N, W = -1, ne = C.length; ++W < ne; ) {
                var pe = O(C[W]);
                pe !== i && (N = N === i ? pe : N + pe);
              }
              return N;
            }
            function Rs(C, O) {
              for (var N = -1, W = Array(C); ++N < C; ) W[N] = O(N);
              return W;
            }
            function yd(C, O) {
              return Be(O, function (N) {
                return [N, C[N]];
              });
            }
            function Ja(C) {
              return C && C.slice(0, Za(C) + 1).replace(ds, "");
            }
            function ct(C) {
              return function (O) {
                return C(O);
              };
            }
            function Ts(C, O) {
              return Be(O, function (N) {
                return C[N];
              });
            }
            function vr(C, O) {
              return C.has(O);
            }
            function Ya(C, O) {
              for (var N = -1, W = C.length; ++N < W && Yn(O, C[N], 0) > -1; );
              return N;
            }
            function Xa(C, O) {
              for (var N = C.length; N-- && Yn(O, C[N], 0) > -1; );
              return N;
            }
            function xd(C, O) {
              for (var N = C.length, W = 0; N--; ) C[N] === O && ++W;
              return W;
            }
            var vd = Ss(rd),
              Ed = Ss(id);
            function wd(C) {
              return "\\" + od[C];
            }
            function bd(C, O) {
              return C == null ? i : C[O];
            }
            function Xn(C) {
              return Qf.test(C);
            }
            function Ad(C) {
              return ed.test(C);
            }
            function Sd(C) {
              for (var O, N = []; !(O = C.next()).done; ) N.push(O.value);
              return N;
            }
            function Is(C) {
              var O = -1,
                N = Array(C.size);
              return (
                C.forEach(function (W, ne) {
                  N[++O] = [ne, W];
                }),
                N
              );
            }
            function $a(C, O) {
              return function (N) {
                return C(O(N));
              };
            }
            function mn(C, O) {
              for (var N = -1, W = C.length, ne = 0, pe = []; ++N < W; ) {
                var Ge = C[N];
                (Ge === O || Ge === _) && ((C[N] = _), (pe[ne++] = N));
              }
              return pe;
            }
            function ni(C) {
              var O = -1,
                N = Array(C.size);
              return (
                C.forEach(function (W) {
                  N[++O] = W;
                }),
                N
              );
            }
            function Cd(C) {
              var O = -1,
                N = Array(C.size);
              return (
                C.forEach(function (W) {
                  N[++O] = [W, W];
                }),
                N
              );
            }
            function Rd(C, O, N) {
              for (var W = N - 1, ne = C.length; ++W < ne; )
                if (C[W] === O) return W;
              return -1;
            }
            function Td(C, O, N) {
              for (var W = N + 1; W--; ) if (C[W] === O) return W;
              return W;
            }
            function $n(C) {
              return Xn(C) ? Fd(C) : dd(C);
            }
            function kt(C) {
              return Xn(C) ? Bd(C) : md(C);
            }
            function Za(C) {
              for (var O = C.length; O-- && xf.test(C.charAt(O)); );
              return O;
            }
            var Id = Ss(sd);
            function Fd(C) {
              for (var O = (ys.lastIndex = 0); ys.test(C); ) ++O;
              return O;
            }
            function Bd(C) {
              return C.match(ys) || [];
            }
            function Ld(C) {
              return C.match(Zf) || [];
            }
            var Nd = function C(O) {
                O =
                  O == null ? He : Zn.defaults(He.Object(), O, Zn.pick(He, td));
                var N = O.Array,
                  W = O.Date,
                  ne = O.Error,
                  pe = O.Function,
                  Ge = O.Math,
                  be = O.Object,
                  Fs = O.RegExp,
                  Od = O.String,
                  wt = O.TypeError,
                  ri = N.prototype,
                  kd = pe.prototype,
                  Qn = be.prototype,
                  ii = O["__core-js_shared__"],
                  si = kd.toString,
                  Ee = Qn.hasOwnProperty,
                  Pd = 0,
                  Qa = (function () {
                    var e = /[^.]+$/.exec(
                      (ii && ii.keys && ii.keys.IE_PROTO) || "",
                    );
                    return e ? "Symbol(src)_1." + e : "";
                  })(),
                  oi = Qn.toString,
                  Md = si.call(be),
                  Ud = He._,
                  jd = Fs(
                    "^" +
                      si
                        .call(Ee)
                        .replace(fs, "\\$&")
                        .replace(
                          /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
                          "$1.*?",
                        ) +
                      "$",
                  ),
                  ai = Pa ? O.Buffer : i,
                  pn = O.Symbol,
                  ui = O.Uint8Array,
                  eu = ai ? ai.allocUnsafe : i,
                  ci = $a(be.getPrototypeOf, be),
                  tu = be.create,
                  nu = Qn.propertyIsEnumerable,
                  li = ri.splice,
                  ru = pn ? pn.isConcatSpreadable : i,
                  Er = pn ? pn.iterator : i,
                  Ln = pn ? pn.toStringTag : i,
                  hi = (function () {
                    try {
                      var e = Mn(be, "defineProperty");
                      return e({}, "", {}), e;
                    } catch {}
                  })(),
                  Dd = O.clearTimeout !== He.clearTimeout && O.clearTimeout,
                  Gd = W && W.now !== He.Date.now && W.now,
                  Wd = O.setTimeout !== He.setTimeout && O.setTimeout,
                  fi = Ge.ceil,
                  di = Ge.floor,
                  Bs = be.getOwnPropertySymbols,
                  qd = ai ? ai.isBuffer : i,
                  iu = O.isFinite,
                  Hd = ri.join,
                  zd = $a(be.keys, be),
                  We = Ge.max,
                  Ve = Ge.min,
                  Kd = W.now,
                  Vd = O.parseInt,
                  su = Ge.random,
                  Jd = ri.reverse,
                  Ls = Mn(O, "DataView"),
                  wr = Mn(O, "Map"),
                  Ns = Mn(O, "Promise"),
                  er = Mn(O, "Set"),
                  br = Mn(O, "WeakMap"),
                  Ar = Mn(be, "create"),
                  mi = br && new br(),
                  tr = {},
                  Yd = Un(Ls),
                  Xd = Un(wr),
                  $d = Un(Ns),
                  Zd = Un(er),
                  Qd = Un(br),
                  pi = pn ? pn.prototype : i,
                  Sr = pi ? pi.valueOf : i,
                  ou = pi ? pi.toString : i;
                function f(e) {
                  if (ke(e) && !re(e) && !(e instanceof le)) {
                    if (e instanceof bt) return e;
                    if (Ee.call(e, "__wrapped__")) return ac(e);
                  }
                  return new bt(e);
                }
                var nr = (function () {
                  function e() {}
                  return function (t) {
                    if (!Ne(t)) return {};
                    if (tu) return tu(t);
                    e.prototype = t;
                    var r = new e();
                    return (e.prototype = i), r;
                  };
                })();
                function gi() {}
                function bt(e, t) {
                  (this.__wrapped__ = e),
                    (this.__actions__ = []),
                    (this.__chain__ = !!t),
                    (this.__index__ = 0),
                    (this.__values__ = i);
                }
                (f.templateSettings = {
                  escape: df,
                  evaluate: mf,
                  interpolate: pa,
                  variable: "",
                  imports: { _: f },
                }),
                  (f.prototype = gi.prototype),
                  (f.prototype.constructor = f),
                  (bt.prototype = nr(gi.prototype)),
                  (bt.prototype.constructor = bt);
                function le(e) {
                  (this.__wrapped__ = e),
                    (this.__actions__ = []),
                    (this.__dir__ = 1),
                    (this.__filtered__ = !1),
                    (this.__iteratees__ = []),
                    (this.__takeCount__ = Xe),
                    (this.__views__ = []);
                }
                function em() {
                  var e = new le(this.__wrapped__);
                  return (
                    (e.__actions__ = rt(this.__actions__)),
                    (e.__dir__ = this.__dir__),
                    (e.__filtered__ = this.__filtered__),
                    (e.__iteratees__ = rt(this.__iteratees__)),
                    (e.__takeCount__ = this.__takeCount__),
                    (e.__views__ = rt(this.__views__)),
                    e
                  );
                }
                function tm() {
                  if (this.__filtered__) {
                    var e = new le(this);
                    (e.__dir__ = -1), (e.__filtered__ = !0);
                  } else (e = this.clone()), (e.__dir__ *= -1);
                  return e;
                }
                function nm() {
                  var e = this.__wrapped__.value(),
                    t = this.__dir__,
                    r = re(e),
                    s = t < 0,
                    l = r ? e.length : 0,
                    m = mp(0, l, this.__views__),
                    E = m.start,
                    A = m.end,
                    F = A - E,
                    P = s ? A : E - 1,
                    M = this.__iteratees__,
                    U = M.length,
                    G = 0,
                    q = Ve(F, this.__takeCount__);
                  if (!r || (!s && l == F && q == F))
                    return Fu(e, this.__actions__);
                  var J = [];
                  e: for (; F-- && G < q; ) {
                    P += t;
                    for (var oe = -1, Y = e[P]; ++oe < U; ) {
                      var ce = M[oe],
                        de = ce.iteratee,
                        ft = ce.type,
                        et = de(Y);
                      if (ft == zn) Y = et;
                      else if (!et) {
                        if (ft == Ae) continue e;
                        break e;
                      }
                    }
                    J[G++] = Y;
                  }
                  return J;
                }
                (le.prototype = nr(gi.prototype)),
                  (le.prototype.constructor = le);
                function Nn(e) {
                  var t = -1,
                    r = e == null ? 0 : e.length;
                  for (this.clear(); ++t < r; ) {
                    var s = e[t];
                    this.set(s[0], s[1]);
                  }
                }
                function rm() {
                  (this.__data__ = Ar ? Ar(null) : {}), (this.size = 0);
                }
                function im(e) {
                  var t = this.has(e) && delete this.__data__[e];
                  return (this.size -= t ? 1 : 0), t;
                }
                function sm(e) {
                  var t = this.__data__;
                  if (Ar) {
                    var r = t[e];
                    return r === g ? i : r;
                  }
                  return Ee.call(t, e) ? t[e] : i;
                }
                function om(e) {
                  var t = this.__data__;
                  return Ar ? t[e] !== i : Ee.call(t, e);
                }
                function am(e, t) {
                  var r = this.__data__;
                  return (
                    (this.size += this.has(e) ? 0 : 1),
                    (r[e] = Ar && t === i ? g : t),
                    this
                  );
                }
                (Nn.prototype.clear = rm),
                  (Nn.prototype.delete = im),
                  (Nn.prototype.get = sm),
                  (Nn.prototype.has = om),
                  (Nn.prototype.set = am);
                function Qt(e) {
                  var t = -1,
                    r = e == null ? 0 : e.length;
                  for (this.clear(); ++t < r; ) {
                    var s = e[t];
                    this.set(s[0], s[1]);
                  }
                }
                function um() {
                  (this.__data__ = []), (this.size = 0);
                }
                function cm(e) {
                  var t = this.__data__,
                    r = _i(t, e);
                  if (r < 0) return !1;
                  var s = t.length - 1;
                  return r == s ? t.pop() : li.call(t, r, 1), --this.size, !0;
                }
                function lm(e) {
                  var t = this.__data__,
                    r = _i(t, e);
                  return r < 0 ? i : t[r][1];
                }
                function hm(e) {
                  return _i(this.__data__, e) > -1;
                }
                function fm(e, t) {
                  var r = this.__data__,
                    s = _i(r, e);
                  return (
                    s < 0 ? (++this.size, r.push([e, t])) : (r[s][1] = t), this
                  );
                }
                (Qt.prototype.clear = um),
                  (Qt.prototype.delete = cm),
                  (Qt.prototype.get = lm),
                  (Qt.prototype.has = hm),
                  (Qt.prototype.set = fm);
                function en(e) {
                  var t = -1,
                    r = e == null ? 0 : e.length;
                  for (this.clear(); ++t < r; ) {
                    var s = e[t];
                    this.set(s[0], s[1]);
                  }
                }
                function dm() {
                  (this.size = 0),
                    (this.__data__ = {
                      hash: new Nn(),
                      map: new (wr || Qt)(),
                      string: new Nn(),
                    });
                }
                function mm(e) {
                  var t = Ii(this, e).delete(e);
                  return (this.size -= t ? 1 : 0), t;
                }
                function pm(e) {
                  return Ii(this, e).get(e);
                }
                function gm(e) {
                  return Ii(this, e).has(e);
                }
                function _m(e, t) {
                  var r = Ii(this, e),
                    s = r.size;
                  return r.set(e, t), (this.size += r.size == s ? 0 : 1), this;
                }
                (en.prototype.clear = dm),
                  (en.prototype.delete = mm),
                  (en.prototype.get = pm),
                  (en.prototype.has = gm),
                  (en.prototype.set = _m);
                function On(e) {
                  var t = -1,
                    r = e == null ? 0 : e.length;
                  for (this.__data__ = new en(); ++t < r; ) this.add(e[t]);
                }
                function ym(e) {
                  return this.__data__.set(e, g), this;
                }
                function xm(e) {
                  return this.__data__.has(e);
                }
                (On.prototype.add = On.prototype.push = ym),
                  (On.prototype.has = xm);
                function Pt(e) {
                  var t = (this.__data__ = new Qt(e));
                  this.size = t.size;
                }
                function vm() {
                  (this.__data__ = new Qt()), (this.size = 0);
                }
                function Em(e) {
                  var t = this.__data__,
                    r = t.delete(e);
                  return (this.size = t.size), r;
                }
                function wm(e) {
                  return this.__data__.get(e);
                }
                function bm(e) {
                  return this.__data__.has(e);
                }
                function Am(e, t) {
                  var r = this.__data__;
                  if (r instanceof Qt) {
                    var s = r.__data__;
                    if (!wr || s.length < d - 1)
                      return s.push([e, t]), (this.size = ++r.size), this;
                    r = this.__data__ = new en(s);
                  }
                  return r.set(e, t), (this.size = r.size), this;
                }
                (Pt.prototype.clear = vm),
                  (Pt.prototype.delete = Em),
                  (Pt.prototype.get = wm),
                  (Pt.prototype.has = bm),
                  (Pt.prototype.set = Am);
                function au(e, t) {
                  var r = re(e),
                    s = !r && jn(e),
                    l = !r && !s && vn(e),
                    m = !r && !s && !l && or(e),
                    E = r || s || l || m,
                    A = E ? Rs(e.length, Od) : [],
                    F = A.length;
                  for (var P in e)
                    (t || Ee.call(e, P)) &&
                      !(
                        E &&
                        (P == "length" ||
                          (l && (P == "offset" || P == "parent")) ||
                          (m &&
                            (P == "buffer" ||
                              P == "byteLength" ||
                              P == "byteOffset")) ||
                          sn(P, F))
                      ) &&
                      A.push(P);
                  return A;
                }
                function uu(e) {
                  var t = e.length;
                  return t ? e[Hs(0, t - 1)] : i;
                }
                function Sm(e, t) {
                  return Fi(rt(e), kn(t, 0, e.length));
                }
                function Cm(e) {
                  return Fi(rt(e));
                }
                function Os(e, t, r) {
                  ((r !== i && !Mt(e[t], r)) || (r === i && !(t in e))) &&
                    tn(e, t, r);
                }
                function Cr(e, t, r) {
                  var s = e[t];
                  (!(Ee.call(e, t) && Mt(s, r)) || (r === i && !(t in e))) &&
                    tn(e, t, r);
                }
                function _i(e, t) {
                  for (var r = e.length; r--; ) if (Mt(e[r][0], t)) return r;
                  return -1;
                }
                function Rm(e, t, r, s) {
                  return (
                    gn(e, function (l, m, E) {
                      t(s, l, r(l), E);
                    }),
                    s
                  );
                }
                function cu(e, t) {
                  return e && Kt(t, qe(t), e);
                }
                function Tm(e, t) {
                  return e && Kt(t, st(t), e);
                }
                function tn(e, t, r) {
                  t == "__proto__" && hi
                    ? hi(e, t, {
                        configurable: !0,
                        enumerable: !0,
                        value: r,
                        writable: !0,
                      })
                    : (e[t] = r);
                }
                function ks(e, t) {
                  for (
                    var r = -1, s = t.length, l = N(s), m = e == null;
                    ++r < s;

                  )
                    l[r] = m ? i : go(e, t[r]);
                  return l;
                }
                function kn(e, t, r) {
                  return (
                    e === e &&
                      (r !== i && (e = e <= r ? e : r),
                      t !== i && (e = e >= t ? e : t)),
                    e
                  );
                }
                function At(e, t, r, s, l, m) {
                  var E,
                    A = t & T,
                    F = t & b,
                    P = t & B;
                  if ((r && (E = l ? r(e, s, l, m) : r(e)), E !== i)) return E;
                  if (!Ne(e)) return e;
                  var M = re(e);
                  if (M) {
                    if (((E = gp(e)), !A)) return rt(e, E);
                  } else {
                    var U = Je(e),
                      G = U == Nt || U == Q;
                    if (vn(e)) return Nu(e, A);
                    if (U == ve || U == Te || (G && !l)) {
                      if (((E = F || G ? {} : Zu(e)), !A))
                        return F ? sp(e, Tm(E, e)) : ip(e, cu(E, e));
                    } else {
                      if (!Ce[U]) return l ? e : {};
                      E = _p(e, U, A);
                    }
                  }
                  m || (m = new Pt());
                  var q = m.get(e);
                  if (q) return q;
                  m.set(e, E),
                    Rc(e)
                      ? e.forEach(function (Y) {
                          E.add(At(Y, t, r, Y, e, m));
                        })
                      : Sc(e) &&
                        e.forEach(function (Y, ce) {
                          E.set(ce, At(Y, t, r, ce, e, m));
                        });
                  var J = P ? (F ? to : eo) : F ? st : qe,
                    oe = M ? i : J(e);
                  return (
                    Et(oe || e, function (Y, ce) {
                      oe && ((ce = Y), (Y = e[ce])),
                        Cr(E, ce, At(Y, t, r, ce, e, m));
                    }),
                    E
                  );
                }
                function Im(e) {
                  var t = qe(e);
                  return function (r) {
                    return lu(r, e, t);
                  };
                }
                function lu(e, t, r) {
                  var s = r.length;
                  if (e == null) return !s;
                  for (e = be(e); s--; ) {
                    var l = r[s],
                      m = t[l],
                      E = e[l];
                    if ((E === i && !(l in e)) || !m(E)) return !1;
                  }
                  return !0;
                }
                function hu(e, t, r) {
                  if (typeof e != "function") throw new wt(x);
                  return Nr(function () {
                    e.apply(i, r);
                  }, t);
                }
                function Rr(e, t, r, s) {
                  var l = -1,
                    m = ei,
                    E = !0,
                    A = e.length,
                    F = [],
                    P = t.length;
                  if (!A) return F;
                  r && (t = Be(t, ct(r))),
                    s
                      ? ((m = Es), (E = !1))
                      : t.length >= d && ((m = vr), (E = !1), (t = new On(t)));
                  e: for (; ++l < A; ) {
                    var M = e[l],
                      U = r == null ? M : r(M);
                    if (((M = s || M !== 0 ? M : 0), E && U === U)) {
                      for (var G = P; G--; ) if (t[G] === U) continue e;
                      F.push(M);
                    } else m(t, U, s) || F.push(M);
                  }
                  return F;
                }
                var gn = Uu(zt),
                  fu = Uu(Ms, !0);
                function Fm(e, t) {
                  var r = !0;
                  return (
                    gn(e, function (s, l, m) {
                      return (r = !!t(s, l, m)), r;
                    }),
                    r
                  );
                }
                function yi(e, t, r) {
                  for (var s = -1, l = e.length; ++s < l; ) {
                    var m = e[s],
                      E = t(m);
                    if (E != null && (A === i ? E === E && !ht(E) : r(E, A)))
                      var A = E,
                        F = m;
                  }
                  return F;
                }
                function Bm(e, t, r, s) {
                  var l = e.length;
                  for (
                    r = se(r),
                      r < 0 && (r = -r > l ? 0 : l + r),
                      s = s === i || s > l ? l : se(s),
                      s < 0 && (s += l),
                      s = r > s ? 0 : Ic(s);
                    r < s;

                  )
                    e[r++] = t;
                  return e;
                }
                function du(e, t) {
                  var r = [];
                  return (
                    gn(e, function (s, l, m) {
                      t(s, l, m) && r.push(s);
                    }),
                    r
                  );
                }
                function ze(e, t, r, s, l) {
                  var m = -1,
                    E = e.length;
                  for (r || (r = xp), l || (l = []); ++m < E; ) {
                    var A = e[m];
                    t > 0 && r(A)
                      ? t > 1
                        ? ze(A, t - 1, r, s, l)
                        : dn(l, A)
                      : s || (l[l.length] = A);
                  }
                  return l;
                }
                var Ps = ju(),
                  mu = ju(!0);
                function zt(e, t) {
                  return e && Ps(e, t, qe);
                }
                function Ms(e, t) {
                  return e && mu(e, t, qe);
                }
                function xi(e, t) {
                  return fn(t, function (r) {
                    return on(e[r]);
                  });
                }
                function Pn(e, t) {
                  t = yn(t, e);
                  for (var r = 0, s = t.length; e != null && r < s; )
                    e = e[Vt(t[r++])];
                  return r && r == s ? e : i;
                }
                function pu(e, t, r) {
                  var s = t(e);
                  return re(e) ? s : dn(s, r(e));
                }
                function Ze(e) {
                  return e == null
                    ? e === i
                      ? Vn
                      : xe
                    : Ln && Ln in be(e)
                      ? dp(e)
                      : Cp(e);
                }
                function Us(e, t) {
                  return e > t;
                }
                function Lm(e, t) {
                  return e != null && Ee.call(e, t);
                }
                function Nm(e, t) {
                  return e != null && t in be(e);
                }
                function Om(e, t, r) {
                  return e >= Ve(t, r) && e < We(t, r);
                }
                function js(e, t, r) {
                  for (
                    var s = r ? Es : ei,
                      l = e[0].length,
                      m = e.length,
                      E = m,
                      A = N(m),
                      F = 1 / 0,
                      P = [];
                    E--;

                  ) {
                    var M = e[E];
                    E && t && (M = Be(M, ct(t))),
                      (F = Ve(M.length, F)),
                      (A[E] =
                        !r && (t || (l >= 120 && M.length >= 120))
                          ? new On(E && M)
                          : i);
                  }
                  M = e[0];
                  var U = -1,
                    G = A[0];
                  e: for (; ++U < l && P.length < F; ) {
                    var q = M[U],
                      J = t ? t(q) : q;
                    if (
                      ((q = r || q !== 0 ? q : 0), !(G ? vr(G, J) : s(P, J, r)))
                    ) {
                      for (E = m; --E; ) {
                        var oe = A[E];
                        if (!(oe ? vr(oe, J) : s(e[E], J, r))) continue e;
                      }
                      G && G.push(J), P.push(q);
                    }
                  }
                  return P;
                }
                function km(e, t, r, s) {
                  return (
                    zt(e, function (l, m, E) {
                      t(s, r(l), m, E);
                    }),
                    s
                  );
                }
                function Tr(e, t, r) {
                  (t = yn(t, e)), (e = nc(e, t));
                  var s = e == null ? e : e[Vt(Ct(t))];
                  return s == null ? i : ut(s, e, r);
                }
                function gu(e) {
                  return ke(e) && Ze(e) == Te;
                }
                function Pm(e) {
                  return ke(e) && Ze(e) == Fn;
                }
                function Mm(e) {
                  return ke(e) && Ze(e) == Lt;
                }
                function Ir(e, t, r, s, l) {
                  return e === t
                    ? !0
                    : e == null || t == null || (!ke(e) && !ke(t))
                      ? e !== e && t !== t
                      : Um(e, t, r, s, Ir, l);
                }
                function Um(e, t, r, s, l, m) {
                  var E = re(e),
                    A = re(t),
                    F = E ? $t : Je(e),
                    P = A ? $t : Je(t);
                  (F = F == Te ? ve : F), (P = P == Te ? ve : P);
                  var M = F == ve,
                    U = P == ve,
                    G = F == P;
                  if (G && vn(e)) {
                    if (!vn(t)) return !1;
                    (E = !0), (M = !1);
                  }
                  if (G && !M)
                    return (
                      m || (m = new Pt()),
                      E || or(e)
                        ? Yu(e, t, r, s, l, m)
                        : hp(e, t, F, r, s, l, m)
                    );
                  if (!(r & D)) {
                    var q = M && Ee.call(e, "__wrapped__"),
                      J = U && Ee.call(t, "__wrapped__");
                    if (q || J) {
                      var oe = q ? e.value() : e,
                        Y = J ? t.value() : t;
                      return m || (m = new Pt()), l(oe, Y, r, s, m);
                    }
                  }
                  return G ? (m || (m = new Pt()), fp(e, t, r, s, l, m)) : !1;
                }
                function jm(e) {
                  return ke(e) && Je(e) == te;
                }
                function Ds(e, t, r, s) {
                  var l = r.length,
                    m = l,
                    E = !s;
                  if (e == null) return !m;
                  for (e = be(e); l--; ) {
                    var A = r[l];
                    if (E && A[2] ? A[1] !== e[A[0]] : !(A[0] in e)) return !1;
                  }
                  for (; ++l < m; ) {
                    A = r[l];
                    var F = A[0],
                      P = e[F],
                      M = A[1];
                    if (E && A[2]) {
                      if (P === i && !(F in e)) return !1;
                    } else {
                      var U = new Pt();
                      if (s) var G = s(P, M, F, e, t, U);
                      if (!(G === i ? Ir(M, P, D | I, s, U) : G)) return !1;
                    }
                  }
                  return !0;
                }
                function _u(e) {
                  if (!Ne(e) || Ep(e)) return !1;
                  var t = on(e) ? jd : If;
                  return t.test(Un(e));
                }
                function Dm(e) {
                  return ke(e) && Ze(e) == Ot;
                }
                function Gm(e) {
                  return ke(e) && Je(e) == at;
                }
                function Wm(e) {
                  return ke(e) && Pi(e.length) && !!Re[Ze(e)];
                }
                function yu(e) {
                  return typeof e == "function"
                    ? e
                    : e == null
                      ? ot
                      : typeof e == "object"
                        ? re(e)
                          ? Eu(e[0], e[1])
                          : vu(e)
                        : Dc(e);
                }
                function Gs(e) {
                  if (!Lr(e)) return zd(e);
                  var t = [];
                  for (var r in be(e))
                    Ee.call(e, r) && r != "constructor" && t.push(r);
                  return t;
                }
                function qm(e) {
                  if (!Ne(e)) return Sp(e);
                  var t = Lr(e),
                    r = [];
                  for (var s in e)
                    (s == "constructor" && (t || !Ee.call(e, s))) || r.push(s);
                  return r;
                }
                function Ws(e, t) {
                  return e < t;
                }
                function xu(e, t) {
                  var r = -1,
                    s = it(e) ? N(e.length) : [];
                  return (
                    gn(e, function (l, m, E) {
                      s[++r] = t(l, m, E);
                    }),
                    s
                  );
                }
                function vu(e) {
                  var t = ro(e);
                  return t.length == 1 && t[0][2]
                    ? ec(t[0][0], t[0][1])
                    : function (r) {
                        return r === e || Ds(r, e, t);
                      };
                }
                function Eu(e, t) {
                  return so(e) && Qu(t)
                    ? ec(Vt(e), t)
                    : function (r) {
                        var s = go(r, e);
                        return s === i && s === t ? _o(r, e) : Ir(t, s, D | I);
                      };
                }
                function vi(e, t, r, s, l) {
                  e !== t &&
                    Ps(
                      t,
                      function (m, E) {
                        if ((l || (l = new Pt()), Ne(m)))
                          Hm(e, t, E, r, vi, s, l);
                        else {
                          var A = s ? s(ao(e, E), m, E + "", e, t, l) : i;
                          A === i && (A = m), Os(e, E, A);
                        }
                      },
                      st,
                    );
                }
                function Hm(e, t, r, s, l, m, E) {
                  var A = ao(e, r),
                    F = ao(t, r),
                    P = E.get(F);
                  if (P) {
                    Os(e, r, P);
                    return;
                  }
                  var M = m ? m(A, F, r + "", e, t, E) : i,
                    U = M === i;
                  if (U) {
                    var G = re(F),
                      q = !G && vn(F),
                      J = !G && !q && or(F);
                    (M = F),
                      G || q || J
                        ? re(A)
                          ? (M = A)
                          : Me(A)
                            ? (M = rt(A))
                            : q
                              ? ((U = !1), (M = Nu(F, !0)))
                              : J
                                ? ((U = !1), (M = Ou(F, !0)))
                                : (M = [])
                        : Or(F) || jn(F)
                          ? ((M = A),
                            jn(A)
                              ? (M = Fc(A))
                              : (!Ne(A) || on(A)) && (M = Zu(F)))
                          : (U = !1);
                  }
                  U && (E.set(F, M), l(M, F, s, m, E), E.delete(F)),
                    Os(e, r, M);
                }
                function wu(e, t) {
                  var r = e.length;
                  if (r) return (t += t < 0 ? r : 0), sn(t, r) ? e[t] : i;
                }
                function bu(e, t, r) {
                  t.length
                    ? (t = Be(t, function (m) {
                        return re(m)
                          ? function (E) {
                              return Pn(E, m.length === 1 ? m[0] : m);
                            }
                          : m;
                      }))
                    : (t = [ot]);
                  var s = -1;
                  t = Be(t, ct(V()));
                  var l = xu(e, function (m, E, A) {
                    var F = Be(t, function (P) {
                      return P(m);
                    });
                    return { criteria: F, index: ++s, value: m };
                  });
                  return _d(l, function (m, E) {
                    return rp(m, E, r);
                  });
                }
                function zm(e, t) {
                  return Au(e, t, function (r, s) {
                    return _o(e, s);
                  });
                }
                function Au(e, t, r) {
                  for (var s = -1, l = t.length, m = {}; ++s < l; ) {
                    var E = t[s],
                      A = Pn(e, E);
                    r(A, E) && Fr(m, yn(E, e), A);
                  }
                  return m;
                }
                function Km(e) {
                  return function (t) {
                    return Pn(t, e);
                  };
                }
                function qs(e, t, r, s) {
                  var l = s ? gd : Yn,
                    m = -1,
                    E = t.length,
                    A = e;
                  for (
                    e === t && (t = rt(t)), r && (A = Be(e, ct(r)));
                    ++m < E;

                  )
                    for (
                      var F = 0, P = t[m], M = r ? r(P) : P;
                      (F = l(A, M, F, s)) > -1;

                    )
                      A !== e && li.call(A, F, 1), li.call(e, F, 1);
                  return e;
                }
                function Su(e, t) {
                  for (var r = e ? t.length : 0, s = r - 1; r--; ) {
                    var l = t[r];
                    if (r == s || l !== m) {
                      var m = l;
                      sn(l) ? li.call(e, l, 1) : Vs(e, l);
                    }
                  }
                  return e;
                }
                function Hs(e, t) {
                  return e + di(su() * (t - e + 1));
                }
                function Vm(e, t, r, s) {
                  for (
                    var l = -1, m = We(fi((t - e) / (r || 1)), 0), E = N(m);
                    m--;

                  )
                    (E[s ? m : ++l] = e), (e += r);
                  return E;
                }
                function zs(e, t) {
                  var r = "";
                  if (!e || t < 1 || t > xt) return r;
                  do t % 2 && (r += e), (t = di(t / 2)), t && (e += e);
                  while (t);
                  return r;
                }
                function ue(e, t) {
                  return uo(tc(e, t, ot), e + "");
                }
                function Jm(e) {
                  return uu(ar(e));
                }
                function Ym(e, t) {
                  var r = ar(e);
                  return Fi(r, kn(t, 0, r.length));
                }
                function Fr(e, t, r, s) {
                  if (!Ne(e)) return e;
                  t = yn(t, e);
                  for (
                    var l = -1, m = t.length, E = m - 1, A = e;
                    A != null && ++l < m;

                  ) {
                    var F = Vt(t[l]),
                      P = r;
                    if (
                      F === "__proto__" ||
                      F === "constructor" ||
                      F === "prototype"
                    )
                      return e;
                    if (l != E) {
                      var M = A[F];
                      (P = s ? s(M, F, A) : i),
                        P === i && (P = Ne(M) ? M : sn(t[l + 1]) ? [] : {});
                    }
                    Cr(A, F, P), (A = A[F]);
                  }
                  return e;
                }
                var Cu = mi
                    ? function (e, t) {
                        return mi.set(e, t), e;
                      }
                    : ot,
                  Xm = hi
                    ? function (e, t) {
                        return hi(e, "toString", {
                          configurable: !0,
                          enumerable: !1,
                          value: xo(t),
                          writable: !0,
                        });
                      }
                    : ot;
                function $m(e) {
                  return Fi(ar(e));
                }
                function St(e, t, r) {
                  var s = -1,
                    l = e.length;
                  t < 0 && (t = -t > l ? 0 : l + t),
                    (r = r > l ? l : r),
                    r < 0 && (r += l),
                    (l = t > r ? 0 : (r - t) >>> 0),
                    (t >>>= 0);
                  for (var m = N(l); ++s < l; ) m[s] = e[s + t];
                  return m;
                }
                function Zm(e, t) {
                  var r;
                  return (
                    gn(e, function (s, l, m) {
                      return (r = t(s, l, m)), !r;
                    }),
                    !!r
                  );
                }
                function Ei(e, t, r) {
                  var s = 0,
                    l = e == null ? s : e.length;
                  if (typeof t == "number" && t === t && l <= Kn) {
                    for (; s < l; ) {
                      var m = (s + l) >>> 1,
                        E = e[m];
                      E !== null && !ht(E) && (r ? E <= t : E < t)
                        ? (s = m + 1)
                        : (l = m);
                    }
                    return l;
                  }
                  return Ks(e, t, ot, r);
                }
                function Ks(e, t, r, s) {
                  var l = 0,
                    m = e == null ? 0 : e.length;
                  if (m === 0) return 0;
                  t = r(t);
                  for (
                    var E = t !== t, A = t === null, F = ht(t), P = t === i;
                    l < m;

                  ) {
                    var M = di((l + m) / 2),
                      U = r(e[M]),
                      G = U !== i,
                      q = U === null,
                      J = U === U,
                      oe = ht(U);
                    if (E) var Y = s || J;
                    else
                      P
                        ? (Y = J && (s || G))
                        : A
                          ? (Y = J && G && (s || !q))
                          : F
                            ? (Y = J && G && !q && (s || !oe))
                            : q || oe
                              ? (Y = !1)
                              : (Y = s ? U <= t : U < t);
                    Y ? (l = M + 1) : (m = M);
                  }
                  return Ve(m, _r);
                }
                function Ru(e, t) {
                  for (var r = -1, s = e.length, l = 0, m = []; ++r < s; ) {
                    var E = e[r],
                      A = t ? t(E) : E;
                    if (!r || !Mt(A, F)) {
                      var F = A;
                      m[l++] = E === 0 ? 0 : E;
                    }
                  }
                  return m;
                }
                function Tu(e) {
                  return typeof e == "number" ? e : ht(e) ? Xt : +e;
                }
                function lt(e) {
                  if (typeof e == "string") return e;
                  if (re(e)) return Be(e, lt) + "";
                  if (ht(e)) return ou ? ou.call(e) : "";
                  var t = e + "";
                  return t == "0" && 1 / e == -1 / 0 ? "-0" : t;
                }
                function _n(e, t, r) {
                  var s = -1,
                    l = ei,
                    m = e.length,
                    E = !0,
                    A = [],
                    F = A;
                  if (r) (E = !1), (l = Es);
                  else if (m >= d) {
                    var P = t ? null : cp(e);
                    if (P) return ni(P);
                    (E = !1), (l = vr), (F = new On());
                  } else F = t ? [] : A;
                  e: for (; ++s < m; ) {
                    var M = e[s],
                      U = t ? t(M) : M;
                    if (((M = r || M !== 0 ? M : 0), E && U === U)) {
                      for (var G = F.length; G--; ) if (F[G] === U) continue e;
                      t && F.push(U), A.push(M);
                    } else l(F, U, r) || (F !== A && F.push(U), A.push(M));
                  }
                  return A;
                }
                function Vs(e, t) {
                  return (
                    (t = yn(t, e)),
                    (e = nc(e, t)),
                    e == null || delete e[Vt(Ct(t))]
                  );
                }
                function Iu(e, t, r, s) {
                  return Fr(e, t, r(Pn(e, t)), s);
                }
                function wi(e, t, r, s) {
                  for (
                    var l = e.length, m = s ? l : -1;
                    (s ? m-- : ++m < l) && t(e[m], m, e);

                  );
                  return r
                    ? St(e, s ? 0 : m, s ? m + 1 : l)
                    : St(e, s ? m + 1 : 0, s ? l : m);
                }
                function Fu(e, t) {
                  var r = e;
                  return (
                    r instanceof le && (r = r.value()),
                    ws(
                      t,
                      function (s, l) {
                        return l.func.apply(l.thisArg, dn([s], l.args));
                      },
                      r,
                    )
                  );
                }
                function Js(e, t, r) {
                  var s = e.length;
                  if (s < 2) return s ? _n(e[0]) : [];
                  for (var l = -1, m = N(s); ++l < s; )
                    for (var E = e[l], A = -1; ++A < s; )
                      A != l && (m[l] = Rr(m[l] || E, e[A], t, r));
                  return _n(ze(m, 1), t, r);
                }
                function Bu(e, t, r) {
                  for (
                    var s = -1, l = e.length, m = t.length, E = {};
                    ++s < l;

                  ) {
                    var A = s < m ? t[s] : i;
                    r(E, e[s], A);
                  }
                  return E;
                }
                function Ys(e) {
                  return Me(e) ? e : [];
                }
                function Xs(e) {
                  return typeof e == "function" ? e : ot;
                }
                function yn(e, t) {
                  return re(e) ? e : so(e, t) ? [e] : oc(_e(e));
                }
                var Qm = ue;
                function xn(e, t, r) {
                  var s = e.length;
                  return (r = r === i ? s : r), !t && r >= s ? e : St(e, t, r);
                }
                var Lu =
                  Dd ||
                  function (e) {
                    return He.clearTimeout(e);
                  };
                function Nu(e, t) {
                  if (t) return e.slice();
                  var r = e.length,
                    s = eu ? eu(r) : new e.constructor(r);
                  return e.copy(s), s;
                }
                function $s(e) {
                  var t = new e.constructor(e.byteLength);
                  return new ui(t).set(new ui(e)), t;
                }
                function ep(e, t) {
                  var r = t ? $s(e.buffer) : e.buffer;
                  return new e.constructor(r, e.byteOffset, e.byteLength);
                }
                function tp(e) {
                  var t = new e.constructor(e.source, ga.exec(e));
                  return (t.lastIndex = e.lastIndex), t;
                }
                function np(e) {
                  return Sr ? be(Sr.call(e)) : {};
                }
                function Ou(e, t) {
                  var r = t ? $s(e.buffer) : e.buffer;
                  return new e.constructor(r, e.byteOffset, e.length);
                }
                function ku(e, t) {
                  if (e !== t) {
                    var r = e !== i,
                      s = e === null,
                      l = e === e,
                      m = ht(e),
                      E = t !== i,
                      A = t === null,
                      F = t === t,
                      P = ht(t);
                    if (
                      (!A && !P && !m && e > t) ||
                      (m && E && F && !A && !P) ||
                      (s && E && F) ||
                      (!r && F) ||
                      !l
                    )
                      return 1;
                    if (
                      (!s && !m && !P && e < t) ||
                      (P && r && l && !s && !m) ||
                      (A && r && l) ||
                      (!E && l) ||
                      !F
                    )
                      return -1;
                  }
                  return 0;
                }
                function rp(e, t, r) {
                  for (
                    var s = -1,
                      l = e.criteria,
                      m = t.criteria,
                      E = l.length,
                      A = r.length;
                    ++s < E;

                  ) {
                    var F = ku(l[s], m[s]);
                    if (F) {
                      if (s >= A) return F;
                      var P = r[s];
                      return F * (P == "desc" ? -1 : 1);
                    }
                  }
                  return e.index - t.index;
                }
                function Pu(e, t, r, s) {
                  for (
                    var l = -1,
                      m = e.length,
                      E = r.length,
                      A = -1,
                      F = t.length,
                      P = We(m - E, 0),
                      M = N(F + P),
                      U = !s;
                    ++A < F;

                  )
                    M[A] = t[A];
                  for (; ++l < E; ) (U || l < m) && (M[r[l]] = e[l]);
                  for (; P--; ) M[A++] = e[l++];
                  return M;
                }
                function Mu(e, t, r, s) {
                  for (
                    var l = -1,
                      m = e.length,
                      E = -1,
                      A = r.length,
                      F = -1,
                      P = t.length,
                      M = We(m - A, 0),
                      U = N(M + P),
                      G = !s;
                    ++l < M;

                  )
                    U[l] = e[l];
                  for (var q = l; ++F < P; ) U[q + F] = t[F];
                  for (; ++E < A; ) (G || l < m) && (U[q + r[E]] = e[l++]);
                  return U;
                }
                function rt(e, t) {
                  var r = -1,
                    s = e.length;
                  for (t || (t = N(s)); ++r < s; ) t[r] = e[r];
                  return t;
                }
                function Kt(e, t, r, s) {
                  var l = !r;
                  r || (r = {});
                  for (var m = -1, E = t.length; ++m < E; ) {
                    var A = t[m],
                      F = s ? s(r[A], e[A], A, r, e) : i;
                    F === i && (F = e[A]), l ? tn(r, A, F) : Cr(r, A, F);
                  }
                  return r;
                }
                function ip(e, t) {
                  return Kt(e, io(e), t);
                }
                function sp(e, t) {
                  return Kt(e, Xu(e), t);
                }
                function bi(e, t) {
                  return function (r, s) {
                    var l = re(r) ? ld : Rm,
                      m = t ? t() : {};
                    return l(r, e, V(s, 2), m);
                  };
                }
                function rr(e) {
                  return ue(function (t, r) {
                    var s = -1,
                      l = r.length,
                      m = l > 1 ? r[l - 1] : i,
                      E = l > 2 ? r[2] : i;
                    for (
                      m = e.length > 3 && typeof m == "function" ? (l--, m) : i,
                        E &&
                          Qe(r[0], r[1], E) &&
                          ((m = l < 3 ? i : m), (l = 1)),
                        t = be(t);
                      ++s < l;

                    ) {
                      var A = r[s];
                      A && e(t, A, s, m);
                    }
                    return t;
                  });
                }
                function Uu(e, t) {
                  return function (r, s) {
                    if (r == null) return r;
                    if (!it(r)) return e(r, s);
                    for (
                      var l = r.length, m = t ? l : -1, E = be(r);
                      (t ? m-- : ++m < l) && s(E[m], m, E) !== !1;

                    );
                    return r;
                  };
                }
                function ju(e) {
                  return function (t, r, s) {
                    for (var l = -1, m = be(t), E = s(t), A = E.length; A--; ) {
                      var F = E[e ? A : ++l];
                      if (r(m[F], F, m) === !1) break;
                    }
                    return t;
                  };
                }
                function op(e, t, r) {
                  var s = t & j,
                    l = Br(e);
                  function m() {
                    var E = this && this !== He && this instanceof m ? l : e;
                    return E.apply(s ? r : this, arguments);
                  }
                  return m;
                }
                function Du(e) {
                  return function (t) {
                    t = _e(t);
                    var r = Xn(t) ? kt(t) : i,
                      s = r ? r[0] : t.charAt(0),
                      l = r ? xn(r, 1).join("") : t.slice(1);
                    return s[e]() + l;
                  };
                }
                function ir(e) {
                  return function (t) {
                    return ws(Uc(Mc(t).replace(Xf, "")), e, "");
                  };
                }
                function Br(e) {
                  return function () {
                    var t = arguments;
                    switch (t.length) {
                      case 0:
                        return new e();
                      case 1:
                        return new e(t[0]);
                      case 2:
                        return new e(t[0], t[1]);
                      case 3:
                        return new e(t[0], t[1], t[2]);
                      case 4:
                        return new e(t[0], t[1], t[2], t[3]);
                      case 5:
                        return new e(t[0], t[1], t[2], t[3], t[4]);
                      case 6:
                        return new e(t[0], t[1], t[2], t[3], t[4], t[5]);
                      case 7:
                        return new e(t[0], t[1], t[2], t[3], t[4], t[5], t[6]);
                    }
                    var r = nr(e.prototype),
                      s = e.apply(r, t);
                    return Ne(s) ? s : r;
                  };
                }
                function ap(e, t, r) {
                  var s = Br(e);
                  function l() {
                    for (
                      var m = arguments.length, E = N(m), A = m, F = sr(l);
                      A--;

                    )
                      E[A] = arguments[A];
                    var P =
                      m < 3 && E[0] !== F && E[m - 1] !== F ? [] : mn(E, F);
                    if (((m -= P.length), m < r))
                      return zu(e, t, Ai, l.placeholder, i, E, P, i, i, r - m);
                    var M = this && this !== He && this instanceof l ? s : e;
                    return ut(M, this, E);
                  }
                  return l;
                }
                function Gu(e) {
                  return function (t, r, s) {
                    var l = be(t);
                    if (!it(t)) {
                      var m = V(r, 3);
                      (t = qe(t)),
                        (r = function (A) {
                          return m(l[A], A, l);
                        });
                    }
                    var E = e(t, r, s);
                    return E > -1 ? l[m ? t[E] : E] : i;
                  };
                }
                function Wu(e) {
                  return rn(function (t) {
                    var r = t.length,
                      s = r,
                      l = bt.prototype.thru;
                    for (e && t.reverse(); s--; ) {
                      var m = t[s];
                      if (typeof m != "function") throw new wt(x);
                      if (l && !E && Ti(m) == "wrapper") var E = new bt([], !0);
                    }
                    for (s = E ? s : r; ++s < r; ) {
                      m = t[s];
                      var A = Ti(m),
                        F = A == "wrapper" ? no(m) : i;
                      F &&
                      oo(F[0]) &&
                      F[1] == (H | K | Z | ee) &&
                      !F[4].length &&
                      F[9] == 1
                        ? (E = E[Ti(F[0])].apply(E, F[3]))
                        : (E = m.length == 1 && oo(m) ? E[A]() : E.thru(m));
                    }
                    return function () {
                      var P = arguments,
                        M = P[0];
                      if (E && P.length == 1 && re(M))
                        return E.plant(M).value();
                      for (
                        var U = 0, G = r ? t[U].apply(this, P) : M;
                        ++U < r;

                      )
                        G = t[U].call(this, G);
                      return G;
                    };
                  });
                }
                function Ai(e, t, r, s, l, m, E, A, F, P) {
                  var M = t & H,
                    U = t & j,
                    G = t & X,
                    q = t & (K | $),
                    J = t & Pe,
                    oe = G ? i : Br(e);
                  function Y() {
                    for (var ce = arguments.length, de = N(ce), ft = ce; ft--; )
                      de[ft] = arguments[ft];
                    if (q)
                      var et = sr(Y),
                        dt = xd(de, et);
                    if (
                      (s && (de = Pu(de, s, l, q)),
                      m && (de = Mu(de, m, E, q)),
                      (ce -= dt),
                      q && ce < P)
                    ) {
                      var Ue = mn(de, et);
                      return zu(
                        e,
                        t,
                        Ai,
                        Y.placeholder,
                        r,
                        de,
                        Ue,
                        A,
                        F,
                        P - ce,
                      );
                    }
                    var Ut = U ? r : this,
                      un = G ? Ut[e] : e;
                    return (
                      (ce = de.length),
                      A ? (de = Rp(de, A)) : J && ce > 1 && de.reverse(),
                      M && F < ce && (de.length = F),
                      this &&
                        this !== He &&
                        this instanceof Y &&
                        (un = oe || Br(un)),
                      un.apply(Ut, de)
                    );
                  }
                  return Y;
                }
                function qu(e, t) {
                  return function (r, s) {
                    return km(r, e, t(s), {});
                  };
                }
                function Si(e, t) {
                  return function (r, s) {
                    var l;
                    if (r === i && s === i) return t;
                    if ((r !== i && (l = r), s !== i)) {
                      if (l === i) return s;
                      typeof r == "string" || typeof s == "string"
                        ? ((r = lt(r)), (s = lt(s)))
                        : ((r = Tu(r)), (s = Tu(s))),
                        (l = e(r, s));
                    }
                    return l;
                  };
                }
                function Zs(e) {
                  return rn(function (t) {
                    return (
                      (t = Be(t, ct(V()))),
                      ue(function (r) {
                        var s = this;
                        return e(t, function (l) {
                          return ut(l, s, r);
                        });
                      })
                    );
                  });
                }
                function Ci(e, t) {
                  t = t === i ? " " : lt(t);
                  var r = t.length;
                  if (r < 2) return r ? zs(t, e) : t;
                  var s = zs(t, fi(e / $n(t)));
                  return Xn(t) ? xn(kt(s), 0, e).join("") : s.slice(0, e);
                }
                function up(e, t, r, s) {
                  var l = t & j,
                    m = Br(e);
                  function E() {
                    for (
                      var A = -1,
                        F = arguments.length,
                        P = -1,
                        M = s.length,
                        U = N(M + F),
                        G = this && this !== He && this instanceof E ? m : e;
                      ++P < M;

                    )
                      U[P] = s[P];
                    for (; F--; ) U[P++] = arguments[++A];
                    return ut(G, l ? r : this, U);
                  }
                  return E;
                }
                function Hu(e) {
                  return function (t, r, s) {
                    return (
                      s && typeof s != "number" && Qe(t, r, s) && (r = s = i),
                      (t = an(t)),
                      r === i ? ((r = t), (t = 0)) : (r = an(r)),
                      (s = s === i ? (t < r ? 1 : -1) : an(s)),
                      Vm(t, r, s, e)
                    );
                  };
                }
                function Ri(e) {
                  return function (t, r) {
                    return (
                      (typeof t == "string" && typeof r == "string") ||
                        ((t = Rt(t)), (r = Rt(r))),
                      e(t, r)
                    );
                  };
                }
                function zu(e, t, r, s, l, m, E, A, F, P) {
                  var M = t & K,
                    U = M ? E : i,
                    G = M ? i : E,
                    q = M ? m : i,
                    J = M ? i : m;
                  (t |= M ? Z : fe), (t &= ~(M ? fe : Z)), t & ae || (t &= -4);
                  var oe = [e, t, l, q, U, J, G, A, F, P],
                    Y = r.apply(i, oe);
                  return oo(e) && rc(Y, oe), (Y.placeholder = s), ic(Y, e, t);
                }
                function Qs(e) {
                  var t = Ge[e];
                  return function (r, s) {
                    if (
                      ((r = Rt(r)),
                      (s = s == null ? 0 : Ve(se(s), 292)),
                      s && iu(r))
                    ) {
                      var l = (_e(r) + "e").split("e"),
                        m = t(l[0] + "e" + (+l[1] + s));
                      return (
                        (l = (_e(m) + "e").split("e")),
                        +(l[0] + "e" + (+l[1] - s))
                      );
                    }
                    return t(r);
                  };
                }
                var cp =
                  er && 1 / ni(new er([, -0]))[1] == Ye
                    ? function (e) {
                        return new er(e);
                      }
                    : wo;
                function Ku(e) {
                  return function (t) {
                    var r = Je(t);
                    return r == te ? Is(t) : r == at ? Cd(t) : yd(t, e(t));
                  };
                }
                function nn(e, t, r, s, l, m, E, A) {
                  var F = t & X;
                  if (!F && typeof e != "function") throw new wt(x);
                  var P = s ? s.length : 0;
                  if (
                    (P || ((t &= -97), (s = l = i)),
                    (E = E === i ? E : We(se(E), 0)),
                    (A = A === i ? A : se(A)),
                    (P -= l ? l.length : 0),
                    t & fe)
                  ) {
                    var M = s,
                      U = l;
                    s = l = i;
                  }
                  var G = F ? i : no(e),
                    q = [e, t, r, s, l, M, U, m, E, A];
                  if (
                    (G && Ap(q, G),
                    (e = q[0]),
                    (t = q[1]),
                    (r = q[2]),
                    (s = q[3]),
                    (l = q[4]),
                    (A = q[9] =
                      q[9] === i ? (F ? 0 : e.length) : We(q[9] - P, 0)),
                    !A && t & (K | $) && (t &= -25),
                    !t || t == j)
                  )
                    var J = op(e, t, r);
                  else
                    t == K || t == $
                      ? (J = ap(e, t, A))
                      : (t == Z || t == (j | Z)) && !l.length
                        ? (J = up(e, t, r, s))
                        : (J = Ai.apply(i, q));
                  var oe = G ? Cu : rc;
                  return ic(oe(J, q), e, t);
                }
                function Vu(e, t, r, s) {
                  return e === i || (Mt(e, Qn[r]) && !Ee.call(s, r)) ? t : e;
                }
                function Ju(e, t, r, s, l, m) {
                  return (
                    Ne(e) &&
                      Ne(t) &&
                      (m.set(t, e), vi(e, t, i, Ju, m), m.delete(t)),
                    e
                  );
                }
                function lp(e) {
                  return Or(e) ? i : e;
                }
                function Yu(e, t, r, s, l, m) {
                  var E = r & D,
                    A = e.length,
                    F = t.length;
                  if (A != F && !(E && F > A)) return !1;
                  var P = m.get(e),
                    M = m.get(t);
                  if (P && M) return P == t && M == e;
                  var U = -1,
                    G = !0,
                    q = r & I ? new On() : i;
                  for (m.set(e, t), m.set(t, e); ++U < A; ) {
                    var J = e[U],
                      oe = t[U];
                    if (s)
                      var Y = E ? s(oe, J, U, t, e, m) : s(J, oe, U, e, t, m);
                    if (Y !== i) {
                      if (Y) continue;
                      G = !1;
                      break;
                    }
                    if (q) {
                      if (
                        !bs(t, function (ce, de) {
                          if (!vr(q, de) && (J === ce || l(J, ce, r, s, m)))
                            return q.push(de);
                        })
                      ) {
                        G = !1;
                        break;
                      }
                    } else if (!(J === oe || l(J, oe, r, s, m))) {
                      G = !1;
                      break;
                    }
                  }
                  return m.delete(e), m.delete(t), G;
                }
                function hp(e, t, r, s, l, m, E) {
                  switch (r) {
                    case $e:
                      if (
                        e.byteLength != t.byteLength ||
                        e.byteOffset != t.byteOffset
                      )
                        return !1;
                      (e = e.buffer), (t = t.buffer);
                    case Fn:
                      return !(
                        e.byteLength != t.byteLength || !m(new ui(e), new ui(t))
                      );
                    case Bt:
                    case Lt:
                    case me:
                      return Mt(+e, +t);
                    case nt:
                      return e.name == t.name && e.message == t.message;
                    case Ot:
                    case Tn:
                      return e == t + "";
                    case te:
                      var A = Is;
                    case at:
                      var F = s & D;
                      if ((A || (A = ni), e.size != t.size && !F)) return !1;
                      var P = E.get(e);
                      if (P) return P == t;
                      (s |= I), E.set(e, t);
                      var M = Yu(A(e), A(t), s, l, m, E);
                      return E.delete(e), M;
                    case In:
                      if (Sr) return Sr.call(e) == Sr.call(t);
                  }
                  return !1;
                }
                function fp(e, t, r, s, l, m) {
                  var E = r & D,
                    A = eo(e),
                    F = A.length,
                    P = eo(t),
                    M = P.length;
                  if (F != M && !E) return !1;
                  for (var U = F; U--; ) {
                    var G = A[U];
                    if (!(E ? G in t : Ee.call(t, G))) return !1;
                  }
                  var q = m.get(e),
                    J = m.get(t);
                  if (q && J) return q == t && J == e;
                  var oe = !0;
                  m.set(e, t), m.set(t, e);
                  for (var Y = E; ++U < F; ) {
                    G = A[U];
                    var ce = e[G],
                      de = t[G];
                    if (s)
                      var ft = E
                        ? s(de, ce, G, t, e, m)
                        : s(ce, de, G, e, t, m);
                    if (!(ft === i ? ce === de || l(ce, de, r, s, m) : ft)) {
                      oe = !1;
                      break;
                    }
                    Y || (Y = G == "constructor");
                  }
                  if (oe && !Y) {
                    var et = e.constructor,
                      dt = t.constructor;
                    et != dt &&
                      "constructor" in e &&
                      "constructor" in t &&
                      !(
                        typeof et == "function" &&
                        et instanceof et &&
                        typeof dt == "function" &&
                        dt instanceof dt
                      ) &&
                      (oe = !1);
                  }
                  return m.delete(e), m.delete(t), oe;
                }
                function rn(e) {
                  return uo(tc(e, i, lc), e + "");
                }
                function eo(e) {
                  return pu(e, qe, io);
                }
                function to(e) {
                  return pu(e, st, Xu);
                }
                var no = mi
                  ? function (e) {
                      return mi.get(e);
                    }
                  : wo;
                function Ti(e) {
                  for (
                    var t = e.name + "",
                      r = tr[t],
                      s = Ee.call(tr, t) ? r.length : 0;
                    s--;

                  ) {
                    var l = r[s],
                      m = l.func;
                    if (m == null || m == e) return l.name;
                  }
                  return t;
                }
                function sr(e) {
                  var t = Ee.call(f, "placeholder") ? f : e;
                  return t.placeholder;
                }
                function V() {
                  var e = f.iteratee || vo;
                  return (
                    (e = e === vo ? yu : e),
                    arguments.length ? e(arguments[0], arguments[1]) : e
                  );
                }
                function Ii(e, t) {
                  var r = e.__data__;
                  return vp(t)
                    ? r[typeof t == "string" ? "string" : "hash"]
                    : r.map;
                }
                function ro(e) {
                  for (var t = qe(e), r = t.length; r--; ) {
                    var s = t[r],
                      l = e[s];
                    t[r] = [s, l, Qu(l)];
                  }
                  return t;
                }
                function Mn(e, t) {
                  var r = bd(e, t);
                  return _u(r) ? r : i;
                }
                function dp(e) {
                  var t = Ee.call(e, Ln),
                    r = e[Ln];
                  try {
                    e[Ln] = i;
                    var s = !0;
                  } catch {}
                  var l = oi.call(e);
                  return s && (t ? (e[Ln] = r) : delete e[Ln]), l;
                }
                var io = Bs
                    ? function (e) {
                        return e == null
                          ? []
                          : ((e = be(e)),
                            fn(Bs(e), function (t) {
                              return nu.call(e, t);
                            }));
                      }
                    : bo,
                  Xu = Bs
                    ? function (e) {
                        for (var t = []; e; ) dn(t, io(e)), (e = ci(e));
                        return t;
                      }
                    : bo,
                  Je = Ze;
                ((Ls && Je(new Ls(new ArrayBuffer(1))) != $e) ||
                  (wr && Je(new wr()) != te) ||
                  (Ns && Je(Ns.resolve()) != Zt) ||
                  (er && Je(new er()) != at) ||
                  (br && Je(new br()) != Ke)) &&
                  (Je = function (e) {
                    var t = Ze(e),
                      r = t == ve ? e.constructor : i,
                      s = r ? Un(r) : "";
                    if (s)
                      switch (s) {
                        case Yd:
                          return $e;
                        case Xd:
                          return te;
                        case $d:
                          return Zt;
                        case Zd:
                          return at;
                        case Qd:
                          return Ke;
                      }
                    return t;
                  });
                function mp(e, t, r) {
                  for (var s = -1, l = r.length; ++s < l; ) {
                    var m = r[s],
                      E = m.size;
                    switch (m.type) {
                      case "drop":
                        e += E;
                        break;
                      case "dropRight":
                        t -= E;
                        break;
                      case "take":
                        t = Ve(t, e + E);
                        break;
                      case "takeRight":
                        e = We(e, t - E);
                        break;
                    }
                  }
                  return { start: e, end: t };
                }
                function pp(e) {
                  var t = e.match(Ef);
                  return t ? t[1].split(wf) : [];
                }
                function $u(e, t, r) {
                  t = yn(t, e);
                  for (var s = -1, l = t.length, m = !1; ++s < l; ) {
                    var E = Vt(t[s]);
                    if (!(m = e != null && r(e, E))) break;
                    e = e[E];
                  }
                  return m || ++s != l
                    ? m
                    : ((l = e == null ? 0 : e.length),
                      !!l && Pi(l) && sn(E, l) && (re(e) || jn(e)));
                }
                function gp(e) {
                  var t = e.length,
                    r = new e.constructor(t);
                  return (
                    t &&
                      typeof e[0] == "string" &&
                      Ee.call(e, "index") &&
                      ((r.index = e.index), (r.input = e.input)),
                    r
                  );
                }
                function Zu(e) {
                  return typeof e.constructor == "function" && !Lr(e)
                    ? nr(ci(e))
                    : {};
                }
                function _p(e, t, r) {
                  var s = e.constructor;
                  switch (t) {
                    case Fn:
                      return $s(e);
                    case Bt:
                    case Lt:
                      return new s(+e);
                    case $e:
                      return ep(e, r);
                    case xr:
                    case h:
                    case a:
                    case c:
                    case y:
                    case S:
                    case L:
                    case k:
                    case ie:
                      return Ou(e, r);
                    case te:
                      return new s();
                    case me:
                    case Tn:
                      return new s(e);
                    case Ot:
                      return tp(e);
                    case at:
                      return new s();
                    case In:
                      return np(e);
                  }
                }
                function yp(e, t) {
                  var r = t.length;
                  if (!r) return e;
                  var s = r - 1;
                  return (
                    (t[s] = (r > 1 ? "& " : "") + t[s]),
                    (t = t.join(r > 2 ? ", " : " ")),
                    e.replace(
                      vf,
                      `{
/* [wrapped with ` +
                        t +
                        `] */
`,
                    )
                  );
                }
                function xp(e) {
                  return re(e) || jn(e) || !!(ru && e && e[ru]);
                }
                function sn(e, t) {
                  var r = typeof e;
                  return (
                    (t = t ?? xt),
                    !!t &&
                      (r == "number" || (r != "symbol" && Bf.test(e))) &&
                      e > -1 &&
                      e % 1 == 0 &&
                      e < t
                  );
                }
                function Qe(e, t, r) {
                  if (!Ne(r)) return !1;
                  var s = typeof t;
                  return (
                    s == "number"
                      ? it(r) && sn(t, r.length)
                      : s == "string" && t in r
                  )
                    ? Mt(r[t], e)
                    : !1;
                }
                function so(e, t) {
                  if (re(e)) return !1;
                  var r = typeof e;
                  return r == "number" ||
                    r == "symbol" ||
                    r == "boolean" ||
                    e == null ||
                    ht(e)
                    ? !0
                    : gf.test(e) || !pf.test(e) || (t != null && e in be(t));
                }
                function vp(e) {
                  var t = typeof e;
                  return t == "string" ||
                    t == "number" ||
                    t == "symbol" ||
                    t == "boolean"
                    ? e !== "__proto__"
                    : e === null;
                }
                function oo(e) {
                  var t = Ti(e),
                    r = f[t];
                  if (typeof r != "function" || !(t in le.prototype)) return !1;
                  if (e === r) return !0;
                  var s = no(r);
                  return !!s && e === s[0];
                }
                function Ep(e) {
                  return !!Qa && Qa in e;
                }
                var wp = ii ? on : Ao;
                function Lr(e) {
                  var t = e && e.constructor,
                    r = (typeof t == "function" && t.prototype) || Qn;
                  return e === r;
                }
                function Qu(e) {
                  return e === e && !Ne(e);
                }
                function ec(e, t) {
                  return function (r) {
                    return r == null
                      ? !1
                      : r[e] === t && (t !== i || e in be(r));
                  };
                }
                function bp(e) {
                  var t = Oi(e, function (s) {
                      return r.size === p && r.clear(), s;
                    }),
                    r = t.cache;
                  return t;
                }
                function Ap(e, t) {
                  var r = e[1],
                    s = t[1],
                    l = r | s,
                    m = l < (j | X | H),
                    E =
                      (s == H && r == K) ||
                      (s == H && r == ee && e[7].length <= t[8]) ||
                      (s == (H | ee) && t[7].length <= t[8] && r == K);
                  if (!(m || E)) return e;
                  s & j && ((e[2] = t[2]), (l |= r & j ? 0 : ae));
                  var A = t[3];
                  if (A) {
                    var F = e[3];
                    (e[3] = F ? Pu(F, A, t[4]) : A),
                      (e[4] = F ? mn(e[3], _) : t[4]);
                  }
                  return (
                    (A = t[5]),
                    A &&
                      ((F = e[5]),
                      (e[5] = F ? Mu(F, A, t[6]) : A),
                      (e[6] = F ? mn(e[5], _) : t[6])),
                    (A = t[7]),
                    A && (e[7] = A),
                    s & H && (e[8] = e[8] == null ? t[8] : Ve(e[8], t[8])),
                    e[9] == null && (e[9] = t[9]),
                    (e[0] = t[0]),
                    (e[1] = l),
                    e
                  );
                }
                function Sp(e) {
                  var t = [];
                  if (e != null) for (var r in be(e)) t.push(r);
                  return t;
                }
                function Cp(e) {
                  return oi.call(e);
                }
                function tc(e, t, r) {
                  return (
                    (t = We(t === i ? e.length - 1 : t, 0)),
                    function () {
                      for (
                        var s = arguments,
                          l = -1,
                          m = We(s.length - t, 0),
                          E = N(m);
                        ++l < m;

                      )
                        E[l] = s[t + l];
                      l = -1;
                      for (var A = N(t + 1); ++l < t; ) A[l] = s[l];
                      return (A[t] = r(E)), ut(e, this, A);
                    }
                  );
                }
                function nc(e, t) {
                  return t.length < 2 ? e : Pn(e, St(t, 0, -1));
                }
                function Rp(e, t) {
                  for (
                    var r = e.length, s = Ve(t.length, r), l = rt(e);
                    s--;

                  ) {
                    var m = t[s];
                    e[s] = sn(m, r) ? l[m] : i;
                  }
                  return e;
                }
                function ao(e, t) {
                  if (
                    !(t === "constructor" && typeof e[t] == "function") &&
                    t != "__proto__"
                  )
                    return e[t];
                }
                var rc = sc(Cu),
                  Nr =
                    Wd ||
                    function (e, t) {
                      return He.setTimeout(e, t);
                    },
                  uo = sc(Xm);
                function ic(e, t, r) {
                  var s = t + "";
                  return uo(e, yp(s, Tp(pp(s), r)));
                }
                function sc(e) {
                  var t = 0,
                    r = 0;
                  return function () {
                    var s = Kd(),
                      l = An - (s - r);
                    if (((r = s), l > 0)) {
                      if (++t >= Le) return arguments[0];
                    } else t = 0;
                    return e.apply(i, arguments);
                  };
                }
                function Fi(e, t) {
                  var r = -1,
                    s = e.length,
                    l = s - 1;
                  for (t = t === i ? s : t; ++r < t; ) {
                    var m = Hs(r, l),
                      E = e[m];
                    (e[m] = e[r]), (e[r] = E);
                  }
                  return (e.length = t), e;
                }
                var oc = bp(function (e) {
                  var t = [];
                  return (
                    e.charCodeAt(0) === 46 && t.push(""),
                    e.replace(_f, function (r, s, l, m) {
                      t.push(l ? m.replace(Sf, "$1") : s || r);
                    }),
                    t
                  );
                });
                function Vt(e) {
                  if (typeof e == "string" || ht(e)) return e;
                  var t = e + "";
                  return t == "0" && 1 / e == -1 / 0 ? "-0" : t;
                }
                function Un(e) {
                  if (e != null) {
                    try {
                      return si.call(e);
                    } catch {}
                    try {
                      return e + "";
                    } catch {}
                  }
                  return "";
                }
                function Tp(e, t) {
                  return (
                    Et(Oe, function (r) {
                      var s = "_." + r[0];
                      t & r[1] && !ei(e, s) && e.push(s);
                    }),
                    e.sort()
                  );
                }
                function ac(e) {
                  if (e instanceof le) return e.clone();
                  var t = new bt(e.__wrapped__, e.__chain__);
                  return (
                    (t.__actions__ = rt(e.__actions__)),
                    (t.__index__ = e.__index__),
                    (t.__values__ = e.__values__),
                    t
                  );
                }
                function Ip(e, t, r) {
                  (r ? Qe(e, t, r) : t === i) ? (t = 1) : (t = We(se(t), 0));
                  var s = e == null ? 0 : e.length;
                  if (!s || t < 1) return [];
                  for (var l = 0, m = 0, E = N(fi(s / t)); l < s; )
                    E[m++] = St(e, l, (l += t));
                  return E;
                }
                function Fp(e) {
                  for (
                    var t = -1, r = e == null ? 0 : e.length, s = 0, l = [];
                    ++t < r;

                  ) {
                    var m = e[t];
                    m && (l[s++] = m);
                  }
                  return l;
                }
                function Bp() {
                  var e = arguments.length;
                  if (!e) return [];
                  for (var t = N(e - 1), r = arguments[0], s = e; s--; )
                    t[s - 1] = arguments[s];
                  return dn(re(r) ? rt(r) : [r], ze(t, 1));
                }
                var Lp = ue(function (e, t) {
                    return Me(e) ? Rr(e, ze(t, 1, Me, !0)) : [];
                  }),
                  Np = ue(function (e, t) {
                    var r = Ct(t);
                    return (
                      Me(r) && (r = i),
                      Me(e) ? Rr(e, ze(t, 1, Me, !0), V(r, 2)) : []
                    );
                  }),
                  Op = ue(function (e, t) {
                    var r = Ct(t);
                    return (
                      Me(r) && (r = i),
                      Me(e) ? Rr(e, ze(t, 1, Me, !0), i, r) : []
                    );
                  });
                function kp(e, t, r) {
                  var s = e == null ? 0 : e.length;
                  return s
                    ? ((t = r || t === i ? 1 : se(t)), St(e, t < 0 ? 0 : t, s))
                    : [];
                }
                function Pp(e, t, r) {
                  var s = e == null ? 0 : e.length;
                  return s
                    ? ((t = r || t === i ? 1 : se(t)),
                      (t = s - t),
                      St(e, 0, t < 0 ? 0 : t))
                    : [];
                }
                function Mp(e, t) {
                  return e && e.length ? wi(e, V(t, 3), !0, !0) : [];
                }
                function Up(e, t) {
                  return e && e.length ? wi(e, V(t, 3), !0) : [];
                }
                function jp(e, t, r, s) {
                  var l = e == null ? 0 : e.length;
                  return l
                    ? (r &&
                        typeof r != "number" &&
                        Qe(e, t, r) &&
                        ((r = 0), (s = l)),
                      Bm(e, t, r, s))
                    : [];
                }
                function uc(e, t, r) {
                  var s = e == null ? 0 : e.length;
                  if (!s) return -1;
                  var l = r == null ? 0 : se(r);
                  return l < 0 && (l = We(s + l, 0)), ti(e, V(t, 3), l);
                }
                function cc(e, t, r) {
                  var s = e == null ? 0 : e.length;
                  if (!s) return -1;
                  var l = s - 1;
                  return (
                    r !== i &&
                      ((l = se(r)), (l = r < 0 ? We(s + l, 0) : Ve(l, s - 1))),
                    ti(e, V(t, 3), l, !0)
                  );
                }
                function lc(e) {
                  var t = e == null ? 0 : e.length;
                  return t ? ze(e, 1) : [];
                }
                function Dp(e) {
                  var t = e == null ? 0 : e.length;
                  return t ? ze(e, Ye) : [];
                }
                function Gp(e, t) {
                  var r = e == null ? 0 : e.length;
                  return r ? ((t = t === i ? 1 : se(t)), ze(e, t)) : [];
                }
                function Wp(e) {
                  for (
                    var t = -1, r = e == null ? 0 : e.length, s = {};
                    ++t < r;

                  ) {
                    var l = e[t];
                    s[l[0]] = l[1];
                  }
                  return s;
                }
                function hc(e) {
                  return e && e.length ? e[0] : i;
                }
                function qp(e, t, r) {
                  var s = e == null ? 0 : e.length;
                  if (!s) return -1;
                  var l = r == null ? 0 : se(r);
                  return l < 0 && (l = We(s + l, 0)), Yn(e, t, l);
                }
                function Hp(e) {
                  var t = e == null ? 0 : e.length;
                  return t ? St(e, 0, -1) : [];
                }
                var zp = ue(function (e) {
                    var t = Be(e, Ys);
                    return t.length && t[0] === e[0] ? js(t) : [];
                  }),
                  Kp = ue(function (e) {
                    var t = Ct(e),
                      r = Be(e, Ys);
                    return (
                      t === Ct(r) ? (t = i) : r.pop(),
                      r.length && r[0] === e[0] ? js(r, V(t, 2)) : []
                    );
                  }),
                  Vp = ue(function (e) {
                    var t = Ct(e),
                      r = Be(e, Ys);
                    return (
                      (t = typeof t == "function" ? t : i),
                      t && r.pop(),
                      r.length && r[0] === e[0] ? js(r, i, t) : []
                    );
                  });
                function Jp(e, t) {
                  return e == null ? "" : Hd.call(e, t);
                }
                function Ct(e) {
                  var t = e == null ? 0 : e.length;
                  return t ? e[t - 1] : i;
                }
                function Yp(e, t, r) {
                  var s = e == null ? 0 : e.length;
                  if (!s) return -1;
                  var l = s;
                  return (
                    r !== i &&
                      ((l = se(r)), (l = l < 0 ? We(s + l, 0) : Ve(l, s - 1))),
                    t === t ? Td(e, t, l) : ti(e, za, l, !0)
                  );
                }
                function Xp(e, t) {
                  return e && e.length ? wu(e, se(t)) : i;
                }
                var $p = ue(fc);
                function fc(e, t) {
                  return e && e.length && t && t.length ? qs(e, t) : e;
                }
                function Zp(e, t, r) {
                  return e && e.length && t && t.length ? qs(e, t, V(r, 2)) : e;
                }
                function Qp(e, t, r) {
                  return e && e.length && t && t.length ? qs(e, t, i, r) : e;
                }
                var e0 = rn(function (e, t) {
                  var r = e == null ? 0 : e.length,
                    s = ks(e, t);
                  return (
                    Su(
                      e,
                      Be(t, function (l) {
                        return sn(l, r) ? +l : l;
                      }).sort(ku),
                    ),
                    s
                  );
                });
                function t0(e, t) {
                  var r = [];
                  if (!(e && e.length)) return r;
                  var s = -1,
                    l = [],
                    m = e.length;
                  for (t = V(t, 3); ++s < m; ) {
                    var E = e[s];
                    t(E, s, e) && (r.push(E), l.push(s));
                  }
                  return Su(e, l), r;
                }
                function co(e) {
                  return e == null ? e : Jd.call(e);
                }
                function n0(e, t, r) {
                  var s = e == null ? 0 : e.length;
                  return s
                    ? (r && typeof r != "number" && Qe(e, t, r)
                        ? ((t = 0), (r = s))
                        : ((t = t == null ? 0 : se(t)),
                          (r = r === i ? s : se(r))),
                      St(e, t, r))
                    : [];
                }
                function r0(e, t) {
                  return Ei(e, t);
                }
                function i0(e, t, r) {
                  return Ks(e, t, V(r, 2));
                }
                function s0(e, t) {
                  var r = e == null ? 0 : e.length;
                  if (r) {
                    var s = Ei(e, t);
                    if (s < r && Mt(e[s], t)) return s;
                  }
                  return -1;
                }
                function o0(e, t) {
                  return Ei(e, t, !0);
                }
                function a0(e, t, r) {
                  return Ks(e, t, V(r, 2), !0);
                }
                function u0(e, t) {
                  var r = e == null ? 0 : e.length;
                  if (r) {
                    var s = Ei(e, t, !0) - 1;
                    if (Mt(e[s], t)) return s;
                  }
                  return -1;
                }
                function c0(e) {
                  return e && e.length ? Ru(e) : [];
                }
                function l0(e, t) {
                  return e && e.length ? Ru(e, V(t, 2)) : [];
                }
                function h0(e) {
                  var t = e == null ? 0 : e.length;
                  return t ? St(e, 1, t) : [];
                }
                function f0(e, t, r) {
                  return e && e.length
                    ? ((t = r || t === i ? 1 : se(t)), St(e, 0, t < 0 ? 0 : t))
                    : [];
                }
                function d0(e, t, r) {
                  var s = e == null ? 0 : e.length;
                  return s
                    ? ((t = r || t === i ? 1 : se(t)),
                      (t = s - t),
                      St(e, t < 0 ? 0 : t, s))
                    : [];
                }
                function m0(e, t) {
                  return e && e.length ? wi(e, V(t, 3), !1, !0) : [];
                }
                function p0(e, t) {
                  return e && e.length ? wi(e, V(t, 3)) : [];
                }
                var g0 = ue(function (e) {
                    return _n(ze(e, 1, Me, !0));
                  }),
                  _0 = ue(function (e) {
                    var t = Ct(e);
                    return Me(t) && (t = i), _n(ze(e, 1, Me, !0), V(t, 2));
                  }),
                  y0 = ue(function (e) {
                    var t = Ct(e);
                    return (
                      (t = typeof t == "function" ? t : i),
                      _n(ze(e, 1, Me, !0), i, t)
                    );
                  });
                function x0(e) {
                  return e && e.length ? _n(e) : [];
                }
                function v0(e, t) {
                  return e && e.length ? _n(e, V(t, 2)) : [];
                }
                function E0(e, t) {
                  return (
                    (t = typeof t == "function" ? t : i),
                    e && e.length ? _n(e, i, t) : []
                  );
                }
                function lo(e) {
                  if (!(e && e.length)) return [];
                  var t = 0;
                  return (
                    (e = fn(e, function (r) {
                      if (Me(r)) return (t = We(r.length, t)), !0;
                    })),
                    Rs(t, function (r) {
                      return Be(e, As(r));
                    })
                  );
                }
                function dc(e, t) {
                  if (!(e && e.length)) return [];
                  var r = lo(e);
                  return t == null
                    ? r
                    : Be(r, function (s) {
                        return ut(t, i, s);
                      });
                }
                var w0 = ue(function (e, t) {
                    return Me(e) ? Rr(e, t) : [];
                  }),
                  b0 = ue(function (e) {
                    return Js(fn(e, Me));
                  }),
                  A0 = ue(function (e) {
                    var t = Ct(e);
                    return Me(t) && (t = i), Js(fn(e, Me), V(t, 2));
                  }),
                  S0 = ue(function (e) {
                    var t = Ct(e);
                    return (
                      (t = typeof t == "function" ? t : i), Js(fn(e, Me), i, t)
                    );
                  }),
                  C0 = ue(lo);
                function R0(e, t) {
                  return Bu(e || [], t || [], Cr);
                }
                function T0(e, t) {
                  return Bu(e || [], t || [], Fr);
                }
                var I0 = ue(function (e) {
                  var t = e.length,
                    r = t > 1 ? e[t - 1] : i;
                  return (
                    (r = typeof r == "function" ? (e.pop(), r) : i), dc(e, r)
                  );
                });
                function mc(e) {
                  var t = f(e);
                  return (t.__chain__ = !0), t;
                }
                function F0(e, t) {
                  return t(e), e;
                }
                function Bi(e, t) {
                  return t(e);
                }
                var B0 = rn(function (e) {
                  var t = e.length,
                    r = t ? e[0] : 0,
                    s = this.__wrapped__,
                    l = function (m) {
                      return ks(m, e);
                    };
                  return t > 1 ||
                    this.__actions__.length ||
                    !(s instanceof le) ||
                    !sn(r)
                    ? this.thru(l)
                    : ((s = s.slice(r, +r + (t ? 1 : 0))),
                      s.__actions__.push({ func: Bi, args: [l], thisArg: i }),
                      new bt(s, this.__chain__).thru(function (m) {
                        return t && !m.length && m.push(i), m;
                      }));
                });
                function L0() {
                  return mc(this);
                }
                function N0() {
                  return new bt(this.value(), this.__chain__);
                }
                function O0() {
                  this.__values__ === i && (this.__values__ = Tc(this.value()));
                  var e = this.__index__ >= this.__values__.length,
                    t = e ? i : this.__values__[this.__index__++];
                  return { done: e, value: t };
                }
                function k0() {
                  return this;
                }
                function P0(e) {
                  for (var t, r = this; r instanceof gi; ) {
                    var s = ac(r);
                    (s.__index__ = 0),
                      (s.__values__ = i),
                      t ? (l.__wrapped__ = s) : (t = s);
                    var l = s;
                    r = r.__wrapped__;
                  }
                  return (l.__wrapped__ = e), t;
                }
                function M0() {
                  var e = this.__wrapped__;
                  if (e instanceof le) {
                    var t = e;
                    return (
                      this.__actions__.length && (t = new le(this)),
                      (t = t.reverse()),
                      t.__actions__.push({ func: Bi, args: [co], thisArg: i }),
                      new bt(t, this.__chain__)
                    );
                  }
                  return this.thru(co);
                }
                function U0() {
                  return Fu(this.__wrapped__, this.__actions__);
                }
                var j0 = bi(function (e, t, r) {
                  Ee.call(e, r) ? ++e[r] : tn(e, r, 1);
                });
                function D0(e, t, r) {
                  var s = re(e) ? qa : Fm;
                  return r && Qe(e, t, r) && (t = i), s(e, V(t, 3));
                }
                function G0(e, t) {
                  var r = re(e) ? fn : du;
                  return r(e, V(t, 3));
                }
                var W0 = Gu(uc),
                  q0 = Gu(cc);
                function H0(e, t) {
                  return ze(Li(e, t), 1);
                }
                function z0(e, t) {
                  return ze(Li(e, t), Ye);
                }
                function K0(e, t, r) {
                  return (r = r === i ? 1 : se(r)), ze(Li(e, t), r);
                }
                function pc(e, t) {
                  var r = re(e) ? Et : gn;
                  return r(e, V(t, 3));
                }
                function gc(e, t) {
                  var r = re(e) ? hd : fu;
                  return r(e, V(t, 3));
                }
                var V0 = bi(function (e, t, r) {
                  Ee.call(e, r) ? e[r].push(t) : tn(e, r, [t]);
                });
                function J0(e, t, r, s) {
                  (e = it(e) ? e : ar(e)), (r = r && !s ? se(r) : 0);
                  var l = e.length;
                  return (
                    r < 0 && (r = We(l + r, 0)),
                    Mi(e)
                      ? r <= l && e.indexOf(t, r) > -1
                      : !!l && Yn(e, t, r) > -1
                  );
                }
                var Y0 = ue(function (e, t, r) {
                    var s = -1,
                      l = typeof t == "function",
                      m = it(e) ? N(e.length) : [];
                    return (
                      gn(e, function (E) {
                        m[++s] = l ? ut(t, E, r) : Tr(E, t, r);
                      }),
                      m
                    );
                  }),
                  X0 = bi(function (e, t, r) {
                    tn(e, r, t);
                  });
                function Li(e, t) {
                  var r = re(e) ? Be : xu;
                  return r(e, V(t, 3));
                }
                function $0(e, t, r, s) {
                  return e == null
                    ? []
                    : (re(t) || (t = t == null ? [] : [t]),
                      (r = s ? i : r),
                      re(r) || (r = r == null ? [] : [r]),
                      bu(e, t, r));
                }
                var Z0 = bi(
                  function (e, t, r) {
                    e[r ? 0 : 1].push(t);
                  },
                  function () {
                    return [[], []];
                  },
                );
                function Q0(e, t, r) {
                  var s = re(e) ? ws : Va,
                    l = arguments.length < 3;
                  return s(e, V(t, 4), r, l, gn);
                }
                function eg(e, t, r) {
                  var s = re(e) ? fd : Va,
                    l = arguments.length < 3;
                  return s(e, V(t, 4), r, l, fu);
                }
                function tg(e, t) {
                  var r = re(e) ? fn : du;
                  return r(e, ki(V(t, 3)));
                }
                function ng(e) {
                  var t = re(e) ? uu : Jm;
                  return t(e);
                }
                function rg(e, t, r) {
                  (r ? Qe(e, t, r) : t === i) ? (t = 1) : (t = se(t));
                  var s = re(e) ? Sm : Ym;
                  return s(e, t);
                }
                function ig(e) {
                  var t = re(e) ? Cm : $m;
                  return t(e);
                }
                function sg(e) {
                  if (e == null) return 0;
                  if (it(e)) return Mi(e) ? $n(e) : e.length;
                  var t = Je(e);
                  return t == te || t == at ? e.size : Gs(e).length;
                }
                function og(e, t, r) {
                  var s = re(e) ? bs : Zm;
                  return r && Qe(e, t, r) && (t = i), s(e, V(t, 3));
                }
                var ag = ue(function (e, t) {
                    if (e == null) return [];
                    var r = t.length;
                    return (
                      r > 1 && Qe(e, t[0], t[1])
                        ? (t = [])
                        : r > 2 && Qe(t[0], t[1], t[2]) && (t = [t[0]]),
                      bu(e, ze(t, 1), [])
                    );
                  }),
                  Ni =
                    Gd ||
                    function () {
                      return He.Date.now();
                    };
                function ug(e, t) {
                  if (typeof t != "function") throw new wt(x);
                  return (
                    (e = se(e)),
                    function () {
                      if (--e < 1) return t.apply(this, arguments);
                    }
                  );
                }
                function _c(e, t, r) {
                  return (
                    (t = r ? i : t),
                    (t = e && t == null ? e.length : t),
                    nn(e, H, i, i, i, i, t)
                  );
                }
                function yc(e, t) {
                  var r;
                  if (typeof t != "function") throw new wt(x);
                  return (
                    (e = se(e)),
                    function () {
                      return (
                        --e > 0 && (r = t.apply(this, arguments)),
                        e <= 1 && (t = i),
                        r
                      );
                    }
                  );
                }
                var ho = ue(function (e, t, r) {
                    var s = j;
                    if (r.length) {
                      var l = mn(r, sr(ho));
                      s |= Z;
                    }
                    return nn(e, s, t, r, l);
                  }),
                  xc = ue(function (e, t, r) {
                    var s = j | X;
                    if (r.length) {
                      var l = mn(r, sr(xc));
                      s |= Z;
                    }
                    return nn(t, s, e, r, l);
                  });
                function vc(e, t, r) {
                  t = r ? i : t;
                  var s = nn(e, K, i, i, i, i, i, t);
                  return (s.placeholder = vc.placeholder), s;
                }
                function Ec(e, t, r) {
                  t = r ? i : t;
                  var s = nn(e, $, i, i, i, i, i, t);
                  return (s.placeholder = Ec.placeholder), s;
                }
                function wc(e, t, r) {
                  var s,
                    l,
                    m,
                    E,
                    A,
                    F,
                    P = 0,
                    M = !1,
                    U = !1,
                    G = !0;
                  if (typeof e != "function") throw new wt(x);
                  (t = Rt(t) || 0),
                    Ne(r) &&
                      ((M = !!r.leading),
                      (U = "maxWait" in r),
                      (m = U ? We(Rt(r.maxWait) || 0, t) : m),
                      (G = "trailing" in r ? !!r.trailing : G));
                  function q(Ue) {
                    var Ut = s,
                      un = l;
                    return (s = l = i), (P = Ue), (E = e.apply(un, Ut)), E;
                  }
                  function J(Ue) {
                    return (P = Ue), (A = Nr(ce, t)), M ? q(Ue) : E;
                  }
                  function oe(Ue) {
                    var Ut = Ue - F,
                      un = Ue - P,
                      Gc = t - Ut;
                    return U ? Ve(Gc, m - un) : Gc;
                  }
                  function Y(Ue) {
                    var Ut = Ue - F,
                      un = Ue - P;
                    return F === i || Ut >= t || Ut < 0 || (U && un >= m);
                  }
                  function ce() {
                    var Ue = Ni();
                    if (Y(Ue)) return de(Ue);
                    A = Nr(ce, oe(Ue));
                  }
                  function de(Ue) {
                    return (A = i), G && s ? q(Ue) : ((s = l = i), E);
                  }
                  function ft() {
                    A !== i && Lu(A), (P = 0), (s = F = l = A = i);
                  }
                  function et() {
                    return A === i ? E : de(Ni());
                  }
                  function dt() {
                    var Ue = Ni(),
                      Ut = Y(Ue);
                    if (((s = arguments), (l = this), (F = Ue), Ut)) {
                      if (A === i) return J(F);
                      if (U) return Lu(A), (A = Nr(ce, t)), q(F);
                    }
                    return A === i && (A = Nr(ce, t)), E;
                  }
                  return (dt.cancel = ft), (dt.flush = et), dt;
                }
                var cg = ue(function (e, t) {
                    return hu(e, 1, t);
                  }),
                  lg = ue(function (e, t, r) {
                    return hu(e, Rt(t) || 0, r);
                  });
                function hg(e) {
                  return nn(e, Pe);
                }
                function Oi(e, t) {
                  if (
                    typeof e != "function" ||
                    (t != null && typeof t != "function")
                  )
                    throw new wt(x);
                  var r = function () {
                    var s = arguments,
                      l = t ? t.apply(this, s) : s[0],
                      m = r.cache;
                    if (m.has(l)) return m.get(l);
                    var E = e.apply(this, s);
                    return (r.cache = m.set(l, E) || m), E;
                  };
                  return (r.cache = new (Oi.Cache || en)()), r;
                }
                Oi.Cache = en;
                function ki(e) {
                  if (typeof e != "function") throw new wt(x);
                  return function () {
                    var t = arguments;
                    switch (t.length) {
                      case 0:
                        return !e.call(this);
                      case 1:
                        return !e.call(this, t[0]);
                      case 2:
                        return !e.call(this, t[0], t[1]);
                      case 3:
                        return !e.call(this, t[0], t[1], t[2]);
                    }
                    return !e.apply(this, t);
                  };
                }
                function fg(e) {
                  return yc(2, e);
                }
                var dg = Qm(function (e, t) {
                    t =
                      t.length == 1 && re(t[0])
                        ? Be(t[0], ct(V()))
                        : Be(ze(t, 1), ct(V()));
                    var r = t.length;
                    return ue(function (s) {
                      for (var l = -1, m = Ve(s.length, r); ++l < m; )
                        s[l] = t[l].call(this, s[l]);
                      return ut(e, this, s);
                    });
                  }),
                  fo = ue(function (e, t) {
                    var r = mn(t, sr(fo));
                    return nn(e, Z, i, t, r);
                  }),
                  bc = ue(function (e, t) {
                    var r = mn(t, sr(bc));
                    return nn(e, fe, i, t, r);
                  }),
                  mg = rn(function (e, t) {
                    return nn(e, ee, i, i, i, t);
                  });
                function pg(e, t) {
                  if (typeof e != "function") throw new wt(x);
                  return (t = t === i ? t : se(t)), ue(e, t);
                }
                function gg(e, t) {
                  if (typeof e != "function") throw new wt(x);
                  return (
                    (t = t == null ? 0 : We(se(t), 0)),
                    ue(function (r) {
                      var s = r[t],
                        l = xn(r, 0, t);
                      return s && dn(l, s), ut(e, this, l);
                    })
                  );
                }
                function _g(e, t, r) {
                  var s = !0,
                    l = !0;
                  if (typeof e != "function") throw new wt(x);
                  return (
                    Ne(r) &&
                      ((s = "leading" in r ? !!r.leading : s),
                      (l = "trailing" in r ? !!r.trailing : l)),
                    wc(e, t, { leading: s, maxWait: t, trailing: l })
                  );
                }
                function yg(e) {
                  return _c(e, 1);
                }
                function xg(e, t) {
                  return fo(Xs(t), e);
                }
                function vg() {
                  if (!arguments.length) return [];
                  var e = arguments[0];
                  return re(e) ? e : [e];
                }
                function Eg(e) {
                  return At(e, B);
                }
                function wg(e, t) {
                  return (t = typeof t == "function" ? t : i), At(e, B, t);
                }
                function bg(e) {
                  return At(e, T | B);
                }
                function Ag(e, t) {
                  return (t = typeof t == "function" ? t : i), At(e, T | B, t);
                }
                function Sg(e, t) {
                  return t == null || lu(e, t, qe(t));
                }
                function Mt(e, t) {
                  return e === t || (e !== e && t !== t);
                }
                var Cg = Ri(Us),
                  Rg = Ri(function (e, t) {
                    return e >= t;
                  }),
                  jn = gu(
                    (function () {
                      return arguments;
                    })(),
                  )
                    ? gu
                    : function (e) {
                        return (
                          ke(e) && Ee.call(e, "callee") && !nu.call(e, "callee")
                        );
                      },
                  re = N.isArray,
                  Tg = Ma ? ct(Ma) : Pm;
                function it(e) {
                  return e != null && Pi(e.length) && !on(e);
                }
                function Me(e) {
                  return ke(e) && it(e);
                }
                function Ig(e) {
                  return e === !0 || e === !1 || (ke(e) && Ze(e) == Bt);
                }
                var vn = qd || Ao,
                  Fg = Ua ? ct(Ua) : Mm;
                function Bg(e) {
                  return ke(e) && e.nodeType === 1 && !Or(e);
                }
                function Lg(e) {
                  if (e == null) return !0;
                  if (
                    it(e) &&
                    (re(e) ||
                      typeof e == "string" ||
                      typeof e.splice == "function" ||
                      vn(e) ||
                      or(e) ||
                      jn(e))
                  )
                    return !e.length;
                  var t = Je(e);
                  if (t == te || t == at) return !e.size;
                  if (Lr(e)) return !Gs(e).length;
                  for (var r in e) if (Ee.call(e, r)) return !1;
                  return !0;
                }
                function Ng(e, t) {
                  return Ir(e, t);
                }
                function Og(e, t, r) {
                  r = typeof r == "function" ? r : i;
                  var s = r ? r(e, t) : i;
                  return s === i ? Ir(e, t, i, r) : !!s;
                }
                function mo(e) {
                  if (!ke(e)) return !1;
                  var t = Ze(e);
                  return (
                    t == nt ||
                    t == Rn ||
                    (typeof e.message == "string" &&
                      typeof e.name == "string" &&
                      !Or(e))
                  );
                }
                function kg(e) {
                  return typeof e == "number" && iu(e);
                }
                function on(e) {
                  if (!Ne(e)) return !1;
                  var t = Ze(e);
                  return t == Nt || t == Q || t == Cn || t == hn;
                }
                function Ac(e) {
                  return typeof e == "number" && e == se(e);
                }
                function Pi(e) {
                  return (
                    typeof e == "number" && e > -1 && e % 1 == 0 && e <= xt
                  );
                }
                function Ne(e) {
                  var t = typeof e;
                  return e != null && (t == "object" || t == "function");
                }
                function ke(e) {
                  return e != null && typeof e == "object";
                }
                var Sc = ja ? ct(ja) : jm;
                function Pg(e, t) {
                  return e === t || Ds(e, t, ro(t));
                }
                function Mg(e, t, r) {
                  return (
                    (r = typeof r == "function" ? r : i), Ds(e, t, ro(t), r)
                  );
                }
                function Ug(e) {
                  return Cc(e) && e != +e;
                }
                function jg(e) {
                  if (wp(e)) throw new ne(w);
                  return _u(e);
                }
                function Dg(e) {
                  return e === null;
                }
                function Gg(e) {
                  return e == null;
                }
                function Cc(e) {
                  return typeof e == "number" || (ke(e) && Ze(e) == me);
                }
                function Or(e) {
                  if (!ke(e) || Ze(e) != ve) return !1;
                  var t = ci(e);
                  if (t === null) return !0;
                  var r = Ee.call(t, "constructor") && t.constructor;
                  return (
                    typeof r == "function" && r instanceof r && si.call(r) == Md
                  );
                }
                var po = Da ? ct(Da) : Dm;
                function Wg(e) {
                  return Ac(e) && e >= -9007199254740991 && e <= xt;
                }
                var Rc = Ga ? ct(Ga) : Gm;
                function Mi(e) {
                  return (
                    typeof e == "string" || (!re(e) && ke(e) && Ze(e) == Tn)
                  );
                }
                function ht(e) {
                  return typeof e == "symbol" || (ke(e) && Ze(e) == In);
                }
                var or = Wa ? ct(Wa) : Wm;
                function qg(e) {
                  return e === i;
                }
                function Hg(e) {
                  return ke(e) && Je(e) == Ke;
                }
                function zg(e) {
                  return ke(e) && Ze(e) == yr;
                }
                var Kg = Ri(Ws),
                  Vg = Ri(function (e, t) {
                    return e <= t;
                  });
                function Tc(e) {
                  if (!e) return [];
                  if (it(e)) return Mi(e) ? kt(e) : rt(e);
                  if (Er && e[Er]) return Sd(e[Er]());
                  var t = Je(e),
                    r = t == te ? Is : t == at ? ni : ar;
                  return r(e);
                }
                function an(e) {
                  if (!e) return e === 0 ? e : 0;
                  if (((e = Rt(e)), e === Ye || e === -1 / 0)) {
                    var t = e < 0 ? -1 : 1;
                    return t * gr;
                  }
                  return e === e ? e : 0;
                }
                function se(e) {
                  var t = an(e),
                    r = t % 1;
                  return t === t ? (r ? t - r : t) : 0;
                }
                function Ic(e) {
                  return e ? kn(se(e), 0, Xe) : 0;
                }
                function Rt(e) {
                  if (typeof e == "number") return e;
                  if (ht(e)) return Xt;
                  if (Ne(e)) {
                    var t = typeof e.valueOf == "function" ? e.valueOf() : e;
                    e = Ne(t) ? t + "" : t;
                  }
                  if (typeof e != "string") return e === 0 ? e : +e;
                  e = Ja(e);
                  var r = Tf.test(e);
                  return r || Ff.test(e)
                    ? ud(e.slice(2), r ? 2 : 8)
                    : Rf.test(e)
                      ? Xt
                      : +e;
                }
                function Fc(e) {
                  return Kt(e, st(e));
                }
                function Jg(e) {
                  return e ? kn(se(e), -9007199254740991, xt) : e === 0 ? e : 0;
                }
                function _e(e) {
                  return e == null ? "" : lt(e);
                }
                var Yg = rr(function (e, t) {
                    if (Lr(t) || it(t)) {
                      Kt(t, qe(t), e);
                      return;
                    }
                    for (var r in t) Ee.call(t, r) && Cr(e, r, t[r]);
                  }),
                  Bc = rr(function (e, t) {
                    Kt(t, st(t), e);
                  }),
                  Ui = rr(function (e, t, r, s) {
                    Kt(t, st(t), e, s);
                  }),
                  Xg = rr(function (e, t, r, s) {
                    Kt(t, qe(t), e, s);
                  }),
                  $g = rn(ks);
                function Zg(e, t) {
                  var r = nr(e);
                  return t == null ? r : cu(r, t);
                }
                var Qg = ue(function (e, t) {
                    e = be(e);
                    var r = -1,
                      s = t.length,
                      l = s > 2 ? t[2] : i;
                    for (l && Qe(t[0], t[1], l) && (s = 1); ++r < s; )
                      for (
                        var m = t[r], E = st(m), A = -1, F = E.length;
                        ++A < F;

                      ) {
                        var P = E[A],
                          M = e[P];
                        (M === i || (Mt(M, Qn[P]) && !Ee.call(e, P))) &&
                          (e[P] = m[P]);
                      }
                    return e;
                  }),
                  e_ = ue(function (e) {
                    return e.push(i, Ju), ut(Lc, i, e);
                  });
                function t_(e, t) {
                  return Ha(e, V(t, 3), zt);
                }
                function n_(e, t) {
                  return Ha(e, V(t, 3), Ms);
                }
                function r_(e, t) {
                  return e == null ? e : Ps(e, V(t, 3), st);
                }
                function i_(e, t) {
                  return e == null ? e : mu(e, V(t, 3), st);
                }
                function s_(e, t) {
                  return e && zt(e, V(t, 3));
                }
                function o_(e, t) {
                  return e && Ms(e, V(t, 3));
                }
                function a_(e) {
                  return e == null ? [] : xi(e, qe(e));
                }
                function u_(e) {
                  return e == null ? [] : xi(e, st(e));
                }
                function go(e, t, r) {
                  var s = e == null ? i : Pn(e, t);
                  return s === i ? r : s;
                }
                function c_(e, t) {
                  return e != null && $u(e, t, Lm);
                }
                function _o(e, t) {
                  return e != null && $u(e, t, Nm);
                }
                var l_ = qu(function (e, t, r) {
                    t != null &&
                      typeof t.toString != "function" &&
                      (t = oi.call(t)),
                      (e[t] = r);
                  }, xo(ot)),
                  h_ = qu(function (e, t, r) {
                    t != null &&
                      typeof t.toString != "function" &&
                      (t = oi.call(t)),
                      Ee.call(e, t) ? e[t].push(r) : (e[t] = [r]);
                  }, V),
                  f_ = ue(Tr);
                function qe(e) {
                  return it(e) ? au(e) : Gs(e);
                }
                function st(e) {
                  return it(e) ? au(e, !0) : qm(e);
                }
                function d_(e, t) {
                  var r = {};
                  return (
                    (t = V(t, 3)),
                    zt(e, function (s, l, m) {
                      tn(r, t(s, l, m), s);
                    }),
                    r
                  );
                }
                function m_(e, t) {
                  var r = {};
                  return (
                    (t = V(t, 3)),
                    zt(e, function (s, l, m) {
                      tn(r, l, t(s, l, m));
                    }),
                    r
                  );
                }
                var p_ = rr(function (e, t, r) {
                    vi(e, t, r);
                  }),
                  Lc = rr(function (e, t, r, s) {
                    vi(e, t, r, s);
                  }),
                  g_ = rn(function (e, t) {
                    var r = {};
                    if (e == null) return r;
                    var s = !1;
                    (t = Be(t, function (m) {
                      return (m = yn(m, e)), s || (s = m.length > 1), m;
                    })),
                      Kt(e, to(e), r),
                      s && (r = At(r, T | b | B, lp));
                    for (var l = t.length; l--; ) Vs(r, t[l]);
                    return r;
                  });
                function __(e, t) {
                  return Nc(e, ki(V(t)));
                }
                var y_ = rn(function (e, t) {
                  return e == null ? {} : zm(e, t);
                });
                function Nc(e, t) {
                  if (e == null) return {};
                  var r = Be(to(e), function (s) {
                    return [s];
                  });
                  return (
                    (t = V(t)),
                    Au(e, r, function (s, l) {
                      return t(s, l[0]);
                    })
                  );
                }
                function x_(e, t, r) {
                  t = yn(t, e);
                  var s = -1,
                    l = t.length;
                  for (l || ((l = 1), (e = i)); ++s < l; ) {
                    var m = e == null ? i : e[Vt(t[s])];
                    m === i && ((s = l), (m = r)), (e = on(m) ? m.call(e) : m);
                  }
                  return e;
                }
                function v_(e, t, r) {
                  return e == null ? e : Fr(e, t, r);
                }
                function E_(e, t, r, s) {
                  return (
                    (s = typeof s == "function" ? s : i),
                    e == null ? e : Fr(e, t, r, s)
                  );
                }
                var Oc = Ku(qe),
                  kc = Ku(st);
                function w_(e, t, r) {
                  var s = re(e),
                    l = s || vn(e) || or(e);
                  if (((t = V(t, 4)), r == null)) {
                    var m = e && e.constructor;
                    l
                      ? (r = s ? new m() : [])
                      : Ne(e)
                        ? (r = on(m) ? nr(ci(e)) : {})
                        : (r = {});
                  }
                  return (
                    (l ? Et : zt)(e, function (E, A, F) {
                      return t(r, E, A, F);
                    }),
                    r
                  );
                }
                function b_(e, t) {
                  return e == null ? !0 : Vs(e, t);
                }
                function A_(e, t, r) {
                  return e == null ? e : Iu(e, t, Xs(r));
                }
                function S_(e, t, r, s) {
                  return (
                    (s = typeof s == "function" ? s : i),
                    e == null ? e : Iu(e, t, Xs(r), s)
                  );
                }
                function ar(e) {
                  return e == null ? [] : Ts(e, qe(e));
                }
                function C_(e) {
                  return e == null ? [] : Ts(e, st(e));
                }
                function R_(e, t, r) {
                  return (
                    r === i && ((r = t), (t = i)),
                    r !== i && ((r = Rt(r)), (r = r === r ? r : 0)),
                    t !== i && ((t = Rt(t)), (t = t === t ? t : 0)),
                    kn(Rt(e), t, r)
                  );
                }
                function T_(e, t, r) {
                  return (
                    (t = an(t)),
                    r === i ? ((r = t), (t = 0)) : (r = an(r)),
                    (e = Rt(e)),
                    Om(e, t, r)
                  );
                }
                function I_(e, t, r) {
                  if (
                    (r && typeof r != "boolean" && Qe(e, t, r) && (t = r = i),
                    r === i &&
                      (typeof t == "boolean"
                        ? ((r = t), (t = i))
                        : typeof e == "boolean" && ((r = e), (e = i))),
                    e === i && t === i
                      ? ((e = 0), (t = 1))
                      : ((e = an(e)),
                        t === i ? ((t = e), (e = 0)) : (t = an(t))),
                    e > t)
                  ) {
                    var s = e;
                    (e = t), (t = s);
                  }
                  if (r || e % 1 || t % 1) {
                    var l = su();
                    return Ve(
                      e + l * (t - e + ad("1e-" + ((l + "").length - 1))),
                      t,
                    );
                  }
                  return Hs(e, t);
                }
                var F_ = ir(function (e, t, r) {
                  return (t = t.toLowerCase()), e + (r ? Pc(t) : t);
                });
                function Pc(e) {
                  return yo(_e(e).toLowerCase());
                }
                function Mc(e) {
                  return (e = _e(e)), e && e.replace(Lf, vd).replace($f, "");
                }
                function B_(e, t, r) {
                  (e = _e(e)), (t = lt(t));
                  var s = e.length;
                  r = r === i ? s : kn(se(r), 0, s);
                  var l = r;
                  return (r -= t.length), r >= 0 && e.slice(r, l) == t;
                }
                function L_(e) {
                  return (e = _e(e)), e && ff.test(e) ? e.replace(ma, Ed) : e;
                }
                function N_(e) {
                  return (
                    (e = _e(e)), e && yf.test(e) ? e.replace(fs, "\\$&") : e
                  );
                }
                var O_ = ir(function (e, t, r) {
                    return e + (r ? "-" : "") + t.toLowerCase();
                  }),
                  k_ = ir(function (e, t, r) {
                    return e + (r ? " " : "") + t.toLowerCase();
                  }),
                  P_ = Du("toLowerCase");
                function M_(e, t, r) {
                  (e = _e(e)), (t = se(t));
                  var s = t ? $n(e) : 0;
                  if (!t || s >= t) return e;
                  var l = (t - s) / 2;
                  return Ci(di(l), r) + e + Ci(fi(l), r);
                }
                function U_(e, t, r) {
                  (e = _e(e)), (t = se(t));
                  var s = t ? $n(e) : 0;
                  return t && s < t ? e + Ci(t - s, r) : e;
                }
                function j_(e, t, r) {
                  (e = _e(e)), (t = se(t));
                  var s = t ? $n(e) : 0;
                  return t && s < t ? Ci(t - s, r) + e : e;
                }
                function D_(e, t, r) {
                  return (
                    r || t == null ? (t = 0) : t && (t = +t),
                    Vd(_e(e).replace(ds, ""), t || 0)
                  );
                }
                function G_(e, t, r) {
                  return (
                    (r ? Qe(e, t, r) : t === i) ? (t = 1) : (t = se(t)),
                    zs(_e(e), t)
                  );
                }
                function W_() {
                  var e = arguments,
                    t = _e(e[0]);
                  return e.length < 3 ? t : t.replace(e[1], e[2]);
                }
                var q_ = ir(function (e, t, r) {
                  return e + (r ? "_" : "") + t.toLowerCase();
                });
                function H_(e, t, r) {
                  return (
                    r && typeof r != "number" && Qe(e, t, r) && (t = r = i),
                    (r = r === i ? Xe : r >>> 0),
                    r
                      ? ((e = _e(e)),
                        e &&
                        (typeof t == "string" || (t != null && !po(t))) &&
                        ((t = lt(t)), !t && Xn(e))
                          ? xn(kt(e), 0, r)
                          : e.split(t, r))
                      : []
                  );
                }
                var z_ = ir(function (e, t, r) {
                  return e + (r ? " " : "") + yo(t);
                });
                function K_(e, t, r) {
                  return (
                    (e = _e(e)),
                    (r = r == null ? 0 : kn(se(r), 0, e.length)),
                    (t = lt(t)),
                    e.slice(r, r + t.length) == t
                  );
                }
                function V_(e, t, r) {
                  var s = f.templateSettings;
                  r && Qe(e, t, r) && (t = i),
                    (e = _e(e)),
                    (t = Ui({}, t, s, Vu));
                  var l = Ui({}, t.imports, s.imports, Vu),
                    m = qe(l),
                    E = Ts(l, m),
                    A,
                    F,
                    P = 0,
                    M = t.interpolate || $r,
                    U = "__p += '",
                    G = Fs(
                      (t.escape || $r).source +
                        "|" +
                        M.source +
                        "|" +
                        (M === pa ? Cf : $r).source +
                        "|" +
                        (t.evaluate || $r).source +
                        "|$",
                      "g",
                    ),
                    q =
                      "//# sourceURL=" +
                      (Ee.call(t, "sourceURL")
                        ? (t.sourceURL + "").replace(/\s/g, " ")
                        : "lodash.templateSources[" + ++nd + "]") +
                      `
`;
                  e.replace(G, function (Y, ce, de, ft, et, dt) {
                    return (
                      de || (de = ft),
                      (U += e.slice(P, dt).replace(Nf, wd)),
                      ce &&
                        ((A = !0),
                        (U +=
                          `' +
__e(` +
                          ce +
                          `) +
'`)),
                      et &&
                        ((F = !0),
                        (U +=
                          `';
` +
                          et +
                          `;
__p += '`)),
                      de &&
                        (U +=
                          `' +
((__t = (` +
                          de +
                          `)) == null ? '' : __t) +
'`),
                      (P = dt + Y.length),
                      Y
                    );
                  }),
                    (U += `';
`);
                  var J = Ee.call(t, "variable") && t.variable;
                  if (!J)
                    U =
                      `with (obj) {
` +
                      U +
                      `
}
`;
                  else if (Af.test(J)) throw new ne(R);
                  (U = (F ? U.replace(Ie, "") : U)
                    .replace(Se, "$1")
                    .replace(Fe, "$1;")),
                    (U =
                      "function(" +
                      (J || "obj") +
                      `) {
` +
                      (J
                        ? ""
                        : `obj || (obj = {});
`) +
                      "var __t, __p = ''" +
                      (A ? ", __e = _.escape" : "") +
                      (F
                        ? `, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
`
                        : `;
`) +
                      U +
                      `return __p
}`);
                  var oe = jc(function () {
                    return pe(m, q + "return " + U).apply(i, E);
                  });
                  if (((oe.source = U), mo(oe))) throw oe;
                  return oe;
                }
                function J_(e) {
                  return _e(e).toLowerCase();
                }
                function Y_(e) {
                  return _e(e).toUpperCase();
                }
                function X_(e, t, r) {
                  if (((e = _e(e)), e && (r || t === i))) return Ja(e);
                  if (!e || !(t = lt(t))) return e;
                  var s = kt(e),
                    l = kt(t),
                    m = Ya(s, l),
                    E = Xa(s, l) + 1;
                  return xn(s, m, E).join("");
                }
                function $_(e, t, r) {
                  if (((e = _e(e)), e && (r || t === i)))
                    return e.slice(0, Za(e) + 1);
                  if (!e || !(t = lt(t))) return e;
                  var s = kt(e),
                    l = Xa(s, kt(t)) + 1;
                  return xn(s, 0, l).join("");
                }
                function Z_(e, t, r) {
                  if (((e = _e(e)), e && (r || t === i)))
                    return e.replace(ds, "");
                  if (!e || !(t = lt(t))) return e;
                  var s = kt(e),
                    l = Ya(s, kt(t));
                  return xn(s, l).join("");
                }
                function Q_(e, t) {
                  var r = De,
                    s = we;
                  if (Ne(t)) {
                    var l = "separator" in t ? t.separator : l;
                    (r = "length" in t ? se(t.length) : r),
                      (s = "omission" in t ? lt(t.omission) : s);
                  }
                  e = _e(e);
                  var m = e.length;
                  if (Xn(e)) {
                    var E = kt(e);
                    m = E.length;
                  }
                  if (r >= m) return e;
                  var A = r - $n(s);
                  if (A < 1) return s;
                  var F = E ? xn(E, 0, A).join("") : e.slice(0, A);
                  if (l === i) return F + s;
                  if ((E && (A += F.length - A), po(l))) {
                    if (e.slice(A).search(l)) {
                      var P,
                        M = F;
                      for (
                        l.global || (l = Fs(l.source, _e(ga.exec(l)) + "g")),
                          l.lastIndex = 0;
                        (P = l.exec(M));

                      )
                        var U = P.index;
                      F = F.slice(0, U === i ? A : U);
                    }
                  } else if (e.indexOf(lt(l), A) != A) {
                    var G = F.lastIndexOf(l);
                    G > -1 && (F = F.slice(0, G));
                  }
                  return F + s;
                }
                function ey(e) {
                  return (e = _e(e)), e && hf.test(e) ? e.replace(ge, Id) : e;
                }
                var ty = ir(function (e, t, r) {
                    return e + (r ? " " : "") + t.toUpperCase();
                  }),
                  yo = Du("toUpperCase");
                function Uc(e, t, r) {
                  return (
                    (e = _e(e)),
                    (t = r ? i : t),
                    t === i ? (Ad(e) ? Ld(e) : pd(e)) : e.match(t) || []
                  );
                }
                var jc = ue(function (e, t) {
                    try {
                      return ut(e, i, t);
                    } catch (r) {
                      return mo(r) ? r : new ne(r);
                    }
                  }),
                  ny = rn(function (e, t) {
                    return (
                      Et(t, function (r) {
                        (r = Vt(r)), tn(e, r, ho(e[r], e));
                      }),
                      e
                    );
                  });
                function ry(e) {
                  var t = e == null ? 0 : e.length,
                    r = V();
                  return (
                    (e = t
                      ? Be(e, function (s) {
                          if (typeof s[1] != "function") throw new wt(x);
                          return [r(s[0]), s[1]];
                        })
                      : []),
                    ue(function (s) {
                      for (var l = -1; ++l < t; ) {
                        var m = e[l];
                        if (ut(m[0], this, s)) return ut(m[1], this, s);
                      }
                    })
                  );
                }
                function iy(e) {
                  return Im(At(e, T));
                }
                function xo(e) {
                  return function () {
                    return e;
                  };
                }
                function sy(e, t) {
                  return e == null || e !== e ? t : e;
                }
                var oy = Wu(),
                  ay = Wu(!0);
                function ot(e) {
                  return e;
                }
                function vo(e) {
                  return yu(typeof e == "function" ? e : At(e, T));
                }
                function uy(e) {
                  return vu(At(e, T));
                }
                function cy(e, t) {
                  return Eu(e, At(t, T));
                }
                var ly = ue(function (e, t) {
                    return function (r) {
                      return Tr(r, e, t);
                    };
                  }),
                  hy = ue(function (e, t) {
                    return function (r) {
                      return Tr(e, r, t);
                    };
                  });
                function Eo(e, t, r) {
                  var s = qe(t),
                    l = xi(t, s);
                  r == null &&
                    !(Ne(t) && (l.length || !s.length)) &&
                    ((r = t), (t = e), (e = this), (l = xi(t, qe(t))));
                  var m = !(Ne(r) && "chain" in r) || !!r.chain,
                    E = on(e);
                  return (
                    Et(l, function (A) {
                      var F = t[A];
                      (e[A] = F),
                        E &&
                          (e.prototype[A] = function () {
                            var P = this.__chain__;
                            if (m || P) {
                              var M = e(this.__wrapped__),
                                U = (M.__actions__ = rt(this.__actions__));
                              return (
                                U.push({
                                  func: F,
                                  args: arguments,
                                  thisArg: e,
                                }),
                                (M.__chain__ = P),
                                M
                              );
                            }
                            return F.apply(e, dn([this.value()], arguments));
                          });
                    }),
                    e
                  );
                }
                function fy() {
                  return He._ === this && (He._ = Ud), this;
                }
                function wo() {}
                function dy(e) {
                  return (
                    (e = se(e)),
                    ue(function (t) {
                      return wu(t, e);
                    })
                  );
                }
                var my = Zs(Be),
                  py = Zs(qa),
                  gy = Zs(bs);
                function Dc(e) {
                  return so(e) ? As(Vt(e)) : Km(e);
                }
                function _y(e) {
                  return function (t) {
                    return e == null ? i : Pn(e, t);
                  };
                }
                var yy = Hu(),
                  xy = Hu(!0);
                function bo() {
                  return [];
                }
                function Ao() {
                  return !1;
                }
                function vy() {
                  return {};
                }
                function Ey() {
                  return "";
                }
                function wy() {
                  return !0;
                }
                function by(e, t) {
                  if (((e = se(e)), e < 1 || e > xt)) return [];
                  var r = Xe,
                    s = Ve(e, Xe);
                  (t = V(t)), (e -= Xe);
                  for (var l = Rs(s, t); ++r < e; ) t(r);
                  return l;
                }
                function Ay(e) {
                  return re(e) ? Be(e, Vt) : ht(e) ? [e] : rt(oc(_e(e)));
                }
                function Sy(e) {
                  var t = ++Pd;
                  return _e(e) + t;
                }
                var Cy = Si(function (e, t) {
                    return e + t;
                  }, 0),
                  Ry = Qs("ceil"),
                  Ty = Si(function (e, t) {
                    return e / t;
                  }, 1),
                  Iy = Qs("floor");
                function Fy(e) {
                  return e && e.length ? yi(e, ot, Us) : i;
                }
                function By(e, t) {
                  return e && e.length ? yi(e, V(t, 2), Us) : i;
                }
                function Ly(e) {
                  return Ka(e, ot);
                }
                function Ny(e, t) {
                  return Ka(e, V(t, 2));
                }
                function Oy(e) {
                  return e && e.length ? yi(e, ot, Ws) : i;
                }
                function ky(e, t) {
                  return e && e.length ? yi(e, V(t, 2), Ws) : i;
                }
                var Py = Si(function (e, t) {
                    return e * t;
                  }, 1),
                  My = Qs("round"),
                  Uy = Si(function (e, t) {
                    return e - t;
                  }, 0);
                function jy(e) {
                  return e && e.length ? Cs(e, ot) : 0;
                }
                function Dy(e, t) {
                  return e && e.length ? Cs(e, V(t, 2)) : 0;
                }
                return (
                  (f.after = ug),
                  (f.ary = _c),
                  (f.assign = Yg),
                  (f.assignIn = Bc),
                  (f.assignInWith = Ui),
                  (f.assignWith = Xg),
                  (f.at = $g),
                  (f.before = yc),
                  (f.bind = ho),
                  (f.bindAll = ny),
                  (f.bindKey = xc),
                  (f.castArray = vg),
                  (f.chain = mc),
                  (f.chunk = Ip),
                  (f.compact = Fp),
                  (f.concat = Bp),
                  (f.cond = ry),
                  (f.conforms = iy),
                  (f.constant = xo),
                  (f.countBy = j0),
                  (f.create = Zg),
                  (f.curry = vc),
                  (f.curryRight = Ec),
                  (f.debounce = wc),
                  (f.defaults = Qg),
                  (f.defaultsDeep = e_),
                  (f.defer = cg),
                  (f.delay = lg),
                  (f.difference = Lp),
                  (f.differenceBy = Np),
                  (f.differenceWith = Op),
                  (f.drop = kp),
                  (f.dropRight = Pp),
                  (f.dropRightWhile = Mp),
                  (f.dropWhile = Up),
                  (f.fill = jp),
                  (f.filter = G0),
                  (f.flatMap = H0),
                  (f.flatMapDeep = z0),
                  (f.flatMapDepth = K0),
                  (f.flatten = lc),
                  (f.flattenDeep = Dp),
                  (f.flattenDepth = Gp),
                  (f.flip = hg),
                  (f.flow = oy),
                  (f.flowRight = ay),
                  (f.fromPairs = Wp),
                  (f.functions = a_),
                  (f.functionsIn = u_),
                  (f.groupBy = V0),
                  (f.initial = Hp),
                  (f.intersection = zp),
                  (f.intersectionBy = Kp),
                  (f.intersectionWith = Vp),
                  (f.invert = l_),
                  (f.invertBy = h_),
                  (f.invokeMap = Y0),
                  (f.iteratee = vo),
                  (f.keyBy = X0),
                  (f.keys = qe),
                  (f.keysIn = st),
                  (f.map = Li),
                  (f.mapKeys = d_),
                  (f.mapValues = m_),
                  (f.matches = uy),
                  (f.matchesProperty = cy),
                  (f.memoize = Oi),
                  (f.merge = p_),
                  (f.mergeWith = Lc),
                  (f.method = ly),
                  (f.methodOf = hy),
                  (f.mixin = Eo),
                  (f.negate = ki),
                  (f.nthArg = dy),
                  (f.omit = g_),
                  (f.omitBy = __),
                  (f.once = fg),
                  (f.orderBy = $0),
                  (f.over = my),
                  (f.overArgs = dg),
                  (f.overEvery = py),
                  (f.overSome = gy),
                  (f.partial = fo),
                  (f.partialRight = bc),
                  (f.partition = Z0),
                  (f.pick = y_),
                  (f.pickBy = Nc),
                  (f.property = Dc),
                  (f.propertyOf = _y),
                  (f.pull = $p),
                  (f.pullAll = fc),
                  (f.pullAllBy = Zp),
                  (f.pullAllWith = Qp),
                  (f.pullAt = e0),
                  (f.range = yy),
                  (f.rangeRight = xy),
                  (f.rearg = mg),
                  (f.reject = tg),
                  (f.remove = t0),
                  (f.rest = pg),
                  (f.reverse = co),
                  (f.sampleSize = rg),
                  (f.set = v_),
                  (f.setWith = E_),
                  (f.shuffle = ig),
                  (f.slice = n0),
                  (f.sortBy = ag),
                  (f.sortedUniq = c0),
                  (f.sortedUniqBy = l0),
                  (f.split = H_),
                  (f.spread = gg),
                  (f.tail = h0),
                  (f.take = f0),
                  (f.takeRight = d0),
                  (f.takeRightWhile = m0),
                  (f.takeWhile = p0),
                  (f.tap = F0),
                  (f.throttle = _g),
                  (f.thru = Bi),
                  (f.toArray = Tc),
                  (f.toPairs = Oc),
                  (f.toPairsIn = kc),
                  (f.toPath = Ay),
                  (f.toPlainObject = Fc),
                  (f.transform = w_),
                  (f.unary = yg),
                  (f.union = g0),
                  (f.unionBy = _0),
                  (f.unionWith = y0),
                  (f.uniq = x0),
                  (f.uniqBy = v0),
                  (f.uniqWith = E0),
                  (f.unset = b_),
                  (f.unzip = lo),
                  (f.unzipWith = dc),
                  (f.update = A_),
                  (f.updateWith = S_),
                  (f.values = ar),
                  (f.valuesIn = C_),
                  (f.without = w0),
                  (f.words = Uc),
                  (f.wrap = xg),
                  (f.xor = b0),
                  (f.xorBy = A0),
                  (f.xorWith = S0),
                  (f.zip = C0),
                  (f.zipObject = R0),
                  (f.zipObjectDeep = T0),
                  (f.zipWith = I0),
                  (f.entries = Oc),
                  (f.entriesIn = kc),
                  (f.extend = Bc),
                  (f.extendWith = Ui),
                  Eo(f, f),
                  (f.add = Cy),
                  (f.attempt = jc),
                  (f.camelCase = F_),
                  (f.capitalize = Pc),
                  (f.ceil = Ry),
                  (f.clamp = R_),
                  (f.clone = Eg),
                  (f.cloneDeep = bg),
                  (f.cloneDeepWith = Ag),
                  (f.cloneWith = wg),
                  (f.conformsTo = Sg),
                  (f.deburr = Mc),
                  (f.defaultTo = sy),
                  (f.divide = Ty),
                  (f.endsWith = B_),
                  (f.eq = Mt),
                  (f.escape = L_),
                  (f.escapeRegExp = N_),
                  (f.every = D0),
                  (f.find = W0),
                  (f.findIndex = uc),
                  (f.findKey = t_),
                  (f.findLast = q0),
                  (f.findLastIndex = cc),
                  (f.findLastKey = n_),
                  (f.floor = Iy),
                  (f.forEach = pc),
                  (f.forEachRight = gc),
                  (f.forIn = r_),
                  (f.forInRight = i_),
                  (f.forOwn = s_),
                  (f.forOwnRight = o_),
                  (f.get = go),
                  (f.gt = Cg),
                  (f.gte = Rg),
                  (f.has = c_),
                  (f.hasIn = _o),
                  (f.head = hc),
                  (f.identity = ot),
                  (f.includes = J0),
                  (f.indexOf = qp),
                  (f.inRange = T_),
                  (f.invoke = f_),
                  (f.isArguments = jn),
                  (f.isArray = re),
                  (f.isArrayBuffer = Tg),
                  (f.isArrayLike = it),
                  (f.isArrayLikeObject = Me),
                  (f.isBoolean = Ig),
                  (f.isBuffer = vn),
                  (f.isDate = Fg),
                  (f.isElement = Bg),
                  (f.isEmpty = Lg),
                  (f.isEqual = Ng),
                  (f.isEqualWith = Og),
                  (f.isError = mo),
                  (f.isFinite = kg),
                  (f.isFunction = on),
                  (f.isInteger = Ac),
                  (f.isLength = Pi),
                  (f.isMap = Sc),
                  (f.isMatch = Pg),
                  (f.isMatchWith = Mg),
                  (f.isNaN = Ug),
                  (f.isNative = jg),
                  (f.isNil = Gg),
                  (f.isNull = Dg),
                  (f.isNumber = Cc),
                  (f.isObject = Ne),
                  (f.isObjectLike = ke),
                  (f.isPlainObject = Or),
                  (f.isRegExp = po),
                  (f.isSafeInteger = Wg),
                  (f.isSet = Rc),
                  (f.isString = Mi),
                  (f.isSymbol = ht),
                  (f.isTypedArray = or),
                  (f.isUndefined = qg),
                  (f.isWeakMap = Hg),
                  (f.isWeakSet = zg),
                  (f.join = Jp),
                  (f.kebabCase = O_),
                  (f.last = Ct),
                  (f.lastIndexOf = Yp),
                  (f.lowerCase = k_),
                  (f.lowerFirst = P_),
                  (f.lt = Kg),
                  (f.lte = Vg),
                  (f.max = Fy),
                  (f.maxBy = By),
                  (f.mean = Ly),
                  (f.meanBy = Ny),
                  (f.min = Oy),
                  (f.minBy = ky),
                  (f.stubArray = bo),
                  (f.stubFalse = Ao),
                  (f.stubObject = vy),
                  (f.stubString = Ey),
                  (f.stubTrue = wy),
                  (f.multiply = Py),
                  (f.nth = Xp),
                  (f.noConflict = fy),
                  (f.noop = wo),
                  (f.now = Ni),
                  (f.pad = M_),
                  (f.padEnd = U_),
                  (f.padStart = j_),
                  (f.parseInt = D_),
                  (f.random = I_),
                  (f.reduce = Q0),
                  (f.reduceRight = eg),
                  (f.repeat = G_),
                  (f.replace = W_),
                  (f.result = x_),
                  (f.round = My),
                  (f.runInContext = C),
                  (f.sample = ng),
                  (f.size = sg),
                  (f.snakeCase = q_),
                  (f.some = og),
                  (f.sortedIndex = r0),
                  (f.sortedIndexBy = i0),
                  (f.sortedIndexOf = s0),
                  (f.sortedLastIndex = o0),
                  (f.sortedLastIndexBy = a0),
                  (f.sortedLastIndexOf = u0),
                  (f.startCase = z_),
                  (f.startsWith = K_),
                  (f.subtract = Uy),
                  (f.sum = jy),
                  (f.sumBy = Dy),
                  (f.template = V_),
                  (f.times = by),
                  (f.toFinite = an),
                  (f.toInteger = se),
                  (f.toLength = Ic),
                  (f.toLower = J_),
                  (f.toNumber = Rt),
                  (f.toSafeInteger = Jg),
                  (f.toString = _e),
                  (f.toUpper = Y_),
                  (f.trim = X_),
                  (f.trimEnd = $_),
                  (f.trimStart = Z_),
                  (f.truncate = Q_),
                  (f.unescape = ey),
                  (f.uniqueId = Sy),
                  (f.upperCase = ty),
                  (f.upperFirst = yo),
                  (f.each = pc),
                  (f.eachRight = gc),
                  (f.first = hc),
                  Eo(
                    f,
                    (function () {
                      var e = {};
                      return (
                        zt(f, function (t, r) {
                          Ee.call(f.prototype, r) || (e[r] = t);
                        }),
                        e
                      );
                    })(),
                    { chain: !1 },
                  ),
                  (f.VERSION = u),
                  Et(
                    [
                      "bind",
                      "bindKey",
                      "curry",
                      "curryRight",
                      "partial",
                      "partialRight",
                    ],
                    function (e) {
                      f[e].placeholder = f;
                    },
                  ),
                  Et(["drop", "take"], function (e, t) {
                    (le.prototype[e] = function (r) {
                      r = r === i ? 1 : We(se(r), 0);
                      var s =
                        this.__filtered__ && !t ? new le(this) : this.clone();
                      return (
                        s.__filtered__
                          ? (s.__takeCount__ = Ve(r, s.__takeCount__))
                          : s.__views__.push({
                              size: Ve(r, Xe),
                              type: e + (s.__dir__ < 0 ? "Right" : ""),
                            }),
                        s
                      );
                    }),
                      (le.prototype[e + "Right"] = function (r) {
                        return this.reverse()[e](r).reverse();
                      });
                  }),
                  Et(["filter", "map", "takeWhile"], function (e, t) {
                    var r = t + 1,
                      s = r == Ae || r == Sn;
                    le.prototype[e] = function (l) {
                      var m = this.clone();
                      return (
                        m.__iteratees__.push({ iteratee: V(l, 3), type: r }),
                        (m.__filtered__ = m.__filtered__ || s),
                        m
                      );
                    };
                  }),
                  Et(["head", "last"], function (e, t) {
                    var r = "take" + (t ? "Right" : "");
                    le.prototype[e] = function () {
                      return this[r](1).value()[0];
                    };
                  }),
                  Et(["initial", "tail"], function (e, t) {
                    var r = "drop" + (t ? "" : "Right");
                    le.prototype[e] = function () {
                      return this.__filtered__ ? new le(this) : this[r](1);
                    };
                  }),
                  (le.prototype.compact = function () {
                    return this.filter(ot);
                  }),
                  (le.prototype.find = function (e) {
                    return this.filter(e).head();
                  }),
                  (le.prototype.findLast = function (e) {
                    return this.reverse().find(e);
                  }),
                  (le.prototype.invokeMap = ue(function (e, t) {
                    return typeof e == "function"
                      ? new le(this)
                      : this.map(function (r) {
                          return Tr(r, e, t);
                        });
                  })),
                  (le.prototype.reject = function (e) {
                    return this.filter(ki(V(e)));
                  }),
                  (le.prototype.slice = function (e, t) {
                    e = se(e);
                    var r = this;
                    return r.__filtered__ && (e > 0 || t < 0)
                      ? new le(r)
                      : (e < 0 ? (r = r.takeRight(-e)) : e && (r = r.drop(e)),
                        t !== i &&
                          ((t = se(t)),
                          (r = t < 0 ? r.dropRight(-t) : r.take(t - e))),
                        r);
                  }),
                  (le.prototype.takeRightWhile = function (e) {
                    return this.reverse().takeWhile(e).reverse();
                  }),
                  (le.prototype.toArray = function () {
                    return this.take(Xe);
                  }),
                  zt(le.prototype, function (e, t) {
                    var r = /^(?:filter|find|map|reject)|While$/.test(t),
                      s = /^(?:head|last)$/.test(t),
                      l = f[s ? "take" + (t == "last" ? "Right" : "") : t],
                      m = s || /^find/.test(t);
                    l &&
                      (f.prototype[t] = function () {
                        var E = this.__wrapped__,
                          A = s ? [1] : arguments,
                          F = E instanceof le,
                          P = A[0],
                          M = F || re(E),
                          U = function (ce) {
                            var de = l.apply(f, dn([ce], A));
                            return s && G ? de[0] : de;
                          };
                        M &&
                          r &&
                          typeof P == "function" &&
                          P.length != 1 &&
                          (F = M = !1);
                        var G = this.__chain__,
                          q = !!this.__actions__.length,
                          J = m && !G,
                          oe = F && !q;
                        if (!m && M) {
                          E = oe ? E : new le(this);
                          var Y = e.apply(E, A);
                          return (
                            Y.__actions__.push({
                              func: Bi,
                              args: [U],
                              thisArg: i,
                            }),
                            new bt(Y, G)
                          );
                        }
                        return J && oe
                          ? e.apply(this, A)
                          : ((Y = this.thru(U)),
                            J ? (s ? Y.value()[0] : Y.value()) : Y);
                      });
                  }),
                  Et(
                    ["pop", "push", "shift", "sort", "splice", "unshift"],
                    function (e) {
                      var t = ri[e],
                        r = /^(?:push|sort|unshift)$/.test(e) ? "tap" : "thru",
                        s = /^(?:pop|shift)$/.test(e);
                      f.prototype[e] = function () {
                        var l = arguments;
                        if (s && !this.__chain__) {
                          var m = this.value();
                          return t.apply(re(m) ? m : [], l);
                        }
                        return this[r](function (E) {
                          return t.apply(re(E) ? E : [], l);
                        });
                      };
                    },
                  ),
                  zt(le.prototype, function (e, t) {
                    var r = f[t];
                    if (r) {
                      var s = r.name + "";
                      Ee.call(tr, s) || (tr[s] = []),
                        tr[s].push({ name: t, func: r });
                    }
                  }),
                  (tr[Ai(i, X).name] = [{ name: "wrapper", func: i }]),
                  (le.prototype.clone = em),
                  (le.prototype.reverse = tm),
                  (le.prototype.value = nm),
                  (f.prototype.at = B0),
                  (f.prototype.chain = L0),
                  (f.prototype.commit = N0),
                  (f.prototype.next = O0),
                  (f.prototype.plant = P0),
                  (f.prototype.reverse = M0),
                  (f.prototype.toJSON =
                    f.prototype.valueOf =
                    f.prototype.value =
                      U0),
                  (f.prototype.first = f.prototype.head),
                  Er && (f.prototype[Er] = k0),
                  f
                );
              },
              Zn = Nd();
            Bn ? (((Bn.exports = Zn)._ = Zn), (xs._ = Zn)) : (He._ = Zn);
          }).call(qh);
        })(dr, dr.exports)),
      dr.exports
    );
  }
  var zh = Hh();
  const Kh = () => {
      (window.dataLayer || []).push({
        event: "ga4Event",
        event_name: "form_start",
        form_start: {
          content_name: "Submit First Score",
          content_type: "Submission",
        },
      });
    },
    Vh = () => {
      (window.dataLayer || []).push({
        event: "ga4Event",
        event_name: "form_submit",
        form_submit: {
          content_name: "Submit First Score",
          content_type: "Submission",
        },
      });
    },
    Jh = () => {
      (window.dataLayer || []).push({
        event: "ga4Event",
        event_name: "form_start",
        form_start: {
          content_name: "Submit Tetrimino Consent",
          content_type: "Submission",
        },
      });
    },
    Yh = () => {
      (window.dataLayer || []).push({
        event: "ga4Event",
        event_name: "form_submit",
        form_submit: {
          content_name: "Submit Tetrimino Consent",
          content_type: "Submission",
        },
      });
    },
    Xh = () => {
      (window.dataLayer || []).push({
        event: "ga4Event",
        event_name: "form_submit",
        form_submit: {
          content_name: "Submit New Score",
          content_type: "Submission",
        },
      });
    },
    $h = () => {
      (window.dataLayer || []).push({
        event: "ga4Event",
        event_name: "click",
        click: {
          value: "Open Game Overlay",
          click_url: "-",
          element_position: "Game Overlay",
          method: "Outbound: FALSE",
          content_type: "Button Click",
        },
      });
    },
    Zh = () => {
      (window.dataLayer || []).push({
        event: "ga4Event",
        event_name: "click",
        click: {
          value: "Close Game Overlay",
          click_url: "-",
          element_position: "Game Overlay",
          method: "Outbound: FALSE",
          content_type: "Button Click",
        },
      });
    },
    Qh = () => {
      (window.dataLayer || []).push({
        event: "ga4Event",
        event_name: "game_start",
        game_start: { content_name: "Tetris" },
      });
    },
    ef = () => {
      (window.dataLayer || []).push({
        event: "ga4Event",
        event_name: "game_restart",
        game_restart: { content_name: "Tetris" },
      });
    },
    tf = () => {
      (window.dataLayer || []).push({
        event: "ga4Event",
        event_name: "game_end",
        game_end: { content_name: "Tetris", status: "success" },
      });
    },
    nf = (o, n, i) => {
      if (!(o.assetType === "project-profiles" && o.countryCode === "IT"))
        return n;
      const u = i.fields.find(
          (w) => w.dataEngineKey === "legal_activation_terms_link",
        ),
        d = n.renderings.find((w) => w.render === "CHECKBOX");
      return (
        d &&
          u != null &&
          u.description &&
          (d.displayText = d.displayText.replace(
            /href="[^"]*"/g,
            `href="${u == null ? void 0 : u.description}"`,
          )),
        n
      );
    };
  function rf({ gameUserId: o, isReturningUser: n, hasConsented: i }) {
    var Cn, Bt, Lt, Rn, nt, Nt;
    const u = Xr(),
      { getTranslation: d, forceEn: w } = tt.useRbTranslations(),
      x = v.reactExports.useRef(
        new Fh("https://abs-gateway.redbull.com/form-service"),
      ),
      [R, g] = v.reactExports.useState(!1),
      [p, _] = v.reactExports.useState(!1),
      [T, b] = v.reactExports.useState(!1),
      [B, D] = v.reactExports.useState(),
      [I, j] = v.reactExports.useState(!1),
      { rbAccount: X } = jt.useRbAccount(),
      [ae, K] = v.reactExports.useState(!0),
      [$, Z] = v.reactExports.useState(!1),
      [fe, H] = v.reactExports.useState(null),
      [ee, Pe] = v.reactExports.useState(!1),
      { highestScore: De } = Kc.usePlayerStatsStore(),
      we = {
        successTitle: d("rbtetris.form.success_heading", ".Success!"),
        successText: d("rbtetris.form.success_text", ".Success Text"),
        errorTitle: d("rbtetris.popup.error.title", ".Error!"),
        errorText: d(
          "rbtetris.popup.error.text",
          ".Something went wrong, please try again.",
        ),
        formTitle: d("rbtetris.form.heading", ".Form Title"),
        formText: d("rbtetris.form.subtext", ".Form Description"),
        submit: d("rbtetris.popup.button.register", ".Submit"),
        cancel: d("rbtetris.popup.button.cancel", ".Cancel"),
        playAgain: d("rbtetris.popup.button.play_again", ".Play Again"),
        returnToPage: d("rbtetris.popup.button.return", ".Return to page"),
        optional: d("rbtetris.popup.form.optional", ".Optional"),
        requiredPolicy: d(
          "rbtetris.form.invalid_checkbox",
          ".Please check this box if you want to proceed.",
        ),
        highestScore: d("rbtetris.profile.highest_score", ".Highest Score"),
        share: d("global.icons.share", ".Share"),
      },
      [Le, An] = v.reactExports.useState({
        first_name:
          ((Bt = (Cn = X.user) == null ? void 0 : Cn.userProfile) == null
            ? void 0
            : Bt.first_name) || "",
        last_name:
          ((Rn = (Lt = X.user) == null ? void 0 : Lt.userProfile) == null
            ? void 0
            : Rn.last_name) || "",
        email:
          ((Nt = (nt = X.user) == null ? void 0 : nt.userProfile) == null
            ? void 0
            : Nt.email) || "",
        policies: { local: {}, global: {}, consumerActivation: !1 },
      }),
      {
        gameOver: Ae,
        playAgain: zn,
        exitGame: Sn,
      } = v.reactExports.useContext(pr),
      Ye = Ae.gameScore.goldenTetrominoCollected,
      xt = () => {
        const Q = _r(),
          te = B
            ? B.renderings.every(
                (ve) =>
                  Le.policies.local[ve.snippetTranslationId] ||
                  ve.render === "TEXT_ONLY",
              )
            : !0,
          xe = n
            ? !0
            : !!(Q && te && !0 && X.user && Ae.gameScore.gameSessionId);
        b(xe);
      };
    v.reactExports.useEffect(() => {
      xt();
    }, [Le]),
      v.reactExports.useEffect(() => {
        if (!x.current || !Ae.submissionConfig.formAlias) return;
        (async () => {
          const te = await x.current.getPolicies(
              Ae.submissionConfig.formAlias,
              { language: u.language, country: u.countryCode.toUpperCase() },
            ),
            me = nf(u, te, Ae.submissionConfig);
          D(me);
        })();
      }, [x.current, Ae.submissionConfig.formAlias]),
      v.reactExports.useEffect(() => {
        n && ((i && Ye) || !Ye)
          ? (async () => {
              try {
                if (!X.user || !Ae.gameScore.gameSessionId) return;
                const te = { [Ae.gameScore.gameSessionId]: Ae.gameScore.score };
                Xh();
                const me = await Xe(X.user, { sessionIds: te });
                me.status === 201
                  ? g(!0)
                  : me.status === 405 || me.status === 403
                    ? (Z(!0),
                      H({ type: "submitPartial", payload: { sessionIds: te } }))
                    : (console.error("Submission failed:", await me.text()),
                      _(!0));
              } catch (te) {
                console.error("Error submitting form:", te), _(!0);
              }
            })()
          : n && !i && Ye
            ? (Jh(), xt())
            : X.user && Kh();
      }, [i, n]),
      v.reactExports.useEffect(() => {
        R && localStorage.removeItem("leaderboardId");
      }, [R]);
    const gr = async (Q) => {
      Q.preventDefault();
      const te = Kn(Le);
      if ((te || K(!1), !T || !te || !X.user || !Ae.gameScore.gameSessionId)) {
        setTimeout(() => {
          $t();
        }, 450);
        return;
      }
      if (!(!B && !n)) {
        j(!0);
        try {
          const me = { [Ae.gameScore.gameSessionId]: Ae.gameScore.score };
          let xe;
          Ye ? (xe = i || Le.policies.consumerActivation) : (xe = void 0);
          const ve = n
            ? {
                language: u.language,
                sessionIds: me,
                consumerActivationTermsAccepted: xe,
              }
            : {
                language: u.language,
                fields: { ...zh.omit(Le, "policies") },
                sessionIds: me,
                consumerActivationTermsAccepted: xe,
                userConsents:
                  B == null
                    ? void 0
                    : B.renderings.map((hn) => ({
                        includedCustomPolicies: hn.includedCustomPolicies.map(
                          (Ot) => ({ ...Ot, language: hn.displayTextLanguage }),
                        ),
                        includedPolicies: hn.includedPolicies,
                        snippetTranslationId: hn.snippetTranslationId,
                      })),
              };
          n ? Yh() : Vh();
          const Zt = await Xt(X.user, ve);
          Zt.status === 201
            ? g(!0)
            : Zt.status === 405 || Zt.status === 403
              ? (Z(!0), H({ type: "submit", payload: ve }))
              : (console.error("Submission failed:", await Zt.text()), _(!0));
        } catch (me) {
          console.error("Error submitting form:", me), _(!0);
        } finally {
          j(!1);
        }
      }
    };
    async function Xt(Q, te) {
      const me = window.forceCaptcha || !1;
      let xe;
      const ve = await X.RBAccounts.getJwt();
      return (
        me
          ? (xe = await fetch(
              "https://game.tetris.redbull.com/api/v1/tetris-session/submit",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${ve}`,
                },
                body: JSON.stringify(te),
              },
            ))
          : (xe = await window.AwsWafIntegration.fetch(
              "https://game.tetris.redbull.com/api/v1/tetris-session/submit",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${ve}`,
                },
                body: JSON.stringify(te),
              },
            )),
        xe
      );
    }
    async function Xe(Q, te) {
      const me = window.forceCaptcha || !1,
        xe = await X.RBAccounts.getJwt();
      let ve;
      return (
        me
          ? (ve = await fetch(
              "https://game.tetris.redbull.com/api/v1/tetris-session/submitPartial",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${xe}`,
                },
                body: JSON.stringify(te),
              },
            ))
          : (ve = await window.AwsWafIntegration.fetch(
              "https://game.tetris.redbull.com/api/v1/tetris-session/submitPartial",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${xe}`,
                },
                body: JSON.stringify(te),
              },
            )),
        ve
      );
    }
    const _r = () => {
        let Q = !0;
        return (
          Ae.submissionConfig.fields.forEach((te) => {
            if (te.isMandatory) {
              const me =
                ua[te.dataEngineKey || te.pdbKey || te.name] ||
                te.dataEngineKey ||
                te.pdbKey ||
                te.name;
              if (!me) return;
              Q = Q && !!Le[me];
            }
          }),
          Q && Kn(Le)
        );
      },
      Kn = (Q) => {
        var xe;
        const te = /^\+\d{1,15}$/,
          me = Q.phone ? !!((xe = Q.phone) != null && xe.match(te)) : !0;
        return ae || K(me), me;
      },
      Oe = [
        ...Ae.submissionConfig.fields.filter(
          (Q) => Q.dataEngineKey !== "soft_promotional_consent",
        ),
        ...Ae.submissionConfig.fields.filter(
          (Q) => Q.dataEngineKey === "soft_promotional_consent",
        ),
      ],
      Te = (Q) => {
        const te = Q.querySelector(".cosmos-form-field--invalid");
        if (te) return te;
        const me = Q.querySelectorAll(
          "cosmos-input, cosmos-select,cosmos-checkbox",
        );
        for (const xe of me) if (xe.shadowRoot && Te(xe.shadowRoot)) return xe;
        return null;
      },
      $t = () => {
        const Q = Te(document);
        Q && Q.scrollIntoView({ behavior: "smooth" });
      };
    return v.jsxRuntimeExports.jsxs(v.jsxRuntimeExports.Fragment, {
      children: [
        v.jsxRuntimeExports.jsx(Uh, {
          onSuccess: async () => {
            if (fe) {
              window.forceCaptcha = !1;
              try {
                let Q;
                fe.type === "submit"
                  ? (Q = await Xt(X.user, fe.payload))
                  : (Q = await Xe(X.user, fe.payload)),
                  Q.status === 201
                    ? g(!0)
                    : (console.error("Submission failed:", await Q.text()),
                      _(!0));
              } catch (Q) {
                console.error("Error during captcha submission:", Q), _(!0);
              } finally {
                H(null), Z(!1);
              }
            }
          },
          onError: () => {
            H(null), Z(!1);
          },
          visible: $,
        }),
        X.user
          ? R
            ? v.jsxRuntimeExports.jsx(v.jsxRuntimeExports.Fragment, {
                children: v.jsxRuntimeExports.jsx("div", {
                  className: "col-span-1 col-start-1 row-span-1 row-start-1",
                  children: v.jsxRuntimeExports.jsxs("div", {
                    className:
                      "flex flex-col gap-xtight items-center justify-center w-full h-full px-xxloose py-xloose max-w-[500px] mx-auto",
                    children: [
                      v.jsxRuntimeExports.jsx(Di.CustomImage, {
                        className:
                          "w-[calc(176/375*100vw)] block mb-normal max-w-[250px] aspect-square",
                        src: Gh,
                        srcWebp: Wh,
                        alt: "",
                        size: "w_360",
                      }),
                      v.jsxRuntimeExports.jsx("div", {
                        className: "mx-tight text-balance text-center",
                        children: v.jsxRuntimeExports.jsx(z.CosmosTitle, {
                          size: "medium",
                          children: we.successTitle,
                        }),
                      }),
                      v.jsxRuntimeExports.jsxs("div", {
                        className:
                          "w-full mb-xxxloose mt-normal text-center bg-surfaceSolidLightDarker rounded-[8px] p-normal flex items-center justify-between gap-normal",
                        children: [
                          v.jsxRuntimeExports.jsx(z.CosmosText, {
                            size: "x-small",
                            weight: "medium",
                            kind: "subtle",
                            children: we.highestScore,
                          }),
                          v.jsxRuntimeExports.jsx(z.CosmosTitle, {
                            size: "xx-large",
                            weight: "heavy",
                            children: (De && De > Ae.gameScore.score
                              ? De
                              : Ae.gameScore.score
                            ).toLocaleString(),
                          }),
                        ],
                      }),
                      v.jsxRuntimeExports.jsx(z.CosmosButton, {
                        size: "large",
                        width: "full",
                        onClick: Sn,
                        children: we.returnToPage,
                      }),
                      v.jsxRuntimeExports.jsxs("div", {
                        className: "gap-xtight flex items-center",
                        children: [
                          v.jsxRuntimeExports.jsx(z.CosmosButton, {
                            kind: "secondary",
                            size: "medium",
                            onClick: zn,
                            children: we.playAgain,
                          }),
                          v.jsxRuntimeExports.jsx(jt.ShareDrawer, {
                            highestScore:
                              De && De > Ae.gameScore.score
                                ? De
                                : Ae.gameScore.score,
                          }),
                        ],
                      }),
                    ],
                  }),
                }),
              })
            : p
              ? v.jsxRuntimeExports.jsxs("div", {
                  className:
                    "col-span-1 row-span-1 col-start-1 row-start-1 flex flex-col gap-xtight items-center justify-center px-xxloose py-xloose max-w-[500px] mx-auto",
                  children: [
                    v.jsxRuntimeExports.jsxs("div", {
                      className:
                        "mb-xxxloose mx-tight text-balance text-center",
                      children: [
                        v.jsxRuntimeExports.jsx(z.CosmosTitle, {
                          size: "medium",
                          children: we.errorTitle,
                        }),
                        v.jsxRuntimeExports.jsx(z.CosmosText, {
                          size: "small",
                          children: we.errorText,
                        }),
                      ],
                    }),
                    v.jsxRuntimeExports.jsx(z.CosmosButton, {
                      size: "large",
                      width: "full",
                      onClick: Sn,
                      children: we.returnToPage,
                    }),
                    v.jsxRuntimeExports.jsx(z.CosmosButton, {
                      kind: "secondary",
                      size: "medium",
                      onClick: zn,
                      children: we.playAgain,
                    }),
                  ],
                })
              : n && ((i && Ye) || !Ye)
                ? v.jsxRuntimeExports.jsx("div", {
                    className:
                      "flex flex-col col-span-1 col-start-1 row-span-1 row-start-1 justify-center items-center",
                    children: v.jsxRuntimeExports.jsx(z.CosmosSpinner, {
                      className: "w-[40px] h-[40px]",
                      children: " ",
                    }),
                  })
                : v.jsxRuntimeExports.jsx("div", {
                    className:
                      "gap-xxxloose flex overflow-auto flex-col col-span-1 col-start-1 row-span-1 row-start-1 items-center h-full",
                    children: v.jsxRuntimeExports.jsxs("form", {
                      onSubmit: gr,
                      method: "post",
                      className:
                        "flex flex-col gap-normal items-center py-xloose px-xxloose max-w-[600px] w-full",
                      children: [
                        v.jsxRuntimeExports.jsx("div", {
                          className: "mb-tight w-full",
                          children: v.jsxRuntimeExports.jsx(Di.CustomImage, {
                            size: "w_200",
                            src: jh,
                            srcWebp: Dh,
                            alt: "",
                            className: "w-[calc(90/375*100vw)] max-w-[200px]",
                          }),
                        }),
                        v.jsxRuntimeExports.jsxs("div", {
                          className: "gap-xxtight flex flex-col w-full",
                          children: [
                            v.jsxRuntimeExports.jsx(z.CosmosTitle, {
                              size: "medium",
                              children: we.formTitle,
                            }),
                            v.jsxRuntimeExports.jsx(z.CosmosTitle, {
                              size: "xx-small",
                              kind: "subtle",
                              children: we.formText,
                            }),
                          ],
                        }),
                        !n &&
                          v.jsxRuntimeExports.jsx(
                            v.jsxRuntimeExports.Fragment,
                            {
                              children: Oe.map((Q) =>
                                v.jsxRuntimeExports.jsx(
                                  kh,
                                  {
                                    field: Q,
                                    formData: Le,
                                    setFormData: An,
                                    defaultTranslations: we,
                                    isoCountryCodeAlpha2: u.countryCode,
                                    isoLanguageCode: w ? "en" : u.language,
                                    invalid:
                                      !ae &&
                                      ["MobileNumber", "Phone"].includes(
                                        Q.pdbKey || "",
                                      ),
                                  },
                                  Q.id,
                                ),
                              ),
                            },
                          ),
                        v.jsxRuntimeExports.jsxs("div", {
                          className: "gap-normal mb-loose flex flex-col",
                          children: [
                            !n &&
                              (B == null
                                ? void 0
                                : B.renderings.map((Q) =>
                                    v.jsxRuntimeExports.jsx(
                                      Ph,
                                      {
                                        rendering: Q,
                                        formData: Le,
                                        setFormData: An,
                                        type: "local",
                                      },
                                      Q.snippetTranslationId,
                                    ),
                                  )),
                            Ye &&
                              !i &&
                              Ae.submissionConfig.consumerActivationPolicyUrl &&
                              v.jsxRuntimeExports.jsx(z.CosmosCheckbox, {
                                checked: Le.policies.consumerActivation,
                                "validation-message": we.requiredPolicy,
                                onInputchange: (Q) =>
                                  An({
                                    ...Le,
                                    policies: {
                                      ...Le.policies,
                                      consumerActivation: Q.detail.checked,
                                    },
                                  }),
                                children: v.jsxRuntimeExports.jsx("span", {
                                  className: "[&_a]:underline",
                                  dangerouslySetInnerHTML: {
                                    __html:
                                      Ae.submissionConfig
                                        .consumerActivationTranslation,
                                  },
                                }),
                              }),
                          ],
                        }),
                        v.jsxRuntimeExports.jsxs("div", {
                          className:
                            "gap-xtight flex flex-col items-center w-full",
                          children: [
                            v.jsxRuntimeExports.jsx(z.CosmosButton, {
                              size: "large",
                              width: "full",
                              type: "submit",
                              busy: I,
                              children: we.submit,
                            }),
                            v.jsxRuntimeExports.jsx(z.CosmosButton, {
                              kind: "secondary",
                              size: "medium",
                              onClick: Sn,
                              children: we.cancel,
                            }),
                          ],
                        }),
                      ],
                    }),
                  })
          : v.jsxRuntimeExports.jsx(Mh, {}),
      ],
    });
  }
  const mr = ({ isLoading: o = !1, score: n, currentPlayer: i = !1 }) => {
      var w, x;
      const { getTranslation: u } = tt.useRbTranslations(),
        d = { you: u("rbtetris.profile.you", ".You") };
      return v.jsxRuntimeExports.jsxs(v.jsxRuntimeExports.Fragment, {
        children: [
          v.jsxRuntimeExports.jsx("div", {
            className:
              "border-b-[1px] border-surfaceGlassDark10 border-solid col-span-full",
          }),
          v.jsxRuntimeExports.jsxs("div", {
            className: "contents",
            children: [
              o
                ? v.jsxRuntimeExports.jsx(jt.LoadingSkeletonRect, {
                    className: "w-[15px] ml-loose",
                    animate: !0,
                  })
                : v.jsxRuntimeExports.jsx(z.CosmosText, {
                    size: "x-small",
                    weight: "bold",
                    className: "pl-loose rtl:pr-loose rtl:pl-0",
                    children:
                      ((w = n == null ? void 0 : n.rank) == null
                        ? void 0
                        : w.toString().padStart(2, "0")) ?? "",
                  }),
              v.jsxRuntimeExports.jsxs("div", {
                className:
                  "gap-tight py-loose pr-loose rtl:pl-loose rtl:pr-0 flex items-center",
                children: [
                  o
                    ? v.jsxRuntimeExports.jsx("div", {
                        className:
                          "shrink-0 w-[30px] h-[30px] bg-slate-200 rounded-full animate-pulse",
                      })
                    : n &&
                      v.jsxRuntimeExports.jsx(z.CosmosAvatar, {
                        size: "small",
                        name:
                          ((x = n == null ? void 0 : n.playerName) == null
                            ? void 0
                            : x.replace(/\.$/, "")) ?? "",
                        className:
                          "shrink-0 border-surfaceGlassDark20 border-[1px] rounded-full w-[30px] h-[30px]",
                      }),
                  v.jsxRuntimeExports.jsxs("div", {
                    className:
                      "gap-tight flex items-center justify-between w-full",
                    children: [
                      v.jsxRuntimeExports.jsxs("div", {
                        children: [
                          o
                            ? v.jsxRuntimeExports.jsx(jt.LoadingSkeletonRect, {
                                className: "w-[70px] !h-[15px]",
                                animate: !0,
                              })
                            : v.jsxRuntimeExports.jsx(z.CosmosText, {
                                size: "x-small",
                                weight: "medium",
                                children: n == null ? void 0 : n.playerName,
                              }),
                          o
                            ? v.jsxRuntimeExports.jsx(jt.LoadingSkeletonRect, {
                                className: "w-[50px] !h-[12px] mt-[2px]",
                                animate: !0,
                              })
                            : v.jsxRuntimeExports.jsx(z.CosmosText, {
                                size: "xx-small",
                                kind: "subtle",
                                children: n == null ? void 0 : n.score,
                              }),
                        ],
                      }),
                      i &&
                        n &&
                        v.jsxRuntimeExports.jsx(z.CosmosBadge, {
                          size: "small",
                          kind: "primary",
                          className: "ml-tight rtl:mr-tight rtl:ml-0",
                          children: d.you,
                        }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      });
    },
    sf = ({ isLoading: o, data: n, userScore: i }) => {
      var d, w, x, R, g, p, _, T;
      const { rbAccount: u } = jt.useRbAccount();
      return v.jsxRuntimeExports.jsx("div", {
        className:
          "grid grid-cols-[auto_1fr] grid-rows-[auto_1fr_auto_1fr_auto_1fr_auto_1fr] items-center gap-x-tight min-h-[332px]",
        children: o
          ? v.jsxRuntimeExports.jsx(v.jsxRuntimeExports.Fragment, {
              children: Array.from({ length: 4 }).map((b) =>
                v.jsxRuntimeExports.jsx(mr, { score: null, isLoading: !0 }),
              ),
            })
          : n.length > 0
            ? v.jsxRuntimeExports.jsxs(v.jsxRuntimeExports.Fragment, {
                children: [
                  n == null
                    ? void 0
                    : n.map((b) => v.jsxRuntimeExports.jsx(mr, { score: b })),
                  v.jsxRuntimeExports.jsx(mr, {
                    currentPlayer: !0,
                    score: {
                      id: "",
                      playerId: "",
                      rank: n[n.length - 1].rank + 1,
                      avatarLink:
                        ((w = (d = u.user) == null ? void 0 : d.userProfile) ==
                        null
                          ? void 0
                          : w.avatar_link) || void 0,
                      playerName:
                        ((R = (x = u.user) == null ? void 0 : x.userProfile) ==
                        null
                          ? void 0
                          : R.displayname) || "Unknown Player",
                      score: i,
                    },
                  }),
                  n.length < 4 &&
                    v.jsxRuntimeExports.jsx("div", {
                      className:
                        "border-b-[1px] border-surfaceGlassDark10 border-solid col-span-full",
                    }),
                ],
              })
            : v.jsxRuntimeExports.jsxs(v.jsxRuntimeExports.Fragment, {
                children: [
                  v.jsxRuntimeExports.jsx(mr, {
                    currentPlayer: !0,
                    score: {
                      id: "",
                      playerId: "",
                      rank: 1,
                      avatarLink:
                        ((p = (g = u.user) == null ? void 0 : g.userProfile) ==
                        null
                          ? void 0
                          : p.avatar_link) || void 0,
                      playerName:
                        ((T = (_ = u.user) == null ? void 0 : _.userProfile) ==
                        null
                          ? void 0
                          : T.displayname) || "Unknown Player",
                      score: i,
                    },
                  }),
                  Array.from({ length: 3 }).map((b, B) =>
                    v.jsxRuntimeExports.jsx(mr, { score: null }),
                  ),
                ],
              }),
      });
    };
  function of({ onSubmit: o }) {
    var Z, fe;
    const {
        gameOver: n,
        playAgain: i,
        leaderboards: u,
      } = v.reactExports.useContext(pr),
      d = Xr(),
      { getTranslation: w } = tt.useRbTranslations(),
      { loadLocaleData: x, getCountryName: R } =
        jt.useLocalizedCountryNamesContext(),
      [g, p] = v.reactExports.useState(void 0),
      _ =
        (u == null ? void 0 : u.playingLeaderboard.id) !==
        (u == null ? void 0 : u.nationalLeaderboard.id),
      [T, b] = v.reactExports.useState(
        (u == null ? void 0 : u.playingLeaderboard.id) ?? "",
      ),
      [B, D] = v.reactExports.useState(null),
      [I, j] = v.reactExports.useState(!0),
      [X, ae] = v.reactExports.useState(!0),
      K = {
        title: w(
          "rbtetris.leaderboard.popup.header",
          ".Keep playing and stack your score!",
        ),
        text: w(
          "rbtetris.leaderboard.popup.score_text",
          ".Your current score is {{user highscore}}. Why stop now?",
        ),
        globalLabel: w("rbtetris.leaderboard.global", ".Global"),
        submit: w(
          "rbtetris.popup.button.save_and_submit",
          ".Submit & Enter Competition",
        ),
        playAgain: w("rbtetris.popup.button.play_again", ".Play Again"),
        leaderboardLabel: w("rbtetris.leaderboard.header", ".Leaderboard"),
      },
      $ = (H) => {
        const ee = H.detail.value;
        b(ee);
      };
    return (
      v.reactExports.useEffect(() => {
        x().then(() => {
          p(R(d.countryCode === "INT" ? "AL" : d.countryCode));
        });
      }, []),
      v.reactExports.useEffect(() => {
        if (I === !0) {
          const H = setTimeout(() => {
            I === !0 && ae(!0);
          }, 100);
          return () => clearTimeout(H);
        } else
          setTimeout(
            () => {
              ae(!1);
            },
            X ? 1e3 : 0,
          );
      }, [I]),
      v.reactExports.useEffect(() => {
        (async () => {
          if (!(B != null && B[T])) {
            ae(!0), j(!0);
            try {
              const ee = await tt.getSurroundingScores(
                T,
                n == null ? void 0 : n.gameScore.score,
              );
              D({ ...B, [T]: ee }), j(!1);
            } catch (ee) {
              j(!1), console.error(ee);
            }
          }
        })();
      }, [T]),
      v.jsxRuntimeExports.jsx("div", {
        className:
          "flex flex-col items-center justify-center col-span-1 col-start-1 row-span-1 row-start-1",
        children: v.jsxRuntimeExports.jsxs("div", {
          className:
            "gap-xxxloose py-xxloose max-h-dvh flex flex-col items-center w-full overflow-y-auto",
          children: [
            v.jsxRuntimeExports.jsxs("div", {
              className: "gap-normal px-xloose flex flex-col items-center",
              children: [
                v.jsxRuntimeExports.jsx(z.CosmosTitle, {
                  size: "medium",
                  className: "text-center",
                  children: K.title,
                }),
                v.jsxRuntimeExports.jsx(z.CosmosText, {
                  size: "medium",
                  className: "text-center",
                  children: v.jsxRuntimeExports.jsx("span", {
                    dangerouslySetInnerHTML: {
                      __html:
                        (fe = K.text) == null
                          ? void 0
                          : fe.replace(
                              "{{user highscore}}",
                              (Z = n == null ? void 0 : n.gameScore) == null
                                ? void 0
                                : Z.score.toString(),
                            ),
                    },
                  }),
                }),
                v.jsxRuntimeExports.jsxs("div", {
                  className: "bg-surfaceSolidLight w-[304px]",
                  children: [
                    u != null && u.playingLeaderboard.isPrivate
                      ? v.jsxRuntimeExports.jsx("div", {
                          className: "p-normal",
                          children: v.jsxRuntimeExports.jsx(z.CosmosText, {
                            size: "x-small",
                            weight: "medium",
                            children:
                              u == null ? void 0 : u.playingLeaderboard.name,
                          }),
                        })
                      : v.jsxRuntimeExports.jsx("div", {
                          className: "p-normal min-h-[107px]",
                          children:
                            g &&
                            v.jsxRuntimeExports.jsxs(z.CosmosSelect, {
                              className: "custom-select",
                              label: K.leaderboardLabel,
                              onInputchange: $,
                              children: [
                                v.jsxRuntimeExports.jsx(z.CosmosOption, {
                                  value: "global",
                                  children: K.globalLabel,
                                }),
                                v.jsxRuntimeExports.jsx(z.CosmosOption, {
                                  value:
                                    u == null
                                      ? void 0
                                      : u.nationalLeaderboard.id,
                                  selected: !_,
                                  children: g,
                                }),
                                _ &&
                                  v.jsxRuntimeExports.jsx(z.CosmosOption, {
                                    value:
                                      u == null
                                        ? void 0
                                        : u.playingLeaderboard.id,
                                    selected: !0,
                                    children:
                                      u == null
                                        ? void 0
                                        : u.playingLeaderboard.name,
                                  }),
                              ],
                            }),
                        }),
                    v.jsxRuntimeExports.jsx(sf, {
                      isLoading: X,
                      data: (B == null ? void 0 : B[T]) ?? [],
                      userScore: n == null ? void 0 : n.gameScore.score,
                    }),
                  ],
                }),
              ],
            }),
            v.jsxRuntimeExports.jsxs("div", {
              className: "gap-xtight flex flex-col items-center",
              children: [
                v.jsxRuntimeExports.jsx(z.CosmosButton, {
                  size: "large",
                  onClick: o,
                  width: "full",
                  children: K.submit,
                }),
                v.jsxRuntimeExports.jsx(z.CosmosButton, {
                  kind: "secondary",
                  onClick: i,
                  children: K.playAgain,
                }),
              ],
            }),
          ],
        }),
      })
    );
  }
  const fa =
      "https://p-p.redbull.com/rb-red-bull-tetris-7k-ff-prod/assets/overlay-bg-Dev1Lo6H.jpg",
    da =
      "https://p-p.redbull.com/rb-red-bull-tetris-7k-ff-prod/assets/overlay-bg.jpg-DeF_cp6r.webp";
  function af() {
    const { rbAccount: o } = jt.useRbAccount(),
      [n, i] = v.reactExports.useState(!1),
      [u, d] = v.reactExports.useState(!0),
      [w, x] = v.reactExports.useState(!1),
      [R, g] = v.reactExports.useState(!1),
      [p, _] = v.reactExports.useState(null),
      { forceEn: T, enTranslationsLoading: b } = tt.useRbTranslations(),
      [B, D] = v.reactExports.useState(!1),
      { gameOver: I } = v.reactExports.useContext(pr);
    v.reactExports.useEffect(() => {
      localStorage.getItem("game-login-session") &&
        (i(!0), localStorage.removeItem("game-login-session")),
        (async () => {
          const K = await o.RBAccounts.getJwt(),
            $ = await tt.getGamePlayer(K);
          if ((d(!1), $ != null && $.id)) {
            if ((_($.id), !I || !I.submissionConfig)) return;
            const Z = await fetch(
              `https://game.tetris.redbull.com/api/v1/webhooks/forms/consent/${$.id}`,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${K}`,
                },
              },
            );
            if (Z.ok) {
              const H = (await Z.json()).find(
                (De) => De.nationalLeaderboardId === I.submissionConfig.id,
              );
              if (!H) {
                x(!1), g(!I.submissionConfig.consumerActivationPolicyUrl);
                return;
              }
              const ee = I.submissionConfig.consumerActivationPolicyUrl
                ? H.acceptedCAPolicy
                : !0;
              x(!0), g(ee);
            }
          }
        })();
    }, []),
      v.reactExports.useEffect(() => {
        window.AwsWafIntegration
          ? D(!0)
          : window.addEventListener("aws-waf-captcha-script-ready", () => {
              setTimeout(() => {
                D(!0);
              }, 700);
            });
      }, []);
    const j = async () => {
      i(!0);
    };
    return v.jsxRuntimeExports.jsxs("div", {
      className: "grid relative grid-cols-1 grid-rows-1 w-full h-full",
      children: [
        v.jsxRuntimeExports.jsx(Di.CustomImage, {
          className:
            "object-cover col-span-1 col-start-1 row-span-1 row-start-1 w-full h-full",
          src: fa,
          srcWebp: da,
          alt: "",
          size: "h_1200",
        }),
        u || (T && b) || !B
          ? v.jsxRuntimeExports.jsx("div", {
              className:
                "flex flex-col col-span-1 col-start-1 row-span-1 row-start-1 justify-center items-center",
              children: v.jsxRuntimeExports.jsx(z.CosmosSpinner, {
                className: "w-[40px] h-[40px]",
                children: " ",
              }),
            })
          : n
            ? v.jsxRuntimeExports.jsx(rf, {
                gameUserId: p,
                isReturningUser: w,
                hasConsented: R,
              })
            : v.jsxRuntimeExports.jsx(of, { onSubmit: j }),
      ],
    });
  }
  function uf() {
    return v.jsxRuntimeExports.jsx("div", {
      className:
        "fixed top-0 left-0 w-full h-full bg-white/80 backdrop-blur z-[9998] flex flex-col items-center justify-center w-full",
      children: v.jsxRuntimeExports.jsx(af, {}),
    });
  }
  const pr = v.reactExports.createContext({
    leaderboards: null,
    playAgain: () => {},
    exitGame: () => {},
    gameOver: { submissionConfig: {}, gameScore: {} },
  });
  function cf({
    onGameLoaded: o,
    onGameLoadProgress: n,
    leaderboardId: i,
    onExitGame: u,
  }) {
    const { getTranslation: d } = tt.useRbTranslations(),
      {
        unityProvider: w,
        isLoaded: x,
        loadingProgression: R,
        unload: g,
        sendMessage: p,
        initialisationError: _,
        UNSAFE__detachAndUnloadImmediate: T,
      } = ji.exportsExports.useUnityContext(hh),
      { language: b } = Xr(),
      {
        setGameOver: B,
        gameOver: D,
        gameSessionId: I,
        leaderboards: j,
        gameMainMenuLoaded: X,
        setGameMainMenuLoaded: ae,
      } = oh({
        leaderboardId: i,
        languageCode: b,
        onSessionDisconnected: () => {
          fe(!0);
        },
        onGameStarted: () => {
          Qh();
        },
        onGameOverError: (Le) => {
          ee(Le);
        },
      }),
      [K, $] = v.reactExports.useState(!1),
      [Z, fe] = v.reactExports.useState(!1),
      [H, ee] = v.reactExports.useState(null),
      Pe = {
        sessionExpired: d("rbtetris.game.session_expired", ".Session Expired"),
        cancel: d("rbtetris.popup.button.cancel", ".Cancel"),
      };
    v.reactExports.useEffect(() => {
      D && tf();
    }, [D]),
      v.reactExports.useEffect(() => {
        _ && console.error("Unity Initialisation error", _);
      }, [_]),
      v.reactExports.useEffect(() => {
        x && I && (o == null || o({ unloadGame: g }));
      }, [x, I]),
      v.reactExports.useEffect(
        () => (
          (window.OnGameInitialized = () => {
            I && p("RB25G1WebInterfaceMB", "SetSID", I);
          }),
          () => {
            window.OnGameInitialized = void 0;
          }
        ),
        [p, I],
      ),
      v.reactExports.useEffect(() => {
        R && (n == null || n(R));
      }, [R]),
      v.reactExports.useEffect(() => {
        const Le = localStorage.getItem("game-login-session");
        Le ? (B(JSON.parse(Le)), $(!0)) : $h();
      }, []);
    const De = () => {
        ef(), B(!1), $(!1);
      },
      we = async () => {
        Zh(),
          ae(!1),
          Promise.all([T(), new Promise((Le) => setTimeout(Le, 2e3))]).finally(
            () => {
              window.location.reload();
            },
          );
      };
    return v.jsxRuntimeExports.jsxs(v.jsxRuntimeExports.Fragment, {
      children: [
        !K &&
          v.jsxRuntimeExports.jsxs(v.jsxRuntimeExports.Fragment, {
            children: [
              v.jsxRuntimeExports.jsx("div", {
                className: "fixed top-normal right-normal z-[9999]",
                children: v.jsxRuntimeExports.jsx(z.CosmosButton, {
                  shape: "circle",
                  size: "small",
                  onClick: we,
                  children: v.jsxRuntimeExports.jsx(z.CosmosIconClose, {
                    slot: "icon",
                  }),
                }),
              }),
              v.jsxRuntimeExports.jsx(ji.TetrisLoader, {
                isLoaded: x && X && !!I,
              }),
              v.jsxRuntimeExports.jsx(ji.exportsExports.Unity, {
                unityProvider: w,
                tabIndex: 1,
                style: {
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  zIndex: 1e3,
                  backgroundColor: "white",
                },
              }),
            ],
          }),
        D &&
          v.jsxRuntimeExports.jsx(pr.Provider, {
            value: {
              leaderboards: j,
              gameOver: D,
              playAgain: De,
              exitGame: we,
            },
            children: v.jsxRuntimeExports.jsx(uf, {}),
          }),
        v.jsxRuntimeExports.jsx(pt.Dialog, {
          open: Z,
          children: v.jsxRuntimeExports.jsxs(pt.DialogContent, {
            className:
              "max-w-[500px] w-full p-tight gap-loose max-h-full overflow-y-auto bg-transparent flex flex-col items-center pb-xxloose shadow-none z-[99999]",
            children: [
              v.jsxRuntimeExports.jsx(pt.DialogHeader, { className: "hidden" }),
              v.jsxRuntimeExports.jsxs("div", {
                className:
                  "gap-normal p-loose flex flex-col bg-white rounded-[8px] w-full relative loop-elevate-1 items-center ",
                children: [
                  v.jsxRuntimeExports.jsx(z.CosmosTitle, {
                    children: Pe.sessionExpired,
                  }),
                  v.jsxRuntimeExports.jsx("div", {
                    className: "gap-xtight flex flex-col items-center w-full",
                    children: v.jsxRuntimeExports.jsx(z.CosmosButton, {
                      kind: "secondary",
                      onClick: we,
                      children: Pe.cancel,
                    }),
                  }),
                ],
              }),
            ],
          }),
        }),
        v.jsxRuntimeExports.jsx(pt.Dialog, {
          open: !!H,
          children: v.jsxRuntimeExports.jsx(pt.DialogContent, {
            className:
              "max-w-[500px] w-full p-tight gap-loose max-h-full overflow-y-auto bg-transparent flex flex-col items-center pb-xxloose shadow-none z-[99999]",
            children: v.jsxRuntimeExports.jsxs("div", {
              className:
                "gap-normal p-loose flex flex-col bg-white rounded-[8px] w-full relative loop-elevate-1 items-center ",
              children: [
                v.jsxRuntimeExports.jsx("div", {
                  className: "gap-normal flex flex-col items-center my-8",
                  children: v.jsxRuntimeExports.jsx(z.CosmosIconNoConnection, {
                    className: "text-6xl",
                  }),
                }),
                v.jsxRuntimeExports.jsx("div", {
                  className: "gap-xtight flex flex-col items-center w-full",
                  children: v.jsxRuntimeExports.jsx(z.CosmosButton, {
                    kind: "secondary",
                    onClick: we,
                    children: Pe.cancel,
                  }),
                }),
              ],
            }),
          }),
        }),
      ],
    });
  }
  const lf = v.reactExports.forwardRef(({ leaderboardId: o }, n) => {
    const [i, u] = v.reactExports.useState(!1);
    v.reactExports.useImperativeHandle(n, () => ({ startGame: d }));
    const d = () => {
        u(!0);
      },
      w = () => {
        u(!1);
      };
    return i
      ? v.jsxRuntimeExports.jsx(pt.Dialog, {
          open: i,
          children: v.jsxRuntimeExports.jsx(pt.DialogContent, {
            className: "max-w-full z-[9999] m-0 p-0",
            children: v.jsxRuntimeExports.jsx("div", {
              className: "h-dvh w-screen",
              children: v.jsxRuntimeExports.jsx(cf, {
                leaderboardId: o,
                onExitGame: w,
              }),
            }),
          }),
        })
      : null;
  });
  (Tt.LocaleProvider = Nh),
    (Tt.TetrisGameLauncher = lf),
    (Tt.isInGamePlayingMode = sh),
    (Tt.overlayBgImage = fa),
    (Tt.overlayBgImageWebp = da);
});
