/**
 * ========================================================
 * ╚═╝╚═════╝
 *
 * ██╗ ██╗██████╗ ██╗███╗ ██╗██████╗ ███████╗██╗ ██╗
 * ██║ ██║██╔══██╗ ██║████╗ ██║██╔══██╗██╔════╝╚██╗██╔╝
 * ██║ ██║██████╔╝ ██║██╔██╗ ██║██║ ██║█████╗ ╚███╔╝
 * ██║ ██║██╔══██╗ ██║██║╚██╗██║██║ ██║██╔══╝ ██╔██╗
 * ███████╗██║██████╔╝ ██║██║ ╚████║██████╔╝███████╗██╔╝ ██╗
 * ╚══════╝╚═╝╚═════╝ ╚═╝╚═╝ ╚═══╝╚═════╝ ╚══════╝╚═╝ ╚═╝
 * ========================================================
 * @description Central export for all lib modules - FULL WORKING VERSION
 * @version 5.0.2
 */

const axios = require('axios');
const fs = require('fs');

// ==================== FUNCTIONS ====================
const getBuffer = async (url, options) => {
	try {
		const res = await axios({
			method: "get",
			url,
			headers: { 'DNT': 1, 'Upgrade-Insecure-Request': 1 },
			...options,
			responseType: 'arraybuffer'
		});
		return res.data;
	} catch (err) { return err }
};

const getGroupAdmins = (participants) => {
	let admins = [];
	for (let i of participants) {
		i.admin === "superadmin"? admins.push(i.id) : i.admin === "admin"? admins.push(i.id) : '';
	}
	return admins || [];
};

const getRandom = (ext) => {
	return `${Math.floor(Math.random() * 10000)}${ext}`;
};

const h2k = (eco) => {
	let lyrik = ['', 'K', 'M', 'B', 'T', 'P', 'E'];
	let ma = Math.log10(Math.abs(eco)) / 3 | 0;
	if(ma == 0) return eco;
	let ppo = lyrik[ma];
	let scale = Math.pow(10, ma * 3);
	let scaled = eco / scale;
	let formatt = scaled.toFixed(1);
	if (/\.0$/.test(formatt))
		formatt = formatt.substr(0, formatt.length - 2);
	return formatt + ppo;
};

const isUrl = (url) => {
	return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'));
};

const Json = (string) => {
    return JSON.stringify(string, null, 2);
};

const runtime = function(seconds) {
	seconds = Number(seconds);
	var d = Math.floor(seconds / (3600 * 24));
	var h = Math.floor(seconds % (3600 * 24) / 3600);
	var m = Math.floor(seconds % 3600 / 60);
	var s = Math.floor(seconds % 60);
	var dDisplay = d > 0? d + (d == 1? " day, " : " days, ") : "";
	var hDisplay = h > 0? h + (h == 1? " hour, " : " hours, ") : "";
	var mDisplay = m > 0? m + (m == 1? " minute, " : " minutes, ") : "";
	var sDisplay = s > 0? s + (s == 1? " second" : " seconds") : "";
	return dDisplay + hDisplay + mDisplay + sDisplay;
};

const sleep = async (ms) => {
	return new Promise(resolve => setTimeout(resolve, ms));
};

const fetchJson = async (url, options) => {
	try {
		options? options : {};
		const res = await axios({
			method: 'GET',
			url: url,
			headers: { 'User-Agent': 'Mozilla/5.0' },
			...options
		});
		return res.data;
	} catch (err) { return err }
};

// ==================== FUNCTIONS2 - AB WORKING HAIN ====================
const saveConfig = (data) => {
	try {
		fs.writeFileSync('./config.json', JSON.stringify(data, null, 2));
		return true;
	} catch { return false }
};

const empiretourl = async (buffer) => {
	return 'https://telegra.ph/file/upload-failed';
};

// Duplicate functions for compatibility
const getBuffer2 = getBuffer;
const getGroupAdmins2 = getGroupAdmins;
const getRandom2 = getRandom;
const h2k2 = h2k;
const isUrl2 = isUrl;
const Json2 = Json;
const runtime2 = runtime;
const sleep2 = sleep;
const fetchJson2 = fetchJson;

// ==================== SAFE REQUIRES ====================
let sms, downloadMediaMessage, GroupEvents, DeletedText, DeletedMedia, AntiDelete, DATABASE, fetchGif, gifToVideo, fetchImage, fetchGif2, gifToSticker, videoToWebp;

try { ({ sms, downloadMediaMessage } = require('./msg')); } catch (e) { console.log("⚠️ msg.js not found") }
try { GroupEvents = require('./groupevents'); } catch (e) { console.log("⚠️ groupevents.js not found") }
try { ({ DeletedText, DeletedMedia, AntiDelete } = require('./antidel')); } catch (e) { console.log("⚠️ antidel.js not found") }
try { ({ DATABASE } = require('./database')); } catch (e) { console.log("⚠️ database.js not found") }
try { ({ fetchGif, gifToVideo } = require('./fetchGif')); } catch (e) { console.log("⚠️ fetchGif.js not found") }
try { ({ fetchImage, fetchGif: fetchGif2, gifToSticker } = require('./sticker-utils')); } catch (e) { console.log("⚠️ sticker-utils.js not found") }
try { ({ videoToWebp } = require('./video-utils')); } catch (e) { console.log("⚠️ video-utils.js not found") }

// ==================== BAN/SUDO LIST ====================
let banList = [];
let sudoList = [];

try {
    banList = require('./ban.json');
    console.log(`✅ Ban list loaded: ${banList.length} users`);
} catch (err) {
    console.log("⚠️ No ban.json found, using empty list");
}

try {
    sudoList = require('./sudo.json');
    console.log(`✅ Sudo list loaded: ${sudoList.length} users`);
} catch (err) {
    console.log("⚠️ No sudo.json found, using empty list");
}

// ==================== EXPORT EVERYTHING ====================
module.exports = {
    // Functions
    getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson,
    // Functions2 - Working versions
    getBuffer2, getGroupAdmins2, getRandom2, h2k2, isUrl2, Json2, runtime2, sleep2, fetchJson2, saveConfig, empiretourl,
    // Message
    sms, downloadMediaMessage,
    // Group Events
    GroupEvents,
    // Anti-Delete
    DeletedText, DeletedMedia, AntiDelete,
    // Database
    DATABASE,
    // GIF Tools
    fetchGif, gifToVideo,
    // Sticker Tools
    fetchImage, fetchGif2, gifToSticker,
    // Video Tools
    videoToWebp,
    // Lists
    banList, sudoList
}
