/*********************************************
 *Created by EricthePlague
 ********************************************/

function bia_detect_audio(_type) {
	var _au = document.createElement('audio');
	return _au.canPlayType && _au.canPlayType(_type).replace(/no/, '');
}
//
var	__path__ = window.__path__ ? window.__path__ : '',
	// system variables:
	bia_gameloop = bia_canvas = bia_context = bia_room_to_go = null, bia_canvas_id = 'biacanvas',
	bia_canvas_css = 'background: rgb(42, 42, 42); border: 0;',
	bia_loading = bia_load_total = 0,
	var_override_ = (Object.defineProperty != undefined),
	// resources:
	bia_sprites = [], bia_audios = [], bia_backgrounds = [], bia_fonts = [], bia_scenes = [],
	// time:
	bia_frame_time = bia_frame_step = bia_frame_el = bia_frame_count = bia_elapsed = 0,
	bia_prev_cycle_time = bia_prev_frame_time = (new Date()).getTime(),
	// math:
	max = Math.max, min = Math.min, round = Math.round, floor = Math.floor, ceil = Math.ceil,
	sin = Math.sin, cos = Math.cos, sqrt = Math.sqrt, tan = Math.tan, rand = Math.random,
	arccos = Math.acos, arcsin = Math.asin, arctan = Math.atan, arctan2 = Math.atan2,
	bia_r2d = -180 / Math.PI, bia_d2r = Math.PI / -180, bia_2pi = Math.PI * 2,
	// i/o variables:
	mouse_x = mouse_y = 0, mouse_down = mouse_pressed = mouse_released = false,
	key_down = [], key_pressed = [], key_released = [], bia_vkeys = [],
	bia_keys_pressed = [], bia_keys_released = [],
	touch_x = [], touch_y = [], touch_count = 0,
	bia_unpausekey = 27, bia_paused = false, bia_modal = null, bia_modaldraw = true,
	// i/o constants:
	vk_0 = 48, vk_1 = 49, vk_2 = 50, vk_3 = 51, vk_4 = 52, vk_5 = 53, vk_6 = 54,
	vk_7 = 55, vk_8 = 56, vk_9 = 57, vk_a = 65, vk_add = 107, vk_alt = 18, vk_b = 66,
	vk_backspace = 8, vk_c = 67, vk_ctrl = 17, vk_d = 68, vk_decimal = 110, vk_delete = 46,
	vk_divide = 111, vk_down = 40, vk_e = 69, vk_end = 35, vk_enter = 13, vk_escape = 27,
	vk_f1 = 112, vk_f2 = 113, vk_f3 = 114, vk_f4 = 115, vk_f5 = 116, vk_f6 = 117,
	vk_f7 = 118, vk_f8 = 119, vk_f9 = 120, vk_f10 = 121, vk_f11 = 122, vk_f12 = 123,
	vk_g = 71, vk_h = 72, vk_home = 36, vk_f = 70, vk_i = 73, vk_insert = 45, vk_j = 74, vk_k = 75,
	vk_l = 76, vk_left = 37, vk_m = 77, vk_multiply = 106, vk_n = 78, vk_num0 = 96, vk_num1 = 97,
	vk_num2 = 98, vk_num3 = 99, vk_num4 = 100, vk_num5 = 101, vk_num6 = 102, vk_num7 = 103,
	vk_num8 = 104, vk_num9 = 105, vk_o = 79, vk_p = 80, vk_pagedown = 34, vk_pageup = 33,
	vk_pause = 19, vk_q = 81, vk_r = 82, vk_right = 39, vk_s = 83, vk_shift = 16, vk_space = 32,
	vk_subtract = 109, vk_t = 84, vk_tab = 9, vk_u = 85, vk_up = 38, vk_v = 86, vk_w = 87,
	vk_x = 88, vk_y = 89, vk_z = 90,
	// collisions:
	ct_null = 0, ct_point = 1, ct_box = 2, ct_circle = 3,
	// tiles:
	bia_tiles = [], bia_tilesi = [], bia_tilez = 256,
	// sound variables:
	bia_wav_supported = bia_detect_audio('audio/wav; codecs="1"'),
	bia_ogg_supported = bia_detect_audio('audio/ogg; codecs="vorbis"'),
	bia_mp3_supported = bia_detect_audio('audio/mpeg;'),
	// drawing:
	bia_draw_alpha = 1, bia_draw_color_red = bia_draw_color_green = bia_draw_color_blue = 0,
	bia_draw_font = "Arial 12px", bia_draw_halign = "left", bia_draw_valign = "top",
	bia_draw_font_ = { size: 12, family: 'Arial', bold: false, italic: false },
	bia_draw_color = "rgb(" + bia_draw_color_red + "," + 
	bia_draw_color_green + "," + bia_draw_color_blue + ")", 
	bia_redraw, bia_redraw_auto = true,
	bia_viewport_inst = null,
	// drawing constants:
	fa_left = "left", fa_center = "center", fa_right = "right",
	fa_top = "top", fa_middle = "middle", fa_bottom = "bottom",
	// system room variables:
	bia_depth = [], bia_depthi = [], bia_depthu = [], bia_types = [], bia_persist = [],
	// public room variables:
	room_current = null,
	room_speed = 30, fps = room_speed,
	room_background = null,
	room_width = 0, room_height = 0,
	room_background_color_show = true, room_background_color_red = 0, 
	room_background_color_green = 0, room_background_color_blue = 0,
	room_viewport_width = 0, room_viewport_height = 0,
	room_viewport_object = null,
	room_viewport_hborder = 0, room_viewport_vborder = 0,
	room_viewport_x = 0, room_viewport_y = 0,
	global = null;
// keyboard functions:
function keyboard_check(_key) { return key_down[_key]; }
function keyboard_check_pressed(_key) { return key_pressed[_key]; }
function keyboard_check_released(_key) { return key_released[_key]; }
// mouse functions:
function mouse_check() { return mouse_down; }
function mouse_check_pressed() { return mouse_pressed; }
function mouse_check_released() { return mouse_released; }
// virtual keys:
function vkey() {
	this.top = 0;
	this.left = 0;
	this.right = 0;
	this.bottom = 0;
	this.key = 0;
	this.down = false;
	this.active = true;
}
function vkey_add(_x, _y, _w, _h, _k) {
	var _v = new vkey();
	_v.left = _x;
	_v.top = _y;
	_v.right = _x + _w;
	_v.bottom = _y + _h;
	_v.width = _w;
	_v.height = _h;
	_v.key = _k;
	bia_vkeys.push(_v);
	return _v;
}
// misc:
function trace() { console.log.apply(console, arguments); }
function bia_idle() { } // left empty on purpose
// minimal math:
function abs(_value) { return _value < 0 ? -_value : _value; }
function sign(_value) { return _value > 0 ? 1 : _value < 0 ? -1 : 0; }
function choose() { return arguments[~~(Math.random() * arguments.length)]; }
function random(_value) { return Math.random() * _value; }
function irandom(_value) { return ~~(Math.random() * _value + 1); }
// trig functions:
function lengthdir_x(_length, _direction) { return _length * Math.cos(_direction * bia_d2r); }
function lengthdir_y(_length, _direction) { return _length * Math.sin(_direction * bia_d2r); }
function point_distance(_x1, _y1, _x2, _y2) { return Math.sqrt(Math.pow(( _x1 - _x2), 2) + Math.pow((_y1 - _y2), 2)); }
function point_direction(_x1, _y1, _x2, _y2) { return Math.atan2(_y2 - _y1, _x2 - _x1) * bia_r2d; }
function degtorad(_degree) { return _degree * bia_d2r; }
function radtodeg(_degree) { return _degree * bia_r2d; }
// sound functions:
function sound_mode(_sound, _mode) {
	if (_sound.audio.networkState == _sound.audio.NETWORK_NO_SOURCE) return;
	switch (_sound.type) {
	case "wav": if (!bia_wav_supported) return; break;
	case "ogg": if (!bia_ogg_supported) return; break;
	case "mp3": if (!bia_mp3_supported) return; break;
	}
	if (_mode != 3) {
		_sound.audio.pause();
		if (_mode != 0) {
			_sound.audio.currentTime = 0;
		} else return;
		_sound.audio.loop = _mode > 1;
	}
	_sound.audio.play();
}
function sound_play(_sound) { sound_mode(_sound, 1); }
function sound_loop(_sound) { sound_mode(_sound, 2); }
function sound_resume(_sound) { sound_mode(_sound, 3); }
function sound_stop(_sound) { sound_mode(_sound, 0); }
function sound_stop_all() { for ( var _s = 0; _s < bia_audios.length; _s++) sound_stop( bia_audios[_s] ); }
function sound_volume( _sound, _volume) {
	if (_sound.audio.networkState == _sound.audio.NETWORK_NO_SOURCE) return;
	_sound.audio.volume = _volume;
}
// draw sprite:
function draw_sprite(_sprite_index, _sub_image, _x, _y) {
	if (_sprite_index == null) return;
	if (_sub_image > _sprite_index.frames.length - 1) _sub_image = 0;
	bia_context.save();
	bia_context.translate(_x - room_viewport_x, _y - room_viewport_y);
	bia_context.globalAlpha = bia_draw_alpha;
	bia_context.drawImage(_sprite_index.frames[~~_sub_image], -_sprite_index.xoffset, -_sprite_index.yoffset);
	bia_context.restore();
}
function draw_sprite_part(_sprite_index, _sub_image, _left, _top, _width, _height, _x, _y) {
	if (_sprite_index == null) return;
	if (_sub_image >= _sprite_index.frames.length) _sub_image = _sub_image % _sprite_index.frames.length;
	bia_context.save();
	bia_context.translate(_x - room_viewport_x, _y - room_viewport_y);
	bia_context.globalAlpha = bia_draw_alpha;
	bia_context.drawImage(_sprite_index.frames[~~_sub_image], _left, _top, _width, _height, 0, 0, _width, _height);
	bia_context.restore();
}
function draw_sprite_ext(_sprite_index, _sub_image, _x, _y, _xscale, _yscale, _rotation, _alpha) {
	if (_sprite_index == null) return;
	if (_sub_image >= _sprite_index.frames.length) _sub_image = _sub_image % _sprite_index.frames.length;
	bia_context.save();
	bia_context.translate(_x - room_viewport_x, _y - room_viewport_y);
	bia_context.rotate(degtorad(_rotation));
	bia_context.scale(_xscale, _yscale);
	bia_context.globalAlpha = _alpha;
	bia_context.drawImage(_sprite_index.frames[~~_sub_image], -_sprite_index.xoffset , -_sprite_index.yoffset, _sprite_index.width, _sprite_index.height);
	bia_context.restore();
}
// draw text:
function draw_text(_x, _y, _text) {
	bia_context.font = bia_draw_font;
	bia_context.textAlign = bia_draw_halign;
	bia_context.textBaseline = bia_draw_valign;
	bia_context.fillStyle = bia_context.strokeStyle = "rgba(" + bia_draw_color + ", " + bia_draw_alpha + ")";
	bia_context.fillText( _text, _x - room_viewport_x, _y - room_viewport_y );
}
// draw shapes:
function draw_rectangle(_x1, _y1, _x2, _y2, _outline) {
	bia_context.fillStyle = bia_context.strokeStyle = "rgba(" + bia_draw_color + ", " + bia_draw_alpha + ")";
	bia_context.beginPath();
	if (_outline) bia_context.strokeRect( _x1- room_viewport_x, _y1 - room_viewport_y, _x2 - _x1, _y2 - _y1 );
	else bia_context.fillRect( _x1- room_viewport_x, _y1 - room_viewport_y, _x2 - _x1, _y2 - _y1 );
	bia_context.closePath();
}
function draw_circle(_x, _y, _r, _outline) {
	bia_context.fillStyle = bia_context.strokeStyle = "rgba(" + bia_draw_color + ", " + bia_draw_alpha + ")";
	bia_context.beginPath();
	bia_context.arc( _x - room_viewport_x, _y - room_viewport_y, _r, 0, bia_2pi, true );
	bia_context.closePath();
	!_outline ? bia_context.fill() : bia_context.stroke();
}

function draw_line(_x1, _y1, _x2, _y2) {
	bia_context.strokeStyle = "rgba(" + bia_draw_color + ", " + bia_draw_alpha + ")";
	bia_context.beginPath();
	bia_context.moveTo( _x1 - room_viewport_x, _y1 - room_viewport_y );
	bia_context.lineTo( _x2 - room_viewport_x, _y2 - room_viewport_y );
	bia_context.closePath();
	bia_context.stroke();	
}
// draw settings:
function draw_set_alpha(_alpha) {
	bia_draw_alpha = _alpha;
}
function draw_set_color( _r, _g, _b) {
	bia_draw_color_red = _r;
	bia_draw_color_green = _g;
	bia_draw_color_blue = _b;
	bia_draw_color = bia_draw_color_red + "," + bia_draw_color_green + "," + bia_draw_color_blue;
	bia_context.fillStyle = "rgba(" + bia_draw_color + ", " + bia_draw_alpha + ")";
	bia_context.strokeStyle = "rgb(" + bia_draw_color + ")";
}
function draw_set_linewidth(_width) { bia_context.lineWidth = _width; }
// draw settings - font:
function draw_set_font (_font) {
	bia_draw_font_ = _font;
	bia_draw_font = (_font.bold == 1 ? "bold" : "") + " " + (_font.italic == 1 ? "italic" : "") + " " + _font.size + "px " + _font.family;
	bia_context.font = bia_draw_font;
	bia_context.textAlign = bia_draw_halign;
	bia_context.textBaseline = bia_draw_valign;
}
function draw_set_halign(_halign) { bia_draw_halign = _halign; }
function draw_set_valign(_valign) { bia_draw_valign = _valign; }
// room translations:
function room_goto(_scene) {
	bia_viewport_inst = null;
	bia_room_to_go = _scene;
}
function room_goto_next() {
	var _ri = 0, _r;
	for (_r = 0; _r < bia_scenes.length; _r++) if (bia_scenes[_r] == room_current) _ri = _r;
	if (typeof bia_scenes[(_ri + 1)] == "object") room_goto(bia_scenes[_ri + 1]);
}
function room_goto_previous() {
	var _ri = 0, _r;
	for (_r = 0; _r < bia_scenes.length; _r++) if (bia_scenes[_r] == room_current) _ri = _r;
	if (typeof bia_scenes[(_ri - 1)] == "object") room_goto(bia_scenes[_ri - 1]);
}
function room_goto_first() { room_goto(bia_scenes[0]); }
function room_goto_last() { room_goto(bia_scenes[(bia_scenes.length - 1)]); }
function room_restart() { room_goto(room_current); }
// instance functions:
function instance_create_(_x, _y, _object) {
	var o = new _object.constructor;
	o.parameters = arguments.length > 3 ? Array.prototype.slice.call(arguments, 3) : [];
	o.object_index = _object;
	o.__instance = true;
	o.xstart = o.x = _x;
	o.ystart = o.y = _y;
	o._depth = o.depthstart;
	instance_activate(o);
	return o;
}
function instance_create(_x, _y, _object) {
	var o = instance_create_.apply(this, arguments);
	o.on_creation();
	return o;
}
function instance_number(_object) {
	return instance_list(_object).length;
}
function instance_first(_object) {
	var l = instance_list(_object);
	return l.length ? l[0] : null;
}
// BBox <> BBox
function collide_bbox_bbox(l1, t1, r1, b1, l2, t2, r2, b2) {
	return !(b1 <= t2 || t1 >= b2 || r1 <= l2 || l1 >= r2);
}
// BBox <> SpriteBox
// (left, top, right, bottom, instX, instY, scaleX, scaleY, sprite, ofsX, ofsY)
function collide_bbox_sbox(l1, t1, r1, b1, x2, y2, h2, v2, s2) {
	return
	!( b1 <= y2 + v2 * (s2.collision_top - s2.yoffset)
	|| t1 >= y2 + v2 * (s2.collision_bottom - s2.yoffset)
	|| r1 <= x2 + h2 * (s2.collision_left - s2.xoffset)
	|| l1 <= x2 + h2 * (s2.collision_right - s2.xoffset));
}
// SpriteBox <> BBox
function collide_sbox_point(x2, y2, h2, v2, s2, x1, y1) {
	return
	!( y1 <= y2 + v2 * (s2.collision_top - s2.yoffset)
	|| y1 >= y2 + v2 * (s2.collision_bottom - s2.yoffset)
	|| x1 <= x2 + h2 * (s2.collision_left - s2.xoffset)
	|| x1 <= x2 + h2 * (s2.collision_right - s2.xoffset));
}
// SpriteBox <> Circle
function collide_sbox_circle(x2, y2, h2, v2, s2, x1, y1, r1) {
	var u, v, dx, dy;
	u = x2 + h2 * (s2.collision_left - s2.xoffset);
	v = x2 + h2 * (s2.collision_right - s2.xoffset);
	dx = (x2 < u ? u : x2 > v ? v : x2) - x2;
	u = y2 + v2 * (s2.collision_top - s2.yoffset);
	v = y2 + v2 * (s2.collision_bottom - s2.yoffset);
	dy = (y2 < u ? u : y2 > v ? v : y2) - y2;
	return (dx * dx + dy * dy < r1 * r1);
}
// BBox <> Point
function collide_bbox_point(l1, t1, r1, b1, x2, y2) {
	return (x2 > l1 && x2 < r1 && y2 > t1 && y2 < b1);
}
// BBox <> Circle
function collide_bbox_circle(l1, t1, r1, b1, x2, y2, r2) {
	var dx = (x2 < l1 ? l1 : x2 > r1 ? r1 : x2) - x2, 
		dy = (y2 < t1 ? t1 : y2 > b1 ? b1 : y2) - y2;
	return (dx * dx + dy * dy < r2 * r2);
}
// Circle <> Range
function collide_circle_range(dx, dy, dr) {
	return (dx * dx + dy * dy < dr * dr);
}
// Circle <> Circle
function collide_circle_circle(x1, y1, r1, x2, y2, r2) {
	return collide_circle_range(x1 - x2, y1 - y2, r1 + r2);
}
// Circle <> Point
function collide_circle_point(x1, y1, r1, x2, y2) {
	return collide_circle_range(x1 - x2, y1 - y2, r1);
}
// instance collision checking:
function instance_position(_px, _py, _object, _mult) {
	var _x, _y, _ox, _oy, _sx, _sy, _o, _s, _i, _il, _r, _dx, _dy,
		_q = (_object.__instance ? [_object] : instance_list(_object)),
		_tm = (_mult) ? true : false;
	if (_tm) _ta = [];
	_il = _q.length;
	for (_i = 0; _i < _il; _i++) {
		_o = _q[_i];
		if (!_o.collision_checking) continue;
		_s = _o.sprite_index;
		if (!_s) continue;
		_x = _o.x; _sx = _o.image_xscale;
		_y = _o.y; _sy = _o.image_yscale;
		switch (_s.collision_shape)
		{
		case 0x2:
			if (_sx == 1 && _sy == 1) {
				_ox = _s.xoffset; _oy = _s.yoffset;
				if (!collide_bbox_point(_x + _s.collision_left - _ox, _y + _s.collision_top - _oy,
				_x + _s.collision_right - _ox, _y + _s.collision_bottom - _oy, _px, _py)) break;
			} else if (!collide_sbox_point(_x, _y, _sx, _sy, _s)) break;
			if (!_tm) return _o;
			_ta.push(_o);
			break;
		case 0x3:
			_r = _s.collision_radius * Math.max(_o.image_xscale, _o.image_yscale);
			_dx = _o.x + (_s.width / 2 - _s.xoffset) - _px;
			_dy = _o.y + (_s.height / 2 - _s.yoffset) - _py;
			if ((_dx * _dx) + (_dy * _dy) > _r * _r) break;
			if (!_tm) return _o;
			_ta.push(_o);
			break;
		}
	}
	return _tm ? _ta : null;
}
//
function __place_meeting__(nx, ny, what, many) {
	this.other = null;
	var i, l,
		// sprite, scale:
		ts = this.sprite_index,
		tsx, tsy, tfx, tfy, tst,
		// circle:
		tcx, tcy, tcr,
		// bbox:
		tbl, tbr, tbt, tbb,
		// instances, multiple, output, types:
		tz, tm, ct, ch, ra,
		// other:
		o, ox, oy, os, ost, osx, osy, ofx, ofy, ofr;
	if (ts == null) return false;
	tfx = ts.xoffset;
	tfy = ts.yoffset;
	tsx = this.image_xscale;
	tsy = this.image_yscale;
	tst = ts.collision_shape;
	// bbox:
	if (tst == 2) {
		tbl = nx + tsx * (ts.collision_left - tfx);
		tbr = nx + tsx * (ts.collision_right - tfx);
		tbt = ny + tsy * (ts.collision_top - tfy);
		tbb = ny + tsy * (ts.collision_bottom - tfy);
	}
	// circle:
	if (tst == 3) {
		tcr = ts.collision_radius * (tsx > tsy ? tsx : tsy);
		tcx = nx + tsx * (ts.width / 2 - tfx);
		tcy = ny + tsy * (ts.height / 2 - tfy);
	}
	//
	tz = (what.__instance ? [what] : instance_list(what));
	tm = many ? true : false;
	if (tm) ra = [];
	l = tz.length;
	for (i = 0; i < l; i++) {
		o = tz[i];
		if (!o.collision_checking) continue;
		os = o.sprite_index;
		if (os == null) continue;
		ox = o.x; osx = o.image_xscale;
		oy = o.y; osy = o.image_yscale;
		ost = os.collision_shape;
		ct = (tst << 4) | ost;
		ch = false;
		switch(ct) {
		case 0x22:
			if (osx == 1 && osy == 1) {
				ofx = os.xoffset; ofy = os.yoffset;
				if (!collide_bbox_bbox(tbl, tbt, tbr, tbb,
				ox + os.collision_left - ofx, oy + os.collision_top - ofy,
				ox + os.collision_right - ofx, oy + os.collision_bottom - ofy)) break;
			} else if (!collide_bbox_sbox(tbl, tbt, tbr, tbb, ox, oy, osx, osy, os)) break;
			ch = true;
			break;
		case 0x23:
			ofr = os.collision_radius * (osx > osy ? osx : osy);
			ofx = ox + osx * (os.width / 2 - os.xoffset);
			ofy = oy + osy * (os.height / 2 - os.yoffset);
			if (!collide_bbox_circle(tbl, tbt, tbr, tbb, ofx, ofy, ofr)) break;
			ch = true;
			break;
		case 0x32:
			if (osx == 1 && osy == 1) {
				ofx = os.xoffset; ofy = os.yoffset;
				if (!collide_bbox_circle(
				ox + os.collision_left - ofx, oy + os.collision_top - ofy,
				ox + os.collision_right - ofx, oy + os.collision_bottom - ofy,
				tcx, tcy, tcr)) break;
			} else if (!collide_sbox_circle(ox, oy, osx, osy, os, tcx, tcy, tcr)) break;
			ch = true;
			break;
		case 0x33:
			ofr = os.collision_radius * (osx > osy ? osx : osy);
			ofx = ox + osx * (os.width / 2 - os.xoffset);
			ofy = oy + osy * (os.height / 2 - os.yoffset);
			if (!collide_circle_circle(tcx, tcy, tcr, ofx, ofy, ofr)) break;
			ch = true;
			break;
		} if (!ch) continue;
		this.other = o;
		o.other = this;
		if (!tm) return (o);
		ra.push(o);
	} return ra;
}
function position_meeting(_x, _y, _object) {
	return instance_position(_x, _y, _object) != null;
}
function __move_towards_point__(_x, _y, _speed) {
	if (_speed == 0) return;
	if (this.x == _x && this.y == _y) return;
	var _dx = _x - this.x,
		_dy = _y - this.y,
		_dist = _dx * _dx + _dy * _dy;
	if (_dist < _speed * _speed) {
		this.x = _x;
		this.y = _y;
	} else {
		_dist = Math.sqrt(_dist);
		this.x += _dx * _speed / _dist;
		this.y += _dy * _speed / _dist;
	}
}

function __instance_destroy__() {
	bia_trash.push( this );
}
// web data:
function save_web_data(_name, _value) { if (window.localStorage) window.localStorage.setItem(_name, _value); }
function save_web_integer(_name, _value) { if (window.localStorage) window.localStorage.setItem("int_" + _name, _value); }
function save_web_float(_name, _value) { if (window.localStorage) window.localStorage.setItem("float_" + _name, _value); }
function save_web_string(_name, _value) { if (window.localStorage) window.localStorage.setItem("string_" + _name, _value); }
function load_web_data(_name) { if (window.localStorage) return window.localStorage.getItem(_name); }
function load_web_integer(_name) { if (window.localStorage) return parseInt(window.localStorage.getItem("int_" + _name)); }
function load_web_float(_name) { if (window.localStorage) return parseFloat(window.localStorage.getItem("float_" + _name)); }
function load_web_string(_name) { if (window.localStorage) return '' + window.localStorage.getItem("string_" + _name); }
function delete_web_data(_name) { if (window.localStorage) window.localStorage.removeItem(_name); }
function delete_web_integer(_name) { if (window.localStorage) window.localStorage.removeItem("int_" + _name); }
function delete_web_float(_name) { if (window.localStorage) window.localStorage.removeItem("float_" + _name); }
function delete_web_string(_name) { if (window.localStorage) window.localStorage.removeItem("string_" + _name); }
function clear_web_data() { if (window.localStorage) window.localStorage.clear(); }
function web_data_number() { if (window.localStorage) return window.localStorage.length; }
// misc functions:
function pause_game( _key) {
	bia_paused = true;
	bia_unpausekey = _key;
}
function modal_end() {
	if (bia_modal == null) return;
	bia_modal.instance_destroy();
	bia_modal = null;
}
function modal_start(_inst, _draw) {
	if (bia_modal != null) modal_end();
	bia_modal = _inst;
	bia_modaldraw = _draw;
}
//
function show_mouse() { bia_canvas.style.cursor = "default"; }
function hide_mouse() { bia_canvas.style.cursor = "none"; }
//
function bia_gettime() { return (new Date()).getTime(); }

/***********************************************************************
 * ENGINE
 ***********************************************************************/
 
function bia_global () { }
global = new bia_global();
//{ Events
function __keydownlistener__(e) {
	var r = true;
	if (!e) e = window.event;
	if (document.activeElement && document.activeElement == bia_canvas || document.activeElement == document.body) r = false;
	if (e.repeat) return;
	var keyCode = window.event ? e.which : e.keyCode;
	if (!key_down[keyCode]) {
		key_pressed[keyCode] = true;
		bia_keys_pressed.push(keyCode);
	}
	key_down[keyCode] = true;
	if (!r) e.preventDefault();
	return r;
};
function __keyuplistener__(e) {
	var r = true;
	if (!e) e = window.event;
	if (document.activeElement && document.activeElement == bia_canvas || document.activeElement == document.body) r = false;
	var keyCode = window.event ? e.which : e.keyCode;
	if (key_down[keyCode])
	{
		key_released[keyCode] = true;
		bia_keys_released.push(keyCode);
	}
	key_down[keyCode] = false;
	if (!r) e.preventDefault();
	return r;
};
function __touchsim__(_x, _y) {
	var r = [{}];
	r[0].pageX = bia_canvas.offsetLeft + _x;
	r[0].pageY = bia_canvas.offsetTop + _y;
	__touchvkey__(r);
}
function __mousemovelistener__(_e) {
	if (_e.pageX != undefined && _e.pageY != undefined) {
		mouse_x = _e.pageX;
		mouse_y = _e.pageY;
	} else {
		mouse_x = _e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
		mouse_y = _e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
	}
	if (room_current != null) {
		mouse_x -= bia_canvas.offsetLeft;
		mouse_y -= bia_canvas.offsetTop;			
	}
	if (mouse_down) __touchsim__(mouse_x, mouse_y);
};
function __mousedownlistener__(_e) {
	//if (!mouse_down) mouse_pressed = true;
	//mouse_down = true;
	__touchsim__(mouse_x, mouse_y);
};
function __mouseuplistener__(_e) {
	//if (mouse_down) mouse_released = true;
	//mouse_down = false;
	__touchvkey__([]);
};
function __touchvkey__(_t) {
	var _tx = 0, _ty = 0, _tc = 0, _tl = _t.length, _vl = bia_vkeys.length, _i, _j, _c, _k,
		_dx = bia_canvas.offsetLeft, _dy = bia_canvas.offsetTop, _mx = _my = 1;
	if (bia_canvas.style.width) _mx 
	touch_x = []; touch_y = []; touch_count = 0;
	for (_i = 0; _i < _vl; _i++) bia_vkeys[_i].count = 0;
	for (_i = 0; _i < _tl; _i++) {
		_c = 0;
		for (_j = 0; _j < _vl; _j++) {
			if (!bia_vkeys[_j].active) continue;
			if (_t[_i].pageX - _dx > bia_vkeys[_j].right) continue;
			if (_t[_i].pageX - _dx < bia_vkeys[_j].left) continue;
			if (_t[_i].pageY - _dy < bia_vkeys[_j].top) continue;
			if (_t[_i].pageY - _dy > bia_vkeys[_j].bottom) continue;
			bia_vkeys[_j].count++;
			if (!bia_vkeys[_j].down) {
				bia_vkeys[_j].down = true;
				_k = bia_vkeys[_j].key;
				if (!key_down[_k]) {
					key_down[_k] = true;
					key_pressed[_k] = true;
					bia_keys_pressed.push(_k);
				}
			}
			_c++;
		}
		if (_c == 0) {
			_tx += _t[_i].pageX;
			_ty += _t[_i].pageY;
			touch_x[_tc] = _t[_i].pageX - _dx;
			touch_y[_tc] = _t[_i].pageY - _dy;
			_tc++;
		}
	}
	for (_i = 0; _i < _vl; _i++) {
		if (bia_vkeys[_i].count != 0) continue;
		if (!bia_vkeys[_i].down) continue;
		bia_vkeys[_i].down = false;
		_k = bia_vkeys[_i].key;
		if (key_down[_k]) {
			key_down[_k] = false;
			key_released[_k] = true;
			bia_keys_released.push(_k);
		}
	}
	touch_count = _tc;
	if (_tc != 0) {
		mouse_x = (_tx / _tc) - _dx;
		mouse_y = (_ty / _tc) - _dy;
		if (!mouse_down) {
			mouse_down = true;
			mouse_pressed = true;
		}
	} else if (mouse_down) {
		mouse_down = false;
		mouse_released = true;
	}
};
function __touchlistener__(e) {
	e.preventDefault();
	__touchvkey__(e.targetTouches);
};
//}
function bia_init () {
	if (document.addEventListener) {
		document.addEventListener("keydown", __keydownlistener__, false);
		document.addEventListener("keyup", __keyuplistener__, false);
		document.addEventListener("mousemove", __mousemovelistener__, false);
		document.addEventListener("mousedown", __mousedownlistener__, false);
		document.addEventListener("mouseup", __mouseuplistener__, false);
		document.addEventListener("touchstart", __touchlistener__, false);
		document.addEventListener("touchend", __touchlistener__, false);
		document.addEventListener("touchmove", __touchlistener__, false);
		document.addEventListener("touchenter", __touchlistener__, false);
		document.addEventListener("touchleave", __touchlistener__, false);
		document.addEventListener("touchcancel", __touchlistener__, false);
	} else {
		document.attachEvent("onkeydown", __keydownlistener__);
		document.attachEvent("onkeyup", __keyuplistener__);
		document.attachEvent("onmousemove", __mousemovelistener__);
		document.attachEvent("onmousedown", __mousedownlistener__);
		document.attachEvent("onmouseup", __mouseuplistener__);
	}
	// initialize keycodes
	for (var _k = 0; _k < 256; _k++) {
		key_down[_k] = key_pressed[_k] = key_released[_k] = false;
	}
}

function bia_loading_inc() { bia_loading++; bia_load_total++; }
function bia_loading_dec() { bia_loading--; }

function _$_(_id_) {
	return document.getElementById( _id_ );
}

function var_override(_what, _svar, _fget, _fset) {
	if (var_override_) {
		if (_what.hasOwnProperty(_svar)) return;
		Object.defineProperty(_what, _svar, {
			get: _fget,
			set: _fset
		});
	} else {
		if (_what.__lookupGetter__(_svar) != undefined) return;
		_what.__defineGetter__(_svar, _fget);
		_what.__defineSetter__(_svar, _fset);
	}
}

//{ Depth
function _bia_depth_find(_d) {
	var _tl = bia_depthi.length, _td, _ti;
	for (_ti = 0; _ti < _tl; _ti++) {
		_td = bia_depthi[_ti];
		if (_d > _td) return _ti;
	}
	return _tl;
}
function _bia_depth_new(_d) {
	var _i = _bia_depth_find(_d), _o = [];
	bia_depth.splice(_i, 0, _o);
	bia_depthi.splice(_i, 0, _d);
	return _i;
}
function bia_depth_add(_d, _o) {
	var _t = bia_depthi.indexOf(_d);
	if (_t == -1) _t = _bia_depth_new(_d); // create array if none
	bia_depth[_t].push(_o);
}
function bia_depth_delete(_d, _o) {
	var _t = bia_depth[bia_depthi.indexOf(_d)], _ti = _t.indexOf(_o);
	if (_ti == -1) return;
	_t.splice(_ti, 1);
}
function bia_depth_update() {
	var i, l = bia_depthu.length, o;
	if (l == 0) return;
	for (i = 0; i < l; i++) {
		o = bia_depthu[i];
		if (o.instance_active && o._depth !== undefined) bia_depth_delete(o._depth, o);
		o._depth = o._depthn;
		if (o.instance_active && o._depth !== undefined) bia_depth_add(o._depth, o);
		o._depthu = false;
	}
	bia_depthu = [];
}
// Accessors:
function bia_depth_get() { return this._depth; }
function bia_depth_set(_d) {
	if (this._depth == _d) return; // don't change on depth match
	this._depthn = _d;
	if (this._depthu) return;
	this._depthu = true;
	bia_depthu.push(this);
}
//}
//{ Types
function instance_list(_o) {
	var _t = _o._object_index_;
	if (bia_types[_t] == undefined) bia_types[_t] = [];
	return bia_types[_t];
}
function bia_type_add(_d, _o) {
	instance_list(_d).push(_o);
}
function bia_type_delete(_o, _p) {
	var _d = bia_types[_p], _t = _d.indexOf(_o);
	_d.splice(_t, 1);
}
function bia_type_get() { return this._object_index; }
//}
//{ Tileset functions
function tile_layer_find(_d) {
	var _tl = bia_tilesi.length, _td, _ti;
	for (_ti = 0; _ti < _tl; _ti++) {
		_td = bia_tilesi[_ti];
		if (_d > _td) return _ti;
	}
	return _tl;
}
function tile_layer_add(_d) {
	var _i = tile_layer_find(_d), _o = [];
	bia_tiles.splice(_i, 0, _o);
	bia_tilesi.splice(_i, 0, _d);
	return _o;
}
function tile(_s, _x, _y, _l, _t, _w, _h) {
	this.source = _s;
	this.x = _x;
	this.y = _y;
	this.left = _l;
	this.top = _t;
	this.width = _w;
	this.height = _h;
	this.width2 = _w;
	this.height2 = _h;
	this.sectors = [];
}
function tile_add(_b, _l, _t, _w, _h, _x, _y, _z) {
	var	_tx1 = Math.floor(_x / bia_tilez),
		_ty1 = Math.floor(_y / bia_tilez),
		_tx2 = Math.floor((_x + _w) / bia_tilez),
		_ty2 = Math.floor((_y + _h) / bia_tilez),
		_tt = new tile(_b, _x, _y, _l, _t, _w, _h),
		_tx, _ty, _ts,
		_d, _e = bia_tilesi.indexOf(_z);
	if (_e != -1) _d = bia_tiles[_e];
	else _d = tile_layer_add(_z);
	for (_tx = _tx1; _tx <= _tx2; _tx++) {
		if (_d[_tx] == null) _d[_tx] = [];
		for (_ty = _ty1; _ty <= _ty2; _ty++) {
			if (_d[_tx][_ty] == null) _d[_tx][_ty] = [];
			_ts = _d[_tx][_ty];
			_ts.push(_tt);
			_tt.sectors.push(_ts);
		}
	}
	return _tt;
}
function tile_find(_x, _y, _w, _h, _d) {
	var _xw = _x + _w,
		_yh = _y + _h,
		_r = [],
		_tx, _ty, _ti, _tl, _ts, _tt, _ta,
		_tx1, _ty1, _tx2, _ty2;
	_ti = bia_tilesi.indexOf(_d);
	if (_ti == -1) return _r;
	_ta = bia_tiles[_ti];
	_tx1 = Math.floor(_x / bia_tilez);
	_ty1 = Math.floor(_y / bia_tilez);
	_tx2 = Math.floor((_x + _w) / bia_tilez);
	_ty2 = Math.floor((_y + _h) / bia_tilez);
	for (_tx = _tx1; _tx <= _tx2; _tx++) {
		if (_ta[_tx] == null) continue;
		for (_ty = _ty1; _ty <= _ty2; _ty++) {
			if (_ta[_tx][_ty] == null) continue;
			_ts = _ta[_tx][_ty];
			_tl = _ts.length;
			for (_ti = 0; _ti < _tl; _ti++) {
				_tt = _ts[_ti];
				if (_tt.x >= _xw) continue;
				if (_tt.y >= _yh) continue;
				if (_tt.x + _tt.width2 < _x) continue;
				if (_tt.y + _tt.height2 < _y) continue;
				_r.push(_tt);
			}
		}
	}
	return _r;
}
function tile_delete(_t) {
	var _ti, _tl, _ts;
	_tl = _t.sectors.length;
	for (_ti = 0; _ti < _tl; _ti++) {
		_ts = _t.sectors[_ti];
		_ts.splice(_ts.indexOf(_t), 1);
	}
}
function tile_srender(_s) {
	var _ti, _tt;
	for (_ti = 0; _ti < _s.length; _ti++) {
		if (_s[_ti] == null) continue;
		_tt = _s[_ti];
		if (_tt.source == null) continue;
		if (_tt.source.image == null) continue;
		bia_context.drawImage(_tt.source.image, _tt.left, _tt.top, _tt.width, _tt.height, _tt.x - room_viewport_x, _tt.y - room_viewport_y, _tt.width2, _tt.height2);
	}
}
function tile_lrender(_l) {
	var _tx, _ty,
		_tx1 = Math.floor(room_viewport_x / bia_tilez),
		_tx2 = Math.floor((room_viewport_x + room_viewport_width) / bia_tilez),
		_ty1 = Math.floor(room_viewport_y / bia_tilez),
		_ty2 = Math.floor((room_viewport_y + room_viewport_height) / bia_tilez);
	for (_tx = _tx1; _tx <= _tx2; _tx++) {
		if (_l[_tx] == null) continue;
		for (_ty = _ty1; _ty <= _ty2; _ty++) {
			if (_l[_tx][_ty] == null) continue;
			tile_srender(_l[_tx][_ty]);
		}
	}
}
//} /Tileset functions
//{ Some events & accessors
function bia_id_get() { return this; }
function bia_parent_get() { return this._parent_index; }
function image_single_get() { return (this.image_speed == 0 ? this.image_index : -1); }
function image_single_set(_o) { this.image_speed = 0; this.image_index = _o; }
// Handles object size & sprite updates. Should get rid of this in favor of accessors.
function __handle_sprite__(_object_) {
	if (_object_.sprite_index == null) return;
	_object_.sprite_width = _object_.sprite_index.width;
	_object_.sprite_height = _object_.sprite_index.height;
	_object_.sprite_xoffset = _object_.sprite_index.xoffset;
	_object_.sprite_yoffset = _object_.sprite_index.yoffset;
	_object_.image_number = _object_.sprite_index.frames.length;
	_object_.image_index += _object_.image_speed;
	if (_object_.image_index >= _object_.image_number) _object_.image_index = _object_.image_index % _object_.image_number;
	if (_object_.image_index < 0) _object_.image_index = _object_.image_number - 1 + (_object_.image_index % _object_.image_number);
}
function __draw_self__() {
	draw_sprite_ext(this.sprite_index, this.image_index, this.x, this.y, this.image_xscale, this.image_yscale, this.image_angle, this.image_alpha);
}
//}
//{ Inherited event lookup functions.
// There's also a way to do this with much shorter code.
function on_creation_i() {
	for (var o = this.parent; o; o = o.parent)
	if (o.on_creation !== on_creation_i)
	return o.on_creation.apply(this);
}
function on_destroy_i() {
	for (var o = this.parent; o; o = o.parent)
	if (o.on_destroy !== on_destroy_i)
	return o.on_destroy.apply(this);
}
function on_step_i() {
	for (var o = this.parent; o; o = o.parent)
	if (o.on_step !== on_step_i)
	return o.on_step.apply(this);
}
function on_end_step_i() {
	for (var o = this.parent; o; o = o.parent)
	if (o.on_end_step !== on_end_step_i)
	return o.on_end_step.apply(this);
}
function on_draw_d() {
	__handle_sprite__(this);
	__draw_self__.apply(this);
}
function on_draw_i() {
	for (var o = this.parent; o; o = o.parent)
	if (o.on_draw !== on_draw_i)
	return o.on_draw.apply(this);
	on_draw_d.apply(this);
}
function on_collision_i() {
	for (var o = this.parent; o; o = o.parent)
	if (o.on_collision !== on_collision_i)
	return o.on_collision.apply(this);
}
function on_animationend_i() {
	for (var o = this.parent; o; o = o.parent)
	if (o.on_animationend !== on_animationend_i)
	return o.on_animationend.apply(this);
}
function on_roomstart_i() {
	for (var o = this.parent; o; o = o.parent)
	if (o.on_roomstart !== on_roomstart_i)
	return o.on_roomstart.apply(this);
}
function on_roomend_i() {
	for (var o = this.parent; o; o = o.parent)
	if (o.on_roomend !== on_roomend_i)
	return o.on_roomend.apply(this);
}
//} /Inherited event handles

// instance_init(this, object_index, parent_index, visible, depth, sprite, collideable, inner index)
// Universal object constructor:
function __instance_init__(_this, _oi, _p, _v, _d, _si, _c, _io) {
	_this._object_index = undefined;
	_this._object_index_ = _io;
	_this._depth = undefined;
	_this._depthn = undefined;
	_this._depthu = false;
	var_override(_this, 'depth', bia_depth_get, bia_depth_set );
	var_override(_this, 'object_index', bia_type_get, bia_idle );
	var_override(_this, 'image_single', image_single_get, image_single_set );
	var_override(_this, 'id', bia_id_get, bia_idle);
	var_override(_this, 'parent', bia_parent_get, bia_idle);
	_this._object_index = _oi;
	_this._parent_index = _p;
	_this.xstart = _this.xprevious = _this.x = 0;
	_this.ystart = _this.yprevious = _this.y = 0;
	_this.depthstart = _d;
	_this.image_angle = _this.direction = 0;
	_this.visible = _v;
	_this.image_yscale = _this.image_xscale = 1;
	_this.image_alpha = 1;
	_this.image_index = 0;
	_this.image_speed = 1;
	_this.sprite_index = _si;
	_this.speed = 0;
	_this.other = null;
	_this.collision_checking = _c;
	_this.persistent = false;
	_this.instance_active = false;
	// Instance-specific functions:
	_this.place_meeting = __place_meeting__;
	_this.move_towards_point = __move_towards_point__;
	_this.instance_destroy = __instance_destroy__;
	_this.draw_self = __draw_self__;
}
// Universal sprite constructor:
function __sprite_init__(_this, _name, _width, _height, _xofs, _yofs, _cshape, _crad, _cl, _cr, _ct, _cb, _frames) {
	_this.frames = [];
	var _frame, _fi;
	for (_fi = 0; _fi < _frames.length; _fi++) {
		_frame = new Image();
		if (_frames[_fi]) {
			bia_loading_inc();
			_frame.onload = bia_loading_dec;
			_frame.onerror = bia_loading_dec;
			_frame.src = _frames[_fi];
		}
		_this.frames.push(_frame);
	}
	_this.width = _width;
	_this.height = _height;
	_this.xoffset = _xofs;
	_this.yoffset = _yofs;
	_this.collision_shape = (_cshape == 'Circle' ? ct_circle : _cshape == 'Box' ? ct_box : 0);
	_this.collision_radius = _crad;
	_this.collision_left = _cl;
	_this.collision_right = _cr;
	_this.collision_top = _ct;
	_this.collision_bottom = _cb;
	bia_sprites.push(_this);
}
// Universal audio constructor:
function __audio_init__(_this, _name, _wav, _mp3, _ogg) {
	var _src = '';
	_this.type = 'none';
	if (bia_ogg_supported && (_ogg != '')) {
		_this.type = 'ogg';
		_src = _ogg;
	} else if (bia_mp3_supported && (_mp3 != '')) {
		_this.type = 'mp3';
		_src = _mp3;
	} else if (bia_wav_supported && (_wav != '')) {
		_this.type = 'wav';
		_src = _wav;
	}
	if (_src != '') {
		_this.audio = document.createElement('audio');
		_this.audio.setAttribute('src', _src);
	}
	bia_audios.push(_this);
}

function __background_init__(_this, _name, _file) {
	_this.image = new Image();
	bia_loading_inc();
	_this.image.onload = bia_loading_dec;
	_this.image.onerror = bia_loading_dec;
	_this.image.src = _file;
	bia_backgrounds.push(_this);
}

function __font_init__(_this, _name, _family, _size, _bold, _italic) {
	_this.family = _family;
	_this.size = _size;
	_this.bold = _bold;
	_this.italic = _italic;
	bia_fonts.push(_this);
}

// (this, name, width, height, speed, back. red, back. green, back. blue, background, back. tilex, back. tiley, back. stretch, view width, view height, view object, view hborder, view vborder)
function __room_start__(_this, _name, _rw, _rh, _rs, _br, _bg, _bb, _bi, _bx, _by, _bs, _vw, _vh, _vo, _vx, _vy) {
	_$_('biagame').innerHTML = "<canvas id='" + bia_canvas_id + "' width='" + _vw + "' height='" + _vh + "' style='" + bia_canvas_css + "'></canvas>";
	bia_canvas = _$_(bia_canvas_id);
	bia_context = bia_canvas.getContext('2d');
	room_current = _this;
	// generic:
	room_speed = _rs;
	room_width = _rw;
	room_height = _rh;
	// background color:
	room_background_color_red = _br;
	room_background_color_green = _bg;
	room_background_color_blue = _bb;
	// background image:
	room_background = _bi;
	room_background_x = 0;
	room_background_y = 0;
	room_background_tile_x = _bx;
	room_background_tile_y = _by;
	room_background_tile_stretch = _bs;
	// view:
	room_viewport_width = _vw;
	room_viewport_height = _vh;
	room_viewport_x = room_viewport_y = 0;
	room_viewport_object = _vo;
	room_viewport_hborder = _vx;
	room_viewport_vborder = _vy;
	// tiles:
	var _l, _b, _t, _i, _il, _tls_, i, l, d, o, a;
	_tls_ = _this.tiles; bia_tiles = []; bia_tilesi = [];
	for (_l = 0; _l < _tls_.length; _l++)
	for (_b = 1; _b < _tls_[_l].length; _b++)
	for (_t = 1; _t < _tls_[_l][_b].length; _t++)
	tile_add(_tls_[_l][_b][0], _tls_[_l][_b][_t][0], _tls_[_l][_b][_t][1], _tls_[_l][_b][_t][2], _tls_[_l][_b][_t][3], _tls_[_l][_b][_t][4], _tls_[_l][_b][_t][5], _tls_[_l][0]);
	// objects:
	bia_depth = []; bia_depthi = []; bia_depthu = []; bia_types = [];
	a = _this.objects;
	l = a.length;
	for (i = 0; i < l; i++) {
		d = a[i];
		d = d[0]; // temp.fix for rc2
		if (d.o === undefined) continue;
		o = instance_create_(d.x, d.y, d.o);
		if (d.s !== undefined) o.sprite_index = d.s;
		if (d.d !== undefined) o.direction = d.d;
		if (d.a !== undefined) o.image_angle = d.a;
		if (d.u !== undefined) o.image_xscale = d.u;
		if (d.v !== undefined) o.image_yscale = d.v;
		if (d.c !== undefined) d.c.apply(o);
	}
	// persistent objects:
	_l = bia_persist.length
	for (_t = 0; _t < _l; _t++) instance_activate(bia_persist[_t]);
	instance_foreach(function(o) {
		if (bia_persist.indexOf(o) != -1) return;
		o.on_creation();
	});
	bia_persist = [];
	//
	instance_foreach(function(o) {
		o.on_roomstart();
	});
}

function bia_preloader() {
	var _w = Math.min(400, (bia_canvas.width * 0.6) >> 0), _h = 16,
		_x = (bia_canvas.width - _w) >> 1, _y = (bia_canvas.height - _h) >> 1,
		_p = (bia_load_total - bia_loading) / bia_load_total,
		_s = "Loading resources: " + (bia_load_total - bia_loading) + "/" + (bia_load_total);
	bia_canvas.width = bia_canvas.width;
	bia_canvas.height = bia_canvas.height;
	bia_canvas.style.backgroundColor = "rgb(42, 42, 42)";
	bia_context.font = "italic 12px Verdana";
	bia_context.textAlign = "left";
	bia_context.textBaseline = "bottom";
	bia_context.fillStyle = bia_context.strokeStyle = "rgba(192, 192, 192, 1)";
	bia_context.fillRect(_x - 1, _y - 1, _w + 2, _h + 2);
	bia_context.fillStyle = bia_context.strokeStyle = "rgba(0, 0, 0, 1)";
	bia_context.fillRect(_x, _y, _w, _h);
	bia_context.fillStyle = bia_context.strokeStyle = "rgba(255, 255, 255, 1)";
	bia_context.fillRect(_x + 2, _y + 2, (_w - 4) * _p, _h - 4);
	bia_context.fillText(_s, _x, _y - 2);
}

function bia_render_back() {
	if (room_background == null) return;
	if (room_background_tile_stretch) {
		bia_context.drawImage(room_background, 0 - room_viewport_x, 0 - room_viewport_y, room_width, room_height);
		return;
	}
	var _bw, _bh, _bx, _by, _vx, _vy, _vw, _vh, _x1, _x2, _y1, _y2, _ht, _vt;
	_bw = room_background.width;
	_bh = room_background.height;
	_bx = room_background_x;
	if (room_background_tile_x) { _bx = _bx < 0 ? _bw - _bx % _bw : _bx % _bw; }
	_by = room_background_y;
	if (room_background_tile_y) { _bx = _by < 0 ? _bh - _by % _bh : _by % _bh; }
	//
	_vx = room_viewport_x;
	_vy = room_viewport_y;
	_vw = room_viewport_width;
	_vh = room_viewport_height;
	//
	_x1 = room_background_tile_x ? Math.floor(_vx / _bw) * _bw - _bx : -_bx;
	_x2 = room_background_tile_x ? Math.floor((_vx + _vw + _bw) / _bw) * _bw : _x1 + _bw;
	_y1 = room_background_tile_y ? Math.floor(_vy / _bh) * _bh - _by : -_by;
	_y2 = room_background_tile_y ? Math.floor((_vy + _vh + _bh) / _bh) * _bh : _y1 + _bh;
	for (_ht = _x1; _ht < _x2; _ht += _bw)
	for (_vt = _y1; _vt < _y2; _vt += _bh)
	bia_context.drawImage(room_background, _ht - _vx, _vt - _vy);
}
// @1.2.6
function instance_activate(_i) {
	if (_i.instance_active) return;
	for (var o = _i._object_index; o; o = o.parent) bia_type_add(o, _i);
	//bia_type_add(_i._object_index, _i);
	//if (_i.parent != null) bia_type_add(_i.parent, _i);
	bia_depth_add(_i._depth, _i);
	_i.instance_active = true;
}
// @1.2.6
function instance_deactivate(_i) {
	if (!_i.instance_active) return;
	for (var o = _i._object_index; o; o = o.parent) bia_type_delete(o._object_index_, _i);
	//bia_type_delete(_i, _i._object_index_);
	//if (_i.parent != null) bia_type_delete(_i, _i.parent._object_index_);
	bia_depth_delete(_i._depth, _i);
	_i.instance_active = false;
}
// @1.2.6 Performs function for all instances
function instance_foreach(_function) {
	var _d, _l, _o;
	for (_d in bia_depth) {
		_l = bia_depth[_d];
		for (_o = 0; _o < _l.length; _o++) _function(_l[_o]);
	}
}
// @1.2.6 Performs function for all instances on specific depth
function instance_fordepth(_depth, _function) {
	var _o, _d = bia_depthc[_depth], _l;
	if (_d == null) return;
	_l = _d.length;
	for (_o = 0; _o < _l; _o++) _function(_d[_o]);
}
// @1.2.6 Actions performed on room switch
function bia_room_switchto_(_o) {
	_o.on_roomend();
	if (!_o.persistent) return;
	bia_persist.push(_o);
	instance_deactivate(_o);
}
function bia_room_switchto(_dest) {
	bia_persist = [];
	instance_foreach(bia_room_switchto_);
	room_current = _dest;
	bia_room_to_go = null;
	room_current.start();
}
// @1.0.0 Global step event
function bia_step() {
	// object step events:
	bia_trash = [];
	var bia_deptho, bia_depthl, _obj_, _objd_, _h, _v;
	for (bia_depthd in bia_depth) {
		bia_depthc = bia_depth[bia_depthd];
		bia_depthl = bia_depthc.length;
		for (bia_deptho = 0; bia_deptho < bia_depthl; bia_deptho++) {
			_obj_ = bia_depthc[bia_deptho];
			// is viewport object?
			if (room_viewport_object != null && bia_viewport_inst == null && (_obj_.object_index == room_viewport_object || _obj_.parent == room_viewport_object)) {
				bia_viewport_inst = _obj_;
			}
			// step events:
			_obj_.on_step();
			// move object:
			if (_obj_.speed != 0) {
				_objd_ = _obj_.direction * bia_d2r;
				_obj_.x += _obj_.speed * Math.cos(_objd_);
				_obj_.y += _obj_.speed * Math.sin(_objd_);
			}
			// post-step events:
			_obj_.on_collision();
			_obj_.on_end_step();
			// post:
			_obj_.xprevious = _obj_.x;
			_obj_.yprevious = _obj_.y;
		}
	}
	// follow object
	if (bia_viewport_inst != null) {
		_h = min(room_viewport_hborder, room_viewport_width / 2);
		_v = min(room_viewport_vborder, room_viewport_height / 2);
		// hborder:
		if (bia_viewport_inst.x < room_viewport_x + _h) room_viewport_x = bia_viewport_inst.x - _h;
		if (bia_viewport_inst.x > room_viewport_x + room_viewport_width - _h) room_viewport_x = bia_viewport_inst.x - room_viewport_width + _h;
		// vborder:
		if (bia_viewport_inst.y < room_viewport_y + _v) room_viewport_y = bia_viewport_inst.y - _v;
		if (bia_viewport_inst.y > room_viewport_y + room_viewport_height - _v) room_viewport_y = bia_viewport_inst.y - room_viewport_height + _v;
		// limits:
		room_viewport_x = Math.max(0, Math.min(room_viewport_x, room_width - room_viewport_width)) >> 0;
		room_viewport_y = Math.max(0, Math.min(room_viewport_y, room_height - room_viewport_height)) >> 0;
	}
}

function bia_draw() {
	// clear canvas:
	if (room_background_color_show) {
		bia_canvas.width = bia_canvas.width;
		bia_canvas.height = bia_canvas.height;
		// set background color:
		bia_canvas.style.backgroundColor = "rgb(" + room_background_color_red + "," + room_background_color_green + "," + room_background_color_blue + ")";
	}
	bia_render_back();
	tile_layer_last = 0;
	var bia_depthc, bia_depthv, bia_deptho, bia_depthl, _obj_;
	for (bia_depthd in bia_depth) {
		bia_depthc = bia_depth[bia_depthd];
		bia_depthv = bia_depthi[bia_depthd];
		for (; bia_tilesi[tile_layer_last] >= bia_depthv && tile_layer_last < bia_tiles.length; tile_layer_last++)
		{
			tile_lrender(bia_tiles[tile_layer_last]);
		}
		bia_depthl = bia_depthc.length;
		for (bia_deptho = 0; bia_deptho < bia_depthl; bia_deptho++) {
			_obj_ = bia_depthc[bia_deptho];
			if (_obj_.visible) _obj_.on_draw();
			_obj_.on_animationend();
		}
	}
	// render remaining tile layers:
	for (; tile_layer_last < bia_tiles.length; tile_layer_last++) {
		tile_lrender(bia_tiles[tile_layer_last]);
	}
}

function bia_prestep() {
	// clear mouse states and keypressed / keyrelesed statuses
	mouse_pressed = false;
	mouse_released = false;
	var _k, _r, _obj_;
	for (_k = 0; _k < bia_keys_pressed.length; _k++) key_pressed[bia_keys_pressed[_k]] = false;
	for (_k = 0; _k < bia_keys_released.length; _k++) key_released[bia_keys_released[_k]] = false;
	bia_keys_pressed = [];
	bia_keys_released = [];
	// remove objects from destroy stack
	for (_r = 0; _r < bia_trash.length; _r++) {
		_obj_ = bia_trash[_r];
		if (bia_modal == _obj_) bia_modal = null;
		_obj_.depth = undefined;
		bia_type_delete(_obj_, _obj_._object_index_);
		if (_obj_.parent != null) bia_type_delete(_obj_, _obj_.parent._object_index_);
		_obj_.on_destroy();
	}
}

function bia_loop() {
	// calculate render time
	bia_frame_time = bia_gettime();
	bia_elapsed = (bia_frame_time - bia_prev_frame_time);
	bia_frame_step += bia_elapsed;
	bia_frame_el += bia_elapsed;
	// continue game with the UN-Pause key
	if (bia_paused && keyboard_check_pressed(bia_unpausekey)) bia_paused = false;
	//
	if (bia_room_to_go != null && bia_canvas == null) bia_room_switchto(bia_room_to_go);
	// render game:
	if (bia_frame_step >= 1000 / room_speed && bia_loading == 0 && bia_canvas != null && !bia_paused) {
		bia_frame_count++;
		bia_elapsed = bia_frame_time - bia_prev_cycle_time;
		bia_prev_cycle_time = bia_frame_time;
		bia_frame_step -= 1000 / room_speed;
		if (bia_frame_step < 0 || bia_frame_step > 1024) bia_frame_step = 0;
		// start next room, if any:
		if (bia_room_to_go != null) bia_room_switchto(bia_room_to_go);
		//
		bia_redraw = bia_redraw_auto;
		if (bia_modal != null) {
			bia_modal.on_step();
			if (bia_modal != null) bia_modal.on_end_step();
		} else bia_step();
		bia_depth_update();
		if (bia_redraw) {
			if (bia_modal == null || bia_modaldraw) bia_draw();
			else bia_modal.on_draw();
		}
		bia_depth_update();
		bia_prestep();
		bia_depth_update();
	} else if (bia_loading > 0) bia_preloader();
	// calculate fps:
	if (bia_frame_el >= Math.floor(200 / room_speed) * 5 * room_speed)
	{
		fps = Math.ceil(bia_frame_count * 1000 / bia_frame_el);
		if (fps > room_speed) fps = room_speed;
		bia_frame_el = bia_frame_count = 0;
	}
	// repeat
	bia_prev_frame_time = bia_frame_time;
	setTimeout(bia_gameloop, 5);
}
bia_init();

/***********************************************************************
 * EXTENSIONS
 ***********************************************************************/


/***********************************************************************
 * SPRITES
 ***********************************************************************/
function __spr_player() { 
__sprite_init__(this, spr_player, 40, 40, 20, 20, 'Circle', 16, 0, 40, 0, 40, ['img/spr_player_0.png']);
}; var spr_player = new __spr_player();

function __spr_block() { 
__sprite_init__(this, spr_block, 40, 40, 0, 0, 'Box', 20, 0, 40, 0, 40, ['img/spr_block_0.png']);
}; var spr_block = new __spr_block();

function __spr_diamond() { 
__sprite_init__(this, spr_diamond, 40, 40, 20, 20, 'Circle', 16, 0, 40, 0, 40, ['img/spr_diamond_0.png']);
}; var spr_diamond = new __spr_diamond();

function __spr_bomb() { 
__sprite_init__(this, spr_bomb, 20, 20, 10, 10, 'Circle', 10, 0, 20, 0, 20, ['img/spr_bomb_0.png']);
}; var spr_bomb = new __spr_bomb();

function __spr_explosion() { 
__sprite_init__(this, spr_explosion, 128, 128, 70, 64, 'Box', 64, 0, 128, 0, 128, ['img/spr_explosion_0.png','img/spr_explosion_1.png','img/spr_explosion_2.png','img/spr_explosion_3.png','img/spr_explosion_4.png','img/spr_explosion_5.png','img/spr_explosion_6.png','img/spr_explosion_7.png','img/spr_explosion_8.png','img/spr_explosion_9.png','img/spr_explosion_10.png','img/spr_explosion_11.png','img/spr_explosion_12.png','img/spr_explosion_13.png','img/spr_explosion_14.png','img/spr_explosion_15.png']);
}; var spr_explosion = new __spr_explosion();

function __spr_enemy() { 
__sprite_init__(this, spr_enemy, 40, 40, 20, 20, 'Circle', 20, 0, 40, 0, 40, ['img/spr_enemy_0.png']);
}; var spr_enemy = new __spr_enemy();



/***********************************************************************
 * SOUNDS
 ***********************************************************************/
function __sound_13() { 
__audio_init__(this, sound_13, 'aud/explosion01.wav', '', '');
}; var sound_13 = new __sound_13();

function __sound_14() { 
__audio_init__(this, sound_14, 'aud/space.wav', '', '');
}; var sound_14 = new __sound_14();



/***********************************************************************
 * MUSICS
 ***********************************************************************/


/***********************************************************************
 * BACKGROUNDS
 ***********************************************************************/


/***********************************************************************
 * FONTS
 ***********************************************************************/


/***********************************************************************
 * OBJECTS
 ***********************************************************************/
function __obj_player() {
__instance_init__(this, obj_player, null, 1, 0, spr_player, 1, 0);
this.on_creation = function() {
with(this) {
// set the global player variable
// this instance is the global player
// see Global variables settings

global.player = id;
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {

// WHEN THE RIGHT ARROW IS PUSHED
// MOVES THE PLAYER TO THE RIGHT
if ( keyboard_check( vk_right )) {
	x = x + 5;
}

// WHEN THE LEFT ARROW IS PUSHED
// MOVES THE PLAYER TO THE LEFT
if ( keyboard_check( vk_left )) {
	x = x - 5;
}

// WHEN THE UP ARROW IS PUSHED
// MOVES THE PLAYER TO UP
if ( keyboard_check( vk_up )) {
	y = y - 5;
}

// WHEN THE DOWN ARROW IS PUSHED
// MOVES THE PLAYER TO DOWN
if ( keyboard_check( vk_down )) {
	y = y + 5;
}

// WHEN PLAYER PRESSES THE SPACE
// CREATE A NEW BOMB 20 PIXEL LEFT TO THE PLAYER'S POSITION

if ( keyboard_check_pressed( vk_space )) {
	new_bomb = instance_create( x + 20, y, obj_bomb );
}
}
};
this.on_end_step = on_end_step_i;
this.on_collision = function() {
with(this) {
this.other = this.place_meeting(this.x, this.y, obj_block);
if(this.other != null) {

// STOP THE PLAYER IF HITS THE BLOCK
// PLACE BACK TO ITS PREVIOUS POSITION

x = xprevious;
y = yprevious;
}
}
};
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var obj_player = new __obj_player();

function __obj_block() {
__instance_init__(this, obj_block, null, 1, 0, spr_block, 1, 2);
this.on_creation = on_creation_i;
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var obj_block = new __obj_block();

function __obj_diamond() {
__instance_init__(this, obj_diamond, null, 1, 0, spr_diamond, 1, 19);
this.on_creation = on_creation_i;
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = on_end_step_i;
this.on_collision = function() {
with(this) {
this.other = this.place_meeting(this.x, this.y, obj_player);
if(this.other != null) {

// WHEN THE DIAMOND HITS THE PLAYER
// REMOVE FROM THE LEVEL

instance_destroy();
}
}
};
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var obj_diamond = new __obj_diamond();

function __obj_bomb() {
__instance_init__(this, obj_bomb, null, 1, 0, spr_bomb, 1, 23);
this.on_creation = function() {
with(this) {

// SET A NEW VARIABLE CALLED: TIMER
// THIS TIMER WILL COUNT BACK TO 0
this.timer = 200;

sound_play(sound_14);
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {

// ROTATE THE IMAGE ANGLE
image_angle = image_angle + 1;

// DECREASE THE TIMER
timer = timer - 1;

// CHECK IF TIMER IS ZERO:
// DELETE THE BOMB WHEN ZERO
// AND CREATE AN EXPLOSION
// AT THE BOMB'S POSITION

if ( timer <= 0 ) {
	instance_destroy();
	new_explosion = instance_create( x, y, obj_explosion );
}
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var obj_bomb = new __obj_bomb();

function __obj_explosion() {
__instance_init__(this, obj_explosion, null, 1, 0, spr_explosion, 1, 24);
this.on_creation = function() {
with(this) {
sound_play(sound_13);
}
};
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = function() {
if(this.image_index >= this.image_number - 1) {
with(this) {

// WHEN THE ANIMATION REACHES THE LAST FRAME
// REMOVE THE EXPLOSION OBJECT

instance_destroy();
}
}
};
this.on_draw = on_draw_i;
}; var obj_explosion = new __obj_explosion();

function __obj_enemy() {
__instance_init__(this, obj_enemy, null, 1, 0, spr_enemy, 1, 25);
this.on_creation = on_creation_i;
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {

// rotate the enemy sprite
image_angle = point_direction(x, y, global.player.x, global.player.y);

// move the enemy towards the player
move_towards_point(global.player.x, global.player.y, 2)
}
};
this.on_end_step = on_end_step_i;
this.on_collision = function() {
with(this) {
this.other = this.place_meeting(this.x, this.y, obj_block);
if(this.other != null) {

// stop the enemy when collides with the wall
x = xprevious;
y = yprevious;
}
}
};
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var obj_enemy = new __obj_enemy();



/***********************************************************************
 * SCENES
 ***********************************************************************/
function __test_level() { 
this.tiles = [
];
this.objects = [
[{o:obj_player, x:320, y:220}],
[{o:obj_block, x:400, y:280}],
[{o:obj_block, x:400, y:240}],
[{o:obj_block, x:400, y:200}],
[{o:obj_block, x:400, y:160}],
[{o:obj_block, x:400, y:120}],
[{o:obj_block, x:200, y:120}],
[{o:obj_block, x:200, y:160}],
[{o:obj_block, x:200, y:200}],
[{o:obj_block, x:200, y:240}],
[{o:obj_block, x:200, y:280}],
[{o:obj_block, x:240, y:280}],
[{o:obj_block, x:280, y:280}],
[{o:obj_block, x:360, y:280}],
[{o:obj_block, x:320, y:280}],
[{o:obj_block, x:240, y:120}],
[{o:obj_block, x:360, y:120}],
[{o:obj_diamond, x:220, y:80}],
[{o:obj_diamond, x:420, y:80}],
[{o:obj_diamond, x:320, y:80}],
[{o:obj_enemy, x:100, y:200}],
[{o:obj_enemy, x:540, y:220}]];
this.start = function() {
__room_start__(this, test_level, 640, 480, 60, 46, 90, 65, null, 0, 0, 0, 640, 480, null, 50, 0);
};
}
var test_level = new __test_level();
bia_scenes.push(test_level);
bia_room_to_go = test_level;


/***********************************************************************
 * CUSTOM GLOBAL VARIABLES
 ***********************************************************************/
// this global variable defines the player instance
// enemies will follow this instance

global.player = obj_player;

/***********************************************************************
 * CUSTOM GLOBAL FUNCTIONS
 ***********************************************************************/



bia_gameloop = bia_loop;
bia_loop();
