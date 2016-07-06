pc.extend(pc, function () {
    /**
     * @component
     * @name pc.LightComponent
     * @class The Light Component enables the Entity to light the scene. There are three types
     * of light: directional, point and spot. Directional lights are global in that they are
     * considered to be infinitely far away and light the entire scene. Point and spot lights
     * are local in that they have a position and a range. A spot light is a specialization of
     * a point light where light is emitted in a cone rather than in all directions. Lights
     * also have the ability to cast shadows to add realism to your scenes.
     * @description Creates a new Light Component.
     * @param {pc.LightComponentSystem} system The ComponentSystem that created this Component.
     * @param {pc.Entity} entity The Entity that this Component is attached to.
     * @example
     * // Add a pc.LightComponent to an entity
     * var entity = new pc.Entity();
     * entity.addComponent('light', {
     *     type: "point",
     *     color: new pc.Color(1, 0, 0),
     *     range: 10
     * });
     * @example
     * // Get the pc.LightComponent on an entity
     * var lightComponent = entity.light;
     * @example
     * // Update a property on a light component
     * entity.light.range = 20;
     * @property {String} type The type of light. Can be:
     * <ul>
     *     <li>"directional": A light that is infinitely far away and lights the entire scene from one direction.</li>
     *     <li>"point": A light that illuminates in all directions from a point.</li>
     *     <li>"spot": A light that illuminates in all directions from a point and is bounded by a cone.</li>
     * </ul>
     * Defaults to "directional".
     * @property {pc.Color} color The Color of the light. The alpha component of the color is
     * ignored. Defaults to white (1, 1, 1).
     * @property {Number} intensity The brightness of the light. Defaults to 1.
     * @property {Boolean} castShadows If enabled the light will cast shadows. Defaults to false.
     * @property {Number} shadowDistance The distance from the viewpoint beyond which shadows
     * are no longer rendered. Affects directional lights only. Defaults to 40.
     * @property {Number} shadowResolution The size of the texture used for the shadow map.
     * Valid sizes are 64, 128, 256, 512, 1024, 2048. Defaults to 1024.
     * @property {Number} shadowBias The depth bias for tuning the appearance of the shadow
     * mapping generated by this light. Defaults to 0.05.
     * @property {Number} normalOffsetBias Normal offset depth bias. Defaults to 0.
     * @property {Number} range The range of the light. Affects point and spot lights only.
     * Defaults to 10.
     * @property {Number} innerConeAngle The angle at which the spotlight cone starts
     * to fade off. The angle is specified in degrees. Affects spot lights only. Defaults
     * to 40.
     * @property {Number} outerConeAngle The angle at which the spotlight cone has faded
     * to nothing. The angle is specified in degrees. Affects spot lights only. Defaults
     * to 45.
     * @property {Number} falloffMode Controls the rate at which a light attentuates from
     * its position. Can be:
     * <ul>
     * <li>{@link pc.LIGHTFALLOFF_LINEAR}: Linear.</li>
     * <li>{@link pc.LIGHTFALLOFF_INVERSESQUARED}: Inverse squared.</li>
     * </ul>
     * Affects point and spot lights only. Defaults to pc.LIGHTFALLOFF_LINEAR.
     * @property {Number} mask Defines a mask to determine which {@link pc.MeshInstance}s are
     * lit by this light. Defaults to 1.
     * @property {Boolean} affectDynamic If enabled the light will affect non-lightmapped objects
     * @property {Boolean} affectLightmapped If enabled the light will affect lightmapped objects
     * @property {Boolean} bake If enabled the light will be rendered into lightmaps
     * @property {Number} shadowUpdateMode Tells the renderer how often shadows must be updated for this light. Options:
     * <ul>
     * <li>{@link pc.SHADOWUPDATE_NONE}: Don't render shadows.</li>
     * <li>{@link pc.SHADOWUPDATE_THISFRAME}: Render shadows only once (then automatically switches to pc.SHADOWUPDATE_NONE).</li>
     * <li>{@link pc.SHADOWUPDATE_REALTIME}: Render shadows every frame (default).</li>
     * </ul>
     * @property {Number} shadowType Type of shadows being rendered by this light. Options:
     * <ul>
     * <li>{@link pc.SHADOW_DEPTH}: Render packed depth, can be used for hard or PCF sampling.</li>
     * <li>{@link pc.SHADOW_VSM8}: Render packed variance shadow map. All shadow receivers must also cast shadows for this mode to work correctly.</li>
     * <li>{@link pc.SHADOW_VSM16}: Render 16-bit exponential variance shadow map. Requires OES_texture_half_float extension. Falls back to pc.SHADOW_VSM8, if not supported.</li>
     * <li>{@link pc.SHADOW_VSM32}: Render 32-bit exponential variance shadow map. Requires OES_texture_float extension. Falls back to pc.SHADOW_VSM16, if not supported.</li>
     * </ul>
     * @property {Number} vsmBlurMode Blurring mode for variance shadow maps:
     * <ul>
     * <li>{@link pc.BLUR_BOX}: Box filter.</li>
     * <li>{@link pc.BLUR_GAUSSIAN}: Gaussian filter. May look smoother than box, but requires more samples.</li>
     * </ul>
     * @property {Number} vsmBlurSize Number of samples used for blurring a variance shadow map. Only uneven numbers work, even are incremented. Minimum value is 1, maximum is 25.
     * @property {pc.Texture} cookie Projection texture. Must be 2D for spot and cubemap for point (ignored if incorrect type is used).
     * @property {Number} cookieIntensity Projection texture intensity (default is 1).
     * @property {Boolean} cookieFalloff Toggle normal spotlight falloff when projection texture is used. When set to false, spotlight will work like a pure texture projector (only fading with distance). Default is false.
     * @property {String} cookieChannel  Color channels of the projection texture to use. Can be "r", "g", "b", "a", "rgb" or any swizzled combination.
     * @extends pc.Component
     */

    var _props = [];
    var _propsDefault = [];
    function _defineProperty(name, defaultValue, setFunc) {

        var c = LightComponent.prototype;
        _props.push(name);
        _propsDefault.push(defaultValue);

        Object.defineProperty(c, name, {
            get: function () {
                return this.data[name];
            },
            set: function (value) {
                var data = this.data;
                var oldValue = data[name];
                if (oldValue===value) return;
                data[name] = value;
                if (setFunc) setFunc.call(this, value, oldValue)
            },
            configurable: true
        });
    }

    var LightComponent = function LightComponent(system, entity) {
    };
    LightComponent = pc.inherits(LightComponent, pc.Component);

    var _defineProps = function (c, d, s) {
        _defineProperty("enabled", true, function(newValue, oldValue) {
            this.onSetEnabled(null, oldValue, newValue);
        });
        _defineProperty("light", null);
        _defineProperty("type", 'directional', function(newValue, oldValue) {
            if (oldValue === newValue)
                return;
            this.system.changeType(this, oldValue, newValue);
            // refresh light properties because changing the type does not reset the
            // light properties
            this.refreshProperties();
        });
        _defineProperty("color", new pc.Color(1, 1, 1), function(newValue, oldValue) {
            this.light.setColor(newValue);
        });
        _defineProperty("intensity", 1, function(newValue, oldValue) {
            this.light.setIntensity(newValue);
        });
        _defineProperty("castShadows", false, function(newValue, oldValue) {
            this.light.setCastShadows(newValue);
        });
        _defineProperty("shadowDistance", 40, function(newValue, oldValue) {
            this.light.setShadowDistance(newValue);
        });
        _defineProperty("shadowResolution", 1024, function(newValue, oldValue) {
            this.light.setShadowResolution(newValue);
        });
        _defineProperty("shadowBias", 0.05, function(newValue, oldValue) {
            this.light.setShadowBias(-0.01 * newValue);
        });
        _defineProperty("normalOffsetBias", 0, function(newValue, oldValue) {
            this.light.setNormalOffsetBias(newValue);
        });
        _defineProperty("range", 10, function(newValue, oldValue) {
            this.light.setAttenuationEnd(newValue);
        });
        _defineProperty("innerConeAngle", 40, function(newValue, oldValue) {
            this.light.setInnerConeAngle(newValue);
        });
        _defineProperty("outerConeAngle", 45, function(newValue, oldValue) {
            this.light.setOuterConeAngle(newValue);
        });
        _defineProperty("falloffMode", pc.LIGHTFALLOFF_LINEAR, function(newValue, oldValue) {
            this.light.setFalloffMode(newValue);
        });
        _defineProperty("shadowType", pc.SHADOW_DEPTH, function(newValue, oldValue) {
            this.light.setShadowType(newValue);
        });
        _defineProperty("vsmBlurSize", 11, function(newValue, oldValue) {
            this.light.setVsmBlurSize(newValue);
        });
        _defineProperty("vsmBlurMode", pc.BLUR_GAUSSIAN, function(newValue, oldValue) {
            this.light.setVsmBlurMode(newValue);
        });
        _defineProperty("vsmBias", 0.01 * 0.25, function(newValue, oldValue) {
            this.light.setVsmBias(newValue);
        });
        _defineProperty("cookie", null, function(newValue, oldValue) {
            this.light.setCookie(newValue);
        });
        _defineProperty("cookieIntensity", 1, function(newValue, oldValue) {
            this.light.setCookieIntensity(newValue);
        });
        _defineProperty("cookieFalloff", false, function(newValue, oldValue) {
            this.light.setCookieFalloff(newValue);
        });
        _defineProperty("cookieChannel", "rgb", function(newValue, oldValue) {
            this.light.setCookieChannel(newValue);
        });
        _defineProperty("shadowUpdateMode", pc.SHADOWUPDATE_REALTIME, function(newValue, oldValue) {
            this.light.shadowUpdateMode = newValue;
        });
        _defineProperty("mask", 1, function(newValue, oldValue) {
            this.light.setMask(newValue);
        });
        _defineProperty("affectDynamic", true, function(newValue, oldValue) {
            if (newValue) {
                this.light.mask |= pc.MASK_DYNAMIC;
            } else {
                this.light.mask &= ~pc.MASK_DYNAMIC;
            }
            this.light.setMask(this.light.mask);
        });
        _defineProperty("affectLightmapped", false, function(newValue, oldValue) {
            if (newValue) {
                this.light.mask |= pc.MASK_BAKED;
                if (this.bake) this.light.mask &= ~pc.MASK_LIGHTMAP;
            } else {
                this.light.mask &= ~pc.MASK_BAKED;
                if (this.bake) this.light.mask |= pc.MASK_LIGHTMAP;
            }
            this.light.setMask(this.light.mask);
        });
        _defineProperty("bake", false, function(newValue, oldValue) {
            if (newValue) {
                this.light.mask |= pc.MASK_LIGHTMAP;
                if (this.affectLightmapped) this.light.mask &= ~pc.MASK_BAKED;
            } else {
                this.light.mask &= ~pc.MASK_LIGHTMAP;
                if (this.affectLightmapped) this.light.mask |= pc.MASK_BAKED;
            }
            this.light.setMask(this.light.mask);
        });
    };
    _defineProps();


    Object.defineProperty(LightComponent.prototype, "enable", {
        get: function() {
            console.warn("WARNING: enable: Property is deprecated. Query enabled property instead.");
            return this.enabled;
        },
        set: function(value) {
            console.warn("WARNING: enable: Property is deprecated. Set enabled property instead.");
            this.enabled = value;
        },
    });

    pc.extend(LightComponent.prototype, {
        refreshProperties: function() {
            var name;
            for(var i=0; i<_props.length; i++) {
                name = _props[i];
                this[name] = this[name];
            };
            if (this.enabled && this.entity.enabled)
                this.onEnable();
        },

        updateShadow: function() {
            this.light.updateShadow();
        },

        onEnable: function () {
            LightComponent._super.onEnable.call(this);
            this.light.setEnabled(true);
        },

        onDisable: function () {
            LightComponent._super.onDisable.call(this);
            this.light.setEnabled(false);
        }
    });

    return {
        LightComponent: LightComponent,
        _lightProps: _props,
        _lightPropsDefault: _propsDefault
    };
}());
