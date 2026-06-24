import { createRoot as e } from "react-dom/client";
import { debounce as t, throttle as n, waitForTime as r } from "@water102/fx-common";
import { bootstrap as i, getWindowDimensions as a, listenEvent as o } from "@water102/fx-web";
import * as s from "react";
import c, { Component as l, createElement as u, lazy as d, memo as f, useCallback as p, useContext as m, useEffect as h, useLayoutEffect as g, useMemo as _, useRef as v, useState as y } from "react";
import { clsx as b } from "clsx";
import { twMerge as x } from "tailwind-merge";
import { cva as S } from "class-variance-authority";
import C from "react-hot-toast";
import w from "i18next";
import { initReactI18next as T } from "react-i18next";
import E from "i18next-http-backend";
import { Provider as D } from "react-redux";
import { BrowserRouter as O, HashRouter as k, Route as A } from "react-router";
import { QueryClientProvider as j } from "@tanstack/react-query";
//#region \0rolldown/runtime.js
var M = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), N = /* @__PURE__ */ M(((e) => {
	var t = Symbol.for("react.transitional.element");
	function n(e, n, r) {
		var i = null;
		if (r !== void 0 && (i = "" + r), n.key !== void 0 && (i = "" + n.key), "key" in n) for (var a in r = {}, n) a !== "key" && (r[a] = n[a]);
		else r = n;
		return n = r.ref, {
			$$typeof: t,
			type: e,
			key: i,
			ref: n === void 0 ? null : n,
			props: r
		};
	}
	e.jsx = n, e.jsxs = n;
})), P = (/* @__PURE__ */ M(((e, t) => {
	t.exports = N();
})))(), F = async (t, n) => {
	try {
		let a = document.getElementById(t);
		if (!a) {
			console.error(`Element with id "${t}" not found`);
			return;
		}
		let [o] = await Promise.all([
			n,
			i(window, document),
			r(1500)
		]);
		e(a).render(/* @__PURE__ */ (0, P.jsx)(o, {}));
	} catch (e) {
		console.error("Failed to bootstrap application:", e);
	}
}, I = {
	loadingText: "_loadingText_n8iyn_1",
	loading: "_loading_n8iyn_1"
};
//#endregion
//#region src/utils/cn.ts
function L(...e) {
	return x(b(e));
}
//#endregion
//#region src/components/loading/loading.tsx
var R = f(({ className: e = "", message: t = "loading" }) => /* @__PURE__ */ (0, P.jsx)("div", {
	className: L("text-center", e),
	children: /* @__PURE__ */ (0, P.jsx)("span", {
		className: I.loadingText,
		children: t
	})
}));
R.displayName = "Loading";
//#endregion
//#region src/components/sprite-animator.tsx
var z = "SpriteAnimator", ee = c.memo(({ id: e, source: t, animations: n, play: r, className: i = "", trigger: a = "manual", flipX: o = !1, flipY: s = !1, scale: c = 1, debug: l = !1, onEnd: u, onError: d }) => {
	let f = v(null), m = v(null), [g, b] = y(r), [x, S] = y(!1), C = _(() => t && t.src && t.width > 0 && t.height > 0 && t.totalFrames > 0 && t.cols > 0 && t.rows > 0, [t]);
	h(() => {
		if (!C) return;
		let e = new Image(), n = () => S(!0), r = () => {
			let e = /* @__PURE__ */ Error(`Failed to load sprite image: ${t.src}`);
			d ? d(e) : l && console.error(e.message), S(!1);
		};
		return e.addEventListener("load", n), e.addEventListener("error", r), e.src = t.src, () => {
			e.removeEventListener("load", n), e.removeEventListener("error", r);
		};
	}, [
		t.src,
		C,
		d,
		l
	]), h(() => {
		b(r);
	}, [r]);
	let w = p((e) => {
		if (e.frames?.length) return e.frames;
		if (e.range) {
			let [t, n] = e.range, r = t <= n ? 1 : -1, i = [];
			for (let e = t; r > 0 ? e <= n : e >= n; e += r) i.push(e);
			return i;
		}
		return Array.from({ length: t.totalFrames }, (e, t) => t + 1);
	}, [t.totalFrames]), T = p((e) => {
		let n = e - 1, r = n % t.cols, i = Math.floor(n / t.cols);
		return {
			x: -(r * t.width),
			y: -(i * t.height),
			col: r,
			row: i
		};
	}, [
		t.cols,
		t.width,
		t.height
	]), E = _(() => {
		if (!C || !n?.length || !x) return "";
		let r = "";
		return n.forEach((n) => {
			if (!n.name || n.duration <= 0) return;
			let i = w(n);
			if (i.length <= 1) return;
			let a = i.map((e) => T(e)), o = !0, s = a[1].y - a[0].y, c = a[1].x - a[0].x;
			if (s !== 0 || c === 0) o = !1;
			else for (let e = 1; e < a.length; e++) {
				let t = a[e].x - a[e - 1].x, n = a[e].y - a[e - 1].y;
				if (t !== c || n !== 0) {
					o = !1;
					break;
				}
			}
			if (o) {
				let o = i.length, s = a[0].x, l = a[0].y, u = s + c * o;
				r += `
          @keyframes ${e}-${n.name} {
            from { background-position: ${s}px ${l}px; }
            to   { background-position: ${u}px ${l}px; }
          }
  
          .sprite-${e}-${n.name} {
            width: ${t.width}px;
            height: ${t.height}px;
            background-image: url(${t.src});
            background-repeat: no-repeat;
  
            animation: ${e}-${n.name} ${n.duration}ms ${n.timingFunction ?? `steps(${o})`} ${n.delay ?? 0}ms ${n.iterationCount ?? 1} ${n.direction ?? "normal"} forwards;
          }
        `;
			} else {
				let o = i.length, s = 100 / o, c = "";
				for (let e = 0; e < o; e++) {
					let t = e * s, n = e === o - 1 ? 100 : (e + 1) * s - .001, { x: r, y: i } = a[e];
					c += `
            ${t}% { background-position: ${r}px ${i}px; }
            ${n}%   { background-position: ${r}px ${i}px; }
          `;
				}
				r += `
          @keyframes ${e}-${n.name} {
            ${c}
          }
  
          .sprite-${e}-${n.name} {
            width: ${t.width}px;
            height: ${t.height}px;
            background-image: url(${t.src});
            background-repeat: no-repeat;
  
            animation: ${e}-${n.name} ${n.duration}ms linear ${n.delay ?? 0}ms ${n.iterationCount ?? 1} ${n.direction ?? "normal"} forwards;
          }
        `;
			}
		}), r;
	}, [
		n,
		t,
		e,
		w,
		T,
		C,
		x
	]);
	h(() => {
		f.current && E && (f.current.innerHTML = E);
	}, [E]);
	let D = p(() => {
		if (g) {
			let e = n.find((e) => e.name === g);
			u?.(g), e?.next && b(e.next);
		}
	}, [
		g,
		n,
		u
	]);
	h(() => {
		let e = m.current;
		if (e) return e.addEventListener("animationend", D), () => e.removeEventListener("animationend", D);
	}, [D]);
	let O = p(() => {
		if (a === "click" && r && (b(r), m.current)) {
			m.current.classList.add("playing");
			let e = () => {
				m.current?.classList.remove("playing"), m.current?.removeEventListener("animationend", e);
			};
			m.current.addEventListener("animationend", e);
		}
	}, [a, r]), k = _(() => `${g ? `sprite-${e}-${g}` : ""} ${a === "hover" ? "hover-play" : a === "click" ? "click-play" : ""} ${i}`.trim(), [
		g,
		e,
		a,
		i
	]), A = _(() => `scale(${c}) scaleX(${o ? -1 : 1}) scaleY(${s ? -1 : 1})`, [
		c,
		o,
		s
	]);
	return C ? (!x && l && console.log(`${z}: Image not loaded yet`, t.src), /* @__PURE__ */ (0, P.jsxs)("div", {
		ref: m,
		className: k,
		style: {
			transform: A,
			outline: l ? "1px dashed red" : void 0,
			position: "relative"
		},
		onClick: O,
		children: [
			l && /* @__PURE__ */ (0, P.jsx)("span", {
				style: {
					position: "absolute",
					bottom: 0,
					left: 0,
					fontSize: 10,
					background: "rgba(0,0,0,0.5)",
					color: "white",
					padding: "2px 4px"
				},
				children: g || "none"
			}),
			/* @__PURE__ */ (0, P.jsx)("style", { ref: f }),
			/* @__PURE__ */ (0, P.jsx)("style", { children: "\n        .hover-play:hover { animation-play-state: running !important; }\n        .hover-play { animation-play-state: paused !important; }\n\n        .click-play { animation-play-state: paused !important; }\n        .click-play.playing { animation-play-state: running !important; }\n      " })
		]
	})) : (l && console.warn(`${z}: Invalid source configuration`, t), null);
});
ee.displayName = z;
//#endregion
//#region src/components/demo-sprite-animator.tsx
var B = ({ title: e, children: t }) => {
	let [n, r] = y(!1);
	return /* @__PURE__ */ (0, P.jsxs)("div", {
		className: "border rounded",
		children: [/* @__PURE__ */ (0, P.jsxs)("div", {
			onClick: () => r(!n),
			className: "w-full flex justify-between items-center px-4 py-2 bg-gray-100 font-medium cursor-pointer",
			children: [/* @__PURE__ */ (0, P.jsx)("span", { children: e }), /* @__PURE__ */ (0, P.jsx)("span", { children: n ? "−" : "+" })]
		}), n && /* @__PURE__ */ (0, P.jsx)("div", {
			className: "p-4 space-y-4",
			children: t
		})]
	});
}, V = (e) => {
	let { id: t = "demo", source: n, animations: r, play: i, scale: a = 1, flipX: o = !1, flipY: s = !1, trigger: c = "manual", debug: l = !1, ...u } = e, [d, f] = y(n?.src ?? ""), [p, m] = y(n?.width ?? 64), [g, _] = y(n?.height ?? 64), [v, b] = y(n?.totalFrames ?? 1), [x, S] = y(n?.cols ?? 1), [C, w] = y(n?.rows ?? 1), [T, E] = y(() => r ? [...r] : [{
		name: "demo",
		frames: "",
		range: "1-1",
		duration: 1e3,
		iterationCount: 1,
		timingFunction: "steps(1)",
		direction: "normal"
	}]), [D, O] = y(() => i ?? T[0]?.name ?? ""), [k, A] = y(a), [j, M] = y(o), [N, F] = y(s), [I, L] = y(c), [R, z] = y(l);
	h(() => {
		n && (f(n.src), m(n.width), _(n.height), b(n.totalFrames), S(n.cols), w(n.rows));
	}, [n]), h(() => {
		r && E(r);
	}, [r]), h(() => O(i ?? ""), [i]), h(() => A(a), [a]), h(() => M(o), [o]), h(() => F(s), [s]), h(() => L(c), [c]), h(() => z(l), [l]);
	let V = {
		src: d,
		width: p,
		height: g,
		totalFrames: v,
		cols: x,
		rows: C
	}, H = T.map((e) => ({
		name: e.name,
		frames: typeof e.frames == "string" ? e.frames.split(",").filter(Boolean).map((e) => Number(e.trim())) : e.frames,
		range: typeof e.range == "string" && e.range.includes("-") ? [Number(e.range.split("-")[0]), Number(e.range.split("-")[1])] : e.range,
		duration: Number(e.duration),
		iterationCount: e.iterationCount,
		timingFunction: e.timingFunction,
		direction: e.direction,
		next: e.next
	})), U = (e, t) => E((n) => n.map((n, r) => e === r ? {
		...n,
		...t
	} : n)), W = (e) => E((t) => t.filter((t, n) => n !== e)), te = () => E((e) => [...e, {
		name: `anim${e.length + 1}`,
		frames: "",
		range: "",
		duration: 1e3,
		iterationCount: 1,
		timingFunction: "steps(1)",
		direction: "normal"
	}]), [ne, G] = y(""), K = () => {
		G(JSON.stringify({
			source: V,
			animations: T,
			props: {
				play: D,
				scale: k,
				flipX: j,
				flipY: N,
				trigger: I,
				debug: R
			}
		}, null, 2));
	}, q = () => {
		try {
			let e = JSON.parse(ne);
			f(e.source.src), m(e.source.width), _(e.source.height), b(e.source.totalFrames), S(e.source.cols), w(e.source.rows), E(e.animations), O(e.props.play), A(e.props.scale), M(e.props.flipX), F(e.props.flipY), L(e.props.trigger), z(e.props.debug);
		} catch {
			alert("Invalid JSON config");
		}
	}, J = (e) => {
		O(""), setTimeout(() => O(e), 0);
	};
	return /* @__PURE__ */ (0, P.jsxs)("div", {
		className: "flex flex-col items-center p-6 space-y-6",
		children: [/* @__PURE__ */ (0, P.jsx)("div", {
			className: "border rounded-lg p-4 bg-gray-50 flex justify-center items-center min-h-[150px]",
			children: d ? /* @__PURE__ */ (0, P.jsx)(ee, {
				id: t,
				source: V,
				animations: H,
				play: D,
				scale: k,
				flipX: j,
				flipY: N,
				trigger: I,
				debug: R,
				...u
			}) : /* @__PURE__ */ (0, P.jsx)("p", {
				className: "text-gray-400 text-sm",
				children: "⚠️ Provide SourceConfig to preview the animation"
			})
		}), /* @__PURE__ */ (0, P.jsxs)("div", {
			className: "w-full max-w-4xl space-y-4",
			children: [
				/* @__PURE__ */ (0, P.jsx)(B, {
					title: "Source Config",
					children: /* @__PURE__ */ (0, P.jsxs)("div", {
						className: "grid grid-cols-2 gap-4",
						children: [
							/* @__PURE__ */ (0, P.jsx)("input", {
								placeholder: "src (URL)",
								value: d,
								onChange: (e) => f(e.target.value),
								className: "border rounded px-2 py-1 col-span-2"
							}),
							/* @__PURE__ */ (0, P.jsx)("input", {
								placeholder: "width",
								type: "number",
								value: p,
								onChange: (e) => m(Number(e.target.value)),
								className: "border rounded px-2 py-1"
							}),
							/* @__PURE__ */ (0, P.jsx)("input", {
								placeholder: "height",
								type: "number",
								value: g,
								onChange: (e) => _(Number(e.target.value)),
								className: "border rounded px-2 py-1"
							}),
							/* @__PURE__ */ (0, P.jsx)("input", {
								placeholder: "totalFrames",
								type: "number",
								value: v,
								onChange: (e) => b(Number(e.target.value)),
								className: "border rounded px-2 py-1"
							}),
							/* @__PURE__ */ (0, P.jsx)("input", {
								placeholder: "cols",
								type: "number",
								value: x,
								onChange: (e) => S(Number(e.target.value)),
								className: "border rounded px-2 py-1"
							}),
							/* @__PURE__ */ (0, P.jsx)("input", {
								placeholder: "rows",
								type: "number",
								value: C,
								onChange: (e) => w(Number(e.target.value)),
								className: "border rounded px-2 py-1"
							})
						]
					})
				}),
				/* @__PURE__ */ (0, P.jsxs)(B, {
					title: "Animations",
					children: [/* @__PURE__ */ (0, P.jsx)("button", {
						onClick: te,
						className: "mb-3 px-2 py-1 bg-green-500 text-white rounded",
						children: "+ Add Animation"
					}), T.map((e, t) => /* @__PURE__ */ (0, P.jsxs)("div", {
						className: "border p-3 rounded mb-3 bg-gray-50 space-y-2",
						children: [/* @__PURE__ */ (0, P.jsxs)("div", {
							className: "flex justify-between items-center",
							children: [/* @__PURE__ */ (0, P.jsxs)("span", {
								className: "font-semibold",
								children: ["#", t + 1]
							}), /* @__PURE__ */ (0, P.jsx)("button", {
								onClick: () => W(t),
								className: "text-red-500 text-sm",
								children: "Remove"
							})]
						}), /* @__PURE__ */ (0, P.jsxs)("div", {
							className: "grid grid-cols-2 gap-2",
							children: [
								/* @__PURE__ */ (0, P.jsx)("input", {
									placeholder: "Name",
									value: e.name,
									onChange: (e) => U(t, { name: e.target.value }),
									className: "border rounded px-2 py-1"
								}),
								/* @__PURE__ */ (0, P.jsx)("input", {
									placeholder: "Frames (1,2,3)",
									value: e.frames,
									onChange: (e) => U(t, { frames: e.target.value }),
									className: "border rounded px-2 py-1"
								}),
								/* @__PURE__ */ (0, P.jsx)("input", {
									placeholder: "Range (1-4)",
									value: e.range,
									onChange: (e) => U(t, { range: e.target.value }),
									className: "border rounded px-2 py-1"
								}),
								/* @__PURE__ */ (0, P.jsx)("input", {
									placeholder: "Duration (ms)",
									type: "number",
									value: e.duration,
									onChange: (e) => U(t, { duration: Number(e.target.value) }),
									className: "border rounded px-2 py-1"
								}),
								/* @__PURE__ */ (0, P.jsx)("input", {
									placeholder: "IterationCount",
									value: e.iterationCount.toString(),
									onChange: (e) => U(t, { iterationCount: e.target.value === "infinite" ? "infinite" : Number(e.target.value) }),
									className: "border rounded px-2 py-1"
								}),
								/* @__PURE__ */ (0, P.jsx)("input", {
									placeholder: "TimingFunction",
									value: e.timingFunction ?? "",
									onChange: (e) => U(t, { timingFunction: e.target.value }),
									className: "border rounded px-2 py-1"
								}),
								/* @__PURE__ */ (0, P.jsxs)("select", {
									value: e.direction,
									onChange: (e) => U(t, { direction: e.target.value }),
									className: "border rounded px-2 py-1",
									children: [
										/* @__PURE__ */ (0, P.jsx)("option", {
											value: "normal",
											children: "normal"
										}),
										/* @__PURE__ */ (0, P.jsx)("option", {
											value: "reverse",
											children: "reverse"
										}),
										/* @__PURE__ */ (0, P.jsx)("option", {
											value: "alternate",
											children: "alternate"
										}),
										/* @__PURE__ */ (0, P.jsx)("option", {
											value: "alternate-reverse",
											children: "alternate-reverse"
										})
									]
								}),
								/* @__PURE__ */ (0, P.jsx)("input", {
									placeholder: "Next",
									value: e.next ?? "",
									onChange: (e) => U(t, { next: e.target.value }),
									className: "border rounded px-2 py-1"
								})
							]
						})]
					}, t))]
				}),
				/* @__PURE__ */ (0, P.jsx)(B, {
					title: "Other Props",
					children: /* @__PURE__ */ (0, P.jsxs)("div", {
						className: "grid grid-cols-2 gap-4",
						children: [
							/* @__PURE__ */ (0, P.jsxs)("div", {
								className: "flex flex-col",
								children: [/* @__PURE__ */ (0, P.jsx)("label", { children: "Play animation" }), /* @__PURE__ */ (0, P.jsxs)("div", {
									className: "flex space-x-2",
									children: [/* @__PURE__ */ (0, P.jsx)("select", {
										value: D,
										onChange: (e) => O(e.target.value),
										className: "border rounded px-2 py-1 flex-1",
										children: T.map((e, t) => /* @__PURE__ */ (0, P.jsx)("option", {
											value: e.name,
											children: e.name
										}, t))
									}), /* @__PURE__ */ (0, P.jsx)("button", {
										onClick: () => J(D),
										className: "px-3 py-1 bg-blue-500 text-white rounded",
										children: "▶ Play"
									})]
								})]
							}),
							/* @__PURE__ */ (0, P.jsxs)("div", {
								className: "flex flex-col",
								children: [/* @__PURE__ */ (0, P.jsxs)("label", { children: [
									"Scale: ",
									k.toFixed(1),
									"x"
								] }), /* @__PURE__ */ (0, P.jsx)("input", {
									type: "range",
									min: "0.5",
									max: "3",
									step: "0.1",
									value: k,
									onChange: (e) => A(Number(e.target.value))
								})]
							}),
							/* @__PURE__ */ (0, P.jsxs)("label", {
								className: "flex items-center space-x-2",
								children: [/* @__PURE__ */ (0, P.jsx)("input", {
									type: "checkbox",
									checked: j,
									onChange: (e) => M(e.target.checked)
								}), /* @__PURE__ */ (0, P.jsx)("span", { children: "Flip X" })]
							}),
							/* @__PURE__ */ (0, P.jsxs)("label", {
								className: "flex items-center space-x-2",
								children: [/* @__PURE__ */ (0, P.jsx)("input", {
									type: "checkbox",
									checked: N,
									onChange: (e) => F(e.target.checked)
								}), /* @__PURE__ */ (0, P.jsx)("span", { children: "Flip Y" })]
							}),
							/* @__PURE__ */ (0, P.jsxs)("select", {
								value: I,
								onChange: (e) => L(e.target.value),
								className: "border rounded px-2 py-1",
								children: [
									/* @__PURE__ */ (0, P.jsx)("option", {
										value: "manual",
										children: "manual"
									}),
									/* @__PURE__ */ (0, P.jsx)("option", {
										value: "hover",
										children: "hover"
									}),
									/* @__PURE__ */ (0, P.jsx)("option", {
										value: "click",
										children: "click"
									})
								]
							}),
							/* @__PURE__ */ (0, P.jsxs)("label", {
								className: "flex items-center space-x-2",
								children: [/* @__PURE__ */ (0, P.jsx)("input", {
									type: "checkbox",
									checked: R,
									onChange: (e) => z(e.target.checked)
								}), /* @__PURE__ */ (0, P.jsx)("span", { children: "Debug" })]
							})
						]
					})
				}),
				/* @__PURE__ */ (0, P.jsxs)(B, {
					title: "Export / Import Config",
					children: [/* @__PURE__ */ (0, P.jsxs)("div", {
						className: "flex space-x-2 mb-2",
						children: [/* @__PURE__ */ (0, P.jsx)("button", {
							onClick: K,
							className: "px-3 py-1 bg-blue-500 text-white rounded",
							children: "Export"
						}), /* @__PURE__ */ (0, P.jsx)("button", {
							onClick: q,
							className: "px-3 py-1 bg-purple-500 text-white rounded",
							children: "Import"
						})]
					}), /* @__PURE__ */ (0, P.jsx)("textarea", {
						value: ne,
						onChange: (e) => G(e.target.value),
						rows: 8,
						className: "w-full border rounded p-2 font-mono text-sm",
						placeholder: "JSON config here..."
					})]
				})
			]
		})]
	});
}, H = S("inline-flex items-center justify-center gap-x-2 font-medium rounded-lg transition-all cursor-pointer disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed focus:outline-none", {
	variants: {
		variant: {
			primary: "border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:bg-blue-700",
			secondary: "border border-gray-800 bg-transparent text-gray-800 hover:border-gray-500 hover:text-gray-500 focus:border-gray-500 focus:text-gray-500",
			soft: "border border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200 focus:bg-blue-200 dark:bg-blue-800/30 dark:text-blue-500 dark:hover:bg-blue-800/20 dark:focus:bg-blue-800/20",
			outline: "border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 focus:bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700",
			"outline-primary": "border-2 border-blue-600 bg-transparent text-blue-600 hover:bg-blue-600 hover:text-white focus:bg-blue-600 focus:text-white dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-500 dark:focus:bg-blue-500",
			"outline-secondary": "border-2 border-gray-800 bg-transparent text-gray-800 hover:border-gray-500 hover:text-gray-500 focus:border-gray-500 focus:text-gray-500",
			"outline-destructive": "border-2 border-red-500 bg-transparent text-red-500 hover:bg-red-500 hover:text-white focus:bg-red-500 focus:text-white dark:border-red-600 dark:text-red-500 dark:hover:bg-red-600 dark:focus:bg-red-600",
			"outline-success": "border-2 border-green-500 bg-transparent text-green-600 hover:bg-green-500 hover:text-white focus:bg-green-500 focus:text-white dark:border-green-600 dark:text-green-500 dark:hover:bg-green-600 dark:focus:bg-green-600",
			"outline-warning": "border-2 border-orange-500 bg-transparent text-orange-600 hover:bg-orange-500 hover:text-white focus:bg-orange-500 focus:text-white dark:border-orange-600 dark:text-orange-500 dark:hover:bg-orange-600 dark:focus:bg-orange-600",
			ghost: "border border-transparent text-blue-600 hover:bg-blue-100 focus:bg-blue-100 dark:text-blue-500 dark:hover:bg-blue-800/30 dark:focus:bg-blue-800/30",
			link: "border border-transparent text-blue-600 hover:text-blue-800 focus:text-blue-800 underline-offset-4 hover:underline dark:text-blue-500 dark:hover:text-blue-400",
			destructive: "border border-transparent bg-red-500 text-white hover:bg-red-600 focus:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:bg-red-700"
		},
		size: {
			sm: "py-2 px-3 text-sm",
			default: "py-3 px-4 text-sm",
			lg: "py-3 px-6 text-base sm:text-lg",
			icon: "p-2"
		}
	},
	defaultVariants: {
		variant: "primary",
		size: "default"
	}
}), U = s.forwardRef(({ className: e, variant: t, size: n, ...r }, i) => /* @__PURE__ */ (0, P.jsx)("button", {
	ref: i,
	type: "button",
	className: L(H({
		variant: t,
		size: n
	}), e),
	...r
}));
U.displayName = "Button";
//#endregion
//#region src/components/confirm-dialog.tsx
var W = ({ open: e, title: t = "Confirm", content: n = "Are you sure you want to perform this action?", confirmText: r = "Confirm", cancelText: i = "Cancel", variant: a = "default", icon: o, onClose: s, onConfirm: c }) => {
	if (!e) return null;
	let l = () => {
		c(), s();
	}, u = () => {
		s();
	};
	h(() => {
		if (!e) return;
		let t = (e) => {
			e.key === "Escape" && s();
		};
		return document.addEventListener("keydown", t), () => {
			document.removeEventListener("keydown", t);
		};
	}, [e, s]);
	let d = o ?? (a === "destructive" ? /* @__PURE__ */ (0, P.jsx)("svg", {
		className: "size-6 text-red-500",
		fill: "none",
		stroke: "currentColor",
		viewBox: "0 0 24 24",
		xmlns: "http://www.w3.org/2000/svg",
		children: /* @__PURE__ */ (0, P.jsx)("path", {
			strokeLinecap: "round",
			strokeLinejoin: "round",
			strokeWidth: 2,
			d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
		})
	}) : null);
	return /* @__PURE__ */ (0, P.jsxs)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center",
		onClick: u,
		children: [/* @__PURE__ */ (0, P.jsx)("div", { className: "absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" }), /* @__PURE__ */ (0, P.jsxs)("div", {
			className: "relative bg-white dark:bg-neutral-800 rounded-xl shadow-2xl max-w-md w-full mx-4 transform transition-all",
			onClick: (e) => e.stopPropagation(),
			children: [/* @__PURE__ */ (0, P.jsx)("button", {
				type: "button",
				onClick: u,
				className: "absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors",
				"aria-label": "Close",
				children: /* @__PURE__ */ (0, P.jsx)("svg", {
					className: "size-5",
					fill: "none",
					stroke: "currentColor",
					viewBox: "0 0 24 24",
					xmlns: "http://www.w3.org/2000/svg",
					children: /* @__PURE__ */ (0, P.jsx)("path", {
						strokeLinecap: "round",
						strokeLinejoin: "round",
						strokeWidth: 2,
						d: "M6 18L18 6M6 6l12 12"
					})
				})
			}), /* @__PURE__ */ (0, P.jsxs)("div", {
				className: "p-6",
				children: [/* @__PURE__ */ (0, P.jsxs)("div", {
					className: "flex items-start gap-4 mb-4",
					children: [d && /* @__PURE__ */ (0, P.jsx)("div", {
						className: "flex-shrink-0 mt-0.5",
						children: d
					}), /* @__PURE__ */ (0, P.jsxs)("div", {
						className: "flex-1",
						children: [/* @__PURE__ */ (0, P.jsx)("h3", {
							className: "text-lg font-semibold text-gray-900 dark:text-white mb-2",
							children: t
						}), /* @__PURE__ */ (0, P.jsx)("div", {
							className: "text-sm text-gray-600 dark:text-neutral-400",
							children: typeof n == "string" ? /* @__PURE__ */ (0, P.jsx)("p", { children: n }) : n
						})]
					})]
				}), /* @__PURE__ */ (0, P.jsxs)("div", {
					className: "flex items-center justify-end gap-3 mt-6",
					children: [/* @__PURE__ */ (0, P.jsx)(U, {
						type: "button",
						variant: "outline",
						size: "default",
						onClick: u,
						children: i
					}), /* @__PURE__ */ (0, P.jsx)(U, {
						type: "button",
						variant: a === "destructive" ? "destructive" : "primary",
						size: "default",
						onClick: l,
						children: r
					})]
				})]
			})]
		})]
	});
}, te = ({ value: e, children: t, className: n = "flex flex-row items-center gap-3", onCopy: r }) => {
	let i = p(async (e) => {
		try {
			await navigator.clipboard.writeText(e), r ? r(e) : (C.dismiss(), C.success("Copied"));
		} catch (e) {
			let t = e instanceof Error ? e.message : "Unable to copy to clipboard";
			C.error(t), r && r("");
		}
	}, [r]);
	return /* @__PURE__ */ (0, P.jsxs)("button", {
		type: "button",
		className: n,
		onClick: () => i(e),
		children: [/* @__PURE__ */ (0, P.jsx)("svg", {
			className: "size-4",
			fill: "none",
			stroke: "currentColor",
			viewBox: "0 0 24 24",
			xmlns: "http://www.w3.org/2000/svg",
			"aria-hidden": "true",
			children: /* @__PURE__ */ (0, P.jsx)("path", {
				strokeLinecap: "round",
				strokeLinejoin: "round",
				strokeWidth: 2,
				d: "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
			})
		}), t]
	});
}, ne = class extends l {
	constructor(e) {
		super(e), this.state = {
			hasError: !1,
			error: null,
			errorInfo: null
		};
	}
	static getDerivedStateFromError(e) {
		return {
			hasError: !0,
			error: e
		};
	}
	componentDidCatch(e, t) {
		this.setState({
			error: e,
			errorInfo: t
		}), this.props.onError ? this.props.onError(e, t) : console.error("ErrorBoundary caught an error:", e, t);
	}
	render() {
		return this.state.hasError && this.state.error ? this.props.fallback ? typeof this.props.fallback == "function" ? this.props.fallback(this.state.error, this.state.errorInfo) : this.props.fallback : /* @__PURE__ */ (0, P.jsxs)("div", {
			className: "p-4 border border-red-500 rounded bg-red-50 dark:bg-red-900/20",
			children: [
				/* @__PURE__ */ (0, P.jsx)("h2", {
					className: "text-lg font-semibold text-red-800 dark:text-red-200 mb-2",
					children: "Something went wrong"
				}),
				/* @__PURE__ */ (0, P.jsx)("p", {
					className: "text-sm text-red-600 dark:text-red-300",
					children: this.state.error.message
				}),
				!1
			]
		}) : this.props.children;
	}
}, G = (() => {
	let e = /* @__PURE__ */ new Set(), t = (t) => e.delete(t);
	return {
		subscribe: (n) => (e.add(n), () => t(n)),
		unsubscribe: t,
		emit: (...t) => e.forEach((e) => e(...t))
	};
})(), K = c.createContext(void 0), q = ({ children: e }) => {
	let t = v(G);
	return /* @__PURE__ */ (0, P.jsx)(K.Provider, {
		value: t.current,
		children: e
	});
}, J = () => {
	let e = m(K);
	if (e === void 0) throw Error("useEmitterContext must be used within a EmitterContext");
	return e;
}, re = () => {
	let { emit: e } = J();
	return e;
}, ie = (e, t) => {
	let { subscribe: n } = J();
	h(() => n(e), [
		n,
		e,
		...t ?? []
	]);
}, ae = (e) => (t) => /* @__PURE__ */ (0, P.jsx)(q, { children: /* @__PURE__ */ (0, P.jsx)(e, { ...t }) }), oe = () => {
	h(() => {
		let e = ["contextmenu", (e) => {
			e.preventDefault(), e.stopPropagation();
		}];
		return document.addEventListener(...e), () => document.removeEventListener(...e);
	}, []);
}, se = () => {
	h(() => {
		let e = (e) => {
			if (e.code === "F12" || e.ctrlKey && e.shiftKey && e.key === "I") return e.preventDefault(), e.stopPropagation(), !1;
		};
		return window.addEventListener("keydown", e), () => {
			window.removeEventListener("keydown", e);
		};
	}, []);
}, ce = (e) => {
	let [t, n] = y(e.startNumber), [r, i] = y(e);
	return g(() => {
		let { startNumber: e, diffNumber: t = 1e3, waitingTime: i = 1e3, endNumber: a = 0 } = r;
		n(e);
		let o = setInterval(() => {
			n((e) => {
				let n = e - t;
				return n <= a && clearInterval(o), n;
			});
		}, i);
		return () => clearInterval(o);
	}, [r]), [t, i];
};
//#endregion
//#region src/hooks/use-debounce.tsx
function le(e, n, r) {
	return _(() => t(e, n), r);
}
//#endregion
//#region src/hooks/use-event.tsx
var ue = (e, t, n, r) => {
	let i = v(null);
	return g(() => {
		let r = (e instanceof Window, o(e, t, n));
		return i.current = r, r;
	}, [
		e,
		t,
		n,
		...r ?? []
	]), i.current;
}, de = (e, t, ...n) => {
	h(() => {
		let n = setInterval(e, t);
		return () => clearInterval(n);
	}, [
		e,
		t,
		...n
	]);
};
//#endregion
//#region ../../node_modules/react-use/esm/misc/util.js
function Y(e) {
	var t = [...arguments].slice(1);
	e && e.addEventListener && e.addEventListener.apply(e, t);
}
function X(e) {
	var t = [...arguments].slice(1);
	e && e.removeEventListener && e.removeEventListener.apply(e, t);
}
var fe = typeof window < "u", pe = function(e) {
	var t = window.history, n = t[e];
	t[e] = function(t) {
		var r = n.apply(this, arguments), i = new Event(e.toLowerCase());
		return i.state = t, window.dispatchEvent(i), r;
	};
};
fe && (pe("pushState"), pe("replaceState"));
var me = function() {
	return {
		trigger: "load",
		length: 1
	};
}, Z = function(e) {
	var t = window.history, n = t.state, r = t.length, i = window.location;
	return {
		trigger: e,
		state: n,
		length: r,
		hash: i.hash,
		host: i.host,
		hostname: i.hostname,
		href: i.href,
		origin: i.origin,
		pathname: i.pathname,
		port: i.port,
		protocol: i.protocol,
		search: i.search
	};
}, he = fe && typeof Event == "function" ? function() {
	var e = y(Z("load")), t = e[0], n = e[1];
	return h(function() {
		var e = function() {
			return n(Z("popstate"));
		}, t = function() {
			return n(Z("pushstate"));
		}, r = function() {
			return n(Z("replacestate"));
		};
		return Y(window, "popstate", e), Y(window, "pushstate", t), Y(window, "replacestate", r), function() {
			X(window, "popstate", e), X(window, "pushstate", t), X(window, "replacestate", r);
		};
	}, []), t;
} : me;
//#endregion
//#region src/hooks/use-query.ts
function ge() {
	let { search: e } = he();
	return c.useMemo(() => new URLSearchParams(e), [e]);
}
//#endregion
//#region src/hooks/use-scroll-to-top.tsx
var _e = () => {
	g(() => {
		setTimeout(() => {
			window.scrollTo({
				top: 0,
				behavior: "smooth"
			});
		}, 0);
	}, []);
}, ve = (e, t) => {
	let [n, r] = y(e), i = v(null), a = v(e);
	return [
		n,
		p((e) => {
			i.current && clearTimeout(i.current), a.current = n, r(e), i.current = setTimeout(() => {
				r(a.current), i.current = null;
			}, t);
		}, [n, t]),
		r
	];
};
//#endregion
//#region src/hooks/use-throttle.tsx
function ye(e, t, r) {
	return _(() => n(e, t), r);
}
//#endregion
//#region src/hooks/use-window-dimensions.tsx
var be = () => {
	let [e, t] = y({
		width: 0,
		height: 0
	});
	return ue(window, "resize", () => {
		t(a());
	}, []), e;
}, xe = () => {
	let [e, t] = y({ open: !1 }), n = p((e = {}) => new Promise((n) => {
		t({
			...e,
			open: !0,
			resolve: n
		});
	}), []), r = p(() => {
		t((e) => (e.resolve && e.resolve(!1), { open: !1 }));
	}, []), i = p(() => {
		t((e) => (e.resolve && e.resolve(!0), { open: !1 }));
	}, []);
	return {
		confirm: n,
		DialogComponent: /* @__PURE__ */ (0, P.jsx)(W, {
			open: e.open,
			title: e.title,
			content: e.content,
			confirmText: e.confirmText,
			cancelText: e.cancelText,
			variant: e.variant,
			icon: e.icon,
			onClose: r,
			onConfirm: i
		})
	};
}, Se = async (e = {}) => {
	let { loadPath: t = "/locales/{{lng}}.json", defaultLanguage: n = "vi", fallbackLanguage: r = "vi", storageKey: i = "language" } = e;
	await w.use(E).use(T).init({
		lng: localStorage.getItem(i) || n,
		fallbackLng: r,
		backend: { loadPath: t },
		interpolation: { escapeValue: !1 },
		react: { useSuspense: !1 }
	});
}, Ce = (e) => (t) => (n) => /* @__PURE__ */ (0, P.jsx)(D, {
	store: e,
	children: /* @__PURE__ */ (0, P.jsx)(t, { ...n })
}), we = (e, t = "default") => u(d(() => e().then((e) => {
	if (!e || typeof e != "object") throw Error("Failed to load module: module is not an object");
	let n = e[t];
	if (!n) throw Error(`Component "${t}" not found in module. Available keys: ${Object.keys(e).join(", ")}`);
	return { default: n };
}).catch((e) => {
	throw Error(`Failed to lazy load component "${t}": ${e instanceof Error ? e.message : String(e)}`);
}))), Te = (e, t, n) => e.filter((e) => !e.canAccess || e.canAccess(!!t, n)).map(({ path: e, element: r, children: i }, a) => /* @__PURE__ */ (0, P.jsx)(A, {
	path: e,
	element: r,
	children: i && Te(i, t, n)
}, a)), Ee = (e) => (t) => /* @__PURE__ */ (0, P.jsx)(O, { children: /* @__PURE__ */ (0, P.jsx)(e, { ...t }) });
//#endregion
//#region ../../node_modules/ramda/es/internal/_arity.js
function De(e, t) {
	switch (e) {
		case 0: return function() {
			return t.apply(this, arguments);
		};
		case 1: return function(e) {
			return t.apply(this, arguments);
		};
		case 2: return function(e, n) {
			return t.apply(this, arguments);
		};
		case 3: return function(e, n, r) {
			return t.apply(this, arguments);
		};
		case 4: return function(e, n, r, i) {
			return t.apply(this, arguments);
		};
		case 5: return function(e, n, r, i, a) {
			return t.apply(this, arguments);
		};
		case 6: return function(e, n, r, i, a, o) {
			return t.apply(this, arguments);
		};
		case 7: return function(e, n, r, i, a, o, s) {
			return t.apply(this, arguments);
		};
		case 8: return function(e, n, r, i, a, o, s, c) {
			return t.apply(this, arguments);
		};
		case 9: return function(e, n, r, i, a, o, s, c, l) {
			return t.apply(this, arguments);
		};
		case 10: return function(e, n, r, i, a, o, s, c, l, u) {
			return t.apply(this, arguments);
		};
		default: throw Error("First argument to _arity must be a non-negative integer no greater than ten");
	}
}
//#endregion
//#region ../../node_modules/ramda/es/internal/_isPlaceholder.js
function Q(e) {
	return typeof e == "object" && !!e && e["@@functional/placeholder"] === !0;
}
//#endregion
//#region ../../node_modules/ramda/es/internal/_curry1.js
function $(e) {
	return function t(n) {
		return arguments.length === 0 || Q(n) ? t : e.apply(this, arguments);
	};
}
//#endregion
//#region ../../node_modules/ramda/es/internal/_curry2.js
function Oe(e) {
	return function t(n, r) {
		switch (arguments.length) {
			case 0: return t;
			case 1: return Q(n) ? t : $(function(t) {
				return e(n, t);
			});
			default: return Q(n) && Q(r) ? t : Q(n) ? $(function(t) {
				return e(t, r);
			}) : Q(r) ? $(function(t) {
				return e(n, t);
			}) : e(n, r);
		}
	};
}
//#endregion
//#region ../../node_modules/ramda/es/internal/_curryN.js
function ke(e, t, n) {
	return function() {
		for (var r = [], i = 0, a = e, o = 0, s = !1; o < t.length || i < arguments.length;) {
			var c;
			o < t.length && (!Q(t[o]) || i >= arguments.length) ? c = t[o] : (c = arguments[i], i += 1), r[o] = c, Q(c) ? s = !0 : --a, o += 1;
		}
		return !s && a <= 0 ? n.apply(this, r) : De(Math.max(0, a), ke(e, r, n));
	};
}
//#endregion
//#region ../../node_modules/ramda/es/curryN.js
var Ae = /*#__PURE__*/ Oe(function(e, t) {
	return e === 1 ? $(t) : De(e, ke(e, [], t));
}), je = Ae(2, (e, t) => (n) => /* @__PURE__ */ (0, P.jsx)(t, {
	classes: e,
	...n
})), Me = (e) => (t) => /* @__PURE__ */ (0, P.jsx)(k, { children: /* @__PURE__ */ (0, P.jsx)(e, { ...t }) }), Ne = (e) => (t) => (n) => /* @__PURE__ */ (0, P.jsx)(j, {
	client: e,
	children: /* @__PURE__ */ (0, P.jsx)(t, { ...n })
}), Pe = Ae(2, (e, t) => (n) => /* @__PURE__ */ (0, P.jsx)(t, {
	styles: e,
	...n
})), Fe = (e) => (t) => /* @__PURE__ */ (0, P.jsx)(c.Suspense, {
	fallback: /* @__PURE__ */ (0, P.jsx)(R, {}),
	children: /* @__PURE__ */ (0, P.jsx)(e, { ...t })
});
//#endregion
export { U as Button, W as ConfirmDialog, te as CopyToClipboardButton, V as DemoSpriteAnimator, q as EmitterProvider, ne as ErrorBoundary, R as Loading, ee as SpriteAnimator, F as bootstrap, H as buttonVariants, G as eventSubscription, w as i18n, Se as initI18n, we as lazyLoadThenCreateElement, Te as renderRoute, oe as useBlockedContextmenu, se as useBlockedF12, xe as useConfirmDialog, ce as useCountdown, le as useDebounce, re as useEmit, J as useEmitterContext, ue as useEvent, de as useInterval, ge as useQuery, _e as useScrollToTop, ve as useStateTimeout, ie as useSubscriber, ye as useThrottle, be as useWindowDimensions, Ee as withBrowserRouter, je as withClasses, ae as withEventEmitter, Me as withHashRouter, Ce as withProvider, Ne as withReactQuery, Pe as withStyles, Fe as withSuspense };
