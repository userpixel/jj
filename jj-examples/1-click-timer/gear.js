import { svg, css } from '../jj.js'
import { config } from './config.js'

const gearPath = 'M100,37.3l-3.5-6.1C75.8,17.7,71.6,10.1,54.6,8L64,0.3h-7c-19.4,8.9-34,13.6-41,24.8l-2-12l-3.5,6.1  C9,42.3,4.9,52.2,11.4,67L0,62.7l3.5,6.1C23.1,82,29.6,90.6,45.4,92L36,99.7h7c20.6-9.7,32.3-12.5,41-24.8l2,12l3.5-6.1  c2.2-26.7,5-35.1-0.9-47.9L100,37.3z M50.1,41.6l-7.5,0.9c3.6-6,13.7-5.9,17.4,0.3L50.1,41.6z M54,50c0,2.1-1.7,3.8-3.8,3.8  c-2.1,0-3.8-1.7-3.8-3.8c0-2.1,1.7-3.8,3.8-3.8C52.3,46.2,54,47.9,54,50z M50.1,58.4l10.8-1.3c-5.6,9.7-19.7,10-26.1-0.1L50.1,58.4z   M61.3,43c-4.1-7.8-16.2-7.5-19.8-0.4l-8.7,1c5.3-18.7,31.7-18.5,37.7,0.5L61.3,43z M32.8,56.9C39.6,69.2,56.9,69,62.6,57l8.1-1  c-6.8,24.2-38.6,22-45.8,0.2L32.8,56.9z M72.7,44.4C66,21.6,35.6,23.1,30.8,43.9l-7.2,0.9c5.2-31.7,49.3-31.5,55.8,0.5L72.7,44.4z   M22.2,55.9c8.6,27.2,45.2,25.4,50.7-0.2h0l6.7-0.8c-5.9,34.7-54.7,36.4-63.8,0.4L22.2,55.9z M12.1,56.2C22.7,96.3,77,93.8,83,54.5  l5.1-0.6C81.8,98.2,21,100.3,12.1,56.2z M82.6,45.6c-7.5-37.7-57.5-35-61.5-0.6l-9.1,1.1c7-47.4,70.9-43.8,76.1,0.2L82.6,45.6z'

css({
	'@keyframes cog-animation': {
        '0%': {
            transform: 'rotate(0)',
        },
        '100%': {
            transform: 'rotate(-130deg)'
        }
    },
	'.cog': {
        transformOrigin: '50% 50%',
        '&.moving': {
            animation: 'cog-animation 250ms infinite alternate linear',
        }
    }
}).appendToHead()

export class Gear {
	constructor(moving = true) {
		this.root = svg()
			.class('cog')
			.togClassObj({ moving })
			.attrs({
				viewBox: '0 0 100 100',
				'xmlns:xlink': 'http://www.w3.org/1999/xlink'
			})
			.style({
				position: 'absolute',
				top: '3vh',
				left: '10vw',
				maxHeight: '20vh',
				maxWidth: '20vw',
			}).child(
				svg('path').attrs({
					d: gearPath,
					fill: config.col.prim,
				})
			)
	}
}
