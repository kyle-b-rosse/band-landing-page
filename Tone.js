! function(root) {
    "use strict";

    function mainModule(a) {
        Tone = a()
    }

    function toneModule(a) {
        a(Tone)
    }
    var Tone;

    mainModule(function() {
        function a(a) {
            return void 0 === a
        }
        var b, c, d, e;
        if (a(window.AudioContext) && (window.AudioContext = window.webkitAudioContext), a(window.OfflineAudioContext) && (window.OfflineAudioContext = window.webkitOfflineAudioContext), a(AudioContext)) throw new Error("Web Audio is not supported in this browser");
        return b = new AudioContext, "function" != typeof AudioContext.prototype.createGain && (AudioContext.prototype.createGain = AudioContext.prototype.createGainNode), "function" != typeof AudioContext.prototype.createDelay && (AudioContext.prototype.createDelay = AudioContext.prototype.createDelayNode), "function" != typeof AudioContext.prototype.createPeriodicWave && (AudioContext.prototype.createPeriodicWave = AudioContext.prototype.createWaveTable), "function" != typeof AudioBufferSourceNode.prototype.start && (AudioBufferSourceNode.prototype.start = AudioBufferSourceNode.prototype.noteGrainOn), "function" != typeof AudioBufferSourceNode.prototype.stop && (AudioBufferSourceNode.prototype.stop = AudioBufferSourceNode.prototype.noteOff), "function" != typeof OscillatorNode.prototype.start && (OscillatorNode.prototype.start = OscillatorNode.prototype.noteOn), "function" != typeof OscillatorNode.prototype.stop && (OscillatorNode.prototype.stop = OscillatorNode.prototype.noteOff), "function" != typeof OscillatorNode.prototype.setPeriodicWave && (OscillatorNode.prototype.setPeriodicWave = OscillatorNode.prototype.setWaveTable), AudioNode.prototype._nativeConnect = AudioNode.prototype.connect, AudioNode.prototype.connect = function(b, c, d) {
            if (b.input) Array.isArray(b.input) ? (a(d) && (d = 0), this.connect(b.input[d])) : this.connect(b.input, c, d);
            else try {
                b instanceof AudioNode ? this._nativeConnect(b, c, d) : this._nativeConnect(b, c)
            } catch (e) {
                throw new Error("error connecting to node: " + b)
            }
        }, c = function(b, c) {
            a(b) || 1 === b ? this.input = this.context.createGain() : b > 1 && (this.input = new Array(b)), a(c) || 1 === c ? this.output = this.context.createGain() : c > 1 && (this.output = new Array(b))
        }, c.context = b, c.prototype.context = c.context, c.prototype.bufferSize = 2048, c.prototype.bufferTime = c.prototype.bufferSize / c.context.sampleRate, c.prototype.connect = function(a, b, c) {
            Array.isArray(this.output) ? (b = this.defaultArg(b, 0), this.output[b].connect(a, 0, c)) : this.output.connect(a, b, c)
        }, c.prototype.disconnect = function(a) {
            Array.isArray(this.output) ? (a = this.defaultArg(a, 0), this.output[a].disconnect()) : this.output.disconnect()
        }, c.prototype.connectSeries = function() {
            var a, b, c;
            if (arguments.length > 1)
                for (a = arguments[0], b = 1; b < arguments.length; b++) c = arguments[b], a.connect(c), a = c
        }, c.prototype.connectParallel = function() {
            var a, b, c = arguments[0];
            if (arguments.length > 1)
                for (a = 1; a < arguments.length; a++) b = arguments[a], c.connect(b)
        }, c.prototype.chain = function() {
            var a, b, c;
            if (arguments.length > 0)
                for (a = this, b = 0; b < arguments.length; b++) c = arguments[b], a.connect(c), a = c
        }, c.prototype.fan = function() {
            if (arguments.length > 0)
                for (var a = 1; a < arguments.length; a++) this.connect(arguments[a])
        }, AudioNode.prototype.chain = c.prototype.chain, AudioNode.prototype.fan = c.prototype.fan, c.prototype.defaultArg = function(b, c) {
            var d, e, f;
            if ("object" == typeof b && "object" == typeof c) {
                d = {};
                for (e in b) d[e] = this.defaultArg(b[e], b[e]);
                for (f in c) d[f] = this.defaultArg(b[f], c[f]);
                return d
            }
            return a(b) ? c : b
        }, c.prototype.optionsObject = function(a, b, c) {
            var d, e = {};
            if (1 === a.length && "object" == typeof a[0]) e = a[0];
            else
                for (d = 0; d < b.length; d++) e[b[d]] = a[d];
            return this.isUndef(c) ? e : this.defaultArg(e, c)
        }, c.prototype.isUndef = a, c.prototype.equalPowerScale = function(a) {
            var b = .5 * Math.PI;
            return Math.sin(a * b)
        }, c.prototype.logScale = function(a) {
            return Math.max(this.normalize(this.gainToDb(a), -100, 0), 0)
        }, c.prototype.expScale = function(a) {
            return this.dbToGain(this.interpolate(a, -100, 0))
        }, c.prototype.dbToGain = function(a) {
            return Math.pow(2, a / 6)
        }, c.prototype.gainToDb = function(a) {
            return 20 * (Math.log(a) / Math.LN10)
        }, c.prototype.interpolate = function(a, b, c) {
            return a * (c - b) + b
        }, c.prototype.normalize = function(a, b, c) {
            if (b > c) {
                var d = c;
                c = b, b = d
            } else if (b == c) return 0;
            return (a - b) / (c - b)
        }, c.prototype.dispose = function() {
            this.isUndef(this.input) || (this.input instanceof AudioNode && this.input.disconnect(), this.input = null), this.isUndef(this.output) || (this.output instanceof AudioNode && this.output.disconnect(), this.output = null)
        }, d = null, c.prototype.noGC = function() {
            this.output.connect(d)
        }, AudioNode.prototype.noGC = function() {
            this.connect(d)
        }, c.prototype.now = function() {
            return this.context.currentTime
        }, c.prototype.samplesToSeconds = function(a) {
            return a / this.context.sampleRate
        }, c.prototype.toSamples = function(a) {
            var b = this.toSeconds(a);
            return Math.round(b * this.context.sampleRate)
        }, c.prototype.toSeconds = function(a, b) {
            if (b = this.defaultArg(b, this.now()), "number" == typeof a) return a;
            if ("string" == typeof a) {
                var c = 0;
                return "+" === a.charAt(0) && (a = a.slice(1), c = b), parseFloat(a) + c
            }
            return b
        }, c.prototype.frequencyToSeconds = function(a) {
            return 1 / parseFloat(a)
        }, c.prototype.secondsToFrequency = function(a) {
            return 1 / a
        }, e = [], c._initAudioContext = function(a) {
            a(c.context), e.push(a)
        }, c.setContext = function(a) {
            c.prototype.context = a, c.context = a;
            for (var b = 0; b < e.length; b++) e[b](a)
        }, c.extend = function(b, d) {
            function e() {}
            a(d) && (d = c), e.prototype = d.prototype, b.prototype = new e, b.prototype.constructor = b
        }, c.startMobile = function() {
            var a, b = c.context.createOscillator(),
                d = c.context.createGain();
            d.gain.value = 0, b.connect(d), d.connect(c.context.destination), a = c.context.currentTime, b.start(a), b.stop(a + 1)
        }, c._initAudioContext(function(a) {
            c.prototype.bufferTime = c.prototype.bufferSize / a.sampleRate, d = a.createGain(), d.gain.value = 0, d.connect(a.destination)
        }), console.log("%c * Tone.js r3 * ", "background: #000; color: #fff"), c
    }), toneModule(function(a) {
        return a.SignalBase = function() {}, a.extend(a.SignalBase), a.SignalBase.prototype.connect = function(b, c, d) {
            b instanceof a.Signal ? b.setValue(0) : b instanceof AudioParam && (b.value = 0), a.prototype.connect.call(this, b, c, d)
        }, a.SignalBase.prototype.dispose = function() {
            a.prototype.dispose.call(this)
        }, a.SignalBase
    }), toneModule(function(a) {
        return a.WaveShaper = function(a, b) {
            this._shaper = this.input = this.output = this.context.createWaveShaper(), this._curve = null, Array.isArray(a) ? this.setCurve(a) : isFinite(a) || this.isUndef(a) ? this._curve = new Float32Array(this.defaultArg(a, 1024)) : "function" == typeof a && (this._curve = new Float32Array(this.defaultArg(b, 1024)), this.setMap(a))
        }, a.extend(a.WaveShaper, a.SignalBase), a.WaveShaper.prototype.setMap = function(a) {
            var b, c, d, e;
            for (b = 0, c = this._curve.length; c > b; b++) d = b / c * 2 - 1, e = b / (c - 1) * 2 - 1, this._curve[b] = a(d, b, e);
            this._shaper.curve = this._curve
        }, a.WaveShaper.prototype.setCurve = function(a) {
            if (this._isSafari()) {
                var b = a[0];
                a.unshift(b)
            }
            this._curve = new Float32Array(a), this._shaper.curve = this._curve
        }, a.WaveShaper.prototype.setOversample = function(a) {
            this._shaper.oversample = a
        }, a.WaveShaper.prototype._isSafari = function() {
            var a = navigator.userAgent.toLowerCase();
            return -1 !== a.indexOf("safari") && -1 === a.indexOf("chrome")
        }, a.WaveShaper.prototype.dispose = function() {
            a.prototype.dispose.call(this), this._shaper.disconnect(), this._shaper = null, this._curve = null
        }, a.WaveShaper
    }), toneModule(function(a) {
        return a.Signal = function(b) {
            this._scalar = this.context.createGain(), this.input = this.output = this.context.createGain(), this._syncRatio = 1, this.value = this.defaultArg(b, 0), a.Signal._constant.chain(this._scalar, this.output)
        }, a.extend(a.Signal, a.SignalBase), a.Signal.prototype.getValue = function() {
            return this._scalar.gain.value
        }, a.Signal.prototype.setValue = function(a) {
            0 === this._syncRatio ? a = 0 : a *= this._syncRatio, this._scalar.gain.value = a
        }, a.Signal.prototype.setValueAtTime = function(a, b) {
            a *= this._syncRatio, this._scalar.gain.setValueAtTime(a, this.toSeconds(b))
        }, a.Signal.prototype.setCurrentValueNow = function(a) {
            a = this.defaultArg(a, this.now());
            var b = this.getValue();
            return this.cancelScheduledValues(a), this._scalar.gain.setValueAtTime(b, a), b
        }, a.Signal.prototype.linearRampToValueAtTime = function(a, b) {
            a *= this._syncRatio, this._scalar.gain.linearRampToValueAtTime(a, this.toSeconds(b))
        }, a.Signal.prototype.exponentialRampToValueAtTime = function(a, b) {
            a *= this._syncRatio;
            try {
                this._scalar.gain.exponentialRampToValueAtTime(a, this.toSeconds(b))
            } catch (c) {
                this._scalar.gain.linearRampToValueAtTime(a, this.toSeconds(b))
            }
        }, a.Signal.prototype.exponentialRampToValueNow = function(a, b) {
            var c = this.now();
            this.setCurrentValueNow(c), "+" === b.toString().charAt(0) && (b = b.substr(1)), this.exponentialRampToValueAtTime(a, c + this.toSeconds(b))
        }, a.Signal.prototype.linearRampToValueNow = function(a, b) {
            var c = this.now();
            this.setCurrentValueNow(c), a *= this._syncRatio, "+" === b.toString().charAt(0) && (b = b.substr(1)), this._scalar.gain.linearRampToValueAtTime(a, c + this.toSeconds(b))
        }, a.Signal.prototype.setTargetAtTime = function(a, b, c) {
            a *= this._syncRatio, this._scalar.gain.setTargetAtTime(a, this.toSeconds(b), c)
        }, a.Signal.prototype.setValueCurveAtTime = function(a, b, c) {
            for (var d = 0; d < a.length; d++) a[d] *= this._syncRatio;
            this._scalar.gain.setValueCurveAtTime(a, this.toSeconds(b), this.toSeconds(c))
        }, a.Signal.prototype.cancelScheduledValues = function(a) {
            this._scalar.gain.cancelScheduledValues(this.toSeconds(a))
        }, a.Signal.prototype.sync = function(a, b) {
            this._syncRatio = b ? b : 0 !== a.getValue() ? this.getValue() / a.getValue() : 0, this._scalar.disconnect(), this._scalar = this.context.createGain(), this.connectSeries(a, this._scalar, this.output), this._scalar.gain.value = this._syncRatio
        }, a.Signal.prototype.unsync = function() {
            var b = this.getValue();
            this._scalar.disconnect(), this._scalar = this.context.createGain(), this._scalar.gain.value = b / this._syncRatio, this._syncRatio = 1, a.Signal._constant.chain(this._scalar, this.output)
        }, a.Signal.prototype.dispose = function() {
            a.prototype.dispose.call(this), this._scalar.disconnect(), this._scalar = null
        }, Object.defineProperty(a.Signal.prototype, "value", {
            get: function() {
                return this.getValue()
            },
            set: function(a) {
                this.setValue(a)
            }
        }), a.Signal._generator = null, a.Signal._constant = null, a._initAudioContext(function(b) {
            a.Signal._generator = b.createOscillator(), a.Signal._constant = new a.WaveShaper([1, 1]), a.Signal._generator.connect(a.Signal._constant), a.Signal._generator.start(0), a.Signal._generator.noGC()
        }), a.Signal
    }), toneModule(function(a) {
        return a.Pow = function(b) {
            b = this.defaultArg(b, 1), this._expScaler = this.input = this.output = new a.WaveShaper(this._expFunc(b), 8192)
        }, a.extend(a.Pow, a.SignalBase), a.Pow.prototype.setExponent = function(a) {
            this._expScaler.setMap(this._expFunc(a))
        }, a.Pow.prototype._expFunc = function(a) {
            return function(b) {
                return Math.pow(Math.abs(b), a)
            }
        }, a.Pow.prototype.dispose = function() {
            a.prototype.dispose.call(this), this._expScaler.dispose(), this._expScaler = null
        }, a.Pow
    }), toneModule(function(a) {
        return a.Envelope = function() {
            var b = this.optionsObject(arguments, ["attack", "decay", "sustain", "release"], a.Envelope.defaults);
            this.attack = b.attack, this.decay = b.decay, this.sustain = b.sustain, this.release = b.release, this._sig = new a.Signal(0), this._exp = this.output = new a.Pow(b.exponent), this._sig.connect(this._exp)
        }, a.extend(a.Envelope), a.Envelope.defaults = {
            attack: .01,
            decay: .1,
            sustain: .5,
            release: 1,
            exponent: 1
        }, a.Envelope.prototype.set = function(a) {
            this.isUndef(a.attack) || this.setAttack(a.attack), this.isUndef(a.decay) || this.setDecay(a.decay), this.isUndef(a.sustain) || this.setSustain(a.sustain), this.isUndef(a.release) || this.setRelease(a.release), this.isUndef(a.exponent) || this.setExponent(a.exponent)
        }, a.Envelope.prototype.setAttack = function(a) {
            this.attack = a
        }, a.Envelope.prototype.setDecay = function(a) {
            this.decay = a
        }, a.Envelope.prototype.setRelease = function(a) {
            this.release = a
        }, a.Envelope.prototype.setSustain = function(a) {
            this.sustain = a
        }, a.Envelope.prototype.setExponent = function(a) {
            this._exp.setExponent(a)
        }, a.Envelope.prototype._timeMult = .25, a.Envelope.prototype.triggerAttack = function(a, b) {
            var c, d, e, f;
            b = this.defaultArg(b, 1), c = this.toSeconds(this.attack), d = this.toSeconds(this.decay), e = b, f = this.sustain, a = this.toSeconds(a), this._sig.cancelScheduledValues(a), this._sig.setTargetAtTime(e, a, c * this._timeMult), this._sig.setTargetAtTime(f, a + c, d * this._timeMult)
        }, a.Envelope.prototype.triggerRelease = function(a) {
            a = this.toSeconds(a), this._sig.cancelScheduledValues(a);
            var b = this.toSeconds(this.release);
            this._sig.setTargetAtTime(0, a, b * this._timeMult)
        }, a.Envelope.prototype.triggerAttackRelease = function(a, b, c) {
            b = this.toSeconds(b), this.triggerAttack(b, c), this.triggerRelease(b + this.toSeconds(a))
        }, a.Envelope.prototype.connect = a.Signal.prototype.connect, a.Envelope.prototype.dispose = function() {
            a.prototype.dispose.call(this), this._sig.dispose(), this._sig = null, this._exp.dispose(), this._exp = null
        }, a.Envelope
    }), toneModule(function(a) {
        return a.AmplitudeEnvelope = function() {
            a.Envelope.apply(this, arguments), this.input = this.output = this.context.createGain(), this._sig.connect(this.output.gain)
        }, a.extend(a.AmplitudeEnvelope, a.Envelope), a.AmplitudeEnvelope.prototype.dispose = function() {
            a.Envelope.prototype.dispose.call(this)
        }, a.AmplitudeEnvelope
    }), toneModule(function(a) {
        return a.Compressor = function() {
            var b = this.optionsObject(arguments, ["threshold", "ratio"], a.Compressor.defaults);
            this._compressor = this.context.createDynamicsCompressor(), this.input = this._compressor, this.output = this._compressor, this.threshold = this._compressor.threshold, this.attack = this._compressor.attack, this.release = this._compressor.release, this.knee = this._compressor.knee, this.ratio = this._compressor.ratio, this.set(b)
        }, a.extend(a.Compressor), a.Compressor.defaults = {
            ratio: 12,
            threshold: -24,
            release: .25,
            attack: .003,
            knee: 30
        }, a.Compressor.prototype.set = function(a) {
            this.isUndef(a.attack) || this.setAttack(a.attack), this.isUndef(a.release) || this.setRelease(a.release), this.isUndef(a.threshold) || this.setThreshold(a.threshold), this.isUndef(a.knee) || this.setKnee(a.knee), this.isUndef(a.ratio) || this.setRatio(a.ratio)
        }, a.Compressor.prototype.setAttack = function(a) {
            this._compressor.attack.value = this.toSeconds(a)
        }, a.Compressor.prototype.setRelease = function(a) {
            this._compressor.release.value = this.toSeconds(a)
        }, a.Compressor.prototype.setThreshold = function(a) {
            this._compressor.threshold.value = a
        }, a.Compressor.prototype.setKnee = function(a) {
            this._compressor.knee.value = a
        }, a.Compressor.prototype.setRatio = function(a) {
            this._compressor.ratio.value = a
        }, a.Compressor.prototype.dispose = function() {
            a.prototype.dispose.call(this), this._compressor.disconnect(), this._compressor = null, this.attack = null, this.release = null, this.threshold = null, this.ratio = null, this.knee = null
        }, a.Compressor
    }), toneModule(function(a) {
        return a.Add = function(b) {
            a.call(this, 2, 0), this._sum = this.input[0] = this.input[1] = this.output = this.context.createGain(), this._value = null, isFinite(b) && (this._value = new a.Signal(b), this._value.connect(this._sum))
        }, a.extend(a.Add, a.SignalBase), a.Add.prototype.setValue = function(a) {
            if (null === this._value) throw new Error("cannot switch from signal to number");
            this._value.setValue(a)
        }, a.Add.prototype.dispose = function() {
            a.prototype.dispose.call(this), this._sum = null, this._value && (this._value.dispose(), this._value = null)
        }, a.Add
    }), toneModule(function(a) {
        return a.Multiply = function(b) {
            a.call(this, 2, 0), this._mult = this.input[0] = this.output = this.context.createGain(), this._factor = this.input[1] = this.output.gain, this._factor.value = this.defaultArg(b, 0)
        }, a.extend(a.Multiply, a.SignalBase), a.Multiply.prototype.setValue = function(a) {
            this._factor.value = a
        }, a.Multiply.prototype.dispose = function() {
            a.prototype.dispose.call(this), this._mult = null, this._factor = null
        }, a.Multiply
    }), toneModule(function(a) {
        return a.Negate = function() {
            this._multiply = this.input = this.output = new a.Multiply(-1)
        }, a.extend(a.Negate, a.SignalBase), a.Negate.prototype.dispose = function() {
            a.prototype.dispose.call(this), this._multiply.dispose(), this._multiply = null
        }, a.Negate
    }), toneModule(function(a) {
        return a.Subtract = function(b) {
            a.call(this, 2, 0), this._adder = this.input[0] = this.output = new a.Add(-b), this._neg = this.input[1] = new a.Negate, this._neg.connect(this._adder, 0, 1)
        }, a.extend(a.Subtract, a.SignalBase), a.Subtract.prototype.setValue = function(a) {
            this._adder.setValue(-a)
        }, a.Subtract.prototype.dispose = function() {
            a.prototype.dispose.call(this), this._neg.dispose(), this._neg = null, this._adder.dispose(), this._adder = null
        }, a.Subtract
    }), toneModule(function(a) {
        return a.GreaterThanZero = function() {
            this._thresh = this.output = new a.WaveShaper(function(a) {
                return 0 >= a ? 0 : 1
            }), this._scale = this.input = new a.Multiply(1e4), this._scale.connect(this._thresh)
        }, a.extend(a.GreaterThanZero, a.SignalBase), a.GreaterThanZero.prototype.dispose = function() {
            a.prototype.dispose.call(this), this._scale.dispose(), this._scale = null, this._thresh.dispose(), this._thresh = null
        }, a.GreaterThanZero
    }), toneModule(function(a) {
        return a.EqualZero = function() {
            this._scale = this.input = new a.Multiply(1e4), this._thresh = new a.WaveShaper(function(a) {
                return 0 === a ? 1 : 0
            }, 128), this._gtz = this.output = new a.GreaterThanZero, this._scale.chain(this._thresh, this._gtz)
        }, a.extend(a.EqualZero, a.SignalBase), a.EqualZero.prototype.dispose = function() {
            a.prototype.dispose.call(this), this._gtz.dispose(), this._gtz = null, this._scale.dispose(), this._scale = null, this._thresh.dispose(), this._thresh = null
        }, a.EqualZero
    }), toneModule(function(a) {
        return a.Equal = function(b) {
            a.call(this, 2, 0), this._sub = this.input[0] = new a.Subtract(b), this._equals = this.output = new a.EqualZero, this._sub.connect(this._equals), this.input[1] = this._sub.input[1]
        }, a.extend(a.Equal, a.SignalBase), a.Equal.prototype.setValue = function(a) {
            this._sub.setValue(a)
        }, a.Equal.prototype.dispose = function() {
            a.prototype.dispose.call(this), this._equals.disconnect(), this._equals = null, this._sub.dispose(), this._sub = null
        }, a.Equal
    }), toneModule(function(a) {
        a.Select = function(c) {
            var d, e;
            for (c = this.defaultArg(c, 2), a.call(this, c, 1), this.gate = new a.Signal(0), d = 0; c > d; d++) e = new b(d), this.input[d] = e, this.gate.connect(e.selecter), e.connect(this.output)
        }, a.extend(a.Select, a.SignalBase), a.Select.prototype.select = function(a, b) {
            a = Math.floor(a), this.gate.setValueAtTime(a, this.toSeconds(b))
        }, a.Select.prototype.dispose = function() {
            this.gate.dispose();
            for (var b = 0; b < this.input.length; b++) this.input[b].dispose(), this.input[b] = null;
            a.prototype.dispose.call(this), this.gate = null
        };
        var b = function(b) {
            this.selecter = new a.Equal(b), this.gate = this.input = this.output = this.context.createGain(), this.selecter.connect(this.gate.gain)
        };
        return a.extend(b), b.prototype.dispose = function() {
            a.prototype.dispose.call(this), this.selecter.dispose(), this.gate.disconnect(), this.selecter = null, this.gate = null
        }, a.Select
    }), toneModule(function(a) {
        return a.IfThenElse = function() {
            a.call(this, 3, 0), this._selector = this.output = new a.Select(2), this.if = this.input[0] = this._selector.gate, this.then = this.input[1] = this._selector.input[1], this.else = this.input[2] = this._selector.input[0]
        }, a.extend(a.IfThenElse, a.SignalBase), a.IfThenElse.prototype.dispose = function() {
            a.prototype.dispose.call(this), this._selector.dispose(), this._selector = null, this.if = null, this.then = null, this.else = null
        }, a.IfThenElse
    }), toneModule(function(a) {
        return a.OR = function(b) {
            b = this.defaultArg(b, 2), a.call(this, b, 0), this._sum = this.context.createGain(), this._gtz = new a.GreaterThanZero, this.output = this._gtz;
            for (var c = 0; b > c; c++) this.input[c] = this._sum;
            this._sum.connect(this._gtz)
        }, a.extend(a.OR, a.SignalBase), a.OR.prototype.dispose = function() {
            a.prototype.dispose.call(this), this._gtz.dispose(), this._gtz = null, this._sum.disconnect(), this._sum = null
        }, a.OR
    }), toneModule(function(a) {
        return a.AND = function(b) {
            b = this.defaultArg(b, 2), a.call(this, b, 0), this._equals = this.output = new a.Equal(b);
            for (var c = 0; b > c; c++) this.input[c] = this._equals
        }, a.extend(a.AND, a.SignalBase), a.AND.prototype.setInputCount = function(a) {
            this._equals.setValue(a)
        }, a.AND.prototype.dispose = function() {
            a.prototype.dispose.call(this), this._equals.dispose(), this._equals = null
        }, a.AND
    }), toneModule(function(a) {
        return a.NOT = a.EqualZero, a.NOT
    }), toneModule(function(a) {
        return a.GreaterThan = function(b) {
            a.call(this, 2, 0), this._sub = this.input[0] = new a.Subtract(b), this.input[1] = this._sub.input[1], this._gtz = this.output = new a.GreaterThanZero, this._sub.connect(this._gtz)
        }, a.extend(a.GreaterThan, a.SignalBase), a.GreaterThan.prototype.setValue = function(a) {
            this._sub.setValue(a)
        }, a.GreaterThan.prototype.dispose = function() {
            a.prototype.dispose.call(this), this._sub.dispose(), this._gtz.dispose(), this._sub = null, this._gtz = null
        }, a.GreaterThan
    }), toneModule(function(a) {
        return a.LessThan = function(b) {
            a.call(this, 2, 0), this._neg = this.input[0] = new a.Negate, this._gt = this.output = new a.GreaterThan(-b), this._lhNeg = this.input[1] = new a.Negate, this._neg.connect(this._gt), this._lhNeg.connect(this._gt, 0, 1)
        }, a.extend(a.LessThan, a.SignalBase), a.LessThan.prototype.setValue = function(a) {
            this._gt.setValue(-a)
        }, a.LessThan.prototype.dispose = function() {
            a.prototype.dispose.call(this), this._neg.dispose(), this._neg = null, this._gt.dispose(), this._gt = null, this._lhNeg.dispose(), this._lhNeg = null
        }, a.LessThan
    }), toneModule(function(a) {
        return a.Abs = function() {
            a.call(this, 1, 0), this._ltz = new a.LessThan(0), this._switch = this.output = new a.Select(2), this._negate = new a.Negate, this.input.connect(this._switch, 0, 0), this.input.connect(this._negate), this._negate.connect(this._switch, 0, 1), this.input.chain(this._ltz, this._switch.gate)
        }, a.extend(a.Abs, a.SignalBase), a.Abs.prototype.dispose = function() {
            a.prototype.dispose.call(this), this._switch.dispose(), this._switch = null, this._ltz.dispose(), this._ltz = null, this._negate.dispose(), this._negate = null
        }, a.Abs
    }), toneModule(function(a) {
        return a.Max = function(b) {
            a.call(this, 2, 0), this.input[0] = this.context.createGain(), this._maxSignal = this.input[1] = new a.Signal(b), this._ifThenElse = this.output = new a.IfThenElse, this._gt = new a.GreaterThan, this.input[0].chain(this._gt, this._ifThenElse.if), this.input[0].connect(this._ifThenElse.then), this._maxSignal.connect(this._ifThenElse.else), this._maxSignal.connect(this._gt, 0, 1)
        }, a.extend(a.Max, a.SignalBase), a.Max.prototype.setMax = function(a) {
            this._maxSignal.setValue(a)
        }, a.Max.prototype.dispose = function() {
            a.prototype.dispose.call(this), this._maxSignal.dispose(), this._ifThenElse.dispose(), this._gt.dispose(), this._maxSignal = null, this._ifThenElse = null, this._gt = null
        }, a.Max
    }), toneModule(function(a) {
        return a.Min = function(b) {
            a.call(this, 2, 0), this.input[0] = this.context.createGain(), this._ifThenElse = this.output = new a.IfThenElse, this._lt = new a.LessThan, this._minSignal = this.input[1] = new a.Signal(b), this.input[0].chain(this._lt, this._ifThenElse.if), this.input[0].connect(this._ifThenElse.then), this._minSignal.connect(this._ifThenElse.else), this._minSignal.connect(this._lt, 0, 1)
        }, a.extend(a.Min, a.SignalBase), a.Min.prototype.setMin = function(a) {
            this._minSignal.setValue(a)
        }, a.Min.prototype.dispose = function() {
            a.prototype.dispose.call(this), this._minSignal.dispose(), this._ifThenElse.dispose(), this._lt.dispose(), this._minSignal = null, this._ifThenElse = null, this._lt = null
        }, a.Min
    }), toneModule(function(a) {
        a.Modulo = function(c, d) {
            var e, f;
            for (a.call(this), d = this.defaultArg(d, 8), this._modChain = [], e = d - 1; e >= 0; e--) f = new b(c, Math.pow(2, e)), this._modChain.push(f);
            this.connectSeries.apply(this, this._modChain), this.input.connect(this._modChain[0]), this._modChain[this._modChain.length - 1].connect(this.output)
        }, a.extend(a.Modulo, a.SignalBase), a.Modulo.prototype.dispose = function() {
            a.prototype.dispose.call(this);
            for (var b = 0; b < this._modChain.length; b++) this._modChain[b].dispose(), this._modChain[b] = null;
            this._modChain = null
        };
        var b = function(b, c) {
            var d = b * c,
                e = 1024;
            this.input = this.context.createGain(), this._div = new a.Multiply(1 / d), this._curve = new Float32Array(1024), this._operator = new a.WaveShaper(function(a, b) {
                return b === e - 1 ? -d : 0 === b ? d : 0
            }, e), this.input.chain(this._div, this._operator)
        };
        return a.extend(b), b.prototype.connect = function(a) {
            this._operator.connect(a), this.input.connect(a)
        }, b.prototype.dispose = function() {
            a.prototype.dispose.call(this), this._div.dispose(), this._div = null, this._operator.disconnect(), this._operator = null, this._curve = null
        }, a.Modulo
    }), toneModule(function(a) {
        var b, c, d, e = Math.pow(2, 13),
            f = new Array(e);
        for (b = 0; b < f.length; b++) c = b / (f.length - 1) * 2 - 1, f[b] = 0 === c ? 0 : 1 / (c * e);
        return a.Inverse = function(b) {
            var c, g, h;
            for (a.call(this), b = this.defaultArg(b, 3), this._two = new a.Signal(2), this._guessMult = new a.Multiply(1 / e), this._guess = new a.WaveShaper(f), this.input.chain(this._guessMult, this._guess), this._inverses = new Array(b), c = 0; b > c; c++) g = 0 === c ? this._guess : this._inverses[c - 1], h = new d(g, this._two), this.input.connect(h), this._inverses[c] = h;
            this._inverses[b - 1].connect(this.output)
        }, a.extend(a.Inverse, a.SignalBase), a.Inverse.prototype.dispose = function() {
            a.prototype.dispose.call(this);
            for (var b = 0; b < this._inverses.length; b++) this._inverses[b].dispose(), this._inverses[b] = null;
            this._inverses = null, this._two.dispose(), this._two = null, this._guessMult.dispose(), this._guessMult = null, this._guess.disconnect(), this._guess = null
        }, d = function(b, c) {
            this._outerMultiply = new a.Multiply, this._innerMultiply = new a.Multiply, this._subtract = new a.Subtract, b.connect(this._innerMultiply, 0, 1), c.connect(this._subtract, 0, 0), this._innerMultiply.connect(this._subtract, 0, 1), this._subtract.connect(this._outerMultiply, 0, 1), b.connect(this._outerMultiply, 0, 0), this.output = this._outerMultiply, this.input = this._innerMultiply
        }, a.extend(d), d.prototype.dispose = function() {
            this._outerMultiply.dispose(), this._outerMultiply = null, this._innerMultiply.dispose(), this._innerMultiply = null, this._subtract.dispose(), this._subtract = null
        }, a.Inverse
    }), toneModule(function(a) {
        return a.Divide = function(b, c) {
            a.call(this, 2, 0), this._value = null, this._inverse = new a.Inverse(c), this._mult = new a.Multiply, isFinite(b) && (this._value = new a.Signal(b), this._value.connect(this._inverse)), this.input[1] = this._inverse, this._inverse.connect(this._mult, 0, 1), this.input[0] = this.output = this._mult.input[0]
        }, a.extend(a.Divide, a.SignalBase), a.Divide.prototype.setValue = function(a) {
            if (null === this._value) throw new Error("cannot switch from signal to number");
            this._value.setValue(a)
        }, a.Divide.prototype.dispose = function() {
            a.prototype.dispose.call(this), this._value && (this._value.dispose(), this._value = null), this._inverse.dispose(), this._inverse = null, this._mult.dispose(), this._mult = null
        }, a.Divide
    }), toneModule(function(a) {
        function b(a, b, c) {
            var d = new a;
            return c._eval(b[0]).connect(d, 0, 0), c._eval(b[1]).connect(d, 0, 1), d
        }

        function c(a, b, c) {
            var d = new a;
            return c._eval(b[0]).connect(d, 0, 0), d
        }

        function d(a) {
            return a ? parseFloat(a) : void 0
        }

        function e(a) {
            return a && a.args ? parseFloat(a.args) : void 0
        }
        return a.Expr = function() {
            var a, b, c, d = this._replacements(Array.prototype.slice.call(arguments)),
                e = this._parseInputs(d);
            for (this._nodes = [], this.input = new Array(e), a = 0; e > a; a++) this.input[a] = this.context.createGain();
            b = this._parseTree(d);
            try {
                c = this._eval(b)
            } catch (f) {
                throw this._disposeNodes(), new Error("Could evaluate expression: " + d)
            }
            this.output = c
        }, a.extend(a.Expr, a.SignalBase), a.Expr._Expressions = {
            value: {
                signal: {
                    regexp: /^\d+\.\d+|^\d+/,
                    method: function(b) {
                        var c = new a.Signal(d(b));
                        return c
                    }
                },
                input: {
                    regexp: /^\$\d/,
                    method: function(a, b) {
                        return b.input[d(a.substr(1))]
                    }
                }
            },
            glue: {
                "(": {
                    regexp: /^\(/
                },
                ")": {
                    regexp: /^\)/
                },
                ",": {
                    regexp: /^,/
                }
            },
            func: {
                abs: {
                    regexp: /^abs/,
                    method: c.bind(this, a.Abs)
                },
                min: {
                    regexp: /^min/,
                    method: b.bind(this, a.Min)
                },
                max: {
                    regexp: /^max/,
                    method: b.bind(this, a.Max)
                },
                "if": {
                    regexp: /^if/,
                    method: function(b, c) {
                        var d = new a.IfThenElse;
                        return c._eval(b[0]).connect(d.if), c._eval(b[1]).connect(d.then), c._eval(b[2]).connect(d.else), d
                    }
                },
                gt0: {
                    regexp: /^gt0/,
                    method: c.bind(this, a.GreaterThanZero)
                },
                eq0: {
                    regexp: /^eq0/,
                    method: c.bind(this, a.EqualZero)
                },
                inv: {
                    regexp: /^inv/,
                    method: function(b, c) {
                        var d = e(b[1]),
                            f = new a.Inverse(d);
                        return c._eval(b[0]).connect(f), f
                    }
                },
                mod: {
                    regexp: /^mod/,
                    method: function(b, c) {
                        var d = e(b[1]),
                            f = e(b[2]),
                            g = new a.Modulo(d, f);
                        return c._eval(b[0]).connect(g), g
                    }
                },
                pow: {
                    regexp: /^pow/,
                    method: function(b, c) {
                        var d = e(b[1]),
                            f = new a.Pow(d);
                        return c._eval(b[0]).connect(f), f
                    }
                }
            },
            binary: {
                "+": {
                    regexp: /^\+/,
                    precedence: 1,
                    method: b.bind(this, a.Add)
                },
                "-": {
                    regexp: /^\-/,
                    precedence: 1,
                    method: function(d, e) {
                        return 1 === d.length ? c(a.Negate, d, e) : b(a.Subtract, d, e)
                    }
                },
                "*": {
                    regexp: /^\*/,
                    precedence: 0,
                    method: b.bind(this, a.Multiply)
                },
                "/": {
                    regexp: /^\//,
                    precedence: 0,
                    method: b.bind(this, a.Divide)
                },
                ">": {
                    regexp: /^\>/,
                    precedence: 2,
                    method: b.bind(this, a.GreaterThan)
                },
                "<": {
                    regexp: /^</,
                    precedence: 2,
                    method: b.bind(this, a.LessThan)
                },
                "==": {
                    regexp: /^==/,
                    precedence: 3,
                    method: b.bind(this, a.Equal)
                },
                "&&": {
                    regexp: /^&&/,
                    precedence: 4,
                    method: b.bind(this, a.AND)
                },
                "||": {
                    regexp: /^\|\|/,
                    precedence: 5,
                    method: b.bind(this, a.OR)
                }
            },
            unary: {
                "-": {
                    regexp: /^\-/,
                    method: c.bind(this, a.Negate)
                },
                "!": {
                    regexp: /^\!/,
                    method: c.bind(this, a.NOT)
                }
            }
        }, a.Expr.prototype._parseInputs = function(a) {
            var b, c, d = a.match(/\$\d/g),
                e = 0;
            if (null !== d)
                for (b = 0; b < d.length; b++) c = parseInt(d[b].substr(1)) + 1, e = Math.max(e, c);
            return e
        }, a.Expr.prototype._replacements = function(a) {
            var b, c = a.shift();
            for (b = 0; b < a.length; b++) c = c.replace(/\%/i, a[b]);
            return c
        }, a.Expr.prototype._tokenize = function(b) {
            function c(b) {
                var c, d, e, f, g, h;
                for (c in a.Expr._Expressions) {
                    d = a.Expr._Expressions[c];
                    for (e in d)
                        if (f = d[e], g = f.regexp, h = b.match(g), null !== h) return {
                            type: c,
                            value: h[0],
                            method: f.method
                        }
                }
                throw new SyntaxError("Unexpected token " + b)
            }
            for (var d, e = -1, f = []; b.length > 0;) b = b.trim(), d = c(b), f.push(d), b = b.substr(d.value.length);
            return {
                next: function() {
                    return f[++e]
                },
                peek: function() {
                    return f[e + 1]
                }
            }
        }, a.Expr.prototype._parseTree = function(b) {
            function c(a, b) {
                return !k(a) && "glue" === a.type && a.value === b
            }

            function d(b, c, d) {
                var e, f, g = !1,
                    h = a.Expr._Expressions[c];
                if (!k(b))
                    for (e in h)
                        if (f = h[e], f.regexp.test(b.value)) {
                            if (k(d)) return !0;
                            if (f.precedence === d) return !0
                        }
                return g
            }

            function e(a) {
                var b, c;
                for (k(a) && (a = 5), b = 0 > a ? f() : e(a - 1), c = j.peek(); d(c, "binary", a);) c = j.next(), b = {
                    operator: c.value,
                    method: c.method,
                    args: [b, e(a)]
                }, c = j.peek();
                return b
            }

            function f() {
                var a, b;
                return a = j.peek(), d(a, "unary") ? (a = j.next(), b = f(), {
                    operator: a.value,
                    method: a.method,
                    args: [b]
                }) : g()
            }

            function g() {
                var a, b;
                if (a = j.peek(), k(a)) throw new SyntaxError("Unexpected termination of expression");
                if ("func" === a.type) return a = j.next(), h(a);
                if ("value" === a.type) return a = j.next(), {
                    method: a.method,
                    args: a.value
                };
                if (c(a, "(")) {
                    if (j.next(), b = e(), a = j.next(), !c(a, ")")) throw new SyntaxError("Expected )");
                    return b
                }
                throw new SyntaxError("Parse error, cannot process token " + a.value)
            }

            function h(a) {
                var b, d = [];
                if (b = j.next(), !c(b, "(")) throw new SyntaxError('Expected ( in a function call "' + a.value + '"');
                if (b = j.peek(), c(b, ")") || (d = i()), b = j.next(), !c(b, ")")) throw new SyntaxError('Expected ) in a function call "' + a.value + '"');
                return {
                    method: a.method,
                    args: d,
                    name: name
                }
            }

            function i() {
                for (var a, b, d = [];;) {
                    if (b = e(), k(b)) break;
                    if (d.push(b), a = j.peek(), !c(a, ",")) break;
                    j.next()
                }
                return d
            }
            var j = this._tokenize(b),
                k = this.isUndef.bind(this);
            return e()
        }, a.Expr.prototype._eval = function(a) {
            if (!this.isUndef(a)) {
                var b = a.method(a.args, this);
                return this._nodes.push(b), b
            }
        }, a.Expr.prototype._disposeNodes = function() {
            var a, b;
            for (a = 0; a < this._nodes.length; a++) b = this._nodes[a], "function" == typeof b.dispose ? b.dispose() : "function" == typeof b.disconnect && b.disconnect(), b = null, this._nodes[a] = null;
            this._nodes = null
        }, a.Expr.prototype.dispose = function() {
            a.prototype.dispose.call(this), this._disposeNodes()
        }, a.Expr
    }), toneModule(function(a) {
        return a.DryWet = function(b) {
            a.call(this), this.dry = this.input, this.wet = this.context.createGain(), this.wetness = new a.Signal, this._invert = new a.Expr("1 - $0"), this.dry.connect(this.output), this.wet.connect(this.output), this.wetness.connect(this.wet.gain), this.wetness.chain(this._invert, this.dry.gain), this.setDry(this.defaultArg(b, .5))
        }, a.extend(a.DryWet), a.DryWet.prototype.setDry = function(a, b) {
            this.setWet(1 - a, b)
        }, a.DryWet.prototype.setWet = function(a, b) {
            b ? this.wetness.linearRampToValueNow(a, b) : this.wetness.setValue(a)
        }, a.DryWet.prototype.dispose = function() {
            a.prototype.dispose.call(this), this.dry.disconnect(), this.wet.disconnect(), this.wetness.dispose(), this._invert.dispose(), this.dry = null, this.wet = null, this.wetness = null, this._invert = null
        }, a.DryWet
    }), toneModule(function(a) {
        return a.Filter = function() {
            a.call(this);
            var b = this.optionsObject(arguments, ["frequency", "type", "rolloff"], a.Filter.defaults);
            this._filters = [], this.frequency = new a.Signal(b.frequency), this.detune = new a.Signal(0), this.gain = new a.Signal(b.gain), this.Q = new a.Signal(b.Q), this._type = b.type, this.setRolloff(b.rolloff)
        }, a.extend(a.Filter), a.Filter.defaults = {
            type: "lowpass",
            frequency: 350,
            rolloff: -12,
            Q: 1,
            gain: 0
        }, a.Filter.prototype.set = function(a) {
            this.isUndef(a.type) || this.setType(a.type), this.isUndef(a.detune) || this.detune.setValue(a.detune), this.isUndef(a.frequency) || this.frequency.setValue(a.frequency), this.isUndef(a.Q) || this.Q.setValue(a.Q), this.isUndef(a.gain) || this.gain.setValue(a.gain), this.isUndef(a.rolloff) || this.setRolloff(a.rolloff)
        }, a.Filter.prototype.setType = function(a) {
            this._type = a;
            for (var b = 0; b < this._filters.length; b++) this._filters[b].type = a
        }, a.Filter.prototype.getType = function() {
            return this._type
        }, a.Filter.prototype.setFrequency = function(a) {
            this.frequency.setValue(a)
        }, a.Filter.prototype.setQ = function(a) {
            this.Q.setValue(a)
        }, a.Filter.prototype.setRolloff = function(a) {
            var b, c, d, e, f = Math.log(a / -12) / Math.LN2 + 1;
            if (f % 1 !== 0) throw new RangeError("Filter rolloff can only be -12, -24, or -48");
            for (this.input.disconnect(), b = 0; b < this._filters.length; b++) this._filters[b].disconnect(), this._filters[b] = null;
            for (this._filters = new Array(f), c = 0; f > c; c++) d = this.context.createBiquadFilter(), d.type = this._type, this.frequency.connect(d.frequency), this.detune.connect(d.detune), this.Q.connect(d.Q), this.gain.connect(d.gain), this._filters[c] = d;
            e = [this.input].concat(this._filters).concat([this.output]), this.connectSeries.apply(this, e)
        }, a.Filter.prototype.dispose = function() {
            a.prototype.dispose.call(this);
            for (var b = 0; b < this._filters.length; b++) this._filters[b].disconnect(), this._filters[b] = null;
            this.frequency.dispose(), this.Q.dispose(), this.detune.dispose(), this.gain.dispose(), this._filters = null, this.frequency = null, this.Q = null, this.gain = null, this.detune = null
        }, a.Filter
    }), toneModule(function(a) {
        return a.MultibandSplit = function() {
            var b = this.optionsObject(arguments, ["lowFrequency", "highFrequency"], a.MultibandSplit.defaults);
            this.input = this.context.createGain(), this.output = new Array(3), this.low = this.output[0] = new a.Filter(0, "lowpass"), this._lowMidFilter = new a.Filter(0, "highpass"), this.mid = this.output[1] = new a.Filter(0, "lowpass"), this.high = this.output[2] = new a.Filter(0, "highpass"), this.lowFrequency = new a.Signal(b.lowFrequency), this.highFrequency = new a.Signal(b.highFrequency), this.input.fan(this.low, this.high), this.input.chain(this._lowMidFilter, this.mid), this.lowFrequency.connect(this.low.frequency), this.lowFrequency.connect(this._lowMidFilter.frequency), this.highFrequency.connect(this.mid.frequency), this.highFrequency.connect(this.high.frequency)
        }, a.extend(a.MultibandSplit), a.MultibandSplit.defaults = {
            lowFrequency: 400,
            highFrequency: 2500
        }, a.MultibandSplit.prototype.dispose = function() {
            a.prototype.dispose.call(this), this.low.dispose(), this._lowMidFilter.dispose(), this.mid.dispose(), this.high.dispose(), this.lowFrequency.dispose(), this.highFrequency.dispose(), this.low = null, this._lowMidFilter = null, this.mid = null, this.high = null, this.lowFrequency = null, this.highFrequency = null
        }, a.MultibandSplit
    }), toneModule(function(a) {
        return a.EQ = function() {
            var b = this.optionsObject(arguments, ["low", "mid", "high"], a.EQ.defaults);
            this.output = this.context.createGain(), this._multibandSplit = new a.MultibandSplit({
                lowFrequency: b.lowFrequency,
                highFrequency: b.highFrequency
            }), this.input = this._multibandSplit, this.lowGain = this.context.createGain(), this.midGain = this.context.createGain(), this.highGain = this.context.createGain(), this.lowFrequency = this._multibandSplit.lowFrequency, this.highFrequency = this._multibandSplit.highFrequency, this._multibandSplit.low.chain(this.lowGain, this.output), this._multibandSplit.mid.chain(this.midGain, this.output), this._multibandSplit.high.chain(this.highGain, this.output), this.setLow(b.low), this.setMid(b.mid), this.setHigh(b.high)
        }, a.extend(a.EQ), a.EQ.defaults = {
            low: 0,
            mid: 0,
            high: 0,
            lowFrequency: 400,
            highFrequency: 2500
        }, a.EQ.prototype.set = function(a) {
            this.isUndef(a.mid) || this.setMid(a.mid), this.isUndef(a.high) || this.setHigh(a.high), this.isUndef(a.low) || this.setLow(a.low), this.isUndef(a.lowFrequency) || this.lowFrequency.setValue(a.lowFrequency), this.isUndef(a.highFrequency) || this.highFrequency.setValue(a.highFrequency)
        }, a.EQ.prototype.setMid = function(a) {
            this.midGain.gain.value = this.dbToGain(a)
        }, a.EQ.prototype.setHigh = function(a) {
            this.highGain.gain.value = this.dbToGain(a)
        }, a.EQ.prototype.setLow = function(a) {
            this.lowGain.gain.value = this.dbToGain(a)
        }, a.EQ.prototype.dispose = function() {
            a.prototype.dispose.call(this), this._multibandSplit.dispose(), this.lowGain.disconnect(), this.midGain.disconnect(), this.highGain.disconnect(), this._multibandSplit = null, this.lowFrequency = null, this.highFrequency = null, this.lowGain = null, this.midGain = null, this.highGain = null
        }, a.EQ
    }), toneModule(function(a) {
        return a.Scale = function(b, c) {
            this._outputMin = this.defaultArg(b, 0), this._outputMax = this.defaultArg(c, 1), this._scale = this.input = new a.Multiply(1), this._add = this.output = new a.Add(0), this._scale.connect(this._add), this._setRange()
        }, a.extend(a.Scale, a.SignalBase), a.Scale.prototype.setMin = function(a) {
            this._outputMin = a, this._setRange()
        }, a.Scale.prototype.setMax = function(a) {
            this._outputMax = a, this._setRange()
        }, a.Scale.prototype._setRange = function() {
            this._add.setValue(this._outputMin), this._scale.setValue(this._outputMax - this._outputMin)
        }, a.Scale.prototype.dispose = function() {
            a.prototype.dispose.call(this), this._add.dispose(), this._add = null, this._scale.dispose(), this._scale = null
        }, a.Scale
    }), toneModule(function(a) {
        return a.ScaleExp = function(b, c, d) {
            this._scale = this.output = new a.Scale(b, c), this._exp = this.input = new a.Pow(this.defaultArg(d, 2)), this._exp.connect(this._scale)
        }, a.extend(a.ScaleExp, a.SignalBase), a.ScaleExp.prototype.setExponent = function(a) {
            this._exp.setExponent(a)
        }, a.ScaleExp.prototype.setMin = function(a) {
            this._scale.setMin(a)
        }, a.ScaleExp.prototype.setMax = function(a) {
            this._scale.setMax(a)
        }, a.ScaleExp.prototype.dispose = function() {
            a.prototype.dispose.call(this), this._scale.dispose(), this._scale = null, this._exp.dispose(), this._exp = null
        }, a.ScaleExp
    }), toneModule(function(a) {
        return a.FeedbackCombFilter = function(b, c) {
            var d, e, f;
            for (a.call(this), b = this.defaultArg(b, .1), c = this.defaultArg(c, 1), d = Math.ceil(this.bufferSize / (b * this.context.sampleRate)), d = Math.min(d, 10), d = Math.max(d, 1), this._delayCount = d, this._delays = new Array(this._delayCount), this.resonance = new a.Signal(.5), this._resScale = new a.ScaleExp(.01, 1 / this._delayCount - .001, .5), this._highFrequencies = !1, this._feedback = this.context.createGain(), e = 0; e < this._delayCount; e++) f = this.context.createDelay(c), f.delayTime.value = b, f.connect(this._feedback), this._delays[e] = f;
            this.connectSeries.apply(this, this._delays), this.input.connect(this._delays[0]), this._feedback.connect(this._delays[0]), this.resonance.chain(this._resScale, this._feedback.gain), this._feedback.connect(this.output), this.setDelayTime(b)
        }, a.extend(a.FeedbackCombFilter), a.FeedbackCombFilter.prototype.setDelayTime = function(a, b) {
            var c, d, e, f, g, h;
            if (b = this.toSeconds(b), c = this.context.sampleRate, d = c * a, b = this.toSeconds(b), e = 100, e > d) {
                for (this._highFrequencies = !0, f = Math.round(d / e * this._delayCount), g = 0; f > g; g++) this._delays[g].delayTime.setValueAtTime(1 / c + a, b);
                a = Math.floor(d) / c
            } else if (this._highFrequencies)
                for (this._highFrequencies = !1, h = 0; h < this._delays.length; h++) this._delays[h].delayTime.setValueAtTime(a, b)
        }, a.FeedbackCombFilter.prototype.dispose = function() {
            a.prototype.dispose.call(this);
            for (var b = 0; b < this._delays.length; b++) this._delays[b].disconnect(), this._delays[b] = null;
            this._delays = null, this.resonance.dispose(), this.resonance = null, this._resScale.dispose(), this._resScale = null, this._feedback.disconnect(), this._feedback = null
        }, a.FeedbackCombFilter
    }), toneModule(function(a) {
        return a.Follower = function() {
            a.call(this);
            var b = this.optionsObject(arguments, ["attack", "release"], a.Follower.defaults);
            this._abs = new a.Abs, this._filter = this.context.createBiquadFilter(), this._filter.type = "lowpass", this._filter.frequency.value = 0, this._filter.Q.value = -100, this._frequencyValues = new a.WaveShaper, this._sub = new a.Subtract, this._delay = this.context.createDelay(), this._delay.delayTime.value = this.bufferTime, this._mult = new a.Multiply(1e4), this._attack = this.secondsToFrequency(b.attack), this._release = this.secondsToFrequency(b.release), this.input.chain(this._abs, this._filter, this.output), this._abs.connect(this._sub, 0, 1), this._filter.chain(this._delay, this._sub), this._sub.chain(this._mult, this._frequencyValues, this._filter.frequency), this._setAttackRelease(this._attack, this._release)
        }, a.extend(a.Follower), a.Follower.defaults = {
            attack: .05,
            release: .5
        }, a.Follower.prototype._setAttackRelease = function(a, b) {
            var c = this.bufferTime;
            a = Math.max(a, c), b = Math.max(b, c), this._frequencyValues.setMap(function(c) {
                return 0 >= c ? a : b
            })
        }, a.Follower.prototype.setAttack = function(a) {
            this._attack = this.secondsToFrequency(a), this._setAttackRelease(this._attack, this._release)
        }, a.Follower.prototype.setRelease = function(a) {
            this._release = this.secondsToFrequency(a), this._setAttackRelease(this._attack, this._release)
        }, a.Follower.prototype.set = function(b) {
            this.isUndef(b.attack) || this.setAttack(b.attack), this.isUndef(b.release) || this.setRelease(b.release), a.Effect.prototype.set.call(this, b)
        }, a.Follower.prototype.connect = a.Signal.prototype.connect, a.Follower.prototype.dispose = function() {
            a.prototype.dispose.call(this), this._filter.disconnect(), this._filter = null, this._frequencyValues.disconnect(), this._frequencyValues = null, this._delay.disconnect(), this._delay = null, this._sub.disconnect(), this._sub = null, this._abs.dispose(), this._abs = null, this._mult.dispose(), this._mult = null, this._curve = null
        }, a.Follower
    }), toneModule(function(a) {
        return a.Gate = function(b, c, d) {
            a.call(this), b = this.defaultArg(b, -40), c = this.defaultArg(c, .1), d = this.defaultArg(d, .2), this._follower = new a.Follower(c, d), this._gt = new a.GreaterThan(this.dbToGain(b)), this.input.connect(this.output), this.input.chain(this._gt, this._follower, this.output.gain)
        }, a.extend(a.Gate), a.Gate.prototype.setThreshold = function(a) {
            this._gt.setValue(this.dbToGain(a))
        }, a.Gate.prototype.setAttack = function(a) {
            this._follower.setAttack(a)
        }, a.Gate.prototype.setRelease = function(a) {
            this._follower.setRelease(a)
        }, a.Gate.prototype.dispose = function() {
            a.prototype.dispose.call(this), this._follower.dispose(), this._gt.dispose(), this._follower = null, this._gt = null
        }, a.Gate
    }), toneModule(function(a) {
        return a.Clock = function(b, c) {
            this._oscillator = null, this._jsNode = this.context.createScriptProcessor(this.bufferSize, 1, 1), this._jsNode.onaudioprocess = this._processBuffer.bind(this), this._controlSignal = new a.Signal(1), this._upTick = !1, this.tick = this.defaultArg(c, function() {}), this._jsNode.noGC(), this.setRate(b)
        }, a.extend(a.Clock), a.Clock.prototype.setRate = function(a, b) {
            var c = this.secondsToFrequency(this.toSeconds(a));
            b ? this._controlSignal.exponentialRampToValueNow(c, b) : (this._controlSignal.cancelScheduledValues(0), this._controlSignal.setValue(c))
        }, a.Clock.prototype.getRate = function() {
            return this._controlSignal.getValue()
        }, a.Clock.prototype.start = function(a) {
            this._oscillator = this.context.createOscillator(), this._oscillator.type = "square", this._oscillator.connect(this._jsNode), this._controlSignal.connect(this._oscillator.frequency), this._upTick = !1;
            var b = this.toSeconds(a);
            this._oscillator.start(b), this._oscillator.onended = function() {}
        }, a.Clock.prototype.stop = function(a, b) {
            var c = this.toSeconds(a);
            this._oscillator.onended = b, this._oscillator.stop(c)
        }, a.Clock.prototype._processBuffer = function(a) {
            var b, c, d = this.defaultArg(a.playbackTime, this.now()),
                e = this._jsNode.bufferSize,
                f = a.inputBuffer.getChannelData(0),
                g = this._upTick,
                h = this;
            for (b = 0; e > b; b++) c = f[b], c > 0 && !g ? (g = !0, setTimeout(function() {
                var a = d + h.samplesToSeconds(b + 2 * e);
                return function() {
                    h.tick(a)
                }
            }(), 0)) : 0 > c && g && (g = !1);
            this._upTick = g
        }, a.Clock.prototype.dispose = function() {
            this._jsNode.disconnect(), this._controlSignal.dispose(), this._oscillator && (this._oscillator.onended(), this._oscillator.disconnect()), this._jsNode.onaudioprocess = function() {}, this._jsNode = null, this._controlSignal = null, this._oscillator = null
        }, a.Clock
    }), toneModule(function(Tone) {
        var timelineTicks, transportTicks, tatum, swingTatum, swingAmount, transportTimeSignature, loopStart, loopEnd, intervals, timeouts, transportTimeline, timelineProgress, SyncedSources, TransportState, processIntervals, processTimeouts, processTimeline, TimelineEventIDCounter, TimelineEvent, TransportConstructor;
        return Tone.Transport = function() {
            this._clock = new Tone.Clock(1, this._processTick.bind(this)), this.loop = !1, this.state = TransportState.STOPPED
        }, Tone.extend(Tone.Transport), timelineTicks = 0, transportTicks = 0, tatum = 12, swingTatum = 3, swingAmount = 0, transportTimeSignature = 4, loopStart = 0, loopEnd = 4 * tatum, intervals = [], timeouts = [], transportTimeline = [], timelineProgress = 0, SyncedSources = [], TransportState = {
            STARTED: "started",
            PAUSED: "paused",
            STOPPED: "stopped"
        }, Tone.Transport.prototype._processTick = function(a) {
            this.state === TransportState.STARTED && (swingAmount > 0 && timelineTicks % tatum !== 0 && timelineTicks % swingTatum === 0 && (a += Tone.Transport.ticksToSeconds(swingTatum) * swingAmount), processIntervals(a), processTimeouts(a), processTimeline(a), transportTicks += 1, timelineTicks += 1, this.loop && timelineTicks === loopEnd && this._setTicks(loopStart))
        }, Tone.Transport.prototype._setTicks = function(a) {
            var b, c;
            for (timelineTicks = a, b = 0; b < transportTimeline.length; b++)
                if (c = transportTimeline[b], c.callbackTick() >= a) {
                    timelineProgress = b;
                    break
                }
        }, processIntervals = function(a) {
            var b, c, d;
            for (b = 0, c = intervals.length; c > b; b++) d = intervals[b], d.testInterval(transportTicks) && d.doCallback(a)
        }, processTimeouts = function(a) {
            var b, c, d, e, f = 0;
            for (b = 0, c = timeouts.length; c > b; b++)
                if (d = timeouts[b], e = d.callbackTick(), transportTicks >= e) d.doCallback(a), f++;
                else if (e > transportTicks) break;
            timeouts.splice(0, f)
        }, processTimeline = function(a) {
            var b, c, d, e;
            for (b = timelineProgress, c = transportTimeline.length; c > b; b++)
                if (d = transportTimeline[b], e = d.callbackTick(), e === timelineTicks) timelineProgress = b, d.doCallback(a);
                else if (e > timelineTicks) break
        }, Tone.Transport.prototype.setInterval = function(a, b, c) {
            var d = this.toTicks(b),
                e = new TimelineEvent(a, c, d, transportTicks);
            return intervals.push(e), e.id
        }, Tone.Transport.prototype.clearInterval = function(a) {
            var b, c;
            for (b = 0; b < intervals.length; b++)
                if (c = intervals[b], c.id === a) return intervals.splice(b, 1), !0;
            return !1
        }, Tone.Transport.prototype.clearIntervals = function() {
            intervals = []
        }, Tone.Transport.prototype.setTimeout = function(a, b, c) {
            var d, e, f, g = this.toTicks(b),
                h = new TimelineEvent(a, c, g + transportTicks, 0);
            for (d = 0, e = timeouts.length; e > d; d++)
                if (f = timeouts[d], f.callbackTick() > h.callbackTick()) return timeouts.splice(d, 0, h), h.id;
            return timeouts.push(h), h.id
        }, Tone.Transport.prototype.clearTimeout = function(a) {
            var b, c;
            for (b = 0; b < timeouts.length; b++)
                if (c = timeouts[b], c.id === a) return timeouts.splice(b, 1), !0;
            return !1
        }, Tone.Transport.prototype.clearTimeouts = function() {
            timeouts = []
        }, Tone.Transport.prototype.setTimeline = function(a, b, c) {
            var d, e, f, g = this.toTicks(b),
                h = new TimelineEvent(a, c, g, 0);
            for (d = timelineProgress, e = transportTimeline.length; e > d; d++)
                if (f = transportTimeline[d], f.callbackTick() > h.callbackTick()) return transportTimeline.splice(d, 0, h), h.id;
            return transportTimeline.push(h), h.id
        }, Tone.Transport.prototype.clearTimeline = function(a) {
            var b, c;
            for (b = 0; b < transportTimeline.length; b++)
                if (c = transportTimeline[b], c.id === a) return transportTimeline.splice(b, 1), !0;
            return !1
        }, Tone.Transport.prototype.clearTimelines = function() {
            timelineProgress = 0, transportTimeline = []
        }, Tone.Transport.prototype.toTicks = function(a) {
            var b = this.toSeconds(a),
                c = this.notationToSeconds("4n"),
                d = b / c,
                e = d * tatum;
            return Math.round(e)
        }, Tone.Transport.prototype.getTransportTime = function() {
            var a, b = timelineTicks / tatum,
                c = Math.floor(b / transportTimeSignature),
                d = Math.floor(b % 1 * 4);
            return b = Math.floor(b) % transportTimeSignature, a = [c, b, d], a.join(":")
        }, Tone.Transport.prototype.setTransportTime = function(a) {
            var b = this.toTicks(a);
            this._setTicks(b)
        }, Tone.Transport.prototype.nextBeat = function(a) {
            var b, c, d;
            return a = this.defaultArg(a, "4n"), b = this.toTicks(a), c = transportTicks % b, d = c, c > 0 && (d = b - c), this.ticksToSeconds(d)
        }, Tone.Transport.prototype.start = function(a, b) {
            var c, d, e, f;
            if (this.state === TransportState.STOPPED || this.state === TransportState.PAUSED)
                for (this.isUndef(b) || this._setTicks(this.toTicks(b)), this.state = TransportState.STARTED, c = this.toSeconds(a), this._clock.start(c), d = 0; d < SyncedSources.length; d++) e = SyncedSources[d].source, f = SyncedSources[d].delay, e.start(c + f)
        }, Tone.Transport.prototype.stop = function(a) {
            var b, c, d;
            if (this.state === TransportState.STARTED || this.state === TransportState.PAUSED)
                for (b = this.toSeconds(a), this._clock.stop(b, this._onend.bind(this)), c = 0; c < SyncedSources.length; c++) d = SyncedSources[c].source, d.stop(b);
            else this._onend()
        }, Tone.Transport.prototype._onend = function() {
            transportTicks = 0, this._setTicks(0), this.clearTimeouts(), this.state = TransportState.STOPPED
        }, Tone.Transport.prototype.pause = function(a) {
            var b, c, d;
            if (this.state === TransportState.STARTED)
                for (this.state = TransportState.PAUSED, b = this.toSeconds(a), this._clock.stop(b), c = 0; c < SyncedSources.length; c++) d = SyncedSources[c].source, d.pause(b)
        }, Tone.Transport.prototype.setBpm = function(a, b) {
            var c = this.notationToSeconds(tatum.toString() + "n", a, transportTimeSignature) / 4;
            this._clock.setRate(c, b)
        }, Tone.Transport.prototype.getBpm = function() {
            var a = this._clock.getRate();
            return 60 * (a / tatum)
        }, Tone.Transport.prototype.setTimeSignature = function(a, b) {
            b = this.defaultArg(b, 4), transportTimeSignature = a / (b / 4)
        }, Tone.Transport.prototype.getTimeSignature = function() {
            return transportTimeSignature
        }, Tone.Transport.prototype.setLoopStart = function(a) {
            loopStart = this.toTicks(a)
        }, Tone.Transport.prototype.setLoopEnd = function(a) {
            loopEnd = this.toTicks(a)
        }, Tone.Transport.prototype.setLoopPoints = function(a, b) {
            this.setLoopStart(a), this.setLoopEnd(b)
        }, Tone.Transport.prototype.setSwing = function(a) {
            swingAmount = .5 * a
        }, Tone.Transport.prototype.setSwingSubdivision = function(a) {
            swingTatum = this.toTicks(a)
        }, Tone.Transport.prototype.syncSource = function(a, b) {
            SyncedSources.push({
                source: a,
                delay: this.toSeconds(this.defaultArg(b, 0))
            })
        }, Tone.Transport.prototype.unsyncSource = function(a) {
            for (var b = 0; b < SyncedSources.length; b++) SyncedSources[b].source === a && SyncedSources.splice(b, 1)
        }, Tone.Transport.prototype.syncSignal = function(a) {
            a.sync(this._clock._controlSignal)
        }, Tone.Transport.prototype.dispose = function() {
            this._clock.dispose(), this._clock = null
        }, TimelineEventIDCounter = 0, TimelineEvent = function(a, b, c, d) {
            this.startTicks = d, this.tickTime = c, this.callback = a, this.context = b, this.id = TimelineEventIDCounter++
        }, TimelineEvent.prototype.doCallback = function(a) {
            this.callback.call(this.context, a)
        }, TimelineEvent.prototype.callbackTick = function() {
            return this.startTicks + this.tickTime
        }, TimelineEvent.prototype.testInterval = function(a) {
            return (a - this.startTicks) % this.tickTime === 0
        }, Tone.prototype.isNotation = function() {
            var a = new RegExp(/[0-9]+[mnt]$/i);
            return function(b) {
                return a.test(b)
            }
        }(), Tone.prototype.isTicks = function() {
            var a = new RegExp(/[0-9]+[i]$/i);
            return function(b) {
                return a.test(b)
            }
        }(), Tone.prototype.isTransportTime = function() {
            var a = new RegExp(/^\d+(\.\d+)?:\d+(\.\d+)?(:\d+(\.\d+)?)?$/);
            return function(b) {
                return a.test(b)
            }
        }(), Tone.prototype.isFrequency = function() {
            var a = new RegExp(/[0-9]+hz$/i);
            return function(b) {
                return a.test(b)
            }
        }(), Tone.prototype.notationToSeconds = function(a, b, c) {
            var d, e, f, g;
            return b = this.defaultArg(b, Tone.Transport.getBpm()), c = this.defaultArg(c, transportTimeSignature), d = 60 / b, e = parseInt(a, 10), f = 0, 0 === e && (f = 0), g = a.slice(-1), f = "t" === g ? 4 / e * 2 / 3 : "n" === g ? 4 / e : "m" === g ? e * c : 0, d * f
        }, Tone.prototype.transportTimeToSeconds = function(a, b, c) {
            var d, e, f, g, h;
            return b = this.defaultArg(b, Tone.Transport.getBpm()), c = this.defaultArg(c, transportTimeSignature), d = 0, e = 0, f = 0, g = a.split(":"), 2 === g.length ? (d = parseFloat(g[0]), e = parseFloat(g[1])) : 1 === g.length ? e = parseFloat(g[0]) : 3 === g.length && (d = parseFloat(g[0]), e = parseFloat(g[1]), f = parseFloat(g[2])), h = d * c + e + f / 4, h * this.notationToSeconds("4n")
        }, Tone.prototype.ticksToSeconds = function(a, b, c) {
            a = Math.floor(a);
            var d = this.notationToSeconds("4n", b, c);
            return d * a / tatum
        }, Tone.prototype.toTransportTime = function(a, b, c) {
            var d, e, f, g, h, i = this.toSeconds(a, b, c);
            return b = this.defaultArg(b, Tone.Transport.getBpm()), c = this.defaultArg(c, transportTimeSignature), d = this.notationToSeconds("4n"), e = i / d, f = Math.floor(e / c), g = Math.floor(e % 1 * 4), e = Math.floor(e) % c, h = [f, e, g], h.join(":")
        }, Tone.prototype.toFrequency = function(a, b) {
            return this.isFrequency(a) ? parseFloat(a) : this.isNotation(a) || this.isTransportTime(a) ? this.secondsToFrequency(this.toSeconds(a, b)) : a
        }, Tone.prototype.toSeconds = function(time, now) {
            var plusTime, components, originalTime, i, symb, val;
            if (now = this.defaultArg(now, this.now()), "number" == typeof time) return time;
            if ("string" == typeof time) {
                if (plusTime = 0, "+" === time.charAt(0) && (plusTime = now, time = time.slice(1)), components = time.split(/[\(\)\-\+\/\*]/), components.length > 1) {
                    for (originalTime = time, i = 0; i < components.length; i++) symb = components[i].trim(), "" !== symb && (val = this.toSeconds(symb), time = time.replace(symb, val));
                    try {
                        time = eval(time)
                    } catch (e) {
                        throw new EvalError("problem evaluating Tone.Time: " + originalTime)
                    }
                } else time = this.isNotation(time) ? this.notationToSeconds(time) : this.isTransportTime(time) ? this.transportTimeToSeconds(time) : this.isFrequency(time) ? this.frequencyToSeconds(time) : parseFloat(time);
                return time + plusTime
            }
            return now
        }, TransportConstructor = Tone.Transport, Tone._initAudioContext(function() {
            if ("function" == typeof Tone.Transport) Tone.Transport = new Tone.Transport, Tone.Transport.setBpm(120);
            else {
                Tone.Transport.stop();
                var a = Tone.Transport.getBpm();
                Tone.Transport._clock.dispose(), TransportConstructor.call(Tone.Transport), Tone.Transport.setBpm(a)
            }
        }), Tone.Transport
    }), toneModule(function(a) {
        return a.Source = function() {
            a.call(this, 0, 1), this.state = a.Source.State.STOPPED
        }, a.extend(a.Source), a.Source.prototype.start = function() {}, a.Source.prototype.stop = function() {}, a.Source.prototype.pause = function(a) {
            this.stop(a)
        }, a.Source.prototype.sync = function(b) {
            a.Transport.syncSource(this, b)
        }, a.Source.prototype.unsync = function() {
            a.Transport.unsyncSource(this)
        }, a.Source.prototype.setVolume = function(a, b) {
            var c, d = this.now(),
                e = this.dbToGain(a);
            b ? (c = this.output.gain.value, this.output.gain.cancelScheduledValues(d), this.output.gain.setValueAtTime(c, d), this.output.gain.linearRampToValueAtTime(e, d + this.toSeconds(b))) : this.output.gain.setValueAtTime(e, d)
        }, a.Source.prototype.set = function(a) {
            this.isUndef(a.volume) || this.setVolume(a.volume)
        }, a.Source.prototype.dispose = function() {
            a.prototype.dispose.call(this), this.state = null
        }, a.Source.State = {
            STARTED: "started",
            PAUSED: "paused",
            STOPPED: "stopped",
            SYNCED: "synced"
        }, a.Source
    }), toneModule(function(a) {
        return a.Oscillator = function() {
            a.Source.call(this);
            var b = this.optionsObject(arguments, ["frequency", "type"], a.Oscillator.defaults);
            this._oscillator = null, this.frequency = new a.Signal(this.toFrequency(b.frequency)), this.detune = new a.Signal(b.detune), this.onended = b.onended, this._wave = null, this._phase = b.phase, this._type = b.type, this.setPhase(this._phase)
        }, a.extend(a.Oscillator, a.Source), a.Oscillator.defaults = {
            type: "sine",
            frequency: 440,
            onended: function() {},
            detune: 0,
            phase: 0
        }, a.Oscillator.prototype.start = function(b) {
            this.state === a.Source.State.STOPPED && (this.state = a.Source.State.STARTED, this._oscillator = this.context.createOscillator(), this._oscillator.setPeriodicWave(this._wave), this._oscillator.connect(this.output), this.frequency.connect(this._oscillator.frequency), this.detune.connect(this._oscillator.detune), this._oscillator.onended = this.onended, this._oscillator.start(this.toSeconds(b)))
        }, a.Oscillator.prototype.stop = function(b) {
            this.state === a.Source.State.STARTED && (this.state = a.Source.State.STOPPED, this._oscillator.stop(this.toSeconds(b)))
        }, a.Oscillator.prototype.setFrequency = function(a, b) {
            b ? this.frequency.exponentialRampToValueAtTime(this.toFrequency(a), this.toSeconds(b)) : this.frequency.setValue(this.toFrequency(a))
        }, a.Oscillator.prototype.setType = function(a) {
            var b, c, d, e, f, g = 4096,
                h = g / 2,
                i = new Float32Array(h),
                j = new Float32Array(h);
            for (i[0] = 0, j[0] = 0, b = this._phase, c = 1; h > c; ++c) {
                switch (d = 2 / (c * Math.PI), a) {
                    case "sine":
                        e = 1 === c ? 1 : 0;
                        break;
                    case "square":
                        e = 1 & c ? 2 * d : 0;
                        break;
                    case "sawtooth":
                        e = d * (1 & c ? 1 : -1);
                        break;
                    case "triangle":
                        e = 1 & c ? 2 * d * d * (c - 1 >> 1 & 1 ? -1 : 1) : 0;
                        break;
                    default:
                        throw new TypeError("invalid oscillator type: " + a)
                }
                0 !== e ? (i[c] = -e * Math.sin(b), j[c] = e * Math.cos(b)) : (i[c] = 0, j[c] = 0)
            }
            f = this.context.createPeriodicWave(i, j), this._wave = f, null !== this._oscillator && this._oscillator.setPeriodicWave(this._wave), this._type = a
        }, a.Oscillator.prototype.getType = function() {
            return this._type
        }, a.Oscillator.prototype.setPhase = function(a) {
            this._phase = a * Math.PI / 180, this.setType(this._type)
        }, a.Oscillator.prototype.set = function(b) {
            this.isUndef(b.type) || this.setType(b.type), this.isUndef(b.phase) || this.setPhase(b.phase), this.isUndef(b.frequency) || this.frequency.setValue(b.frequency), this.isUndef(b.onended) || (this.onended = b.onended), this.isUndef(b.detune) || this.detune.setValue(b.detune), a.Source.prototype.set.call(this, b)
        }, a.Oscillator.prototype.dispose = function() {
            a.Source.prototype.dispose.call(this), this.stop(), null !== this._oscillator && (this._oscillator.disconnect(), this._oscillator = null), this.frequency.dispose(), this.detune.dispose(), this._wave = null, this.detune = null, this.frequency = null
        }, a.Oscillator
    }), toneModule(function(a) {
        return a.AudioToGain = function() {
            this._norm = this.input = this.output = new a.WaveShaper([0, 1])
        }, a.extend(a.AudioToGain, a.SignalBase), a.AudioToGain.prototype.dispose = function() {
            a.prototype.dispose.call(this), this._norm.disconnect(), this._norm = null
        }, a.AudioToGain
    }), toneModule(function(a) {
        return a.LFO = function() {
            var b = this.optionsObject(arguments, ["rate", "min", "max"], a.LFO.defaults);
            this.oscillator = new a.Oscillator(b.rate, b.type), this.frequency = this.oscillator.frequency, this._a2g = new a.AudioToGain, this._scaler = this.output = new a.Scale(b.min, b.max), this.oscillator.chain(this._a2g, this._scaler)
        }, a.extend(a.LFO), a.LFO.defaults = {
            type: "sine",
            min: 0,
            max: 1,
            frequency: "4n"
        }, a.LFO.prototype.start = function(a) {
            this.oscillator.start(a)
        }, a.LFO.prototype.stop = function(a) {
            this.oscillator.stop(a)
        }, a.LFO.prototype.sync = function(b) {
            a.Transport.syncSource(this.oscillator, b), a.Transport.syncSignal(this.oscillator.frequency)
        }, a.LFO.prototype.unsync = function() {
            a.Transport.unsyncSource(this.oscillator), a.Transport.unsyncSignal(this.oscillator.frequency)
        }, a.LFO.prototype.setFrequency = function(a) {
            this.oscillator.setFrequency(a)
        }, a.LFO.prototype.setPhase = function(a) {
            this.oscillator.setPhase(a)
        }, a.LFO.prototype.setMin = function(a) {
            this._scaler.setMin(a)
        }, a.LFO.prototype.setMax = function(a) {
            this._scaler.setMax(a)
        }, a.LFO.prototype.setType = function(a) {
            this.oscillator.setType(a)
        }, a.LFO.prototype.set = function(a) {
            this.isUndef(a.frequency) || this.setFrequency(a.frequency), this.isUndef(a.type) || this.setType(a.type), this.isUndef(a.min) || this.setMin(a.min), this.isUndef(a.max) || this.setMax(a.max)
        }, a.LFO.prototype.connect = a.Signal.prototype.connect, a.LFO.prototype.dispose = function() {
            a.prototype.dispose.call(this), this.oscillator.dispose(), this.oscillator = null, this._scaler.dispose(), this._scaler = null, this._a2g.dispose(), this._a2g = null, this.frequency = null
        }, a.LFO
    }), toneModule(function(a) {
        return a.Limiter = function(b) {
            this._compressor = this.input = this.output = new a.Compressor({
                attack: .001,
                decay: .001,
                threshold: b
            })
        }, a.extend(a.Limiter), a.Limiter.prototype.setThreshold = function(a) {
            this._compressor.setThreshold(a)
        }, a.Limiter.prototype.dispose = function() {
            a.prototype.dispose.call(this), this._compressor.dispose(), this._compressor = null
        }, a.Limiter
    }), toneModule(function(a) {
        a.LowpassCombFilter = function(c, d) {
            var e, f, g;
            for (a.call(this), c = this.defaultArg(c, .01), d = this.defaultArg(d, 1), e = Math.ceil(this.bufferSize / (c * this.context.sampleRate)), e = Math.min(e, 10), e = Math.max(e, 1), this._filterDelayCount = e, this._filterDelays = new Array(this._filterDelayCount), this.dampening = new a.Signal(3e3), this.resonance = new a.Signal(.5), this._resScale = new a.ScaleExp(.01, 1 / this._filterDelayCount - .001, .5), this._highFrequencies = !1, this._feedback = this.context.createGain(), f = 0; f < this._filterDelayCount; f++) g = new b(c, this.dampening), g.connect(this._feedback), this._filterDelays[f] = g;
            this.input.connect(this._filterDelays[0]), this._feedback.connect(this._filterDelays[0]), this.connectSeries.apply(this, this._filterDelays), this.resonance.chain(this._resScale, this._feedback.gain), this._feedback.connect(this.output), this.setDelayTime(c)
        }, a.extend(a.LowpassCombFilter), a.LowpassCombFilter.prototype.setDelayTime = function(a, b) {
            var c, d, e, f, g, h;
            if (b = this.toSeconds(b), c = this.context.sampleRate, d = c * a, b = this.toSeconds(b), e = 100, e > d) {
                for (this._highFrequencies = !0, f = Math.round(d / e * this._filterDelayCount), g = 0; f > g; g++) this._filterDelays[g].setDelay(1 / c + a, b);
                a = Math.floor(d) / c
            } else if (this._highFrequencies)
                for (this._highFrequencies = !1, h = 0; h < this._filterDelays.length; h++) this._filterDelays[h].setDelay(a, b)
        }, a.LowpassCombFilter.prototype.dispose = function() {
            a.prototype.dispose.call(this);
            for (var b = 0; b < this._filterDelays.length; b++) this._filterDelays[b].dispose(), this._filterDelays[b] = null;
            this._filterDelays = null, this.dampening.dispose(), this.dampening = null, this.resonance.dispose(), this.resonance = null, this._resScale.dispose(), this._resScale = null, this._feedback.disconnect(), this._feedback = null
        };
        var b = function(a, b) {
            this.delay = this.input = this.context.createDelay(a), this.delay.delayTime.value = a, this.filter = this.output = this.context.createBiquadFilter(), b.connect(this.filter.frequency), this.filter.type = "lowpass", this.filter.Q.value = 0, this.delay.connect(this.filter)
        };
        return a.extend(b), b.prototype.setDelay = function(a, b) {
            this.delay.delayTime.setValueAtTime(a, b)
        }, b.prototype.dispose = function() {
            this.delay.disconnect(), this.delay = null, this.filter.disconnect(), this.filter = null
        }, a.LowpassCombFilter
    }), toneModule(function(a) {
        return a.Merge = function() {
            this.output = this.context.createGain(), this.input = new Array(2), this.left = this.input[0] = this.context.createGain(), this.right = this.input[1] = this.context.createGain(), this._merger = this.context.createChannelMerger(2), this.left.connect(this._merger, 0, 0), this.right.connect(this._merger, 0, 1), this._merger.connect(this.output)
        }, a.extend(a.Merge), a.Merge.prototype.dispose = function() {
            a.prototype.dispose.call(this), this.left.disconnect(), this.right.disconnect(), this._merger.disconnect(), this.left = null, this.right = null, this._merger = null
        }, a.Merge
    }), toneModule(function(a) {
        a.Master = function() {
            a.call(this), this.limiter = this.context.createDynamicsCompressor(), this.limiter.threshold.value = 0, this.attack = .001, this.release = .01, this.limiter.ratio.value = 20, this.input.chain(this.limiter, this.output, this.context.destination)
        }, a.extend(a.Master), a.Master.prototype.mute = function(a) {
            a = this.defaultArg(a, !0), this.output.gain.value = a ? 0 : 1
        }, a.Master.prototype.setVolume = function(a, b) {
            var c, d = this.now(),
                e = this.dbToGain(a);
            b ? (c = this.output.gain.value, this.output.gain.cancelScheduledValues(d), this.output.gain.setValueAtTime(c, d), this.output.gain.linearRampToValueAtTime(e, d + this.toSeconds(b))) : this.output.gain.setValueAtTime(e, d)
        }, a.prototype.toMaster = function() {
            this.connect(a.Master)
        }, AudioNode.prototype.toMaster = function() {
            this.connect(a.Master)
        };
        var b = a.Master;
        return a._initAudioContext(function() {
            a.prototype.isUndef(a.Master) ? b.call(a.Master) : a.Master = new b
        }), a.Master
    }), toneModule(function(a) {
        return a.Meter = function(b, c, d) {
            a.call(this), this.channels = this.defaultArg(b, 1), this.smoothing = this.defaultArg(c, .8), this.clipMemory = this.defaultArg(d, 500), this._volume = new Array(this.channels), this._values = new Array(this.channels);
            for (var e = 0; e < this.channels; e++) this._volume[e] = 0, this._values[e] = 0;
            this._lastClip = 0, this._jsNode = this.context.createScriptProcessor(this.bufferSize, this.channels, 1), this._jsNode.onaudioprocess = this._onprocess.bind(this), this._jsNode.noGC(), this.input.connect(this.output), this.input.connect(this._jsNode)
        }, a.extend(a.Meter), a.Meter.prototype._onprocess = function(a) {
            var b, c, d, e, f, g, h, i, j, k = this._jsNode.bufferSize,
                l = this.smoothing;
            for (b = 0; b < this.channels; b++) {
                for (c = a.inputBuffer.getChannelData(b), d = 0, e = 0, g = !1, h = 0; k > h; h++) f = c[h], !g && f > .95 && (g = !0, this._lastClip = Date.now()), e += f, d += f * f;
                i = e / k, j = Math.sqrt(d / k), this._volume[b] = Math.max(j, this._volume[b] * l), this._values[b] = i
            }
        }, a.Meter.prototype.getLevel = function(a) {
            a = this.defaultArg(a, 0);
            var b = this._volume[a];
            return 1e-5 > b ? 0 : b
        }, a.Meter.prototype.getValue = function(a) {
            return a = this.defaultArg(a, 0), this._values[a]
        }, a.Meter.prototype.getDb = function(a) {
            return this.gainToDb(this.getLevel(a))
        }, a.Meter.prototype.isClipped = function() {
            return Date.now() - this._lastClip < this.clipMemory
        }, a.Meter.prototype.dispose = function() {
            a.prototype.dispose.call(this), this._jsNode.disconnect(), this._jsNode.onaudioprocess = null, this._volume = null, this._values = null
        }, a.Meter
    }), toneModule(function(a) {
        return a.Mono = function() {
            a.call(this), this._merge = new a.Merge, this.input.connect(this._merge, 0, 0), this.input.connect(this._merge, 0, 1), this.input.gain.value = this.dbToGain(-10), this._merge.connect(this.output)
        }, a.extend(a.Mono), a.Mono.prototype.dispose = function() {
            a.prototype.dispose.call(this), this._merge.dispose(), this._merge = null
        }, a.Mono
    }), toneModule(function(a) {
        return a.MultibandCompressor = function(b) {
            b = this.defaultArg(arguments, a.MultibandCompressor.defaults), this._splitter = new a.MultibandSplit({
                lowFrequency: b.lowFrequency,
                highFrequency: b.highFrequency
            }), this.lowFrequency = this._splitter.lowFrequency, this.highFrequency = this._splitter.highFrequency, this.input = this._splitter, this.output = this.context.createGain(), this.low = new a.Compressor(b.low), this.mid = new a.Compressor(b.mid), this.high = new a.Compressor(b.high), this._splitter.low.chain(this.low, this.output), this._splitter.mid.chain(this.mid, this.output), this._splitter.high.chain(this.high, this.output)
        }, a.extend(a.MultibandCompressor), a.MultibandCompressor.defaults = {
            low: a.Compressor.defaults,
            mid: a.Compressor.defaults,
            high: a.Compressor.defaults,
            lowFrequency: 250,
            highFrequency: 2e3
        }, a.MultibandCompressor.prototype.dispose = function() {
            a.prototype.dispose.call(this), this._splitter.dispose(), this.low.dispose(), this.mid.dispose(), this.high.dispose(), this._splitter = null, this.low = null, this.mid = null, this.high = null, this.lowFrequency = null, this.highFrequency = null
        }, a.MultibandCompressor
    }), toneModule(function(a) {
        return a.Split = function() {
            this.input = this.context.createGain(), this.output = new Array(2), this._splitter = this.context.createChannelSplitter(2), this.left = this.output[0] = this.context.createGain(), this.right = this.output[1] = this.context.createGain(), this.input.connect(this._splitter), this._splitter.connect(this.left, 0, 0), this._splitter.connect(this.right, 1, 0)
        }, a.extend(a.Split), a.Split.prototype.dispose = function() {
            a.prototype.dispose.call(this), this._splitter.disconnect(), this.left.disconnect(), this.right.disconnect(), this.left = null, this.right = null, this._splitter = null
        }, a.Split
    }), toneModule(function(a) {
        return a.Panner = function(b) {
            a.call(this, 1, 0), this._dryWet = new a.DryWet, this._merger = this.output = new a.Merge, this._splitter = new a.Split, this.pan = this._dryWet.wetness, this.input.connect(this._splitter.left), this.input.connect(this._splitter.right), this._splitter.left.connect(this._dryWet.dry), this._splitter.right.connect(this._dryWet.wet), this._dryWet.dry.connect(this._merger.left), this._dryWet.wet.connect(this._merger.right), this.setPan(this.defaultArg(b, .5))
        }, a.extend(a.Panner), a.Panner.prototype.setPan = function(a, b) {
            this._dryWet.setWet(a, b)
        }, a.Panner.prototype.dispose = function() {
            a.prototype.dispose.call(this), this._dryWet.dispose(), this._splitter.dispose(), this._merger.dispose(), this._dryWet = null, this._splitter = null, this._merger = null, this.pan = null
        }, a.Panner
    }), toneModule(function(a) {
        return a.PanVol = function(b, c) {
            this.pan = this.input = new a.Panner(b), this.vol = this.output = this.context.createGain(), this.pan.connect(this.vol), this.setVolume(this.defaultArg(c, 0))
        }, a.extend(a.PanVol), a.PanVol.prototype.setVolume = a.Source.prototype.setVolume, a.PanVol.prototype.setPan = function(a) {
            this.pan.setPan(a)
        }, a.PanVol.prototype.dispose = function() {
            a.prototype.dispose.call(this), this.pan.dispose(), this.pan = null, this.vol.disconnect(), this.vol = null
        }, a.PanVol
    }), toneModule(function(a) {
        a.Recorder = function(c) {
            a.call(this), this.channels = this.defaultArg(c, 1), this._jsNode = this.context.createScriptProcessor(this.bufferSize, this.channels, 1), this._jsNode.onaudioprocess = this._audioprocess.bind(this), this._recordBuffers = new Array(this.channels), this._recordStartSample = 0, this._recordEndSample = 0, this._recordDuration = 0, this.state = b.STOPPED, this._recordBufferOffset = 0, this._callback = function() {}, this.input.connect(this._jsNode), this.input.connect(this.output), this._jsNode.noGC(), this.clear()
        }, a.extend(a.Recorder), a.Recorder.prototype._audioprocess = function(a) {
            var c, d, e, f, g, h;
            this.state !== b.STOPPED && this.state === b.RECORDING && (c = this.defaultArg(a.playbackTime, this.now()), d = this.toSamples(c), e = this._jsNode.bufferSize, f = d + e, d > this._recordEndSample ? (this.state = b.STOPPED, this._callback(this._recordBuffers)) : d > this._recordStartSample ? (g = 0, h = Math.min(this._recordEndSample - d, e), this._recordChannels(a.inputBuffer, g, h, e)) : f > this._recordStartSample && (h = f - this._recordStartSample, g = e - h, this._recordChannels(a.inputBuffer, g, h, e)))
        }, a.Recorder.prototype._recordChannels = function(a, b, c, d) {
            var e, f, g, h, i = this._recordBufferOffset,
                j = this._recordBuffers;
            for (e = 0; e < a.numberOfChannels; e++)
                if (f = a.getChannelData(e), 0 === b && c === d) this._recordBuffers[e].set(f, i);
                else
                    for (g = b; b + c > g; g++) h = g - b, j[e][h + i] = f[g];
            this._recordBufferOffset += c
        }, a.Recorder.prototype.record = function(a, c, d) {
            if (this.state === b.STOPPED) {
                this.clear(), this._recordBufferOffset = 0, c = this.defaultArg(c, 0), this._recordDuration = this.toSamples(a), this._recordStartSample = this.toSamples("+" + c), this._recordEndSample = this._recordStartSample + this._recordDuration;
                for (var e = 0; e < this.channels; e++) this._recordBuffers[e] = new Float32Array(this._recordDuration);
                this.state = b.RECORDING, this._callback = this.defaultArg(d, function() {})
            }
        }, a.Recorder.prototype.clear = function() {
            for (var a = 0; a < this.channels; a++) this._recordBuffers[a] = null;
            this._recordBufferOffset = 0
        }, a.Recorder.prototype.isEmpty = function() {
            return null === this._recordBuffers[0]
        }, a.Recorder.prototype.getFloat32Array = function() {
            return this.isEmpty() ? null : this._recordBuffers
        }, a.Recorder.prototype.getAudioBuffer = function() {
            var a, b, c;
            if (this.isEmpty()) return null;
            for (a = this.context.createBuffer(this.channels, this._recordBuffers[0].length, this.context.sampleRate), b = 0; b < a.numberOfChannels; b++) c = a.getChannelData(b), c.set(this._recordBuffers[b]);
            return a
        }, a.Recorder.prototype.dispose = function() {
            a.prototype.dispose.call(this), this._jsNode.disconnect(), this._jsNode.onaudioprocess = void 0, this._jsNode = null, this._recordBuffers = null
        };
        var b = {
            STOPPED: "stopped",
            SCHEDULED: "scheduled",
            RECORDING: "recording"
        };
        return a.Recorder
    }), toneModule(function(a) {
        return a.ScaledEnvelope = function() {
            var b = this.optionsObject(arguments, ["attack", "decay", "sustain", "release"], a.Envelope.defaults);
            a.Envelope.call(this, b), b = this.defaultArg(b, a.ScaledEnvelope.defaults), this._scale = this.output = new a.Scale(b.min, b.max), this._sig.connect(this._scale)
        }, a.extend(a.ScaledEnvelope, a.Envelope), a.ScaledEnvelope.defaults = {
            min: 0,
            max: 1
        }, a.ScaledEnvelope.prototype.set = function(b) {
            this.isUndef(b.min) || this.setMin(b.min), this.isUndef(b.max) || this.setMax(b.max), a.Envelope.prototype.set.call(this, b)
        }, a.ScaledEnvelope.prototype.setMax = function(a) {
            this._scale.setMax(a)
        }, a.ScaledEnvelope.prototype.setMin = function(a) {
            this._scale.setMin(a)
        }, a.ScaledEnvelope.prototype.dispose = function() {
            a.Envelope.prototype.dispose.call(this), this._scale.dispose(), this._scale = null
        }, a.ScaledEnvelope
    }), toneModule(function(a) {
        return a.Buffer = function() {
            var b, c = this.optionsObject(arguments, ["url", "callback"], a.Buffer.defaults);
            this.buffers = null, b = this, "object" != typeof c.url ? this._loadBuffer(c.url, c.callback) : this._loadBuffers(c.url, function(a) {
                b.buffer = a, c.callback(a)
            })
        }, a.extend(a.Buffer), a.Buffer.defaults = {
            url: "",
            callback: function() {}
        }, a.Buffer.prototype._loadBuffer = function(a, b) {
            var c, d = new XMLHttpRequest;
            d.open("GET", a, !0), d.responseType = "arraybuffer", c = this, d.onload = function() {
                c.context.decodeAudioData(d.response, function(a) {
                    return a ? void b(a) : void console.log("error in buffer data")
                })
            }, d.onerror = function() {
                console.log("error loading buffer")
            }, d.send()
        }, a.Buffer.prototype._loadBuffers = function(a, b) {
            var c, d, e, f = {
                    total: 0,
                    loaded: 0
                },
                g = function(a, c) {
                    var d = a;
                    return function(a) {
                        c[d] = a, f.loaded++, f.total === f.loaded && b(c)
                    }
                };
            if (Array.isArray(a))
                for (c = a.length, f.total = c, this.buffer = new Array(c), d = 0; c > d; d++) this._loadBuffer(a[d], g(d, this.buffer));
            else {
                f.total = Object.keys(a).length, this.buffer = {};
                for (e in a) this._loadBuffer(a[e], g(e, this.buffer))
            }
        }, a.Buffer.prototype.dispose = function() {
            a.prototype.dispose.call(this), this.buffer = null
        }, a.Buffer
    }), toneModule(function(a) {
        var b = {};
        return a.prototype.send = function(a, c) {
            b.hasOwnProperty(a) || (b[a] = this.context.createGain());
            var d = this.context.createGain();
            return d.gain.value = this.defaultArg(c, 1), this.output.chain(d, b[a]), d
        }, a.prototype.receive = function(a, c) {
            b.hasOwnProperty(a) || (b[a] = this.context.createGain()), c = this.defaultArg(c, this.input), b[a].connect(c)
        }, a
    }), toneModule(function(a) {
        function b(a, b, d) {
            var e, f, g, h;
            if (c.hasOwnProperty(a))
                for (e = c[a], f = 0, g = e.length; g > f; f++) h = e[f], Array.isArray(d) ? h.apply(window, [b].concat(d)) : h(b, d)
        }
        var c, d, e, f;
        return a.Note = function(b, c, d) {
            this.value = d, this._channel = b, this._timelineID = a.Transport.setTimeline(this._trigger.bind(this), c)
        }, a.Note.prototype._trigger = function(a) {
            b(this._channel, a, this.value)
        }, a.Note.prototype.dispose = function() {
            a.Tranport.clearTimeline(this._timelineID), this.value = null
        }, c = {}, a.Note.route = function(a, b) {
            c.hasOwnProperty(a) ? c[a].push(b) : c[a] = [b]
        }, a.Note.unroute = function(a, b) {
            var d, e;
            c.hasOwnProperty(a) && (d = c[a], e = d.indexOf(b), -1 !== e && c[a].splice(e, 1))
        }, a.Note.parseScore = function(b) {
            var c, d, e, f, g, h, i, j = [];
            for (c in b)
                if (d = b[c], "tempo" === c) a.Transport.setBpm(d);
                else if ("timeSignature" === c) a.Transport.setTimeSignature(d[0], d[1]);
            else {
                if (!Array.isArray(d)) throw new TypeError("score parts must be Arrays");
                for (e = 0; e < d.length; e++) f = d[e], Array.isArray(f) ? (h = f[0], i = f.slice(1), g = new a.Note(c, h, i)) : g = new a.Note(c, f), j.push(g)
            }
            return j
        }, d = {
            c: 0,
            "c#": 1,
            db: 1,
            d: 2,
            "d#": 3,
            eb: 3,
            e: 4,
            f: 5,
            "f#": 6,
            gb: 6,
            g: 7,
            "g#": 8,
            ab: 8,
            a: 9,
            "a#": 10,
            bb: 10,
            b: 11
        }, e = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"], f = 261.6255653005986, a.prototype.noteToFrequency = function(a) {
            var b, c, e, g = a.split(/(\d+)/);
            return 3 === g.length ? (b = d[g[0].toLowerCase()], c = g[1], e = b + 12 * parseInt(c, 10), Math.pow(2, (e - 48) / 12) * f) : 0
        }, a.prototype.frequencyToNote = function(a) {
            var b = Math.log(a / f) / Math.LN2,
                c = Math.round(12 * b) + 48,
                d = Math.floor(c / 12),
                g = e[c % 12];
            return g + d.toString()
        }, a.prototype.intervalToFrequencyRatio = function(a) {
            return Math.pow(2, a / 12)
        }, a.prototype.midiToNote = function(a) {
            var b = Math.floor(a / 12) - 2,
                c = a % 12;
            return e[c] + b
        }, a.prototype.noteToMidi = function(a) {
            var b, c, e = a.split(/(\d+)/);
            return 3 === e.length ? (b = d[e[0].toLowerCase()], c = e[1], b + 12 * (parseInt(c, 10) + 2)) : 0
        }, a.Note
    }), toneModule(function(a) {
        return a.Effect = function() {
            a.call(this);
            var b = this.optionsObject(arguments, ["dry"], a.Effect.defaults);
            this.dryWet = new a.DryWet, this.effectSend = this.context.createGain(), this.effectReturn = this.context.createGain(), this.input.connect(this.dryWet.dry), this.input.connect(this.effectSend), this.effectReturn.connect(this.dryWet.wet), this.dryWet.connect(this.output), this.setDry(b.dry)
        }, a.extend(a.Effect), a.Effect.defaults = {
            dry: 0
        }, a.Effect.prototype.setDry = function(a, b) {
            this.dryWet.setDry(a, b)
        }, a.Effect.prototype.setWet = function(a, b) {
            this.dryWet.setWet(a, b)
        }, a.Effect.prototype.set = function(a) {
            this.isUndef(a.dry) || this.setDry(a.dry), this.isUndef(a.wet) || this.setWet(a.wet)
        }, a.Effect.prototype.bypass = function() {
            this.setDry(1)
        }, a.Effect.prototype.connectEffect = function(a) {
            this.effectSend.chain(a, this.effectReturn)
        }, a.Effect.prototype.setPreset = function(a) {
            !this.isUndef(this.preset) && this.preset.hasOwnProperty(a) && this.set(this.preset[a])
        }, a.Effect.prototype.dispose = function() {
            a.prototype.dispose.call(this), this.dryWet.dispose(), this.dryWet = null, this.effectSend.disconnect(), this.effectSend = null, this.effectReturn.disconnect(), this.effectReturn = null
        }, a.Effect
    }), toneModule(function(a) {
        return a.AutoPanner = function() {
            var b = this.optionsObject(arguments, ["frequency"], a.AutoPanner.defaults);
            a.Effect.call(this, b), this._lfo = new a.LFO(b.frequency, 0, 1), this._panner = new a.Panner, this.connectEffect(this._panner), this._lfo.connect(this._panner.pan), this.setType(b.type)
        }, a.extend(a.AutoPanner, a.Effect), a.AutoPanner.defaults = {
            frequency: 1,
            type: "sine"
        }, a.AutoPanner.prototype.start = function(a) {
            this._lfo.start(a)
        }, a.AutoPanner.prototype.stop = function(a) {
            this._lfo.stop(a)
        }, a.AutoPanner.prototype.setType = function(a) {
            this._lfo.setType(a)
        }, a.AutoPanner.prototype.setFrequency = function(a) {
            this._lfo.setFrequency(a)
        }, a.AutoPanner.prototype.set = function(b) {
            this.isUndef(b.frequency) || this.setFrequency(b.frequency), this.isUndef(b.type) || this.setType(b.type), a.Effect.prototype.set.call(this, b)
        }, a.AutoPanner.prototype.dispose = function() {
            a.Effect.prototype.dispose.call(this), this._lfo.dispose(), this._panner.dispose(), this._lfo = null, this._panner = null
        }, a.AutoPanner
    }), toneModule(function(a) {
        return a.AutoWah = function() {
            var b = this.optionsObject(arguments, ["baseFrequency", "octaves", "sensitivity"], a.AutoWah.defaults);
            a.Effect.call(this, b), this._follower = new a.Follower(b.follower), this._sweepRange = new a.ScaleExp(0, 1, .5), this._baseFrequency = b.baseFrequency, this._octaves = b.octaves, this._bandpass = new a.Filter(0, "bandpass"), this._bandpass.setRolloff(b.rolloff), this._peaking = this.context.createBiquadFilter(), this._peaking.type = "peaking", this._peaking.gain.value = b.gain, this.effectSend.chain(this._follower, this._sweepRange), this._sweepRange.connect(this._bandpass.frequency), this._sweepRange.connect(this._peaking.frequency), this.effectSend.chain(this._bandpass, this._peaking, this.effectReturn), this._setSweepRange(), this.setSensitiviy(b.sensitivity)
        }, a.extend(a.AutoWah, a.Effect), a.AutoWah.defaults = {
            baseFrequency: 100,
            octaves: 6,
            sensitivity: 0,
            Q: 2,
            gain: 2,
            rolloff: -48,
            follower: {
                attack: .3,
                release: .5
            }
        }, a.AutoWah.prototype.setOctaves = function(a) {
            this._octaves = a, this._setSweepRange()
        }, a.AutoWah.prototype.setBaseFrequency = function(a) {
            this._baseFrequency = a, this._setSweepRange()
        }, a.AutoWah.prototype.setSensitiviy = function(a) {
            this._sweepRange.setMax(this.dbToGain(a))
        }, a.AutoWah.prototype._setSweepRange = function() {
            this._sweepRange.setMin(this._baseFrequency), this._sweepRange.setMax(Math.min(this._baseFrequency * Math.pow(2, this._octaves), this.context.sampleRate / 2))
        }, a.AutoWah.prototype.set = function(b) {
            this.isUndef(b.baseFrequency) || this.setBaseFrequency(b.baseFrequency), this.isUndef(b.sensitivity) || this.setSensitiviy(b.sensitivity), this.isUndef(b.octaves) || this.setOctaves(b.octaves), this.isUndef(b.follower) || this._follower.set(b.follower), this.isUndef(b.rolloff) || this._bandpass.setRolloff(b.rolloff), this.isUndef(b.Q) || (this._bandpass.Q.value = b.Q), this.isUndef(b.gain) || (this._peaking.gain.value = b.gain), a.Effect.prototype.set.call(this, b)
        }, a.AutoWah.prototype.dispose = function() {
            a.Effect.prototype.dispose.call(this), this._follower.dispose(), this._sweepRange.dispose(), this._bandpass.disconnect(), this._peaking.disconnect(), this._follower = null, this._sweepRange = null, this._bandpass = null, this._peaking = null
        }, a.AutoWah
    }), toneModule(function(a) {
        return a.BitCrusher = function() {
            var b, c = this.optionsObject(arguments, ["bits"], a.BitCrusher.defaults);
            a.Effect.call(this, c), b = 1 / Math.pow(2, c.bits - 1), this._floor = new a.Expr("$0 - mod($0, %, %)", b, c.bits), this.connectEffect(this._floor)
        }, a.extend(a.BitCrusher, a.Effect), a.BitCrusher.defaults = {
            bits: 4
        }, a.BitCrusher.prototype.dispose = function() {
            a.Effect.prototype.dispose.call(this), this._floor.dispose(), this._floor = null
        }, a.BitCrusher
    }), toneModule(function(a) {
        return a.Chebyshev = function() {
            var b = this.optionsObject(arguments, ["order"], a.Chebyshev.defaults);
            a.Effect.call(this), this._shaper = new a.WaveShaper(4096), this.connectEffect(this._shaper), this.setOrder(b.order), this.setOversample(b.oversample)
        }, a.extend(a.Chebyshev, a.Effect), a.Chebyshev.defaults = {
            order: 1,
            oversample: "none"
        }, a.Chebyshev.prototype.setOrder = function(a) {
            var b, c, d = new Array(4096),
                e = d.length;
            for (b = 0; e > b; ++b) c = 2 * b / e - 1, d[b] = 0 === c ? 0 : this._getCoefficient(c, a, {});
            this._shaper.setCurve(d)
        }, a.Chebyshev.prototype._getCoefficient = function(a, b, c) {
            return c.hasOwnProperty(b) ? c[b] : (c[b] = 0 === b ? 0 : 1 === b ? a : 2 * a * this._getCoefficient(a, b - 1, c) - this._getCoefficient(a, b - 2, c), c[b])
        }, a.Chebyshev.prototype.setOversample = function(a) {
            this._shaper.setOversample(a)
        }, a.Chebyshev.prototype.dispose = function() {
            a.Effect.prototype.dispose.call(this), this._shaper.dispose(), this._shaper = null
        }, a.Chebyshev
    }), toneModule(function(a) {
        return a.StereoEffect = function() {
            a.call(this);
            var b = this.optionsObject(arguments, ["dry"], a.Effect.defaults);
            this.dryWet = new a.DryWet, this._split = new a.Split, this.effectSendL = this._split.left, this.effectSendR = this._split.right, this._merge = new a.Merge, this.effectReturnL = this._merge.left, this.effectReturnR = this._merge.right, this.input.connect(this._split), this.input.connect(this.dryWet.dry), this._merge.connect(this.dryWet.wet), this.dryWet.connect(this.output), this.setDry(b.dry)
        }, a.extend(a.StereoEffect, a.Effect), a.StereoEffect.prototype.dispose = function() {
            a.prototype.dispose.call(this), this.dryWet.dispose(), this.dryWet = null, this._split.dispose(), this._split = null, this._merge.dispose(), this._merge = null, this.effectSendL = null, this.effectSendR = null, this.effectReturnL = null, this.effectReturnR = null
        }, a.StereoEffect
    }), toneModule(function(a) {
        return a.FeedbackEffect = function() {
            var b = this.optionsObject(arguments, ["feedback"]);
            b = this.defaultArg(b, a.FeedbackEffect.defaults), a.Effect.call(this, b), this.feedback = new a.Signal(b.feedback), this._feedbackGain = this.context.createGain(), this.effectReturn.chain(this._feedbackGain, this.effectSend), this.feedback.connect(this._feedbackGain.gain)
        }, a.extend(a.FeedbackEffect, a.Effect), a.FeedbackEffect.defaults = {
            feedback: .125
        }, a.FeedbackEffect.prototype.setFeedback = function(a, b) {
            b ? this.feedback.linearRampToValueNow(a, b) : this.feedback.setValue(a)
        }, a.FeedbackEffect.prototype.set = function(b) {
            this.isUndef(b.feedback) || this.setFeedback(b.feedback), a.Effect.prototype.set.call(this, b)
        }, a.FeedbackEffect.prototype.dispose = function() {
            a.Effect.prototype.dispose.call(this), this.feedback.dispose(), this.feedback = null, this._feedbackGain.disconnect(), this._feedbackGain = null
        }, a.FeedbackEffect
    }), toneModule(function(a) {
        return a.StereoXFeedbackEffect = function() {
            var b = this.optionsObject(arguments, ["feedback"], a.FeedbackEffect.defaults);
            a.StereoEffect.call(this, b), this.feedback = new a.Signal(b.feedback), this._feedbackLR = this.context.createGain(), this._feedbackRL = this.context.createGain(), this.effectReturnL.chain(this._feedbackLR, this.effectSendR), this.effectReturnR.chain(this._feedbackRL, this.effectSendL), this.feedback.fan(this._feedbackLR.gain, this._feedbackRL.gain)
        }, a.extend(a.StereoXFeedbackEffect, a.FeedbackEffect), a.StereoXFeedbackEffect.prototype.dispose = function() {
            a.StereoEffect.prototype.dispose.call(this), this.feedback.dispose(), this.feedback = null, this._feedbackLR.disconnect(), this._feedbackLR = null, this._feedbackRL.disconnect(), this._feedbackRL = null
        }, a.StereoXFeedbackEffect
    }), toneModule(function(a) {
        return a.Chorus = function() {
            var b = this.optionsObject(arguments, ["rate", "delayTime", "depth"], a.Chorus.defaults);
            a.StereoXFeedbackEffect.call(this, b), this._depth = b.depth, this._delayTime = b.delayTime / 1e3, this._lfoL = new a.LFO(b.rate, 0, 1), this._lfoR = new a.LFO(b.rate, 0, 1), this._lfoR.setPhase(180), this._delayNodeL = this.context.createDelay(), this._delayNodeR = this.context.createDelay(), this.connectSeries(this.effectSendL, this._delayNodeL, this.effectReturnL), this.connectSeries(this.effectSendR, this._delayNodeR, this.effectReturnR), this.effectSendL.connect(this.effectReturnL), this.effectSendR.connect(this.effectReturnR), this._lfoL.connect(this._delayNodeL.delayTime), this._lfoR.connect(this._delayNodeR.delayTime), this._lfoL.start(), this._lfoR.start(), this._lfoL.frequency.connect(this._lfoR.frequency), this.setDepth(this._depth), this.setRate(b.rate), this.setType(b.type)
        }, a.extend(a.Chorus, a.StereoXFeedbackEffect), a.Chorus.defaults = {
            rate: 1.5,
            delayTime: 3.5,
            depth: .7,
            feedback: .1,
            type: "sine"
        }, a.Chorus.prototype.setDepth = function(a) {
            this._depth = a;
            var b = this._delayTime * a;
            this._lfoL.setMin(this._delayTime - b), this._lfoL.setMax(this._delayTime + b), this._lfoR.setMin(this._delayTime - b), this._lfoR.setMax(this._delayTime + b)
        }, a.Chorus.prototype.setDelayTime = function(a) {
            this._delayTime = a / 1e3, this.setDepth(this._depth)
        }, a.Chorus.prototype.setRate = function(a) {
            this._lfoL.setFrequency(a)
        }, a.Chorus.prototype.setType = function(a) {
            this._lfoL.setType(a), this._lfoR.setType(a)
        }, a.Chorus.prototype.set = function(b) {
            this.isUndef(b.rate) || this.setRate(b.rate), this.isUndef(b.delayTime) || this.setDelayTime(b.delayTime), this.isUndef(b.depth) || this.setDepth(b.depth), this.isUndef(b.type) || this.setType(b.type), a.FeedbackEffect.prototype.set.call(this, b)
        }, a.Chorus.prototype.dispose = function() {
            a.StereoXFeedbackEffect.prototype.dispose.call(this), this._lfoL.dispose(), this._lfoR.dispose(), this._delayNodeL.disconnect(), this._delayNodeR.disconnect(), this._lfoL = null, this._lfoR = null, this._delayNodeL = null, this._delayNodeR = null
        }, a.Chorus
    }), toneModule(function(a) {
        return a.Convolver = function() {
            var b = this.optionsObject(arguments, ["url", "onload"], a.Convolver.defaults);
            a.Effect.call(this, b), this._convolver = this.context.createConvolver(), this._buffer = null, this.connectEffect(this._convolver), this.isUndef(b.url) || this.load(b.url, b.onload)
        }, a.extend(a.Convolver, a.Effect), a.Convolver.defaults = {
            onload: function() {}
        }, a.Convolver.prototype.load = function(b, c) {
            if (this._buffer) c && c(this);
            else {
                var d = this;
                new a.Buffer(b, function(a) {
                    d.setBuffer(a), c && c(d)
                })
            }
        }, a.Convolver.prototype.setBuffer = function(a) {
            this._buffer = a, this._convolver.buffer = this._buffer
        }, a.Convolver.prototype.set = function(b) {
            this.isUndef(b.buffer) || this.setBuffer(b.buffer), a.Effect.prototype.set.call(this, b)
        }, a.Convolver.prototype.dispose = function() {
            a.Effect.prototype.dispose.call(this), this._convolver.disconnect(), this._convolver = null, this._buffer = null
        }, a.Convolver
    }), toneModule(function(a) {
        return a.Distortion = function() {
            var b = this.optionsObject(arguments, ["distortion"], a.Distortion.defaults);
            a.Effect.call(this), this._shaper = new a.WaveShaper(4096), this.connectEffect(this._shaper), this.setDistortion(b.distortion), this.setOversample(b.oversample)
        }, a.extend(a.Distortion, a.Effect), a.Distortion.defaults = {
            distortion: .4,
            oversample: "none"
        }, a.Distortion.prototype.setDistortion = function(a) {
            var b = 100 * a,
                c = Math.PI / 180;
            this._shaper.setMap(function(a) {
                return Math.abs(a) < .001 ? 0 : (3 + b) * a * 20 * c / (Math.PI + b * Math.abs(a))
            })
        }, a.Distortion.prototype.setOversample = function(a) {
            this._shaper.oversample = a
        }, a.Distortion.prototype.dispose = function() {
            a.Effect.prototype.dispose.call(this), this._shaper.dispose(), this._shaper = null
        }, a.Distortion
    }), toneModule(function(a) {
        return a.FeedbackDelay = function() {
            var b = this.optionsObject(arguments, ["delayTime"], a.FeedbackDelay.defaults);
            a.FeedbackEffect.call(this, b), this.delayTime = new a.Signal, this._delayNode = this.context.createDelay(4), this.connectEffect(this._delayNode), this.delayTime.connect(this._delayNode.delayTime), this.setDelayTime(b.delayTime)
        }, a.extend(a.FeedbackDelay, a.FeedbackEffect), a.FeedbackDelay.defaults = {
            delayTime: .25
        }, a.FeedbackDelay.prototype.setDelayTime = function(a, b) {
            b ? this.delayTime.linearRampToValueNow(this.toSeconds(a), b) : this.delayTime.setValue(this.toSeconds(a))
        }, a.FeedbackDelay.prototype.set = function(b) {
            this.isUndef(b.delayTime) || this.setDelayTime(b.delayTime), a.FeedbackEffect.prototype.set.call(this, b)
        }, a.FeedbackDelay.prototype.dispose = function() {
            a.FeedbackEffect.prototype.dispose.call(this), this.delayTime.dispose(), this._delayNode.disconnect(), this._delayNode = null, this.delayTime = null
        }, a.FeedbackDelay
    }), toneModule(function(a) {
        var b = [1557 / 44100, 1617 / 44100, 1491 / 44100, 1422 / 44100, 1277 / 44100, 1356 / 44100, 1188 / 44100, 1116 / 44100],
            c = [225, 556, 441, 341];
        return a.Freeverb = function() {
            var d, e, f, g, h, i, j = this.optionsObject(arguments, ["roomSize", "dampening"], a.Freeverb.defaults);
            for (a.StereoEffect.call(this, j), this.roomSize = new a.Signal(j.roomSize), this.dampening = new a.Signal(j.dampening), this._dampeningScale = new a.ScaleExp(100, 8e3, .5), this._combFilters = [], this._allpassFiltersL = [], this._allpassFiltersR = [], d = 0; d < c.length; d++) e = this.context.createBiquadFilter(), e.type = "allpass", e.frequency.value = c[d], this._allpassFiltersL.push(e);
            for (f = 0; f < c.length; f++) g = this.context.createBiquadFilter(), g.type = "allpass", g.frequency.value = c[f], this._allpassFiltersR.push(g);
            for (h = 0; h < b.length; h++) i = new a.LowpassCombFilter(b[h]), h < b.length / 2 ? this.effectSendL.chain(i, this._allpassFiltersL[0]) : this.effectSendR.chain(i, this._allpassFiltersR[0]), this.roomSize.connect(i.resonance), this._dampeningScale.connect(i.dampening), this._combFilters.push(i);
            this.connectSeries.apply(this, this._allpassFiltersL), this.connectSeries.apply(this, this._allpassFiltersR), this._allpassFiltersL[this._allpassFiltersL.length - 1].connect(this.effectReturnL), this._allpassFiltersR[this._allpassFiltersR.length - 1].connect(this.effectReturnR), this.dampening.connect(this._dampeningScale)
        }, a.extend(a.Freeverb, a.StereoEffect), a.Freeverb.defaults = {
            roomSize: .7,
            dampening: .5
        }, a.Freeverb.prototype.setRoomSize = function(a) {
            this.roomSize.setValue(a)
        }, a.Freeverb.prototype.setDampening = function(a) {
            this.dampening.setValue(a)
        }, a.Freeverb.prototype.set = function(b) {
            this.isUndef(b.dampening) || this.setDampening(b.dampening), this.isUndef(b.roomSize) || this.setRoomSize(b.roomSize), a.StereoEffect.prototype.set.call(this, b)
        }, a.Freeverb.prototype.dispose = function() {
            var b, c, d;
            for (a.StereoEffect.prototype.dispose.call(this), b = 0; b < this._allpassFiltersL.length; b++) this._allpassFiltersL[b].disconnect(), this._allpassFiltersL[b] = null;
            for (this._allpassFiltersL = null, c = 0; c < this._allpassFiltersR.length; c++) this._allpassFiltersR[c].disconnect(), this._allpassFiltersR[c] = null;
            for (this._allpassFiltersR = null, d = 0; d < this._combFilters.length; d++) this._combFilters[d].dispose(), this._combFilters[d] = null;
            this._combFilters = null, this.roomSize.dispose(), this.dampening.dispose(), this._dampeningScale.dispose(), this.roomSize = null, this.dampening = null, this._dampeningScale = null
        }, a.Freeverb
    }), toneModule(function(a) {
        var b = [.06748, .06404, .08212, .09004],
            c = [.773, .802, .753, .733],
            d = [347, 113, 37];
        return a.JCReverb = function() {
            var e, f, g, h, i = this.optionsObject(arguments, ["roomSize"], a.JCReverb.defaults);
            for (a.StereoEffect.call(this, i), this.roomSize = new a.Signal(i.roomSize), this._scaleRoomSize = new a.Scale(-.733, .197), this._allpassFilters = [], this._feedbackCombFilters = [], e = 0; e < d.length; e++) f = this.context.createBiquadFilter(), f.type = "allpass", f.frequency.value = d[e], this._allpassFilters.push(f);
            for (g = 0; g < b.length; g++) h = new a.FeedbackCombFilter(b[g], .1), this._scaleRoomSize.connect(h.resonance), h.resonance.setValue(c[g]), this._allpassFilters[this._allpassFilters.length - 1].connect(h), h.connect(g < b.length / 2 ? this.effectReturnL : this.effectReturnR), this._feedbackCombFilters.push(h);
            this.roomSize.connect(this._scaleRoomSize), this.connectSeries.apply(this, this._allpassFilters), this.effectSendL.connect(this._allpassFilters[0]), this.effectSendR.connect(this._allpassFilters[0])
        }, a.extend(a.JCReverb, a.StereoEffect), a.JCReverb.defaults = {
            roomSize: .5
        }, a.JCReverb.prototype.setRoomSize = function(a) {
            this.roomSize.setValue(a)
        }, a.JCReverb.prototype.set = function(b) {
            this.isUndef(b.roomSize) || this.setRoomSize(b.roomSize), a.StereoEffect.prototype.set.call(this, b)
        }, a.JCReverb.prototype.dispose = function() {
            var b, c;
            for (a.StereoEffect.prototype.dispose.call(this), b = 0; b < this._allpassFilters.length; b++) this._allpassFilters[b].disconnect(), this._allpassFilters[b] = null;
            for (this._allpassFilters = null, c = 0; c < this._feedbackCombFilters.length; c++) this._feedbackCombFilters[c].dispose(), this._feedbackCombFilters[c] = null;
            this._feedbackCombFilters = null, this.roomSize.dispose(), this.roomSize = null, this._scaleRoomSize.dispose(), this._scaleRoomSize = null
        }, a.JCReverb
    }), toneModule(function(a) {
        return a.MidSideEffect = function() {
            a.StereoEffect.call(this), this._sqrtTwo = new a.Signal(1 / Math.sqrt(2)), this.midSend = new a.Expr("($0 + $1) * $2"), this.sideSend = new a.Expr("($0 - $1) * $2"), this._left = new a.Expr("($0 + $1) * $2"), this._right = new a.Expr("($0 - $1) * $2"), this.midReturn = this.context.createGain(), this.sideReturn = this.context.createGain(), this.effectSendL.connect(this.midSend, 0, 0), this.effectSendR.connect(this.midSend, 0, 1), this.effectSendL.connect(this.sideSend, 0, 0), this.effectSendR.connect(this.sideSend, 0, 1), this._left.connect(this.effectReturnL), this._right.connect(this.effectReturnR), this.midReturn.connect(this._left, 0, 0), this.sideReturn.connect(this._left, 0, 1), this.midReturn.connect(this._right, 0, 0), this.sideReturn.connect(this._right, 0, 1), this._sqrtTwo.connect(this.midSend, 0, 2), this._sqrtTwo.connect(this.sideSend, 0, 2), this._sqrtTwo.connect(this._left, 0, 2), this._sqrtTwo.connect(this._right, 0, 2)
        }, a.extend(a.MidSideEffect, a.StereoEffect), a.MidSideEffect.prototype.dispose = function() {
            a.StereoEffect.prototype.dispose.call(this), this._sqrtTwo.dispose(), this._sqrtTwo = null, this.midSend.dispose(), this.midSend = null, this.sideSend.dispose(), this.sideSend = null, this._left.dispose(), this._left = null, this._right.dispose(), this._right = null, this.midReturn.disconnect(), this.midReturn = null, this.sideReturn.disconnect(), this.sideReturn = null
        }, a.MidSideEffect
    }), toneModule(function(a) {
        return a.Phaser = function() {
            var b = this.optionsObject(arguments, ["rate", "depth", "baseFrequency"], a.Phaser.defaults);
            a.StereoEffect.call(this, b), this._lfoL = new a.LFO(b.rate, 0, 1), this._lfoR = new a.LFO(b.rate, 0, 1), this._lfoR.setPhase(180), this._baseFrequency = b.baseFrequency, this._depth = b.depth, this._filtersL = this._makeFilters(b.stages, this._lfoL, b.Q), this._filtersR = this._makeFilters(b.stages, this._lfoR, b.Q), this.effectSendL.connect(this._filtersL[0]), this.effectSendR.connect(this._filtersR[0]), this._filtersL[b.stages - 1].connect(this.effectReturnL), this._filtersR[b.stages - 1].connect(this.effectReturnR), this.effectSendL.connect(this.effectReturnL), this.effectSendR.connect(this.effectReturnR), this._lfoL.frequency.connect(this._lfoR.frequency), this.setBaseFrequency(b.baseFrequency), this.setDepth(b.depth), this.setRate(b.rate), this._lfoL.start(), this._lfoR.start()
        }, a.extend(a.Phaser, a.StereoEffect), a.Phaser.defaults = {
            rate: .5,
            depth: 10,
            stages: 4,
            Q: 100,
            baseFrequency: 400
        }, a.Phaser.prototype._makeFilters = function(a, b, c) {
            var d, e, f = new Array(a);
            for (d = 0; a > d; d++) e = this.context.createBiquadFilter(), e.type = "allpass", e.Q.value = c, b.connect(e.frequency), f[d] = e;
            return this.connectSeries.apply(this, f), f
        }, a.Phaser.prototype.setDepth = function(a) {
            this._depth = a;
            var b = this._baseFrequency + this._baseFrequency * a;
            this._lfoL.setMax(b), this._lfoR.setMax(b)
        }, a.Phaser.prototype.setBaseFrequency = function(a) {
            this._baseFrequency = a, this._lfoL.setMin(a), this._lfoR.setMin(a), this.setDepth(this._depth)
        }, a.Phaser.prototype.setRate = function(a) {
            this._lfoL.setFrequency(a)
        }, a.Phaser.prototype.set = function(b) {
            this.isUndef(b.rate) || this.setRate(b.rate), this.isUndef(b.baseFrequency) || this.setBaseFrequency(b.baseFrequency), this.isUndef(b.depth) || this.setDepth(b.depth), a.StereoEffect.prototype.set.call(this, b)
        }, a.Phaser.prototype.dispose = function() {
            var b, c;
            for (a.StereoEffect.prototype.dispose.call(this), this._lfoL.dispose(), this._lfoL = null, this._lfoR.dispose(), this._lfoR = null, b = 0; b < this._filtersL.length; b++) this._filtersL[b].disconnect(), this._filtersL[b] = null;
            for (this._filtersL = null, c = 0; c < this._filtersR.length; c++) this._filtersR[c].disconnect(), this._filtersR[c] = null;
            this._filtersR = null
        }, a.Phaser
    }), toneModule(function(a) {
        return a.PingPongDelay = function() {
            var b = this.optionsObject(arguments, ["delayTime"], a.PingPongDelay.defaults);
            a.StereoXFeedbackEffect.call(this, b), this._leftDelay = this.context.createDelay(b.maxDelayTime), this._rightDelay = this.context.createDelay(b.maxDelayTime), this._leftPreDelay = this.context.createDelay(b.maxDelayTime), this.delayTime = new a.Signal(0), this.effectSendL.chain(this._leftPreDelay, this._leftDelay, this.effectReturnL), this.effectSendR.chain(this._rightDelay, this.effectReturnR), this.delayTime.fan(this._leftDelay.delayTime, this._rightDelay.delayTime, this._leftPreDelay.delayTime), this._feedbackRL.disconnect(), this._feedbackRL.connect(this._leftDelay), this.setDelayTime(b.delayTime)
        }, a.extend(a.PingPongDelay, a.StereoXFeedbackEffect), a.PingPongDelay.defaults = {
            delayTime: .25,
            maxDelayTime: 1
        }, a.PingPongDelay.prototype.setDelayTime = function(a) {
            this.delayTime.setValue(this.toSeconds(a))
        }, a.PingPongDelay.prototype.set = function(b) {
            this.isUndef(b.delayTime) || this.setDelayTime(b.delayTime), a.StereoXFeedbackEffect.prototype.set.call(this, b)
        }, a.PingPongDelay.prototype.dispose = function() {
            a.StereoXFeedbackEffect.prototype.dispose.call(this), this._leftDelay.disconnect(), this._rightDelay.disconnect(), this._leftPreDelay.disconnect(), this.delayTime.dispose(), this._leftDelay = null, this._rightDelay = null, this._leftPreDelay = null, this.delayTime = null
        }, a.PingPongDelay
    }), toneModule(function(a) {
        return a.StereoFeedbackEffect = function() {
            var b = this.optionsObject(arguments, ["feedback"], a.FeedbackEffect.defaults);
            a.StereoEffect.call(this, b), this.feedback = new a.Signal(b.feedback), this._feedbackL = this.context.createGain(), this._feedbackR = this.context.createGain(), this.effectReturnL.chain(this._feedbackL, this.effectSendL), this.effectReturnR.chain(this._feedbackR, this.effectSendR), this.feedback.fan(this._feedbackL.gain, this._feedbackR.gain)
        }, a.extend(a.StereoFeedbackEffect, a.FeedbackEffect), a.StereoFeedbackEffect.prototype.dispose = function() {
            a.StereoEffect.prototype.dispose.call(this), this.feedback.dispose(), this.feedback = null, this._feedbackL.disconnect(), this._feedbackL = null, this._feedbackR.disconnect(), this._feedbackR = null
        }, a.StereoFeedbackEffect
    }), toneModule(function(a) {
        return a.StereoWidener = function() {
            var b = this.optionsObject(arguments, ["width"], a.StereoWidener.defaults);
            a.MidSideEffect.call(this, b), this.width = new a.Signal(.5), this._midMult = new a.Expr("$0 * ($1 * (1 - $2))"), this._sideMult = new a.Expr("$0 * ($1 * $2)"), this._two = new a.Signal(2), this._two.connect(this._midMult, 0, 1), this.width.connect(this._midMult, 0, 2), this._two.connect(this._sideMult, 0, 1), this.width.connect(this._sideMult, 0, 2), this.midSend.chain(this._midMult, this.midReturn), this.sideSend.chain(this._sideMult, this.sideReturn)
        }, a.extend(a.StereoWidener, a.MidSideEffect), a.StereoWidener.defaults = {
            width: .5
        }, a.StereoWidener.prototype.setWidth = function(a) {
            this.width.setValue(a)
        }, a.StereoWidener.prototype.set = function(b) {
            this.isUndef(b.width) || this.setWidth(b.width), a.MidSideEffect.prototype.set.call(this, b)
        }, a.StereoWidener.prototype.dispose = function() {
            a.MidSideEffect.prototype.dispose.call(this), this.width.dispose(), this.width = null, this._midMult.dispose(), this._midMult = null, this._sideMult.dispose(), this._sideMult = null, this._two.dispose(), this._two = null
        }, a.StereoWidener
    }), toneModule(function(a) {
        return a.PulseOscillator = function() {
            a.Source.call(this);
            var b = this.optionsObject(arguments, ["frequency", "width"], a.Oscillator.defaults);
            this.width = new a.Signal(b.width), this._sawtooth = new a.Oscillator({
                frequency: b.frequency,
                detune: b.detune,
                type: "sawtooth",
                phase: b.phase
            }), this.frequency = this._sawtooth.frequency, this.detune = this._sawtooth.detune, this.onended = b.onended, this._thresh = new a.WaveShaper(function(a) {
                return 0 > a ? -1 : 1
            }), this._sawtooth.chain(this._thresh, this.output), this.width.connect(this._thresh), this._sawtooth.onended = this._onended.bind(this)
        }, a.extend(a.PulseOscillator, a.Oscillator), a.PulseOscillator.defaults = {
            frequency: 440,
            detune: 0,
            phase: 0,
            width: .2,
            onended: function() {}
        }, a.PulseOscillator.prototype.setWidth = function(a) {
            this.width.setValue(a)
        }, a.PulseOscillator.prototype.setPhase = function(a) {
            this._sawtooth.setPhase(a)
        }, a.PulseOscillator.prototype.set = function(b) {
            this.isUndef(b.width) || this.setWidth(b.width), this._sawtooth.set({
                phase: b.phase,
                frequency: b.frequency,
                detune: b.detune,
                onended: b.onended
            }), a.Source.prototype.set.call(this, b)
        }, a.PulseOscillator.prototype.start = function(b) {
            this.state === a.Source.State.STOPPED && (this.state = a.Source.State.STARTED, b = this.toSeconds(b), this._sawtooth.start(b), this.width.output.gain.setValueAtTime(1, b))
        }, a.PulseOscillator.prototype.stop = function(b) {
            this.state === a.Source.State.STARTED && (this.state = a.Source.State.STOPPED, b = this.toSeconds(b), this._sawtooth.stop(b), this.width.output.gain.setValueAtTime(0, b))
        }, a.PulseOscillator.prototype._onended = function() {
            this.onended()
        }, a.PulseOscillator.prototype.dispose = function() {
            a.Source.prototype.dispose.call(this), this._sawtooth.dispose(), this.width.dispose(), this._thresh.disconnect(), this._sawtooth = null, this.frequency = null, this.detune = null, this.width = null, this._thresh = null
        }, a.PulseOscillator
    }), toneModule(function(a) {
        return a.PWMOscillator = function() {
            var b = this.optionsObject(arguments, ["frequency", "modulationFrequency"], a.PWMOscillator.defaults);
            a.Source.call(this), this._pulse = new a.PulseOscillator(b.modulationFrequency), this._pulse._sawtooth.setType("sine"), this._modulator = new a.Oscillator({
                frequency: b.frequency,
                detune: b.detune
            }), this.frequency = this._modulator.frequency, this.detune = this._modulator.detune, this.onended = b.onended, this.modulationFrequency = this._pulse.frequency, this._modulator.connect(this._pulse.width), this._pulse.connect(this.output), this._pulse.onended = this._onended.bind(this)
        }, a.extend(a.PWMOscillator, a.Oscillator), a.PWMOscillator.defaults = {
            frequency: 440,
            detune: 0,
            modulationFrequency: .4,
            onended: function() {}
        }, a.PWMOscillator.prototype.start = function(b) {
            this.state === a.Source.State.STOPPED && (this.state = a.Source.State.STARTED, b = this.toSeconds(b), this._modulator.start(b), this._pulse.start(b))
        }, a.PWMOscillator.prototype.stop = function(b) {
            this.state === a.Source.State.STARTED && (this.state = a.Source.State.STOPPED, b = this.toSeconds(b), this._modulator.stop(b), this._pulse.stop(b))
        }, a.PWMOscillator.prototype._onended = function() {
            this.onended()
        }, a.PWMOscillator.prototype.setPhase = function(a) {
            this._modulator.setPhase(a)
        }, a.PWMOscillator.prototype.setModulationFrequency = function(a, b) {
            this._pulse.setFrequency(a, b)
        }, a.PWMOscillator.prototype.set = function(b) {
            this.isUndef(b.modulationFrequency) || this.setModulationFrequency(b.modulationFrequency), this.isUndef(b.phase) || this.setPhase(b.phase), this.isUndef(b.frequency) || this.setFrequency(b.frequency), this.isUndef(b.onended) || (this._pulse.onended = b.onended), this.isUndef(b.detune) || this.detune.setValue(b.detune), a.Source.prototype.set.call(this, b)
        }, a.PWMOscillator.prototype.dispose = function() {
            a.Source.prototype.dispose.call(this), this._pulse.dispose(), this._modulator.dispose(), this._pulse = null, this._modulator = null, this.onended = null, this.frequency = null, this.detune = null, this.modulationFrequency = null
        }, a.PWMOscillator
    }), toneModule(function(a) {
        a.OmniOscillator = function() {
            var b = this.optionsObject(arguments, ["frequency", "type"], a.OmniOscillator.defaults);
            a.Source.call(this), this.frequency = new a.Signal(b.frequency), this.detune = new a.Signal(b.detune), this._sourceType = void 0, this._oscillator = null, this.onended = b.onended, this.setType(b.type)
        }, a.extend(a.OmniOscillator, a.Oscillator), a.OmniOscillator.defaults = {
            frequency: 440,
            detune: 0,
            type: "sine",
            width: .4,
            modulationFrequency: .4,
            onended: function() {}
        }, a.OmniOscillator.prototype.start = function(b) {
            this.state === a.Source.State.STOPPED && (this.state = a.Source.State.STARTED, this._oscillator.start(b))
        }, a.OmniOscillator.prototype.stop = function(b) {
            this.state === a.Source.State.STARTED && (b || (this.state = a.Source.State.STOPPED), this._oscillator.stop(b))
        }, a.OmniOscillator.prototype.setType = function(c) {
            if ("sine" === c || "square" === c || "triangle" === c || "sawtooth" === c) this._sourceType !== b.Oscillator && (this._sourceType = b.Oscillator, this._createNewOscillator(a.Oscillator)), this._oscillator.setType(c);
            else if ("pwm" === c) this._sourceType !== b.PWMOscillator && (this._sourceType = b.PWMOscillator, this._createNewOscillator(a.PWMOscillator));
            else {
                if ("pulse" !== c) throw new TypeError("Tone.OmniOscillator does not support type " + c);
                this._sourceType !== b.PulseOscillator && (this._sourceType = b.PulseOscillator, this._createNewOscillator(a.PulseOscillator))
            }
        }, a.OmniOscillator.prototype.getType = function() {
            return this._sourceType === b.PulseOscillator ? "pulse" : this._sourceType === b.PWMOscillator ? "pwm" : this._sourceType === b.Oscillator ? this._oscillator.getType() : void 0
        }, a.OmniOscillator.prototype._createNewOscillator = function(b) {
            var c, d = this.now() + this.bufferTime;
            null !== this._oscillator && (c = this._oscillator, c.stop(d), c.onended = function() {
                c.dispose(), c = null
            }), this._oscillator = new b, this.frequency.connect(this._oscillator.frequency), this.detune.connect(this._oscillator.detune), this._oscillator.connect(this.output), this.state === a.Source.State.STARTED && this._oscillator.start(d), this._oscillator.onended = this._onended.bind(this)
        }, a.OmniOscillator.prototype._onended = function() {
            this.onended()
        }, a.OmniOscillator.prototype.setWidth = function(a) {
            if (this._sourceType !== b.PulseOscillator) throw new Error("Invalid call to 'setWidth'. OmniOscillator type must be set to type 'pulse'.");
            this._oscillator.setWidth(a)
        }, a.OmniOscillator.prototype.setModulationFrequency = function(a) {
            if (this._sourceType !== b.PWMOscillator) throw new Error("Invalid call to 'setModulationFrequency'. OmniOscillator type must be set to type 'pwm'.");
            this._oscillator.setModulationFrequency(a)
        }, a.OmniOscillator.prototype.set = function(b) {
            this.isUndef(b.type) || this.setType(b.type), this.isUndef(b.onended) || (this.onended = b.onended), this.isUndef(b.frequency) || this.setFrequency(b.frequency), this.isUndef(b.detune) || this.detune.setValue(b.detune), this.isUndef(b.width) || this.setWidth(b.width), this.isUndef(b.modulationFrequency) || this.setModulationFrequency(b.modulationFrequency), a.Source.prototype.set.call(this, b)
        }, a.OmniOscillator.prototype.dispose = function() {
            a.Source.prototype.dispose.call(this), this.detune.dispose(), this.detune = null, this.frequency.dispose(), this.frequency = null, this._oscillator.dispose(), this._oscillator = null, this._sourceType = null
        };
        var b = {
            PulseOscillator: "PulseOscillator",
            PWMOscillator: "PWMOscillator",
            Oscillator: "Oscillator"
        };
        return a.OmniOscillator
    }), toneModule(function(a) {
        return a.Instrument = function() {
            this.output = this.context.createGain()
        }, a.extend(a.Instrument), a.Instrument.prototype.triggerAttack = function() {}, a.Instrument.prototype.triggerRelease = function() {}, a.Instrument.prototype.triggerAttackRelease = function(a, b, c, d) {
            c = this.toSeconds(c), b = this.toSeconds(b), this.triggerAttack(a, c, d), this.triggerRelease(c + b)
        }, a.Instrument.prototype.setVolume = a.Source.prototype.setVolume, a.Instrument.prototype.dispose = function() {
            a.prototype.dispose.call(this)
        }, a.Instrument
    }), toneModule(function(a) {
        return a.Monophonic = function(b) {
            a.Instrument.call(this), b = this.defaultArg(b, a.Monophonic.defaults), this.portamento = b.portamento
        }, a.extend(a.Monophonic, a.Instrument), a.Monophonic.defaults = {
            portamento: 0
        }, a.Monophonic.prototype.triggerAttack = function(a, b, c) {
            b = this.toSeconds(b), this.triggerEnvelopeAttack(b, c), this.setNote(a, b)
        }, a.Monophonic.prototype.triggerRelease = function(a) {
            this.triggerEnvelopeRelease(a)
        }, a.Monophonic.prototype.triggerEnvelopeAttack = function() {}, a.Monophonic.prototype.triggerEnvelopeRelease = function() {}, a.Monophonic.prototype.setNote = function(a, b) {
            if ("string" == typeof a && (a = this.noteToFrequency(a)), b = this.toSeconds(b), this.portamento > 0) {
                var c = this.frequency.getValue();
                this.frequency.setValueAtTime(c, b), this.frequency.exponentialRampToValueAtTime(a, b + this.portamento)
            } else this.frequency.setValueAtTime(a, b)
        }, a.Monophonic.prototype.setPortamento = function(a) {
            this.portamento = this.toSeconds(a)
        }, a.Monophonic.prototype.set = function(a) {
            this.isUndef(a.volume) || this.setVolume(a.volume), this.isUndef(a.portamento) || this.setPortamento(a.portamento)
        }, a.Monophonic.prototype.setPreset = function(a) {
            !this.isUndef(this.preset) && this.preset.hasOwnProperty(a) && this.set(this.preset[a])
        }, a.Monophonic.prototype.dispose = function() {
            a.Instrument.prototype.dispose.call(this)
        }, a.Monophonic
    }), toneModule(function(a) {
        return a.MonoSynth = function(b) {
            b = this.defaultArg(b, a.MonoSynth.defaults), a.Monophonic.call(this, b), this.oscillator = new a.OmniOscillator(b.oscillator), this.frequency = this.oscillator.frequency, this.detune = this.oscillator.detune, this.filter = new a.Filter(b.filter), this.filterEnvelope = new a.ScaledEnvelope(b.filterEnvelope), this.envelope = new a.AmplitudeEnvelope(b.envelope), this.oscillator.chain(this.filter, this.envelope, this.output), this.oscillator.start(), this.filterEnvelope.connect(this.filter.frequency)
        }, a.extend(a.MonoSynth, a.Monophonic), a.MonoSynth.defaults = {
            oscillator: {
                type: "square"
            },
            filter: {
                Q: 6,
                type: "lowpass",
                rolloff: -24
            },
            envelope: {
                attack: .005,
                decay: .1,
                sustain: .9,
                release: 1
            },
            filterEnvelope: {
                attack: .06,
                decay: .2,
                sustain: .5,
                release: 2,
                min: 20,
                max: 4e3,
                exponent: 2
            }
        }, a.MonoSynth.prototype.triggerEnvelopeAttack = function(a, b) {
            this.envelope.triggerAttack(a, b), this.filterEnvelope.triggerAttack(a)
        }, a.MonoSynth.prototype.triggerEnvelopeRelease = function(a) {
            this.envelope.triggerRelease(a), this.filterEnvelope.triggerRelease(a)
        }, a.MonoSynth.prototype.setOscType = function(a) {
            this.oscillator.setType(a)
        }, a.MonoSynth.prototype.set = function(b) {
            this.isUndef(b.detune) || this.detune.setValue(b.detune), this.isUndef(b.oscillator) || this.oscillator.set(b.oscillator), this.isUndef(b.filterEnvelope) || this.filterEnvelope.set(b.filterEnvelope), this.isUndef(b.envelope) || this.envelope.set(b.envelope), this.isUndef(b.filter) || this.filter.set(b.filter), a.Monophonic.prototype.set.call(this, b)
        }, a.MonoSynth.prototype.dispose = function() {
            a.Monophonic.prototype.dispose.call(this), this.oscillator.dispose(), this.oscillator = null, this.envelope.dispose(), this.envelope = null, this.filterEnvelope.dispose(), this.filterEnvelope = null, this.filter.dispose(), this.filter = null, this.frequency = null, this.detune = null
        }, a.MonoSynth
    }), toneModule(function(a) {
        return a.AMSynth = function(b) {
            b = this.defaultArg(b, a.AMSynth.defaults), a.Monophonic.call(this, b), this.carrier = new a.MonoSynth(b.carrier), this.carrier.setVolume(-10), this.modulator = new a.MonoSynth(b.modulator), this.modulator.setVolume(-10), this.frequency = new a.Signal(440), this._harmonicity = new a.Multiply(b.harmonicity), this._modulationScale = new a.Expr("($0 + 1) * 0.5"), this._modulationNode = this.context.createGain(), this.frequency.connect(this.carrier.frequency), this.frequency.chain(this._harmonicity, this.modulator.frequency), this.modulator.chain(this._modulationScale, this._modulationNode.gain), this.carrier.chain(this._modulationNode, this.output)
        }, a.extend(a.AMSynth, a.Monophonic), a.AMSynth.defaults = {
            harmonicity: 3,
            carrier: {
                volume: -10,
                portamento: 0,
                oscillator: {
                    type: "sine"
                },
                envelope: {
                    attack: .01,
                    decay: .01,
                    sustain: 1,
                    release: .5
                },
                filterEnvelope: {
                    attack: .01,
                    decay: 0,
                    sustain: 1,
                    release: .5,
                    min: 2e4,
                    max: 2e4
                }
            },
            modulator: {
                volume: -10,
                portamento: 0,
                oscillator: {
                    type: "square"
                },
                envelope: {
                    attack: 2,
                    decay: 0,
                    sustain: 1,
                    release: .5
                },
                filterEnvelope: {
                    attack: 4,
                    decay: .2,
                    sustain: .5,
                    release: .5,
                    min: 20,
                    max: 1500
                }
            }
        }, a.AMSynth.prototype.triggerEnvelopeAttack = function(a, b) {
            a = this.toSeconds(a), this.carrier.envelope.triggerAttack(a, b), this.modulator.envelope.triggerAttack(a), this.carrier.filterEnvelope.triggerAttack(a), this.modulator.filterEnvelope.triggerAttack(a)
        }, a.AMSynth.prototype.triggerEnvelopeRelease = function(a) {
            this.carrier.triggerRelease(a), this.modulator.triggerRelease(a)
        }, a.AMSynth.prototype.setHarmonicity = function(a) {
            this._harmonicity.setValue(a)
        }, a.AMSynth.prototype.set = function(b) {
            this.isUndef(b.harmonicity) || this.setHarmonicity(b.harmonicity), this.isUndef(b.carrier) || this.carrier.set(b.carrier), this.isUndef(b.modulator) || this.modulator.set(b.modulator), a.Monophonic.prototype.set.call(this, b)
        }, a.AMSynth.prototype.dispose = function() {
            a.Monophonic.prototype.dispose.call(this), this.carrier.dispose(), this.carrier = null, this.modulator.dispose(), this.modulator = null, this.frequency.dispose(), this.frequency = null, this._harmonicity.dispose(), this._harmonicity = null, this._modulationScale.dispose(), this._modulationScale = null, this._modulationNode.disconnect(), this._modulationNode = null
        }, a.AMSynth
    }), toneModule(function(a) {
        return a.DuoSynth = function(b) {
            b = this.defaultArg(b, a.DuoSynth.defaults), a.Monophonic.call(this, b), this.voice0 = new a.MonoSynth(b.voice0), this.voice0.setVolume(-10), this.voice1 = new a.MonoSynth(b.voice1), this.voice1.setVolume(-10), this._vibrato = new a.LFO(b.vibratoRate, -50, 50), this._vibrato.start(), this._vibratoGain = this.context.createGain(), this._vibratoGain.gain.value = b.vibratoAmount, this._vibratoDelay = this.toSeconds(b.vibratoDelay), this._vibratoAmount = b.vibratoAmount, this.frequency = new a.Signal(440), this._harmonicity = new a.Multiply(b.harmonicity), this.frequency.connect(this.voice0.frequency), this.frequency.chain(this._harmonicity, this.voice1.frequency), this._vibrato.connect(this._vibratoGain), this._vibratoGain.fan(this.voice0.detune, this.voice1.detune), this.voice0.connect(this.output), this.voice1.connect(this.output)
        }, a.extend(a.DuoSynth, a.Monophonic), a.DuoSynth.defaults = {
            vibratoAmount: .5,
            vibratoRate: 5,
            vibratoDelay: 1,
            harmonicity: 1.5,
            voice0: {
                volume: -10,
                portamento: 0,
                oscillator: {
                    type: "sine"
                },
                filterEnvelope: {
                    attack: .01,
                    decay: 0,
                    sustain: 1,
                    release: .5
                },
                envelope: {
                    attack: .01,
                    decay: 0,
                    sustain: 1,
                    release: .5
                }
            },
            voice1: {
                volume: -10,
                portamento: 0,
                oscillator: {
                    type: "sine"
                },
                filterEnvelope: {
                    attack: .01,
                    decay: 0,
                    sustain: 1,
                    release: .5
                },
                envelope: {
                    attack: .01,
                    decay: 0,
                    sustain: 1,
                    release: .5
                }
            }
        }, a.DuoSynth.prototype.triggerEnvelopeAttack = function(a, b) {
            a = this.toSeconds(a), this.voice0.envelope.triggerAttack(a, b), this.voice1.envelope.triggerAttack(a, b), this.voice0.filterEnvelope.triggerAttack(a), this.voice1.filterEnvelope.triggerAttack(a)
        }, a.DuoSynth.prototype.triggerEnvelopeRelease = function(a) {
            this.voice0.triggerRelease(a), this.voice1.triggerRelease(a)
        }, a.DuoSynth.prototype.setHarmonicity = function(a) {
            this._harmonicity.setValue(a)
        }, a.DuoSynth.prototype.setPortamento = function(a) {
            this.portamento = this.toSeconds(a)
        }, a.DuoSynth.prototype.setVibratoDelay = function(a) {
            this._vibratoDelay = this.toSeconds(a)
        }, a.DuoSynth.prototype.setVibratoAmount = function(a) {
            this._vibratoAmount = a, this._vibratoGain.gain.setValueAtTime(a, this.now())
        }, a.DuoSynth.prototype.setVibratoRate = function(a) {
            this._vibrato.setFrequency(a)
        }, a.DuoSynth.prototype.setVolume = a.Source.prototype.setVolume, a.DuoSynth.prototype.set = function(b) {
            this.isUndef(b.harmonicity) || this.setHarmonicity(b.harmonicity), this.isUndef(b.vibratoRate) || this.setVibratoRate(b.vibratoRate), this.isUndef(b.vibratoAmount) || this.setVibratoAmount(b.vibratoAmount), this.isUndef(b.vibratoDelay) || this.setVibratoDelay(b.vibratoDelay), this.isUndef(b.voice0) || this.voice0.set(b.voice0), this.isUndef(b.voice1) || this.voice1.set(b.voice1), a.Monophonic.prototype.set.call(this, b)
        }, a.DuoSynth.prototype.dispose = function() {
            a.Monophonic.prototype.dispose.call(this), this.voice0.dispose(), this.voice1.dispose(), this.frequency.dispose(), this._vibrato.dispose(), this._vibratoGain.disconnect(), this._harmonicity.dispose(), this.voice0 = null, this.voice1 = null, this.frequency = null, this._vibrato = null, this._vibratoGain = null, this._harmonicity = null
        }, a.DuoSynth
    }), toneModule(function(a) {
        return a.FMSynth = function(b) {
            b = this.defaultArg(b, a.FMSynth.defaults), a.Monophonic.call(this, b), this.carrier = new a.MonoSynth(b.carrier), this.carrier.setVolume(-10), this.modulator = new a.MonoSynth(b.modulator), this.modulator.setVolume(-10), this.frequency = new a.Signal(440), this._harmonicity = new a.Multiply(b.harmonicity), this._modulationIndex = new a.Multiply(b.modulationIndex), this._modulationNode = this.context.createGain(), this.frequency.connect(this.carrier.frequency), this.frequency.chain(this._harmonicity, this.modulator.frequency), this.frequency.chain(this._modulationIndex, this._modulationNode), this.modulator.connect(this._modulationNode.gain), this._modulationNode.gain.value = 0, this._modulationNode.connect(this.carrier.frequency), this.carrier.connect(this.output)
        }, a.extend(a.FMSynth, a.Monophonic), a.FMSynth.defaults = {
            harmonicity: 3,
            modulationIndex: 10,
            carrier: {
                volume: -10,
                portamento: 0,
                oscillator: {
                    type: "sine"
                },
                envelope: {
                    attack: .01,
                    decay: 0,
                    sustain: 1,
                    release: .5
                },
                filterEnvelope: {
                    attack: .01,
                    decay: 0,
                    sustain: 1,
                    release: .5,
                    min: 2e4,
                    max: 2e4
                }
            },
            modulator: {
                volume: -10,
                portamento: 0,
                oscillator: {
                    type: "triangle"
                },
                envelope: {
                    attack: .01,
                    decay: 0,
                    sustain: 1,
                    release: .5
                },
                filterEnvelope: {
                    attack: .01,
                    decay: 0,
                    sustain: 1,
                    release: .5,
                    min: 2e4,
                    max: 2e4
                }
            }
        }, a.FMSynth.prototype.triggerEnvelopeAttack = function(a, b) {
            a = this.toSeconds(a), this.carrier.envelope.triggerAttack(a, b), this.modulator.envelope.triggerAttack(a), this.carrier.filterEnvelope.triggerAttack(a), this.modulator.filterEnvelope.triggerAttack(a)
        }, a.FMSynth.prototype.triggerEnvelopeRelease = function(a) {
            this.carrier.triggerRelease(a), this.modulator.triggerRelease(a)
        }, a.FMSynth.prototype.setHarmonicity = function(a) {
            this._harmonicity.setValue(a)
        }, a.FMSynth.prototype.setModulationIndex = function(a) {
            this._modulationIndex.setValue(a)
        }, a.FMSynth.prototype.set = function(b) {
            this.isUndef(b.harmonicity) || this.setHarmonicity(b.harmonicity), this.isUndef(b.modulationIndex) || this.setModulationIndex(b.modulationIndex), this.isUndef(b.carrier) || this.carrier.set(b.carrier), this.isUndef(b.modulator) || this.modulator.set(b.modulator), a.Monophonic.prototype.set.call(this, b)
        }, a.FMSynth.prototype.dispose = function() {
            a.Monophonic.prototype.dispose.call(this), this.carrier.dispose(), this.modulator.dispose(), this.frequency.dispose(), this._modulationIndex.dispose(), this._harmonicity.dispose(), this._modulationNode.disconnect(), this.carrier = null, this.modulator = null, this.frequency = null, this._modulationIndex = null, this._harmonicity = null, this._modulationNode = null
        }, a.FMSynth
    }), toneModule(function(a) {
        return a.Player = function() {
            a.Source.call(this);
            var b = this.optionsObject(arguments, ["url", "onload"], a.Player.defaults);
            this._source = null, this._buffer = null, this.duration = 0, this.loop = b.loop, this.loopStart = b.loopStart, this.loopEnd = b.loopEnd, this._playbackRate = 1, this.retrigger = b.retrigger, this.onended = b.onended, this.isUndef(b.url) || this.load(b.url, b.onload)
        }, a.extend(a.Player, a.Source), a.Player.defaults = {
            onended: function() {},
            loop: !1,
            loopStart: 0,
            loopEnd: -1,
            retrigger: !1
        }, a.Player.prototype.load = function(b, c) {
            var d = this;
            d._buffer ? c && c(d) : new a.Buffer(b, function(a) {
                d.setBuffer(a), c && c(d)
            })
        }, a.Player.prototype.setBuffer = function(a) {
            this._buffer = a, this.duration = a.duration
        }, a.Player.prototype.start = function(b, c, d) {
            (this.state === a.Source.State.STOPPED || this.retrigger) && this._buffer && (this.state = a.Source.State.STARTED, c = this.loop ? this.defaultArg(c, this.loopStart) : this.defaultArg(c, 0), d = this.defaultArg(d, this._buffer.duration - c), this._source = this.context.createBufferSource(), this._source.buffer = this._buffer, this.loop && (this._source.loop = this.loop, this._source.loopStart = this.toSeconds(this.loopStart), -1 !== this.loopEnd && (this._source.loopEnd = this.toSeconds(this.loopEnd))), this._source.playbackRate.value = this._playbackRate, this._source.onended = this._onended.bind(this), this._source.connect(this.output), this._source.start(this.toSeconds(b), this.toSeconds(c), this.toSeconds(d)))
        }, a.Player.prototype.stop = function(b) {
            this.state === a.Source.State.STARTED && this._buffer && this._source && (this.state = a.Source.State.STOPPED, this._source.stop(this.toSeconds(b)))
        }, a.Player.prototype._onended = function() {
            this.state = a.Source.State.STOPPED, this.onended()
        }, a.Player.prototype.setPlaybackRate = function(a, b) {
            this._playbackRate = a, this._source && this._source.playbackRate.exponentialRampToValueAtTime(a, this.toSeconds(b))
        }, a.Player.prototype.setLoopStart = function(a) {
            this.loopStart = a
        }, a.Player.prototype.setLoopEnd = function(a) {
            this.loopEnd = a
        }, a.Player.prototype.setLoopPoints = function(a, b) {
            this.setLoopStart(a), this.setLoopEnd(b)
        }, a.Player.prototype.set = function(b) {
            this.isUndef(b.playbackRate) || this.setPlaybackRate(b.playbackRate), this.isUndef(b.onended) || (this.onended = b.onended), this.isUndef(b.loop) || (this.loop = b.loop), this.isUndef(b.loopStart) || this.setLoopStart(b.loopStart), this.isUndef(b.loopEnd) || this.setLoopEnd(b.loopEnd), a.Source.prototype.set.call(this, b)
        }, a.Player.prototype.dispose = function() {
            a.Source.prototype.dispose.call(this), null !== this._source && (this._source.disconnect(), this._source = null), this._buffer = null
        }, a.Player
    }), toneModule(function(a) {
        return a.Sampler = function() {
            a.Instrument.call(this);
            var b = this.optionsObject(arguments, ["url", "onload"], a.Sampler.defaults);
            this.player = new a.Player({
                url: b.url,
                onload: b.onload,
                retrigger: !0
            }), this.player.set(b.player), this.envelope = new a.AmplitudeEnvelope(b.envelope), this.filterEnvelope = new a.ScaledEnvelope(b.filterEnvelope), this.filter = new a.Filter(b.filter), this.player.chain(this.filter, this.envelope, this.output), this.filterEnvelope.connect(this.filter.frequency)
        }, a.extend(a.Sampler, a.Instrument), a.Sampler.defaults = {
            url: void 0,
            onload: function() {},
            player: {
                loop: !1
            },
            envelope: {
                attack: .001,
                decay: 0,
                sustain: 1,
                release: .1
            },
            filterEnvelope: {
                attack: .001,
                decay: .001,
                sustain: 1,
                release: .5,
                min: 20,
                max: 2e4,
                exponent: 2
            },
            filter: {
                type: "lowpass"
            }
        }, a.Sampler.prototype.set = function(a) {
            this.isUndef(a.filterEnvelope) || this.filterEnvelope.set(a.filterEnvelope), this.isUndef(a.envelope) || this.envelope.set(a.envelope), this.isUndef(a.player) || this.player.set(a.player), this.isUndef(a.filter) || this.filter.set(a.filter)
        }, a.Sampler.prototype.triggerAttack = function(a, b, c) {
            b = this.toSeconds(b), a = this.defaultArg(a, 0), this.player.setPlaybackRate(this.intervalToFrequencyRatio(a), b), this.player.start(b, 0), this.envelope.triggerAttack(b, c), this.filterEnvelope.triggerAttack(b)
        }, a.Sampler.prototype.triggerRelease = function(a) {
            a = this.toSeconds(a), this.filterEnvelope.triggerRelease(a), this.envelope.triggerRelease(a), this.player.stop(this.toSeconds(this.envelope.release) + a)
        }, a.Sampler.prototype.dispose = function() {
            a.Instrument.prototype.dispose.call(this), this.player.dispose(), this.filterEnvelope.dispose(), this.envelope.dispose(), this.filter.dispose(), this.player = null, this.filterEnvelope = null, this.envelope = null, this.filter = null
        }, a.Sampler
    }), toneModule(function(a) {
        return a.MultiSampler = function(b, c) {
            a.Instrument.call(this), this.samples = {}, this._createSamples(b, c)
        }, a.extend(a.MultiSampler, a.Instrument), a.MultiSampler.prototype._createSamples = function(b, c) {
            var d, e, f, g, h = {
                total: 0,
                loaded: 0
            };
            for (i in b) h.total++;
            d = function() {
                h.loaded++, h.loaded === h.total && c && c()
            };
            for (e in b) f = b[e], g = new a.Sampler(f, d), g.connect(this.output), this.samples[e] = g
        }, a.MultiSampler.prototype.triggerAttack = function(a, b, c) {
            this.samples.hasOwnProperty(a) && this.samples[a].triggerAttack(0, b, c)
        }, a.MultiSampler.prototype.triggerRelease = function(a, b) {
            this.samples.hasOwnProperty(a) && this.samples[a].triggerRelease(b)
        }, a.MultiSampler.prototype.triggerAttackRelease = function(a, b, c, d) {
            if (this.samples.hasOwnProperty(a)) {
                c = this.toSeconds(c), b = this.toSeconds(b);
                var e = this.samples[a];
                e.triggerAttack(0, c, d), e.triggerRelease(c + b)
            }
        }, a.MultiSampler.prototype.set = function(a) {
            for (var b in this.samples) this.samples[b].set(a)
        }, a.MultiSampler.prototype.setVolume = a.Source.prototype.setVolume, a.MultiSampler.prototype.dispose = function() {
            a.Instrument.prototype.dispose.call(this);
            for (var b in this.samples) this.samples[b].dispose(), this.samples[b] = null;
            this.samples = null
        }, a.MultiSampler
    }), toneModule(function(a) {
        a.Noise = function() {
            a.Source.call(this);
            var b = this.optionsObject(arguments, ["type"], a.Noise.defaults);
            this._source = null, this._buffer = null, this.onended = b.onended, this.setType(b.type)
        }, a.extend(a.Noise, a.Source), a.Noise.defaults = {
            type: "white",
            onended: function() {}
        }, a.Noise.prototype.setType = function(e, f) {
            switch (e) {
                case "white":
                    this._buffer = d;
                    break;
                case "pink":
                    this._buffer = b;
                    break;
                case "brown":
                    this._buffer = c;
                    break;
                default:
                    this._buffer = d
            }
            this.state === a.Source.State.STARTED && (f = this.toSeconds(f), this._source.onended = void 0, this._stop(f), this._start(f))
        }, a.Noise.prototype.getType = function() {
            return this._buffer === d ? "white" : this._buffer === c ? "brown" : this._buffer === b ? "pink" : void 0
        }, a.Noise.prototype.set = function(b) {
            this.isUndef(b.type) || this.setType(b.type), this.isUndef(b.onended) || (this.onended = b.onended), a.Source.prototype.set.call(this, b)
        }, a.Noise.prototype._start = function(a) {
            this._source = this.context.createBufferSource(), this._source.buffer = this._buffer, this._source.loop = !0, this.connectSeries(this._source, this.output), this._source.start(this.toSeconds(a)), this._source.onended = this.onended
        }, a.Noise.prototype.start = function(b) {
            this.state === a.Source.State.STOPPED && (this.state = a.Source.State.STARTED, this._start(b))
        }, a.Noise.prototype._stop = function(a) {
            this._source.stop(this.toSeconds(a))
        }, a.Noise.prototype.stop = function(b) {
            this.state === a.Source.State.STARTED && this._buffer && this._source && (this.state = a.Source.State.STOPPED, this._stop(b))
        }, a.Noise.prototype.dispose = function() {
            a.Source.prototype.dispose.call(this), null !== this._source && (this._source.disconnect(), this._source = null), this._buffer = null
        };
        var b = null,
            c = null,
            d = null;
        return a._initAudioContext(function(a) {
            var e = a.sampleRate,
                f = 4 * e;
            b = function() {
                var b, c, d, g, h, i, j, k, l, m, n, o = a.createBuffer(2, f, e);
                for (b = 0; b < o.numberOfChannels; b++)
                    for (c = o.getChannelData(b), d = g = h = i = j = k = l = 0, m = 0; f > m; m++) n = 2 * Math.random() - 1, d = .99886 * d + .0555179 * n, g = .99332 * g + .0750759 * n, h = .969 * h + .153852 * n, i = .8665 * i + .3104856 * n, j = .55 * j + .5329522 * n, k = -.7616 * k - .016898 * n, c[m] = d + g + h + i + j + k + l + .5362 * n, c[m] *= .11, l = .115926 * n;
                return o
            }(), c = function() {
                var b, c, d, g, h, i = a.createBuffer(2, f, e);
                for (b = 0; b < i.numberOfChannels; b++)
                    for (c = i.getChannelData(b), d = 0, g = 0; f > g; g++) h = 2 * Math.random() - 1, c[g] = (d + .02 * h) / 1.02, d = c[g], c[g] *= 3.5;
                return i
            }(), d = function() {
                var b, c, d, g = a.createBuffer(2, f, e);
                for (b = 0; b < g.numberOfChannels; b++)
                    for (c = g.getChannelData(b), d = 0; f > d; d++) c[d] = 2 * Math.random() - 1;
                return g
            }()
        }), a.Noise
    }), toneModule(function(a) {
        return a.NoiseSynth = function(b) {
            b = this.defaultArg(b, a.NoiseSynth.defaults), a.Instrument.call(this), this.noise = new a.Noise, this.filter = new a.Filter(b.filter), this.filterEnvelope = new a.ScaledEnvelope(b.filterEnvelope), this.envelope = new a.AmplitudeEnvelope(b.envelope), this.noise.chain(this.filter, this.envelope, this.output), this.noise.start(), this.filterEnvelope.connect(this.filter.frequency)
        }, a.extend(a.NoiseSynth, a.Instrument), a.NoiseSynth.defaults = {
            noise: {
                type: "white"
            },
            filter: {
                Q: 6,
                type: "highpass",
                rolloff: -24
            },
            envelope: {
                attack: .005,
                decay: .1,
                sustain: 0
            },
            filterEnvelope: {
                attack: .06,
                decay: .2,
                sustain: 0,
                release: 2,
                min: 20,
                max: 4e3,
                exponent: 2
            }
        }, a.NoiseSynth.prototype.triggerAttack = function(a, b) {
            this.envelope.triggerAttack(a, b), this.filterEnvelope.triggerAttack(a)
        }, a.NoiseSynth.prototype.triggerRelease = function(a) {
            this.envelope.triggerRelease(a), this.filterEnvelope.triggerRelease(a)
        }, a.NoiseSynth.prototype.triggerAttackRelease = function(a, b, c) {
            b = this.toSeconds(b), a = this.toSeconds(a), this.triggerAttack(b, c), console.log(b + a), this.triggerRelease(b + a)
        }, a.NoiseSynth.prototype.setNoiseType = function(a) {
            this.noise.setType(a)
        }, a.NoiseSynth.prototype.set = function(a) {
            this.isUndef(a.noise) || this.noise.set(a.noise), this.isUndef(a.filterEnvelope) || this.filterEnvelope.set(a.filterEnvelope), this.isUndef(a.envelope) || this.envelope.set(a.envelope), this.isUndef(a.filter) || this.filter.set(a.filter)
        }, a.NoiseSynth.prototype.dispose = function() {
            a.Instrument.prototype.dispose.call(this), this.noise.dispose(), this.noise = null, this.envelope.dispose(), this.envelope = null, this.filterEnvelope.dispose(), this.filterEnvelope = null, this.filter.dispose(), this.filter = null
        }, a.NoiseSynth
    }), toneModule(function(a) {
        return a.PluckSynth = function(b) {
            b = this.defaultArg(b, a.PluckSynth.defaults), a.Instrument.call(this), this._noise = new a.Noise("pink"), this.attackNoise = 1, this._lfcf = new a.LowpassCombFilter(1 / 440), this.resonance = this._lfcf.resonance, this.dampening = this._lfcf.dampening, this._noise.connect(this._lfcf), this._lfcf.connect(this.output)
        }, a.extend(a.PluckSynth, a.Instrument), a.PluckSynth.defaults = {
            attackNoise: 1,
            dampening: 4e3,
            resonance: .5
        }, a.PluckSynth.prototype.triggerAttack = function(a, b) {
            "string" == typeof a && (a = this.noteToFrequency(a)), b = this.toSeconds(b);
            var c = 1 / a;
            this._lfcf.setDelayTime(c, b), this._noise.start(b), this._noise.stop(b + c * this.attackNoise)
        }, a.PluckSynth.prototype.setResonance = function(a) {
            this.resonance.setValue(a)
        }, a.PluckSynth.prototype.setDampening = function(a) {
            this.dampening.setValue(a)
        }, a.PluckSynth.prototype.setAttackNoise = function(a) {
            this.attackNoise = a
        }, a.PluckSynth.prototype.set = function(a) {
            this.isUndef(a.resonance) || this.setResonance(a.resonance), this.isUndef(a.dampening) || this.setDampening(a.dampening), this.isUndef(a.attackNoise) || this.setAttackNoise(a.attackNoise)
        }, a.PluckSynth.prototype.dispose = function() {
            a.Instrument.prototype.dispose.call(this), this._noise.dispose(), this._lfcf.dispose(), this._noise = null, this._lfcf = null, this.dampening = null, this.resonance = null
        }, a.PluckSynth
    }), toneModule(function(a) {
        return a.PolySynth = function() {
            var b, c, d;
            for (a.Instrument.call(this), b = this.optionsObject(arguments, ["polyphony", "voice", "voiceOptions"], a.PolySynth.defaults), this._voices = new Array(b.polyphony), this._freeVoices = [], this._activeVoices = {}, c = 0; c < b.polyphony; c++) d = new b.voice(b.voiceOptions), this._voices[c] = d, d.connect(this.output);
            this._freeVoices = this._voices.slice(0)
        }, a.extend(a.PolySynth, a.Instrument), a.PolySynth.defaults = {
            polyphony: 4,
            voice: a.MonoSynth,
            voiceOptions: {
                portamento: 0
            }
        }, a.PolySynth.prototype.triggerAttack = function(a, b, c) {
            var d, e, f, g;
            for (Array.isArray(a) || (a = [a]), d = 0; d < a.length; d++) e = a[d], f = JSON.stringify(e), this._activeVoices[f] ? this._activeVoices[f].triggerAttack(e, b, c) : this._freeVoices.length > 0 && (g = this._freeVoices.shift(), g.triggerAttack(e, b, c), this._activeVoices[f] = g)
        }, a.PolySynth.prototype.triggerAttackRelease = function(a, b, c, d) {
            c = this.toSeconds(c), this.triggerAttack(a, c, d), this.triggerRelease(a, c + this.toSeconds(b))
        }, a.PolySynth.prototype.triggerRelease = function(a, b) {
            var c, d, e;
            for (Array.isArray(a) || (a = [a]), c = 0; c < a.length; c++) d = JSON.stringify(a[c]), e = this._activeVoices[d], e && (e.triggerRelease(b), this._freeVoices.push(e), this._activeVoices[d] = null)
        }, a.PolySynth.prototype.set = function(a) {
            for (var b = 0; b < this._voices.length; b++) this._voices[b].set(a)
        }, a.PolySynth.prototype.setPreset = function(a) {
            for (var b = 0; b < this._voices.length; b++) this._voices[b].setPreset(a)
        }, a.PolySynth.prototype.dispose = function() {
            a.Instrument.prototype.dispose.call(this);
            for (var b = 0; b < this._voices.length; b++) this._voices[b].dispose(), this._voices[b] = null;
            this._voices = null, this._activeVoices = null, this._freeVoices = null
        }, a.PolySynth
    }), toneModule(function(a) {
        return a.Clip = function(b, c) {
            if (b > c) {
                var d = b;
                b = c, c = d
            }
            this._min = this.input = new a.Min(c), this._max = this.output = new a.Max(b), this._min.connect(this._max)
        }, a.extend(a.Clip, a.SignalBase), a.Clip.prototype.setMin = function(a) {
            this._min.setMin(a)
        }, a.Clip.prototype.setMax = function(a) {
            this._max.setMax(a)
        }, a.Clip.prototype.dispose = function() {
            a.prototype.dispose.call(this), this._min.dispose(), this._min = null, this._max.dispose(), this._max = null
        }, a.Clip
    }), toneModule(function(a) {
        return a.EqualPowerGain = function() {
            this._eqPower = this.input = this.output = new a.WaveShaper(function(b) {
                return Math.abs(b) < .001 ? 0 : a.prototype.equalPowerScale(b)
            }, 4096)
        }, a.extend(a.EqualPowerGain, a.SignalBase), a.EqualPowerGain.prototype.dispose = function() {
            a.prototype.dispose.call(this), this._eqPower.dispose(), this._eqPower = null
        }, a.EqualPowerGain
    }), toneModule(function(a) {
        return a.Normalize = function(b, c) {
            this._inputMin = this.defaultArg(b, 0), this._inputMax = this.defaultArg(c, 1), this._sub = this.input = new a.Add(0), this._div = this.output = new a.Multiply(1), this._sub.connect(this._div), this._setRange()
        }, a.extend(a.Normalize, a.SignalBase), a.Normalize.prototype.setMin = function(a) {
            this._inputMin = a, this._setRange()
        }, a.Normalize.prototype.setMax = function(a) {
            this._inputMax = a, this._setRange()
        }, a.Normalize.prototype._setRange = function() {
            this._sub.setValue(-this._inputMin), this._div.setValue(1 / (this._inputMax - this._inputMin))
        }, a.Normalize.prototype.dispose = function() {
            a.prototype.dispose.call(this), this._sub.dispose(), this._sub = null, this._div.dispose(), this._div = null
        }, a.Normalize
    }), toneModule(function(a) {
        a.Route = function(c) {
            var d, e;
            for (c = this.defaultArg(c, 2), a.call(this, 1, c), this.gate = new a.Signal(0), d = 0; c > d; d++) e = new b(d), this.output[d] = e, this.gate.connect(e.selecter), this.input.connect(e)
        }, a.extend(a.Route, a.SignalBase), a.Route.prototype.select = function(a, b) {
            a = Math.floor(a), this.gate.setValueAtTime(a, this.toSeconds(b))
        }, a.Route.prototype.dispose = function() {
            this.gate.dispose();
            for (var b = 0; b < this.output.length; b++) this.output[b].dispose(), this.output[b] = null;
            a.prototype.dispose.call(this), this.gate = null
        };
        var b = function(b) {
            this.selecter = new a.Equal(b), this.gate = this.input = this.output = this.context.createGain(), this.selecter.connect(this.gate.gain)
        };
        return a.extend(b), b.prototype.dispose = function() {
            a.prototype.dispose.call(this), this.selecter.dispose(), this.gate.disconnect(), this.selecter = null, this.gate = null
        }, a.Route
    }), toneModule(function(a) {
        return a.Switch = function() {
            a.call(this), this.gate = new a.Signal(0), this._thresh = new a.GreaterThan(.5), this.input.connect(this.output), this.gate.chain(this._thresh, this.output.gain)
        }, a.extend(a.Switch, a.SignalBase), a.Switch.prototype.open = function(a) {
            this.gate.setValueAtTime(1, this.toSeconds(a))
        }, a.Switch.prototype.close = function(a) {
            this.gate.setValueAtTime(0, this.toSeconds(a))
        }, a.Switch.prototype.dispose = function() {
            a.prototype.dispose.call(this), this.gate.dispose(), this._thresh.dispose(), this.gate = null, this._thresh = null
        }, a.Switch
    }), toneModule(function(a) {
        return a.Threshold = function(a) {
            console.warn("Tone.Threshold has been deprecated. Use Tone.GreaterThan or Tone.GreaterThanZero"), this._thresh = this.context.createWaveShaper(), this._doubleThresh = this.context.createWaveShaper(), this.input = this._thresh, this.output = this._doubleThresh, this._thresh.connect(this._doubleThresh), this._setThresh(this._thresh, this.defaultArg(a, 0)), this._setThresh(this._doubleThresh, .5)
        }, a.extend(a.Threshold, a.SignalBase), a.Threshold.prototype._setThresh = function(a, b) {
            var c, d, e, f = 1023,
                g = new Float32Array(f);
            for (c = 0; f > c; c++) d = c / (f - 1) * 2 - 1, e = b > d ? 0 : 1, g[c] = e;
            a.curve = g
        }, a.Threshold.prototype.setThreshold = function(a) {
            this._setThresh(this._thresh, a)
        }, a.Threshold.prototype.dispose = function() {
            a.prototype.dispose.call(this), this._thresh.disconnect(), this._doubleThresh.disconnect(), this._thresh = null, this._doubleThresh = null
        }, a.Threshold
    }), toneModule(function(a) {
        return a.Microphone = function(b) {
            a.Source.call(this), this._mediaStream = null, this._stream = null, this.constraints = {
                audio: !0
            };
            var c = this;
            MediaStreamTrack.getSources(function(a) {
                b < a.length && (c.constraints.audio = {
                    optional: [{
                        sourceId: a[b].id
                    }]
                })
            })
        }, a.extend(a.Microphone, a.Source), a.Microphone.prototype.start = function() {
            this.state === a.Source.State.STOPPED && (this.state = a.Source.State.STARTED, navigator.getUserMedia(this.constraints, this._onStream.bind(this), this._onStreamError.bind(this)))
        }, a.Microphone.prototype.stop = function() {
            this._stream && this.state === a.Source.State.STARTED && (this.state = a.Source.State.STOPPED, this._stream.stop())
        }, a.Microphone.prototype._onStream = function(a) {
            this._stream = a, this._mediaStream = this.context.createMediaStreamSource(a), this._mediaStream.connect(this.output)
        }, a.Microphone.prototype._onStreamError = function(a) {
            console.error(a)
        }, a.Microphone.prototype.dispose = function() {
            a.Source.prototype.dispose.call(this), this._stream.disconnect(), this._mediaStream.disconnect(), this._stream = null, this._mediaStream = null
        }, navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia, a.Microphone
    }), "function" == typeof define && define.amd ? define("Tone", [], function() {
        return Tone
    }) : root.Tone = Tone
}(this);