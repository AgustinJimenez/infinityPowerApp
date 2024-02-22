import { isInteger, isNumber } from 'lodash'
import { scale } from './src/helpers/styles'

export default style = scale_ratio => {
  let data = {
    container: {
      width: '100%',
    },
    'bg-transparent': {
      backgroundColor: 'transparent',
    },
    'bg-black': {
      '--tw-bg-opacity': 1,
      backgroundColor: 'rgba(0, 0, 0, var(--tw-bg-opacity))',
    },
    'bg-white': {
      '--tw-bg-opacity': 1,
      backgroundColor: 'rgba(255, 255, 255, var(--tw-bg-opacity))',
    },
    'bg-gray-50': {
      '--tw-bg-opacity': 1,
      backgroundColor: 'rgba(249, 250, 251, var(--tw-bg-opacity))',
    },
    'bg-gray-100': {
      '--tw-bg-opacity': 1,
      backgroundColor: 'rgba(243, 244, 246, var(--tw-bg-opacity))',
    },
    'bg-gray-200': {
      '--tw-bg-opacity': 1,
      backgroundColor: 'rgba(229, 231, 235, var(--tw-bg-opacity))',
    },
    'bg-gray-300': {
      '--tw-bg-opacity': 1,
      backgroundColor: 'rgba(209, 213, 219, var(--tw-bg-opacity))',
    },
    'bg-gray-400': {
      '--tw-bg-opacity': 1,
      backgroundColor: 'rgba(156, 163, 175, var(--tw-bg-opacity))',
    },
    'bg-gray-500': {
      '--tw-bg-opacity': 1,
      backgroundColor: 'rgba(107, 114, 128, var(--tw-bg-opacity))',
    },
    'bg-gray-600': {
      '--tw-bg-opacity': 1,
      backgroundColor: 'rgba(75, 85, 99, var(--tw-bg-opacity))',
    },
    'bg-gray-700': {
      '--tw-bg-opacity': 1,
      backgroundColor: 'rgba(55, 65, 81, var(--tw-bg-opacity))',
    },
    'bg-gray-800': {
      '--tw-bg-opacity': 1,
      backgroundColor: 'rgba(31, 41, 55, var(--tw-bg-opacity))',
    },
    'bg-gray-900': {
      '--tw-bg-opacity': 1,
      backgroundColor: 'rgba(17, 24, 39, var(--tw-bg-opacity))',
    },
    'bg-red-50': {
      '--tw-bg-opacity': 1,
      backgroundColor: 'rgba(254, 242, 242, var(--tw-bg-opacity))',
    },
    'bg-red-100': {
      '--tw-bg-opacity': 1,
      backgroundColor: 'rgba(254, 226, 226, var(--tw-bg-opacity))',
    },
    'bg-red-200': {
      '--tw-bg-opacity': 1,
      backgroundColor: 'rgba(254, 202, 202, var(--tw-bg-opacity))',
    },
    'bg-red-300': {
      '--tw-bg-opacity': 1,
      backgroundColor: 'rgba(252, 165, 165, var(--tw-bg-opacity))',
    },
    'bg-red-400': {
      '--tw-bg-opacity': 1,
      backgroundColor: 'rgba(248, 113, 113, var(--tw-bg-opacity))',
    },
    'bg-red-500': {
      '--tw-bg-opacity': 1,
      backgroundColor: 'rgba(239, 68, 68, var(--tw-bg-opacity))',
    },
    'bg-red-600': {
      '--tw-bg-opacity': 1,
      backgroundColor: 'rgba(220, 38, 38, var(--tw-bg-opacity))',
    },
    'bg-red-700': {
      '--tw-bg-opacity': 1,
      backgroundColor: 'rgba(185, 28, 28, var(--tw-bg-opacity))',
    },
    'bg-red-800': {
      '--tw-bg-opacity': 1,
      backgroundColor: 'rgba(153, 27, 27, var(--tw-bg-opacity))',
    },
    'bg-red-900': {
      '--tw-bg-opacity': 1,
      backgroundColor: 'rgba(127, 29, 29, var(--tw-bg-opacity))',
    },
    'bg-yellow-50': {
      '--tw-bg-opacity': 1,
      backgroundColor: 'rgba(255, 251, 235, var(--tw-bg-opacity))',
    },
    'bg-yellow-100': {
      '--tw-bg-opacity': 1,
      backgroundColor: 'rgba(254, 243, 199, var(--tw-bg-opacity))',
    },
    'bg-yellow-200': {
      '--tw-bg-opacity': 1,
      backgroundColor: 'rgba(253, 230, 138, var(--tw-bg-opacity))',
    },
    'bg-yellow-300': {
      '--tw-bg-opacity': 1,
      backgroundColor: 'rgba(252, 211, 77, var(--tw-bg-opacity))',
    },
    'bg-yellow-400': {
      '--tw-bg-opacity': 1,
      backgroundColor: 'rgba(251, 191, 36, var(--tw-bg-opacity))',
    },
    'bg-yellow-500': {
      '--tw-bg-opacity': 1,
      backgroundColor: 'rgba(245, 158, 11, var(--tw-bg-opacity))',
    },
    'bg-yellow-600': {
      '--tw-bg-opacity': 1,
      backgroundColor: 'rgba(217, 119, 6, var(--tw-bg-opacity))',
    },
    'bg-yellow-700': {
      '--tw-bg-opacity': 1,
      backgroundColor: 'rgba(180, 83, 9, var(--tw-bg-opacity))',
    },
    'bg-yellow-800': {
      '--tw-bg-opacity': 1,
      backgroundColor: 'rgba(146, 64, 14, var(--tw-bg-opacity))',
    },
    'bg-yellow-900': {
      '--tw-bg-opacity': 1,
      backgroundColor: 'rgba(120, 53, 15, var(--tw-bg-opacity))',
    },
    'bg-green-50': {
      '--tw-bg-opacity': 1,
      backgroundColor: 'rgba(236, 253, 245, var(--tw-bg-opacity))',
    },
    'bg-green-100': {
      '--tw-bg-opacity': 1,
      backgroundColor: 'rgba(209, 250, 229, var(--tw-bg-opacity))',
    },
    'bg-green-200': {
      '--tw-bg-opacity': 1,
      backgroundColor: 'rgba(167, 243, 208, var(--tw-bg-opacity))',
    },
    'bg-green-300': {
      '--tw-bg-opacity': 1,
      backgroundColor: 'rgba(110, 231, 183, var(--tw-bg-opacity))',
    },
    'bg-green-400': {
      '--tw-bg-opacity': 1,
      backgroundColor: 'rgba(52, 211, 153, var(--tw-bg-opacity))',
    },
    'bg-green-500': {
      '--tw-bg-opacity': 1,
      backgroundColor: 'rgba(16, 185, 129, var(--tw-bg-opacity))',
    },
    'bg-green-600': {
      '--tw-bg-opacity': 1,
      backgroundColor: 'rgba(5, 150, 105, var(--tw-bg-opacity))',
    },
    'bg-green-700': {
      '--tw-bg-opacity': 1,
      backgroundColor: 'rgba(4, 120, 87, var(--tw-bg-opacity))',
    },
    'bg-green-800': {
      '--tw-bg-opacity': 1,
      backgroundColor: 'rgba(6, 95, 70, var(--tw-bg-opacity))',
    },
    'bg-green-900': {
      '--tw-bg-opacity': 1,
      backgroundColor: 'rgba(6, 78, 59, var(--tw-bg-opacity))',
    },
    'bg-blue-50': {
      '--tw-bg-opacity': 1,
      backgroundColor: 'rgba(239, 246, 255, var(--tw-bg-opacity))',
    },
    'bg-blue-100': {
      '--tw-bg-opacity': 1,
      backgroundColor: 'rgba(219, 234, 254, var(--tw-bg-opacity))',
    },
    'bg-blue-200': {
      '--tw-bg-opacity': 1,
      backgroundColor: 'rgba(191, 219, 254, var(--tw-bg-opacity))',
    },
    'bg-blue-300': {
      '--tw-bg-opacity': 1,
      backgroundColor: 'rgba(147, 197, 253, var(--tw-bg-opacity))',
    },
    'bg-blue-400': {
      '--tw-bg-opacity': 1,
      backgroundColor: 'rgba(96, 165, 250, var(--tw-bg-opacity))',
    },
    'bg-blue-500': {
      '--tw-bg-opacity': 1,
      backgroundColor: 'rgba(59, 130, 246, var(--tw-bg-opacity))',
    },
    'bg-blue-600': {
      '--tw-bg-opacity': 1,
      backgroundColor: 'rgba(37, 99, 235, var(--tw-bg-opacity))',
    },
    'bg-blue-700': {
      '--tw-bg-opacity': 1,
      backgroundColor: 'rgba(29, 78, 216, var(--tw-bg-opacity))',
    },
    'bg-blue-800': {
      '--tw-bg-opacity': 1,
      backgroundColor: 'rgba(30, 64, 175, var(--tw-bg-opacity))',
    },
    'bg-blue-900': {
      '--tw-bg-opacity': 1,
      backgroundColor: 'rgba(30, 58, 138, var(--tw-bg-opacity))',
    },
    'bg-indigo-50': {
      '--tw-bg-opacity': 1,
      backgroundColor: 'rgba(238, 242, 255, var(--tw-bg-opacity))',
    },
    'bg-indigo-100': {
      '--tw-bg-opacity': 1,
      backgroundColor: 'rgba(224, 231, 255, var(--tw-bg-opacity))',
    },
    'bg-indigo-200': {
      '--tw-bg-opacity': 1,
      backgroundColor: 'rgba(199, 210, 254, var(--tw-bg-opacity))',
    },
    'bg-indigo-300': {
      '--tw-bg-opacity': 1,
      backgroundColor: 'rgba(165, 180, 252, var(--tw-bg-opacity))',
    },
    'bg-indigo-400': {
      '--tw-bg-opacity': 1,
      backgroundColor: 'rgba(129, 140, 248, var(--tw-bg-opacity))',
    },
    'bg-indigo-500': {
      '--tw-bg-opacity': 1,
      backgroundColor: 'rgba(99, 102, 241, var(--tw-bg-opacity))',
    },
    'bg-indigo-600': {
      '--tw-bg-opacity': 1,
      backgroundColor: 'rgba(79, 70, 229, var(--tw-bg-opacity))',
    },
    'bg-indigo-700': {
      '--tw-bg-opacity': 1,
      backgroundColor: 'rgba(67, 56, 202, var(--tw-bg-opacity))',
    },
    'bg-indigo-800': {
      '--tw-bg-opacity': 1,
      backgroundColor: 'rgba(55, 48, 163, var(--tw-bg-opacity))',
    },
    'bg-indigo-900': {
      '--tw-bg-opacity': 1,
      backgroundColor: 'rgba(49, 46, 129, var(--tw-bg-opacity))',
    },
    'bg-purple-50': {
      '--tw-bg-opacity': 1,
      backgroundColor: 'rgba(245, 243, 255, var(--tw-bg-opacity))',
    },
    'bg-purple-100': {
      '--tw-bg-opacity': 1,
      backgroundColor: 'rgba(237, 233, 254, var(--tw-bg-opacity))',
    },
    'bg-purple-200': {
      '--tw-bg-opacity': 1,
      backgroundColor: 'rgba(221, 214, 254, var(--tw-bg-opacity))',
    },
    'bg-purple-300': {
      '--tw-bg-opacity': 1,
      backgroundColor: 'rgba(196, 181, 253, var(--tw-bg-opacity))',
    },
    'bg-purple-400': {
      '--tw-bg-opacity': 1,
      backgroundColor: 'rgba(167, 139, 250, var(--tw-bg-opacity))',
    },
    'bg-purple-500': {
      '--tw-bg-opacity': 1,
      backgroundColor: 'rgba(139, 92, 246, var(--tw-bg-opacity))',
    },
    'bg-purple-600': {
      '--tw-bg-opacity': 1,
      backgroundColor: 'rgba(124, 58, 237, var(--tw-bg-opacity))',
    },
    'bg-purple-700': {
      '--tw-bg-opacity': 1,
      backgroundColor: 'rgba(109, 40, 217, var(--tw-bg-opacity))',
    },
    'bg-purple-800': {
      '--tw-bg-opacity': 1,
      backgroundColor: 'rgba(91, 33, 182, var(--tw-bg-opacity))',
    },
    'bg-purple-900': {
      '--tw-bg-opacity': 1,
      backgroundColor: 'rgba(76, 29, 149, var(--tw-bg-opacity))',
    },
    'bg-pink-50': {
      '--tw-bg-opacity': 1,
      backgroundColor: 'rgba(253, 242, 248, var(--tw-bg-opacity))',
    },
    'bg-pink-100': {
      '--tw-bg-opacity': 1,
      backgroundColor: 'rgba(252, 231, 243, var(--tw-bg-opacity))',
    },
    'bg-pink-200': {
      '--tw-bg-opacity': 1,
      backgroundColor: 'rgba(251, 207, 232, var(--tw-bg-opacity))',
    },
    'bg-pink-300': {
      '--tw-bg-opacity': 1,
      backgroundColor: 'rgba(249, 168, 212, var(--tw-bg-opacity))',
    },
    'bg-pink-400': {
      '--tw-bg-opacity': 1,
      backgroundColor: 'rgba(244, 114, 182, var(--tw-bg-opacity))',
    },
    'bg-pink-500': {
      '--tw-bg-opacity': 1,
      backgroundColor: 'rgba(236, 72, 153, var(--tw-bg-opacity))',
    },
    'bg-pink-600': {
      '--tw-bg-opacity': 1,
      backgroundColor: 'rgba(219, 39, 119, var(--tw-bg-opacity))',
    },
    'bg-pink-700': {
      '--tw-bg-opacity': 1,
      backgroundColor: 'rgba(190, 24, 93, var(--tw-bg-opacity))',
    },
    'bg-pink-800': {
      '--tw-bg-opacity': 1,
      backgroundColor: 'rgba(157, 23, 77, var(--tw-bg-opacity))',
    },
    'bg-pink-900': {
      '--tw-bg-opacity': 1,
      backgroundColor: 'rgba(131, 24, 67, var(--tw-bg-opacity))',
    },
    'bg-opacity-0': {
      '--tw-bg-opacity': 0,
    },
    'bg-opacity-5': {
      '--tw-bg-opacity': 0.05,
    },
    'bg-opacity-10': {
      '--tw-bg-opacity': 0.1,
    },
    'bg-opacity-20': {
      '--tw-bg-opacity': 0.2,
    },
    'bg-opacity-25': {
      '--tw-bg-opacity': 0.25,
    },
    'bg-opacity-30': {
      '--tw-bg-opacity': 0.3,
    },
    'bg-opacity-40': {
      '--tw-bg-opacity': 0.4,
    },
    'bg-opacity-50': {
      '--tw-bg-opacity': 0.5,
    },
    'bg-opacity-60': {
      '--tw-bg-opacity': 0.6,
    },
    'bg-opacity-70': {
      '--tw-bg-opacity': 0.7,
    },
    'bg-opacity-75': {
      '--tw-bg-opacity': 0.75,
    },
    'bg-opacity-80': {
      '--tw-bg-opacity': 0.8,
    },
    'bg-opacity-90': {
      '--tw-bg-opacity': 0.9,
    },
    'bg-opacity-95': {
      '--tw-bg-opacity': 0.95,
    },
    'bg-opacity-100': {
      '--tw-bg-opacity': 1,
    },
    'border-transparent': {
      borderTopColor: 'transparent',
      borderRightColor: 'transparent',
      borderBottomColor: 'transparent',
      borderLeftColor: 'transparent',
    },
    'border-black': {
      '--tw-border-opacity': 1,
      borderTopColor: 'rgba(0, 0, 0, var(--tw-border-opacity))',
      borderRightColor: 'rgba(0, 0, 0, var(--tw-border-opacity))',
      borderBottomColor: 'rgba(0, 0, 0, var(--tw-border-opacity))',
      borderLeftColor: 'rgba(0, 0, 0, var(--tw-border-opacity))',
    },
    'border-white': {
      '--tw-border-opacity': 1,
      borderTopColor: 'rgba(255, 255, 255, var(--tw-border-opacity))',
      borderRightColor: 'rgba(255, 255, 255, var(--tw-border-opacity))',
      borderBottomColor: 'rgba(255, 255, 255, var(--tw-border-opacity))',
      borderLeftColor: 'rgba(255, 255, 255, var(--tw-border-opacity))',
    },
    'border-gray-50': {
      '--tw-border-opacity': 1,
      borderTopColor: 'rgba(249, 250, 251, var(--tw-border-opacity))',
      borderRightColor: 'rgba(249, 250, 251, var(--tw-border-opacity))',
      borderBottomColor: 'rgba(249, 250, 251, var(--tw-border-opacity))',
      borderLeftColor: 'rgba(249, 250, 251, var(--tw-border-opacity))',
    },
    'border-gray-100': {
      '--tw-border-opacity': 1,
      borderTopColor: 'rgba(243, 244, 246, var(--tw-border-opacity))',
      borderRightColor: 'rgba(243, 244, 246, var(--tw-border-opacity))',
      borderBottomColor: 'rgba(243, 244, 246, var(--tw-border-opacity))',
      borderLeftColor: 'rgba(243, 244, 246, var(--tw-border-opacity))',
    },
    'border-gray-200': {
      '--tw-border-opacity': 1,
      borderTopColor: 'rgba(229, 231, 235, var(--tw-border-opacity))',
      borderRightColor: 'rgba(229, 231, 235, var(--tw-border-opacity))',
      borderBottomColor: 'rgba(229, 231, 235, var(--tw-border-opacity))',
      borderLeftColor: 'rgba(229, 231, 235, var(--tw-border-opacity))',
    },
    'border-gray-300': {
      '--tw-border-opacity': 1,
      borderTopColor: 'rgba(209, 213, 219, var(--tw-border-opacity))',
      borderRightColor: 'rgba(209, 213, 219, var(--tw-border-opacity))',
      borderBottomColor: 'rgba(209, 213, 219, var(--tw-border-opacity))',
      borderLeftColor: 'rgba(209, 213, 219, var(--tw-border-opacity))',
    },
    'border-gray-400': {
      '--tw-border-opacity': 1,
      borderTopColor: 'rgba(156, 163, 175, var(--tw-border-opacity))',
      borderRightColor: 'rgba(156, 163, 175, var(--tw-border-opacity))',
      borderBottomColor: 'rgba(156, 163, 175, var(--tw-border-opacity))',
      borderLeftColor: 'rgba(156, 163, 175, var(--tw-border-opacity))',
    },
    'border-gray-500': {
      '--tw-border-opacity': 1,
      borderTopColor: 'rgba(107, 114, 128, var(--tw-border-opacity))',
      borderRightColor: 'rgba(107, 114, 128, var(--tw-border-opacity))',
      borderBottomColor: 'rgba(107, 114, 128, var(--tw-border-opacity))',
      borderLeftColor: 'rgba(107, 114, 128, var(--tw-border-opacity))',
    },
    'border-gray-600': {
      '--tw-border-opacity': 1,
      borderTopColor: 'rgba(75, 85, 99, var(--tw-border-opacity))',
      borderRightColor: 'rgba(75, 85, 99, var(--tw-border-opacity))',
      borderBottomColor: 'rgba(75, 85, 99, var(--tw-border-opacity))',
      borderLeftColor: 'rgba(75, 85, 99, var(--tw-border-opacity))',
    },
    'border-gray-700': {
      '--tw-border-opacity': 1,
      borderTopColor: 'rgba(55, 65, 81, var(--tw-border-opacity))',
      borderRightColor: 'rgba(55, 65, 81, var(--tw-border-opacity))',
      borderBottomColor: 'rgba(55, 65, 81, var(--tw-border-opacity))',
      borderLeftColor: 'rgba(55, 65, 81, var(--tw-border-opacity))',
    },
    'border-gray-800': {
      '--tw-border-opacity': 1,
      borderTopColor: 'rgba(31, 41, 55, var(--tw-border-opacity))',
      borderRightColor: 'rgba(31, 41, 55, var(--tw-border-opacity))',
      borderBottomColor: 'rgba(31, 41, 55, var(--tw-border-opacity))',
      borderLeftColor: 'rgba(31, 41, 55, var(--tw-border-opacity))',
    },
    'border-gray-900': {
      '--tw-border-opacity': 1,
      borderTopColor: 'rgba(17, 24, 39, var(--tw-border-opacity))',
      borderRightColor: 'rgba(17, 24, 39, var(--tw-border-opacity))',
      borderBottomColor: 'rgba(17, 24, 39, var(--tw-border-opacity))',
      borderLeftColor: 'rgba(17, 24, 39, var(--tw-border-opacity))',
    },
    'border-red-50': {
      '--tw-border-opacity': 1,
      borderTopColor: 'rgba(254, 242, 242, var(--tw-border-opacity))',
      borderRightColor: 'rgba(254, 242, 242, var(--tw-border-opacity))',
      borderBottomColor: 'rgba(254, 242, 242, var(--tw-border-opacity))',
      borderLeftColor: 'rgba(254, 242, 242, var(--tw-border-opacity))',
    },
    'border-red-100': {
      '--tw-border-opacity': 1,
      borderTopColor: 'rgba(254, 226, 226, var(--tw-border-opacity))',
      borderRightColor: 'rgba(254, 226, 226, var(--tw-border-opacity))',
      borderBottomColor: 'rgba(254, 226, 226, var(--tw-border-opacity))',
      borderLeftColor: 'rgba(254, 226, 226, var(--tw-border-opacity))',
    },
    'border-red-200': {
      '--tw-border-opacity': 1,
      borderTopColor: 'rgba(254, 202, 202, var(--tw-border-opacity))',
      borderRightColor: 'rgba(254, 202, 202, var(--tw-border-opacity))',
      borderBottomColor: 'rgba(254, 202, 202, var(--tw-border-opacity))',
      borderLeftColor: 'rgba(254, 202, 202, var(--tw-border-opacity))',
    },
    'border-red-300': {
      '--tw-border-opacity': 1,
      borderTopColor: 'rgba(252, 165, 165, var(--tw-border-opacity))',
      borderRightColor: 'rgba(252, 165, 165, var(--tw-border-opacity))',
      borderBottomColor: 'rgba(252, 165, 165, var(--tw-border-opacity))',
      borderLeftColor: 'rgba(252, 165, 165, var(--tw-border-opacity))',
    },
    'border-red-400': {
      '--tw-border-opacity': 1,
      borderTopColor: 'rgba(248, 113, 113, var(--tw-border-opacity))',
      borderRightColor: 'rgba(248, 113, 113, var(--tw-border-opacity))',
      borderBottomColor: 'rgba(248, 113, 113, var(--tw-border-opacity))',
      borderLeftColor: 'rgba(248, 113, 113, var(--tw-border-opacity))',
    },
    'border-red-500': {
      '--tw-border-opacity': 1,
      borderTopColor: 'rgba(239, 68, 68, var(--tw-border-opacity))',
      borderRightColor: 'rgba(239, 68, 68, var(--tw-border-opacity))',
      borderBottomColor: 'rgba(239, 68, 68, var(--tw-border-opacity))',
      borderLeftColor: 'rgba(239, 68, 68, var(--tw-border-opacity))',
    },
    'border-red-600': {
      '--tw-border-opacity': 1,
      borderTopColor: 'rgba(220, 38, 38, var(--tw-border-opacity))',
      borderRightColor: 'rgba(220, 38, 38, var(--tw-border-opacity))',
      borderBottomColor: 'rgba(220, 38, 38, var(--tw-border-opacity))',
      borderLeftColor: 'rgba(220, 38, 38, var(--tw-border-opacity))',
    },
    'border-red-700': {
      '--tw-border-opacity': 1,
      borderTopColor: 'rgba(185, 28, 28, var(--tw-border-opacity))',
      borderRightColor: 'rgba(185, 28, 28, var(--tw-border-opacity))',
      borderBottomColor: 'rgba(185, 28, 28, var(--tw-border-opacity))',
      borderLeftColor: 'rgba(185, 28, 28, var(--tw-border-opacity))',
    },
    'border-red-800': {
      '--tw-border-opacity': 1,
      borderTopColor: 'rgba(153, 27, 27, var(--tw-border-opacity))',
      borderRightColor: 'rgba(153, 27, 27, var(--tw-border-opacity))',
      borderBottomColor: 'rgba(153, 27, 27, var(--tw-border-opacity))',
      borderLeftColor: 'rgba(153, 27, 27, var(--tw-border-opacity))',
    },
    'border-red-900': {
      '--tw-border-opacity': 1,
      borderTopColor: 'rgba(127, 29, 29, var(--tw-border-opacity))',
      borderRightColor: 'rgba(127, 29, 29, var(--tw-border-opacity))',
      borderBottomColor: 'rgba(127, 29, 29, var(--tw-border-opacity))',
      borderLeftColor: 'rgba(127, 29, 29, var(--tw-border-opacity))',
    },
    'border-yellow-50': {
      '--tw-border-opacity': 1,
      borderTopColor: 'rgba(255, 251, 235, var(--tw-border-opacity))',
      borderRightColor: 'rgba(255, 251, 235, var(--tw-border-opacity))',
      borderBottomColor: 'rgba(255, 251, 235, var(--tw-border-opacity))',
      borderLeftColor: 'rgba(255, 251, 235, var(--tw-border-opacity))',
    },
    'border-yellow-100': {
      '--tw-border-opacity': 1,
      borderTopColor: 'rgba(254, 243, 199, var(--tw-border-opacity))',
      borderRightColor: 'rgba(254, 243, 199, var(--tw-border-opacity))',
      borderBottomColor: 'rgba(254, 243, 199, var(--tw-border-opacity))',
      borderLeftColor: 'rgba(254, 243, 199, var(--tw-border-opacity))',
    },
    'border-yellow-200': {
      '--tw-border-opacity': 1,
      borderTopColor: 'rgba(253, 230, 138, var(--tw-border-opacity))',
      borderRightColor: 'rgba(253, 230, 138, var(--tw-border-opacity))',
      borderBottomColor: 'rgba(253, 230, 138, var(--tw-border-opacity))',
      borderLeftColor: 'rgba(253, 230, 138, var(--tw-border-opacity))',
    },
    'border-yellow-300': {
      '--tw-border-opacity': 1,
      borderTopColor: 'rgba(252, 211, 77, var(--tw-border-opacity))',
      borderRightColor: 'rgba(252, 211, 77, var(--tw-border-opacity))',
      borderBottomColor: 'rgba(252, 211, 77, var(--tw-border-opacity))',
      borderLeftColor: 'rgba(252, 211, 77, var(--tw-border-opacity))',
    },
    'border-yellow-400': {
      '--tw-border-opacity': 1,
      borderTopColor: 'rgba(251, 191, 36, var(--tw-border-opacity))',
      borderRightColor: 'rgba(251, 191, 36, var(--tw-border-opacity))',
      borderBottomColor: 'rgba(251, 191, 36, var(--tw-border-opacity))',
      borderLeftColor: 'rgba(251, 191, 36, var(--tw-border-opacity))',
    },
    'border-yellow-500': {
      '--tw-border-opacity': 1,
      borderTopColor: 'rgba(245, 158, 11, var(--tw-border-opacity))',
      borderRightColor: 'rgba(245, 158, 11, var(--tw-border-opacity))',
      borderBottomColor: 'rgba(245, 158, 11, var(--tw-border-opacity))',
      borderLeftColor: 'rgba(245, 158, 11, var(--tw-border-opacity))',
    },
    'border-yellow-600': {
      '--tw-border-opacity': 1,
      borderTopColor: 'rgba(217, 119, 6, var(--tw-border-opacity))',
      borderRightColor: 'rgba(217, 119, 6, var(--tw-border-opacity))',
      borderBottomColor: 'rgba(217, 119, 6, var(--tw-border-opacity))',
      borderLeftColor: 'rgba(217, 119, 6, var(--tw-border-opacity))',
    },
    'border-yellow-700': {
      '--tw-border-opacity': 1,
      borderTopColor: 'rgba(180, 83, 9, var(--tw-border-opacity))',
      borderRightColor: 'rgba(180, 83, 9, var(--tw-border-opacity))',
      borderBottomColor: 'rgba(180, 83, 9, var(--tw-border-opacity))',
      borderLeftColor: 'rgba(180, 83, 9, var(--tw-border-opacity))',
    },
    'border-yellow-800': {
      '--tw-border-opacity': 1,
      borderTopColor: 'rgba(146, 64, 14, var(--tw-border-opacity))',
      borderRightColor: 'rgba(146, 64, 14, var(--tw-border-opacity))',
      borderBottomColor: 'rgba(146, 64, 14, var(--tw-border-opacity))',
      borderLeftColor: 'rgba(146, 64, 14, var(--tw-border-opacity))',
    },
    'border-yellow-900': {
      '--tw-border-opacity': 1,
      borderTopColor: 'rgba(120, 53, 15, var(--tw-border-opacity))',
      borderRightColor: 'rgba(120, 53, 15, var(--tw-border-opacity))',
      borderBottomColor: 'rgba(120, 53, 15, var(--tw-border-opacity))',
      borderLeftColor: 'rgba(120, 53, 15, var(--tw-border-opacity))',
    },
    'border-green-50': {
      '--tw-border-opacity': 1,
      borderTopColor: 'rgba(236, 253, 245, var(--tw-border-opacity))',
      borderRightColor: 'rgba(236, 253, 245, var(--tw-border-opacity))',
      borderBottomColor: 'rgba(236, 253, 245, var(--tw-border-opacity))',
      borderLeftColor: 'rgba(236, 253, 245, var(--tw-border-opacity))',
    },
    'border-green-100': {
      '--tw-border-opacity': 1,
      borderTopColor: 'rgba(209, 250, 229, var(--tw-border-opacity))',
      borderRightColor: 'rgba(209, 250, 229, var(--tw-border-opacity))',
      borderBottomColor: 'rgba(209, 250, 229, var(--tw-border-opacity))',
      borderLeftColor: 'rgba(209, 250, 229, var(--tw-border-opacity))',
    },
    'border-green-200': {
      '--tw-border-opacity': 1,
      borderTopColor: 'rgba(167, 243, 208, var(--tw-border-opacity))',
      borderRightColor: 'rgba(167, 243, 208, var(--tw-border-opacity))',
      borderBottomColor: 'rgba(167, 243, 208, var(--tw-border-opacity))',
      borderLeftColor: 'rgba(167, 243, 208, var(--tw-border-opacity))',
    },
    'border-green-300': {
      '--tw-border-opacity': 1,
      borderTopColor: 'rgba(110, 231, 183, var(--tw-border-opacity))',
      borderRightColor: 'rgba(110, 231, 183, var(--tw-border-opacity))',
      borderBottomColor: 'rgba(110, 231, 183, var(--tw-border-opacity))',
      borderLeftColor: 'rgba(110, 231, 183, var(--tw-border-opacity))',
    },
    'border-green-400': {
      '--tw-border-opacity': 1,
      borderTopColor: 'rgba(52, 211, 153, var(--tw-border-opacity))',
      borderRightColor: 'rgba(52, 211, 153, var(--tw-border-opacity))',
      borderBottomColor: 'rgba(52, 211, 153, var(--tw-border-opacity))',
      borderLeftColor: 'rgba(52, 211, 153, var(--tw-border-opacity))',
    },
    'border-green-500': {
      '--tw-border-opacity': 1,
      borderTopColor: 'rgba(16, 185, 129, var(--tw-border-opacity))',
      borderRightColor: 'rgba(16, 185, 129, var(--tw-border-opacity))',
      borderBottomColor: 'rgba(16, 185, 129, var(--tw-border-opacity))',
      borderLeftColor: 'rgba(16, 185, 129, var(--tw-border-opacity))',
    },
    'border-green-600': {
      '--tw-border-opacity': 1,
      borderTopColor: 'rgba(5, 150, 105, var(--tw-border-opacity))',
      borderRightColor: 'rgba(5, 150, 105, var(--tw-border-opacity))',
      borderBottomColor: 'rgba(5, 150, 105, var(--tw-border-opacity))',
      borderLeftColor: 'rgba(5, 150, 105, var(--tw-border-opacity))',
    },
    'border-green-700': {
      '--tw-border-opacity': 1,
      borderTopColor: 'rgba(4, 120, 87, var(--tw-border-opacity))',
      borderRightColor: 'rgba(4, 120, 87, var(--tw-border-opacity))',
      borderBottomColor: 'rgba(4, 120, 87, var(--tw-border-opacity))',
      borderLeftColor: 'rgba(4, 120, 87, var(--tw-border-opacity))',
    },
    'border-green-800': {
      '--tw-border-opacity': 1,
      borderTopColor: 'rgba(6, 95, 70, var(--tw-border-opacity))',
      borderRightColor: 'rgba(6, 95, 70, var(--tw-border-opacity))',
      borderBottomColor: 'rgba(6, 95, 70, var(--tw-border-opacity))',
      borderLeftColor: 'rgba(6, 95, 70, var(--tw-border-opacity))',
    },
    'border-green-900': {
      '--tw-border-opacity': 1,
      borderTopColor: 'rgba(6, 78, 59, var(--tw-border-opacity))',
      borderRightColor: 'rgba(6, 78, 59, var(--tw-border-opacity))',
      borderBottomColor: 'rgba(6, 78, 59, var(--tw-border-opacity))',
      borderLeftColor: 'rgba(6, 78, 59, var(--tw-border-opacity))',
    },
    'border-blue-50': {
      '--tw-border-opacity': 1,
      borderTopColor: 'rgba(239, 246, 255, var(--tw-border-opacity))',
      borderRightColor: 'rgba(239, 246, 255, var(--tw-border-opacity))',
      borderBottomColor: 'rgba(239, 246, 255, var(--tw-border-opacity))',
      borderLeftColor: 'rgba(239, 246, 255, var(--tw-border-opacity))',
    },
    'border-blue-100': {
      '--tw-border-opacity': 1,
      borderTopColor: 'rgba(219, 234, 254, var(--tw-border-opacity))',
      borderRightColor: 'rgba(219, 234, 254, var(--tw-border-opacity))',
      borderBottomColor: 'rgba(219, 234, 254, var(--tw-border-opacity))',
      borderLeftColor: 'rgba(219, 234, 254, var(--tw-border-opacity))',
    },
    'border-blue-200': {
      '--tw-border-opacity': 1,
      borderTopColor: 'rgba(191, 219, 254, var(--tw-border-opacity))',
      borderRightColor: 'rgba(191, 219, 254, var(--tw-border-opacity))',
      borderBottomColor: 'rgba(191, 219, 254, var(--tw-border-opacity))',
      borderLeftColor: 'rgba(191, 219, 254, var(--tw-border-opacity))',
    },
    'border-blue-300': {
      '--tw-border-opacity': 1,
      borderTopColor: 'rgba(147, 197, 253, var(--tw-border-opacity))',
      borderRightColor: 'rgba(147, 197, 253, var(--tw-border-opacity))',
      borderBottomColor: 'rgba(147, 197, 253, var(--tw-border-opacity))',
      borderLeftColor: 'rgba(147, 197, 253, var(--tw-border-opacity))',
    },
    'border-blue-400': {
      '--tw-border-opacity': 1,
      borderTopColor: 'rgba(96, 165, 250, var(--tw-border-opacity))',
      borderRightColor: 'rgba(96, 165, 250, var(--tw-border-opacity))',
      borderBottomColor: 'rgba(96, 165, 250, var(--tw-border-opacity))',
      borderLeftColor: 'rgba(96, 165, 250, var(--tw-border-opacity))',
    },
    'border-blue-500': {
      '--tw-border-opacity': 1,
      borderTopColor: 'rgba(59, 130, 246, var(--tw-border-opacity))',
      borderRightColor: 'rgba(59, 130, 246, var(--tw-border-opacity))',
      borderBottomColor: 'rgba(59, 130, 246, var(--tw-border-opacity))',
      borderLeftColor: 'rgba(59, 130, 246, var(--tw-border-opacity))',
    },
    'border-blue-600': {
      '--tw-border-opacity': 1,
      borderTopColor: 'rgba(37, 99, 235, var(--tw-border-opacity))',
      borderRightColor: 'rgba(37, 99, 235, var(--tw-border-opacity))',
      borderBottomColor: 'rgba(37, 99, 235, var(--tw-border-opacity))',
      borderLeftColor: 'rgba(37, 99, 235, var(--tw-border-opacity))',
    },
    'border-blue-700': {
      '--tw-border-opacity': 1,
      borderTopColor: 'rgba(29, 78, 216, var(--tw-border-opacity))',
      borderRightColor: 'rgba(29, 78, 216, var(--tw-border-opacity))',
      borderBottomColor: 'rgba(29, 78, 216, var(--tw-border-opacity))',
      borderLeftColor: 'rgba(29, 78, 216, var(--tw-border-opacity))',
    },
    'border-blue-800': {
      '--tw-border-opacity': 1,
      borderTopColor: 'rgba(30, 64, 175, var(--tw-border-opacity))',
      borderRightColor: 'rgba(30, 64, 175, var(--tw-border-opacity))',
      borderBottomColor: 'rgba(30, 64, 175, var(--tw-border-opacity))',
      borderLeftColor: 'rgba(30, 64, 175, var(--tw-border-opacity))',
    },
    'border-blue-900': {
      '--tw-border-opacity': 1,
      borderTopColor: 'rgba(30, 58, 138, var(--tw-border-opacity))',
      borderRightColor: 'rgba(30, 58, 138, var(--tw-border-opacity))',
      borderBottomColor: 'rgba(30, 58, 138, var(--tw-border-opacity))',
      borderLeftColor: 'rgba(30, 58, 138, var(--tw-border-opacity))',
    },
    'border-indigo-50': {
      '--tw-border-opacity': 1,
      borderTopColor: 'rgba(238, 242, 255, var(--tw-border-opacity))',
      borderRightColor: 'rgba(238, 242, 255, var(--tw-border-opacity))',
      borderBottomColor: 'rgba(238, 242, 255, var(--tw-border-opacity))',
      borderLeftColor: 'rgba(238, 242, 255, var(--tw-border-opacity))',
    },
    'border-indigo-100': {
      '--tw-border-opacity': 1,
      borderTopColor: 'rgba(224, 231, 255, var(--tw-border-opacity))',
      borderRightColor: 'rgba(224, 231, 255, var(--tw-border-opacity))',
      borderBottomColor: 'rgba(224, 231, 255, var(--tw-border-opacity))',
      borderLeftColor: 'rgba(224, 231, 255, var(--tw-border-opacity))',
    },
    'border-indigo-200': {
      '--tw-border-opacity': 1,
      borderTopColor: 'rgba(199, 210, 254, var(--tw-border-opacity))',
      borderRightColor: 'rgba(199, 210, 254, var(--tw-border-opacity))',
      borderBottomColor: 'rgba(199, 210, 254, var(--tw-border-opacity))',
      borderLeftColor: 'rgba(199, 210, 254, var(--tw-border-opacity))',
    },
    'border-indigo-300': {
      '--tw-border-opacity': 1,
      borderTopColor: 'rgba(165, 180, 252, var(--tw-border-opacity))',
      borderRightColor: 'rgba(165, 180, 252, var(--tw-border-opacity))',
      borderBottomColor: 'rgba(165, 180, 252, var(--tw-border-opacity))',
      borderLeftColor: 'rgba(165, 180, 252, var(--tw-border-opacity))',
    },
    'border-indigo-400': {
      '--tw-border-opacity': 1,
      borderTopColor: 'rgba(129, 140, 248, var(--tw-border-opacity))',
      borderRightColor: 'rgba(129, 140, 248, var(--tw-border-opacity))',
      borderBottomColor: 'rgba(129, 140, 248, var(--tw-border-opacity))',
      borderLeftColor: 'rgba(129, 140, 248, var(--tw-border-opacity))',
    },
    'border-indigo-500': {
      '--tw-border-opacity': 1,
      borderTopColor: 'rgba(99, 102, 241, var(--tw-border-opacity))',
      borderRightColor: 'rgba(99, 102, 241, var(--tw-border-opacity))',
      borderBottomColor: 'rgba(99, 102, 241, var(--tw-border-opacity))',
      borderLeftColor: 'rgba(99, 102, 241, var(--tw-border-opacity))',
    },
    'border-indigo-600': {
      '--tw-border-opacity': 1,
      borderTopColor: 'rgba(79, 70, 229, var(--tw-border-opacity))',
      borderRightColor: 'rgba(79, 70, 229, var(--tw-border-opacity))',
      borderBottomColor: 'rgba(79, 70, 229, var(--tw-border-opacity))',
      borderLeftColor: 'rgba(79, 70, 229, var(--tw-border-opacity))',
    },
    'border-indigo-700': {
      '--tw-border-opacity': 1,
      borderTopColor: 'rgba(67, 56, 202, var(--tw-border-opacity))',
      borderRightColor: 'rgba(67, 56, 202, var(--tw-border-opacity))',
      borderBottomColor: 'rgba(67, 56, 202, var(--tw-border-opacity))',
      borderLeftColor: 'rgba(67, 56, 202, var(--tw-border-opacity))',
    },
    'border-indigo-800': {
      '--tw-border-opacity': 1,
      borderTopColor: 'rgba(55, 48, 163, var(--tw-border-opacity))',
      borderRightColor: 'rgba(55, 48, 163, var(--tw-border-opacity))',
      borderBottomColor: 'rgba(55, 48, 163, var(--tw-border-opacity))',
      borderLeftColor: 'rgba(55, 48, 163, var(--tw-border-opacity))',
    },
    'border-indigo-900': {
      '--tw-border-opacity': 1,
      borderTopColor: 'rgba(49, 46, 129, var(--tw-border-opacity))',
      borderRightColor: 'rgba(49, 46, 129, var(--tw-border-opacity))',
      borderBottomColor: 'rgba(49, 46, 129, var(--tw-border-opacity))',
      borderLeftColor: 'rgba(49, 46, 129, var(--tw-border-opacity))',
    },
    'border-purple-50': {
      '--tw-border-opacity': 1,
      borderTopColor: 'rgba(245, 243, 255, var(--tw-border-opacity))',
      borderRightColor: 'rgba(245, 243, 255, var(--tw-border-opacity))',
      borderBottomColor: 'rgba(245, 243, 255, var(--tw-border-opacity))',
      borderLeftColor: 'rgba(245, 243, 255, var(--tw-border-opacity))',
    },
    'border-purple-100': {
      '--tw-border-opacity': 1,
      borderTopColor: 'rgba(237, 233, 254, var(--tw-border-opacity))',
      borderRightColor: 'rgba(237, 233, 254, var(--tw-border-opacity))',
      borderBottomColor: 'rgba(237, 233, 254, var(--tw-border-opacity))',
      borderLeftColor: 'rgba(237, 233, 254, var(--tw-border-opacity))',
    },
    'border-purple-200': {
      '--tw-border-opacity': 1,
      borderTopColor: 'rgba(221, 214, 254, var(--tw-border-opacity))',
      borderRightColor: 'rgba(221, 214, 254, var(--tw-border-opacity))',
      borderBottomColor: 'rgba(221, 214, 254, var(--tw-border-opacity))',
      borderLeftColor: 'rgba(221, 214, 254, var(--tw-border-opacity))',
    },
    'border-purple-300': {
      '--tw-border-opacity': 1,
      borderTopColor: 'rgba(196, 181, 253, var(--tw-border-opacity))',
      borderRightColor: 'rgba(196, 181, 253, var(--tw-border-opacity))',
      borderBottomColor: 'rgba(196, 181, 253, var(--tw-border-opacity))',
      borderLeftColor: 'rgba(196, 181, 253, var(--tw-border-opacity))',
    },
    'border-purple-400': {
      '--tw-border-opacity': 1,
      borderTopColor: 'rgba(167, 139, 250, var(--tw-border-opacity))',
      borderRightColor: 'rgba(167, 139, 250, var(--tw-border-opacity))',
      borderBottomColor: 'rgba(167, 139, 250, var(--tw-border-opacity))',
      borderLeftColor: 'rgba(167, 139, 250, var(--tw-border-opacity))',
    },
    'border-purple-500': {
      '--tw-border-opacity': 1,
      borderTopColor: 'rgba(139, 92, 246, var(--tw-border-opacity))',
      borderRightColor: 'rgba(139, 92, 246, var(--tw-border-opacity))',
      borderBottomColor: 'rgba(139, 92, 246, var(--tw-border-opacity))',
      borderLeftColor: 'rgba(139, 92, 246, var(--tw-border-opacity))',
    },
    'border-purple-600': {
      '--tw-border-opacity': 1,
      borderTopColor: 'rgba(124, 58, 237, var(--tw-border-opacity))',
      borderRightColor: 'rgba(124, 58, 237, var(--tw-border-opacity))',
      borderBottomColor: 'rgba(124, 58, 237, var(--tw-border-opacity))',
      borderLeftColor: 'rgba(124, 58, 237, var(--tw-border-opacity))',
    },
    'border-purple-700': {
      '--tw-border-opacity': 1,
      borderTopColor: 'rgba(109, 40, 217, var(--tw-border-opacity))',
      borderRightColor: 'rgba(109, 40, 217, var(--tw-border-opacity))',
      borderBottomColor: 'rgba(109, 40, 217, var(--tw-border-opacity))',
      borderLeftColor: 'rgba(109, 40, 217, var(--tw-border-opacity))',
    },
    'border-purple-800': {
      '--tw-border-opacity': 1,
      borderTopColor: 'rgba(91, 33, 182, var(--tw-border-opacity))',
      borderRightColor: 'rgba(91, 33, 182, var(--tw-border-opacity))',
      borderBottomColor: 'rgba(91, 33, 182, var(--tw-border-opacity))',
      borderLeftColor: 'rgba(91, 33, 182, var(--tw-border-opacity))',
    },
    'border-purple-900': {
      '--tw-border-opacity': 1,
      borderTopColor: 'rgba(76, 29, 149, var(--tw-border-opacity))',
      borderRightColor: 'rgba(76, 29, 149, var(--tw-border-opacity))',
      borderBottomColor: 'rgba(76, 29, 149, var(--tw-border-opacity))',
      borderLeftColor: 'rgba(76, 29, 149, var(--tw-border-opacity))',
    },
    'border-pink-50': {
      '--tw-border-opacity': 1,
      borderTopColor: 'rgba(253, 242, 248, var(--tw-border-opacity))',
      borderRightColor: 'rgba(253, 242, 248, var(--tw-border-opacity))',
      borderBottomColor: 'rgba(253, 242, 248, var(--tw-border-opacity))',
      borderLeftColor: 'rgba(253, 242, 248, var(--tw-border-opacity))',
    },
    'border-pink-100': {
      '--tw-border-opacity': 1,
      borderTopColor: 'rgba(252, 231, 243, var(--tw-border-opacity))',
      borderRightColor: 'rgba(252, 231, 243, var(--tw-border-opacity))',
      borderBottomColor: 'rgba(252, 231, 243, var(--tw-border-opacity))',
      borderLeftColor: 'rgba(252, 231, 243, var(--tw-border-opacity))',
    },
    'border-pink-200': {
      '--tw-border-opacity': 1,
      borderTopColor: 'rgba(251, 207, 232, var(--tw-border-opacity))',
      borderRightColor: 'rgba(251, 207, 232, var(--tw-border-opacity))',
      borderBottomColor: 'rgba(251, 207, 232, var(--tw-border-opacity))',
      borderLeftColor: 'rgba(251, 207, 232, var(--tw-border-opacity))',
    },
    'border-pink-300': {
      '--tw-border-opacity': 1,
      borderTopColor: 'rgba(249, 168, 212, var(--tw-border-opacity))',
      borderRightColor: 'rgba(249, 168, 212, var(--tw-border-opacity))',
      borderBottomColor: 'rgba(249, 168, 212, var(--tw-border-opacity))',
      borderLeftColor: 'rgba(249, 168, 212, var(--tw-border-opacity))',
    },
    'border-pink-400': {
      '--tw-border-opacity': 1,
      borderTopColor: 'rgba(244, 114, 182, var(--tw-border-opacity))',
      borderRightColor: 'rgba(244, 114, 182, var(--tw-border-opacity))',
      borderBottomColor: 'rgba(244, 114, 182, var(--tw-border-opacity))',
      borderLeftColor: 'rgba(244, 114, 182, var(--tw-border-opacity))',
    },
    'border-pink-500': {
      '--tw-border-opacity': 1,
      borderTopColor: 'rgba(236, 72, 153, var(--tw-border-opacity))',
      borderRightColor: 'rgba(236, 72, 153, var(--tw-border-opacity))',
      borderBottomColor: 'rgba(236, 72, 153, var(--tw-border-opacity))',
      borderLeftColor: 'rgba(236, 72, 153, var(--tw-border-opacity))',
    },
    'border-pink-600': {
      '--tw-border-opacity': 1,
      borderTopColor: 'rgba(219, 39, 119, var(--tw-border-opacity))',
      borderRightColor: 'rgba(219, 39, 119, var(--tw-border-opacity))',
      borderBottomColor: 'rgba(219, 39, 119, var(--tw-border-opacity))',
      borderLeftColor: 'rgba(219, 39, 119, var(--tw-border-opacity))',
    },
    'border-pink-700': {
      '--tw-border-opacity': 1,
      borderTopColor: 'rgba(190, 24, 93, var(--tw-border-opacity))',
      borderRightColor: 'rgba(190, 24, 93, var(--tw-border-opacity))',
      borderBottomColor: 'rgba(190, 24, 93, var(--tw-border-opacity))',
      borderLeftColor: 'rgba(190, 24, 93, var(--tw-border-opacity))',
    },
    'border-pink-800': {
      '--tw-border-opacity': 1,
      borderTopColor: 'rgba(157, 23, 77, var(--tw-border-opacity))',
      borderRightColor: 'rgba(157, 23, 77, var(--tw-border-opacity))',
      borderBottomColor: 'rgba(157, 23, 77, var(--tw-border-opacity))',
      borderLeftColor: 'rgba(157, 23, 77, var(--tw-border-opacity))',
    },
    'border-pink-900': {
      '--tw-border-opacity': 1,
      borderTopColor: 'rgba(131, 24, 67, var(--tw-border-opacity))',
      borderRightColor: 'rgba(131, 24, 67, var(--tw-border-opacity))',
      borderBottomColor: 'rgba(131, 24, 67, var(--tw-border-opacity))',
      borderLeftColor: 'rgba(131, 24, 67, var(--tw-border-opacity))',
    },
    'border-opacity-0': {
      '--tw-border-opacity': 0,
    },
    'border-opacity-5': {
      '--tw-border-opacity': 0.05,
    },
    'border-opacity-10': {
      '--tw-border-opacity': 0.1,
    },
    'border-opacity-20': {
      '--tw-border-opacity': 0.2,
    },
    'border-opacity-25': {
      '--tw-border-opacity': 0.25,
    },
    'border-opacity-30': {
      '--tw-border-opacity': 0.3,
    },
    'border-opacity-40': {
      '--tw-border-opacity': 0.4,
    },
    'border-opacity-50': {
      '--tw-border-opacity': 0.5,
    },
    'border-opacity-60': {
      '--tw-border-opacity': 0.6,
    },
    'border-opacity-70': {
      '--tw-border-opacity': 0.7,
    },
    'border-opacity-75': {
      '--tw-border-opacity': 0.75,
    },
    'border-opacity-80': {
      '--tw-border-opacity': 0.8,
    },
    'border-opacity-90': {
      '--tw-border-opacity': 0.9,
    },
    'border-opacity-95': {
      '--tw-border-opacity': 0.95,
    },
    'border-opacity-100': {
      '--tw-border-opacity': 1,
    },
    'rounded-none': {
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
      borderBottomLeftRadius: 0,
    },
    'rounded-sm': {
      borderTopLeftRadius: 2,
      borderTopRightRadius: 2,
      borderBottomRightRadius: 2,
      borderBottomLeftRadius: 2,
    },
    rounded: {
      borderTopLeftRadius: 4,
      borderTopRightRadius: 4,
      borderBottomRightRadius: 4,
      borderBottomLeftRadius: 4,
    },
    'rounded-md': {
      borderTopLeftRadius: 6,
      borderTopRightRadius: 6,
      borderBottomRightRadius: 6,
      borderBottomLeftRadius: 6,
    },
    'rounded-lg': {
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
      borderBottomRightRadius: 8,
      borderBottomLeftRadius: 8,
    },
    'rounded-xl': {
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
      borderBottomRightRadius: 12,
      borderBottomLeftRadius: 12,
    },
    'rounded-2xl': {
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      borderBottomRightRadius: 16,
      borderBottomLeftRadius: 16,
    },
    'rounded-3xl': {
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      borderBottomRightRadius: 24,
      borderBottomLeftRadius: 24,
    },
    'rounded-full': {
      borderTopLeftRadius: 9999,
      borderTopRightRadius: 9999,
      borderBottomRightRadius: 9999,
      borderBottomLeftRadius: 9999,
    },
    'rounded-t-none': {
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
    },
    'rounded-r-none': {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    },
    'rounded-b-none': {
      borderBottomRightRadius: 0,
      borderBottomLeftRadius: 0,
    },
    'rounded-l-none': {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
    },
    'rounded-t-sm': {
      borderTopLeftRadius: 2,
      borderTopRightRadius: 2,
    },
    'rounded-r-sm': {
      borderTopRightRadius: 2,
      borderBottomRightRadius: 2,
    },
    'rounded-b-sm': {
      borderBottomRightRadius: 2,
      borderBottomLeftRadius: 2,
    },
    'rounded-l-sm': {
      borderTopLeftRadius: 2,
      borderBottomLeftRadius: 2,
    },
    'rounded-t': {
      borderTopLeftRadius: 4,
      borderTopRightRadius: 4,
    },
    'rounded-r': {
      borderTopRightRadius: 4,
      borderBottomRightRadius: 4,
    },
    'rounded-b': {
      borderBottomRightRadius: 4,
      borderBottomLeftRadius: 4,
    },
    'rounded-l': {
      borderTopLeftRadius: 4,
      borderBottomLeftRadius: 4,
    },
    'rounded-t-md': {
      borderTopLeftRadius: 6,
      borderTopRightRadius: 6,
    },
    'rounded-r-md': {
      borderTopRightRadius: 6,
      borderBottomRightRadius: 6,
    },
    'rounded-b-md': {
      borderBottomRightRadius: 6,
      borderBottomLeftRadius: 6,
    },
    'rounded-l-md': {
      borderTopLeftRadius: 6,
      borderBottomLeftRadius: 6,
    },
    'rounded-t-lg': {
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
    },
    'rounded-r-lg': {
      borderTopRightRadius: 8,
      borderBottomRightRadius: 8,
    },
    'rounded-b-lg': {
      borderBottomRightRadius: 8,
      borderBottomLeftRadius: 8,
    },
    'rounded-l-lg': {
      borderTopLeftRadius: 8,
      borderBottomLeftRadius: 8,
    },
    'rounded-t-xl': {
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
    },
    'rounded-r-xl': {
      borderTopRightRadius: 12,
      borderBottomRightRadius: 12,
    },
    'rounded-b-xl': {
      borderBottomRightRadius: 12,
      borderBottomLeftRadius: 12,
    },
    'rounded-l-xl': {
      borderTopLeftRadius: 12,
      borderBottomLeftRadius: 12,
    },
    'rounded-t-2xl': {
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
    },
    'rounded-r-2xl': {
      borderTopRightRadius: 16,
      borderBottomRightRadius: 16,
    },
    'rounded-b-2xl': {
      borderBottomRightRadius: 16,
      borderBottomLeftRadius: 16,
    },
    'rounded-l-2xl': {
      borderTopLeftRadius: 16,
      borderBottomLeftRadius: 16,
    },
    'rounded-t-3xl': {
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
    },
    'rounded-r-3xl': {
      borderTopRightRadius: 24,
      borderBottomRightRadius: 24,
    },
    'rounded-b-3xl': {
      borderBottomRightRadius: 24,
      borderBottomLeftRadius: 24,
    },
    'rounded-l-3xl': {
      borderTopLeftRadius: 24,
      borderBottomLeftRadius: 24,
    },
    'rounded-t-full': {
      borderTopLeftRadius: 9999,
      borderTopRightRadius: 9999,
    },
    'rounded-r-full': {
      borderTopRightRadius: 9999,
      borderBottomRightRadius: 9999,
    },
    'rounded-b-full': {
      borderBottomRightRadius: 9999,
      borderBottomLeftRadius: 9999,
    },
    'rounded-l-full': {
      borderTopLeftRadius: 9999,
      borderBottomLeftRadius: 9999,
    },
    'rounded-tl-none': {
      borderTopLeftRadius: 0,
    },
    'rounded-tr-none': {
      borderTopRightRadius: 0,
    },
    'rounded-br-none': {
      borderBottomRightRadius: 0,
    },
    'rounded-bl-none': {
      borderBottomLeftRadius: 0,
    },
    'rounded-tl-sm': {
      borderTopLeftRadius: 2,
    },
    'rounded-tr-sm': {
      borderTopRightRadius: 2,
    },
    'rounded-br-sm': {
      borderBottomRightRadius: 2,
    },
    'rounded-bl-sm': {
      borderBottomLeftRadius: 2,
    },
    'rounded-tl': {
      borderTopLeftRadius: 4,
    },
    'rounded-tr': {
      borderTopRightRadius: 4,
    },
    'rounded-br': {
      borderBottomRightRadius: 4,
    },
    'rounded-bl': {
      borderBottomLeftRadius: 4,
    },
    'rounded-tl-md': {
      borderTopLeftRadius: 6,
    },
    'rounded-tr-md': {
      borderTopRightRadius: 6,
    },
    'rounded-br-md': {
      borderBottomRightRadius: 6,
    },
    'rounded-bl-md': {
      borderBottomLeftRadius: 6,
    },
    'rounded-tl-lg': {
      borderTopLeftRadius: 8,
    },
    'rounded-tr-lg': {
      borderTopRightRadius: 8,
    },
    'rounded-br-lg': {
      borderBottomRightRadius: 8,
    },
    'rounded-bl-lg': {
      borderBottomLeftRadius: 8,
    },
    'rounded-tl-xl': {
      borderTopLeftRadius: 12,
    },
    'rounded-tr-xl': {
      borderTopRightRadius: 12,
    },
    'rounded-br-xl': {
      borderBottomRightRadius: 12,
    },
    'rounded-bl-xl': {
      borderBottomLeftRadius: 12,
    },
    'rounded-tl-2xl': {
      borderTopLeftRadius: 16,
    },
    'rounded-tr-2xl': {
      borderTopRightRadius: 16,
    },
    'rounded-br-2xl': {
      borderBottomRightRadius: 16,
    },
    'rounded-bl-2xl': {
      borderBottomLeftRadius: 16,
    },
    'rounded-tl-3xl': {
      borderTopLeftRadius: 24,
    },
    'rounded-tr-3xl': {
      borderTopRightRadius: 24,
    },
    'rounded-br-3xl': {
      borderBottomRightRadius: 24,
    },
    'rounded-bl-3xl': {
      borderBottomLeftRadius: 24,
    },
    'rounded-tl-full': {
      borderTopLeftRadius: 9999,
    },
    'rounded-tr-full': {
      borderTopRightRadius: 9999,
    },
    'rounded-br-full': {
      borderBottomRightRadius: 9999,
    },
    'rounded-bl-full': {
      borderBottomLeftRadius: 9999,
    },
    'border-solid': {
      borderStyle: 'solid',
    },
    'border-dashed': {
      borderStyle: 'dashed',
    },
    'border-dotted': {
      borderStyle: 'dotted',
    },
    'border-double': {
      borderStyle: 'double',
    },
    'border-none': {
      borderStyle: 'none',
    },
    'border-0': {
      borderTopWidth: 0,
      borderRightWidth: 0,
      borderBottomWidth: 0,
      borderLeftWidth: 0,
    },
    'border-2': {
      borderTopWidth: 2,
      borderRightWidth: 2,
      borderBottomWidth: 2,
      borderLeftWidth: 2,
    },
    'border-4': {
      borderTopWidth: 4,
      borderRightWidth: 4,
      borderBottomWidth: 4,
      borderLeftWidth: 4,
    },
    'border-8': {
      borderTopWidth: 8,
      borderRightWidth: 8,
      borderBottomWidth: 8,
      borderLeftWidth: 8,
    },
    border: {
      borderTopWidth: 1,
      borderRightWidth: 1,
      borderBottomWidth: 1,
      borderLeftWidth: 1,
    },
    'border-t-0': {
      borderTopWidth: 0,
    },
    'border-r-0': {
      borderRightWidth: 0,
    },
    'border-b-0': {
      borderBottomWidth: 0,
    },
    'border-l-0': {
      borderLeftWidth: 0,
    },
    'border-t-2': {
      borderTopWidth: 2,
    },
    'border-r-2': {
      borderRightWidth: 2,
    },
    'border-b-2': {
      borderBottomWidth: 2,
    },
    'border-l-2': {
      borderLeftWidth: 2,
    },
    'border-t-4': {
      borderTopWidth: 4,
    },
    'border-r-4': {
      borderRightWidth: 4,
    },
    'border-b-4': {
      borderBottomWidth: 4,
    },
    'border-l-4': {
      borderLeftWidth: 4,
    },
    'border-t-8': {
      borderTopWidth: 8,
    },
    'border-r-8': {
      borderRightWidth: 8,
    },
    'border-b-8': {
      borderBottomWidth: 8,
    },
    'border-l-8': {
      borderLeftWidth: 8,
    },
    'border-t': {
      borderTopWidth: 1,
    },
    'border-r': {
      borderRightWidth: 1,
    },
    'border-b': {
      borderBottomWidth: 1,
    },
    'border-l': {
      borderLeftWidth: 1,
    },
    flex: {
      display: 'flex',
    },
    hidden: {
      display: 'none',
    },
    'flex-row': {
      flexDirection: 'row',
    },
    'flex-row-reverse': {
      flexDirection: 'row-reverse',
    },
    'flex-col': {
      flexDirection: 'column',
    },
    'flex-col-reverse': {
      flexDirection: 'column-reverse',
    },
    'flex-wrap': {
      flexWrap: 'wrap',
    },
    'flex-wrap-reverse': {
      flexWrap: 'wrap-reverse',
    },
    'flex-nowrap': {
      flexWrap: 'nowrap',
    },
    'items-start': {
      alignItems: 'flex-start',
    },
    'items-end': {
      alignItems: 'flex-end',
    },
    'items-center': {
      alignItems: 'center',
    },
    'items-baseline': {
      alignItems: 'baseline',
    },
    'items-stretch': {
      alignItems: 'stretch',
    },
    'content-center': {
      alignContent: 'center',
    },
    'content-start': {
      alignContent: 'flex-start',
    },
    'content-end': {
      alignContent: 'flex-end',
    },
    'content-between': {
      alignContent: 'space-between',
    },
    'content-around': {
      alignContent: 'space-around',
    },
    'content-evenly': {
      alignContent: 'space-evenly',
    },
    'self-start': {
      alignSelf: 'flex-start',
    },
    'self-end': {
      alignSelf: 'flex-end',
    },
    'self-center': {
      alignSelf: 'center',
    },
    'self-stretch': {
      alignSelf: 'stretch',
    },
    'justify-start': {
      justifyContent: 'flex-start',
    },
    'justify-end': {
      justifyContent: 'flex-end',
    },
    'justify-center': {
      justifyContent: 'center',
    },
    'justify-between': {
      justifyContent: 'space-between',
    },
    'justify-around': {
      justifyContent: 'space-around',
    },
    'justify-evenly': {
      justifyContent: 'space-evenly',
    },
    'flex-1': {
      flexGrow: 1,
      flexShrink: 1,
      flexBasis: '0%',
    },
    'flex-auto': {
      flexGrow: 1,
      flexShrink: 1,
      flexBasis: 'auto',
    },
    'flex-initial': {
      flexGrow: 0,
      flexShrink: 1,
      flexBasis: 'auto',
    },
    'flex-none': {
      flexGrow: 0,
      flexShrink: 0,
      flexBasis: 'auto',
    },
    'flex-grow-0': {
      flexGrow: 0,
    },
    'flex-grow': {
      flexGrow: 1,
    },
    'flex-shrink-0': {
      flexShrink: 0,
    },
    'flex-shrink': {
      flexShrink: 1,
    },
    'font-thin': {
      fontWeight: '100',
    },
    'font-extralight': {
      fontWeight: '200',
    },
    'font-light': {
      fontWeight: '300',
    },
    'font-normal': {
      fontWeight: '400',
    },
    'font-medium': {
      fontWeight: '500',
    },
    'font-semibold': {
      fontWeight: '600',
    },
    'font-bold': {
      fontWeight: '700',
    },
    'font-extrabold': {
      fontWeight: '800',
    },
    'font-black': {
      fontWeight: '900',
    },
    'h-0': {
      height: 0,
    },
    'h-1': {
      height: 4,
    },
    'h-2': {
      height: 8,
    },
    'h-3': {
      height: 12,
    },
    'h-4': {
      height: 16,
    },
    'h-5': {
      height: 20,
    },
    'h-6': {
      height: 24,
    },
    'h-7': {
      height: 28,
    },
    'h-8': {
      height: 32,
    },
    'h-9': {
      height: 36,
    },
    'h-10': {
      height: 40,
    },
    'h-11': {
      height: 44,
    },
    'h-12': {
      height: 48,
    },
    'h-14': {
      height: 56,
    },
    'h-16': {
      height: 64,
    },
    'h-20': {
      height: 80,
    },
    'h-24': {
      height: 96,
    },
    'h-28': {
      height: 112,
    },
    'h-30': {
      height: 120,
    },
    'h-32': {
      height: 128,
    },
    'h-36': {
      height: 144,
    },
    'h-40': {
      height: 160,
    },
    'h-44': {
      height: 176,
    },
    'h-48': {
      height: 192,
    },
    'h-52': {
      height: 208,
    },
    'h-56': {
      height: 224,
    },
    'h-60': {
      height: 240,
    },
    'h-64': {
      height: 256,
    },
    'h-72': {
      height: 288,
    },
    'h-80': {
      height: 320,
    },
    'h-96': {
      height: 384,
    },
    'h-px': {
      height: 1,
    },
    'h-0.5': {
      height: 2,
    },
    'h-1.5': {
      height: 6,
    },
    'h-2.5': {
      height: 10,
    },
    'h-3.5': {
      height: 14,
    },
    'h-1/2': {
      height: '50%',
    },
    'h-1/3': {
      height: '33.333333%',
    },
    'h-2/3': {
      height: '66.666667%',
    },
    'h-1/4': {
      height: '25%',
    },
    'h-2/4': {
      height: '50%',
    },
    'h-3/4': {
      height: '75%',
    },
    'h-1/5': {
      height: '20%',
    },
    'h-2/5': {
      height: '40%',
    },
    'h-3/5': {
      height: '60%',
    },
    'h-4/5': {
      height: '80%',
    },
    'h-1/6': {
      height: '16.666667%',
    },
    'h-2/6': {
      height: '33.333333%',
    },
    'h-3/6': {
      height: '50%',
    },
    'h-4/6': {
      height: '66.666667%',
    },
    'h-5/6': {
      height: '83.333333%',
    },
    'h-full': {
      height: '100%',
    },
    'text-xs': {
      fontSize: 12,
      lineHeight: 16,
    },
    'text-sm': {
      fontSize: 14,
      lineHeight: 20,
    },
    'text-base': {
      fontSize: 16,
      lineHeight: 24,
    },
    'text-lg': {
      fontSize: 18,
      lineHeight: 28,
    },
    'text-xl': {
      fontSize: 20,
      lineHeight: 28,
    },
    'text-2xl': {
      fontSize: 24,
      lineHeight: 32,
    },
    'text-3xl': {
      fontSize: 30,
      lineHeight: 36,
    },
    'text-4xl': {
      fontSize: 36,
      lineHeight: 40,
    },
    'leading-3': {
      lineHeight: 12,
    },
    'leading-4': {
      lineHeight: 16,
    },
    'leading-5': {
      lineHeight: 20,
    },
    'leading-6': {
      lineHeight: 24,
    },
    'leading-7': {
      lineHeight: 28,
    },
    'leading-8': {
      lineHeight: 32,
    },
    'leading-9': {
      lineHeight: 36,
    },
    'leading-10': {
      lineHeight: 40,
    },
    'm-0': {
      marginTop: 0,
      marginRight: 0,
      marginBottom: 0,
      marginLeft: 0,
    },
    'm-1': {
      marginTop: 4,
      marginRight: 4,
      marginBottom: 4,
      marginLeft: 4,
    },
    'm-2': {
      marginTop: 8,
      marginRight: 8,
      marginBottom: 8,
      marginLeft: 8,
    },
    'm-3': {
      marginTop: 12,
      marginRight: 12,
      marginBottom: 12,
      marginLeft: 12,
    },
    'm-4': {
      marginTop: 16,
      marginRight: 16,
      marginBottom: 16,
      marginLeft: 16,
    },
    'm-5': {
      marginTop: 20,
      marginRight: 20,
      marginBottom: 20,
      marginLeft: 20,
    },
    'm-6': {
      marginTop: 24,
      marginRight: 24,
      marginBottom: 24,
      marginLeft: 24,
    },
    'm-7': {
      marginTop: 28,
      marginRight: 28,
      marginBottom: 28,
      marginLeft: 28,
    },
    'm-8': {
      marginTop: 32,
      marginRight: 32,
      marginBottom: 32,
      marginLeft: 32,
    },
    'm-9': {
      marginTop: 36,
      marginRight: 36,
      marginBottom: 36,
      marginLeft: 36,
    },
    'm-10': {
      marginTop: 40,
      marginRight: 40,
      marginBottom: 40,
      marginLeft: 40,
    },
    'm-11': {
      marginTop: 44,
      marginRight: 44,
      marginBottom: 44,
      marginLeft: 44,
    },
    'm-12': {
      marginTop: 48,
      marginRight: 48,
      marginBottom: 48,
      marginLeft: 48,
    },
    'm-14': {
      marginTop: 56,
      marginRight: 56,
      marginBottom: 56,
      marginLeft: 56,
    },
    'm-16': {
      marginTop: 64,
      marginRight: 64,
      marginBottom: 64,
      marginLeft: 64,
    },
    'm-20': {
      marginTop: 80,
      marginRight: 80,
      marginBottom: 80,
      marginLeft: 80,
    },
    'm-24': {
      marginTop: 96,
      marginRight: 96,
      marginBottom: 96,
      marginLeft: 96,
    },
    'm-28': {
      marginTop: 112,
      marginRight: 112,
      marginBottom: 112,
      marginLeft: 112,
    },
    'm-32': {
      marginTop: 128,
      marginRight: 128,
      marginBottom: 128,
      marginLeft: 128,
    },
    'm-36': {
      marginTop: 144,
      marginRight: 144,
      marginBottom: 144,
      marginLeft: 144,
    },
    'm-40': {
      marginTop: 160,
      marginRight: 160,
      marginBottom: 160,
      marginLeft: 160,
    },
    'm-44': {
      marginTop: 176,
      marginRight: 176,
      marginBottom: 176,
      marginLeft: 176,
    },
    'm-48': {
      marginTop: 192,
      marginRight: 192,
      marginBottom: 192,
      marginLeft: 192,
    },
    'm-52': {
      marginTop: 208,
      marginRight: 208,
      marginBottom: 208,
      marginLeft: 208,
    },
    'm-56': {
      marginTop: 224,
      marginRight: 224,
      marginBottom: 224,
      marginLeft: 224,
    },
    'm-60': {
      marginTop: 240,
      marginRight: 240,
      marginBottom: 240,
      marginLeft: 240,
    },
    'm-64': {
      marginTop: 256,
      marginRight: 256,
      marginBottom: 256,
      marginLeft: 256,
    },
    'm-72': {
      marginTop: 288,
      marginRight: 288,
      marginBottom: 288,
      marginLeft: 288,
    },
    'm-80': {
      marginTop: 320,
      marginRight: 320,
      marginBottom: 320,
      marginLeft: 320,
    },
    'm-96': {
      marginTop: 384,
      marginRight: 384,
      marginBottom: 384,
      marginLeft: 384,
    },
    'm-px': {
      marginTop: 1,
      marginRight: 1,
      marginBottom: 1,
      marginLeft: 1,
    },
    'm-0.5': {
      marginTop: 2,
      marginRight: 2,
      marginBottom: 2,
      marginLeft: 2,
    },
    'm-1.5': {
      marginTop: 6,
      marginRight: 6,
      marginBottom: 6,
      marginLeft: 6,
    },
    'm-2.5': {
      marginTop: 10,
      marginRight: 10,
      marginBottom: 10,
      marginLeft: 10,
    },
    'm-3.5': {
      marginTop: 14,
      marginRight: 14,
      marginBottom: 14,
      marginLeft: 14,
    },
    '-m-0': {
      marginTop: 0,
      marginRight: 0,
      marginBottom: 0,
      marginLeft: 0,
    },
    '-m-1': {
      marginTop: -4,
      marginRight: -4,
      marginBottom: -4,
      marginLeft: -4,
    },
    '-m-2': {
      marginTop: -8,
      marginRight: -8,
      marginBottom: -8,
      marginLeft: -8,
    },
    '-m-3': {
      marginTop: -12,
      marginRight: -12,
      marginBottom: -12,
      marginLeft: -12,
    },
    '-m-4': {
      marginTop: -16,
      marginRight: -16,
      marginBottom: -16,
      marginLeft: -16,
    },
    '-m-5': {
      marginTop: -20,
      marginRight: -20,
      marginBottom: -20,
      marginLeft: -20,
    },
    '-m-6': {
      marginTop: -24,
      marginRight: -24,
      marginBottom: -24,
      marginLeft: -24,
    },
    '-m-7': {
      marginTop: -28,
      marginRight: -28,
      marginBottom: -28,
      marginLeft: -28,
    },
    '-m-8': {
      marginTop: -32,
      marginRight: -32,
      marginBottom: -32,
      marginLeft: -32,
    },
    '-m-9': {
      marginTop: -36,
      marginRight: -36,
      marginBottom: -36,
      marginLeft: -36,
    },
    '-m-10': {
      marginTop: -40,
      marginRight: -40,
      marginBottom: -40,
      marginLeft: -40,
    },
    '-m-11': {
      marginTop: -44,
      marginRight: -44,
      marginBottom: -44,
      marginLeft: -44,
    },
    '-m-12': {
      marginTop: -48,
      marginRight: -48,
      marginBottom: -48,
      marginLeft: -48,
    },
    '-m-14': {
      marginTop: -56,
      marginRight: -56,
      marginBottom: -56,
      marginLeft: -56,
    },
    '-m-16': {
      marginTop: -64,
      marginRight: -64,
      marginBottom: -64,
      marginLeft: -64,
    },
    '-m-20': {
      marginTop: -80,
      marginRight: -80,
      marginBottom: -80,
      marginLeft: -80,
    },
    '-m-24': {
      marginTop: -96,
      marginRight: -96,
      marginBottom: -96,
      marginLeft: -96,
    },
    '-m-28': {
      marginTop: -112,
      marginRight: -112,
      marginBottom: -112,
      marginLeft: -112,
    },
    '-m-32': {
      marginTop: -128,
      marginRight: -128,
      marginBottom: -128,
      marginLeft: -128,
    },
    '-m-36': {
      marginTop: -144,
      marginRight: -144,
      marginBottom: -144,
      marginLeft: -144,
    },
    '-m-40': {
      marginTop: -160,
      marginRight: -160,
      marginBottom: -160,
      marginLeft: -160,
    },
    '-m-44': {
      marginTop: -176,
      marginRight: -176,
      marginBottom: -176,
      marginLeft: -176,
    },
    '-m-48': {
      marginTop: -192,
      marginRight: -192,
      marginBottom: -192,
      marginLeft: -192,
    },
    '-m-52': {
      marginTop: -208,
      marginRight: -208,
      marginBottom: -208,
      marginLeft: -208,
    },
    '-m-56': {
      marginTop: -224,
      marginRight: -224,
      marginBottom: -224,
      marginLeft: -224,
    },
    '-m-60': {
      marginTop: -240,
      marginRight: -240,
      marginBottom: -240,
      marginLeft: -240,
    },
    '-m-64': {
      marginTop: -256,
      marginRight: -256,
      marginBottom: -256,
      marginLeft: -256,
    },
    '-m-72': {
      marginTop: -288,
      marginRight: -288,
      marginBottom: -288,
      marginLeft: -288,
    },
    '-m-80': {
      marginTop: -320,
      marginRight: -320,
      marginBottom: -320,
      marginLeft: -320,
    },
    '-m-96': {
      marginTop: -384,
      marginRight: -384,
      marginBottom: -384,
      marginLeft: -384,
    },
    '-m-px': {
      marginTop: -1,
      marginRight: -1,
      marginBottom: -1,
      marginLeft: -1,
    },
    '-m-0.5': {
      marginTop: -2,
      marginRight: -2,
      marginBottom: -2,
      marginLeft: -2,
    },
    '-m-1.5': {
      marginTop: -6,
      marginRight: -6,
      marginBottom: -6,
      marginLeft: -6,
    },
    '-m-2.5': {
      marginTop: -10,
      marginRight: -10,
      marginBottom: -10,
      marginLeft: -10,
    },
    '-m-3.5': {
      marginTop: -14,
      marginRight: -14,
      marginBottom: -14,
      marginLeft: -14,
    },
    'my-0': {
      marginTop: 0,
      marginBottom: 0,
    },
    'mx-0': {
      marginLeft: 0,
      marginRight: 0,
    },
    'my-1': {
      marginTop: 4,
      marginBottom: 4,
    },
    'mx-1': {
      marginLeft: 4,
      marginRight: 4,
    },
    'my-2': {
      marginTop: 8,
      marginBottom: 8,
    },
    'mx-2': {
      marginLeft: 8,
      marginRight: 8,
    },
    'my-3': {
      marginTop: 12,
      marginBottom: 12,
    },
    'mx-3': {
      marginLeft: 12,
      marginRight: 12,
    },
    'my-4': {
      marginTop: 16,
      marginBottom: 16,
    },
    'mx-4': {
      marginLeft: 16,
      marginRight: 16,
    },
    'my-5': {
      marginTop: 20,
      marginBottom: 20,
    },
    'mx-5': {
      marginLeft: 20,
      marginRight: 20,
    },
    'my-6': {
      marginTop: 24,
      marginBottom: 24,
    },
    'mx-6': {
      marginLeft: 24,
      marginRight: 24,
    },
    'my-7': {
      marginTop: 28,
      marginBottom: 28,
    },
    'mx-7': {
      marginLeft: 28,
      marginRight: 28,
    },
    'my-8': {
      marginTop: 32,
      marginBottom: 32,
    },
    'mx-8': {
      marginLeft: 32,
      marginRight: 32,
    },
    'my-9': {
      marginTop: 36,
      marginBottom: 36,
    },
    'mx-9': {
      marginLeft: 36,
      marginRight: 36,
    },
    'my-10': {
      marginTop: 40,
      marginBottom: 40,
    },
    'mx-10': {
      marginLeft: 40,
      marginRight: 40,
    },
    'my-11': {
      marginTop: 44,
      marginBottom: 44,
    },
    'mx-11': {
      marginLeft: 44,
      marginRight: 44,
    },
    'my-12': {
      marginTop: 48,
      marginBottom: 48,
    },
    'mx-12': {
      marginLeft: 48,
      marginRight: 48,
    },
    'my-14': {
      marginTop: 56,
      marginBottom: 56,
    },
    'mx-14': {
      marginLeft: 56,
      marginRight: 56,
    },
    'my-16': {
      marginTop: 64,
      marginBottom: 64,
    },
    'mx-16': {
      marginLeft: 64,
      marginRight: 64,
    },
    'my-20': {
      marginTop: 80,
      marginBottom: 80,
    },
    'mx-20': {
      marginLeft: 80,
      marginRight: 80,
    },
    'my-24': {
      marginTop: 96,
      marginBottom: 96,
    },
    'mx-24': {
      marginLeft: 96,
      marginRight: 96,
    },
    'my-28': {
      marginTop: 112,
      marginBottom: 112,
    },
    'mx-28': {
      marginLeft: 112,
      marginRight: 112,
    },
    'my-32': {
      marginTop: 128,
      marginBottom: 128,
    },
    'mx-32': {
      marginLeft: 128,
      marginRight: 128,
    },
    'my-36': {
      marginTop: 144,
      marginBottom: 144,
    },
    'mx-36': {
      marginLeft: 144,
      marginRight: 144,
    },
    'my-40': {
      marginTop: 160,
      marginBottom: 160,
    },
    'mx-40': {
      marginLeft: 160,
      marginRight: 160,
    },
    'my-44': {
      marginTop: 176,
      marginBottom: 176,
    },
    'mx-44': {
      marginLeft: 176,
      marginRight: 176,
    },
    'my-48': {
      marginTop: 192,
      marginBottom: 192,
    },
    'mx-48': {
      marginLeft: 192,
      marginRight: 192,
    },
    'my-52': {
      marginTop: 208,
      marginBottom: 208,
    },
    'mx-52': {
      marginLeft: 208,
      marginRight: 208,
    },
    'my-56': {
      marginTop: 224,
      marginBottom: 224,
    },
    'mx-56': {
      marginLeft: 224,
      marginRight: 224,
    },
    'my-60': {
      marginTop: 240,
      marginBottom: 240,
    },
    'mx-60': {
      marginLeft: 240,
      marginRight: 240,
    },
    'my-64': {
      marginTop: 256,
      marginBottom: 256,
    },
    'mx-64': {
      marginLeft: 256,
      marginRight: 256,
    },
    'my-72': {
      marginTop: 288,
      marginBottom: 288,
    },
    'mx-72': {
      marginLeft: 288,
      marginRight: 288,
    },
    'my-80': {
      marginTop: 320,
      marginBottom: 320,
    },
    'mx-80': {
      marginLeft: 320,
      marginRight: 320,
    },
    'my-96': {
      marginTop: 384,
      marginBottom: 384,
    },
    'mx-96': {
      marginLeft: 384,
      marginRight: 384,
    },
    'my-px': {
      marginTop: 1,
      marginBottom: 1,
    },
    'mx-px': {
      marginLeft: 1,
      marginRight: 1,
    },
    'my-0.5': {
      marginTop: 2,
      marginBottom: 2,
    },
    'mx-0.5': {
      marginLeft: 2,
      marginRight: 2,
    },
    'my-1.5': {
      marginTop: 6,
      marginBottom: 6,
    },
    'mx-1.5': {
      marginLeft: 6,
      marginRight: 6,
    },
    'my-2.5': {
      marginTop: 10,
      marginBottom: 10,
    },
    'mx-2.5': {
      marginLeft: 10,
      marginRight: 10,
    },
    'my-3.5': {
      marginTop: 14,
      marginBottom: 14,
    },
    'mx-3.5': {
      marginLeft: 14,
      marginRight: 14,
    },
    '-my-0': {
      marginTop: 0,
      marginBottom: 0,
    },
    '-mx-0': {
      marginLeft: 0,
      marginRight: 0,
    },
    '-my-1': {
      marginTop: -4,
      marginBottom: -4,
    },
    '-mx-1': {
      marginLeft: -4,
      marginRight: -4,
    },
    '-my-2': {
      marginTop: -8,
      marginBottom: -8,
    },
    '-mx-2': {
      marginLeft: -8,
      marginRight: -8,
    },
    '-my-3': {
      marginTop: -12,
      marginBottom: -12,
    },
    '-mx-3': {
      marginLeft: -12,
      marginRight: -12,
    },
    '-my-4': {
      marginTop: -16,
      marginBottom: -16,
    },
    '-mx-4': {
      marginLeft: -16,
      marginRight: -16,
    },
    '-my-5': {
      marginTop: -20,
      marginBottom: -20,
    },
    '-mx-5': {
      marginLeft: -20,
      marginRight: -20,
    },
    '-my-6': {
      marginTop: -24,
      marginBottom: -24,
    },
    '-mx-6': {
      marginLeft: -24,
      marginRight: -24,
    },
    '-my-7': {
      marginTop: -28,
      marginBottom: -28,
    },
    '-mx-7': {
      marginLeft: -28,
      marginRight: -28,
    },
    '-my-8': {
      marginTop: -32,
      marginBottom: -32,
    },
    '-mx-8': {
      marginLeft: -32,
      marginRight: -32,
    },
    '-my-9': {
      marginTop: -36,
      marginBottom: -36,
    },
    '-mx-9': {
      marginLeft: -36,
      marginRight: -36,
    },
    '-my-10': {
      marginTop: -40,
      marginBottom: -40,
    },
    '-mx-10': {
      marginLeft: -40,
      marginRight: -40,
    },
    '-my-11': {
      marginTop: -44,
      marginBottom: -44,
    },
    '-mx-11': {
      marginLeft: -44,
      marginRight: -44,
    },
    '-my-12': {
      marginTop: -48,
      marginBottom: -48,
    },
    '-mx-12': {
      marginLeft: -48,
      marginRight: -48,
    },
    '-my-14': {
      marginTop: -56,
      marginBottom: -56,
    },
    '-mx-14': {
      marginLeft: -56,
      marginRight: -56,
    },
    '-my-16': {
      marginTop: -64,
      marginBottom: -64,
    },
    '-mx-16': {
      marginLeft: -64,
      marginRight: -64,
    },
    '-my-20': {
      marginTop: -80,
      marginBottom: -80,
    },
    '-mx-20': {
      marginLeft: -80,
      marginRight: -80,
    },
    '-my-24': {
      marginTop: -96,
      marginBottom: -96,
    },
    '-mx-24': {
      marginLeft: -96,
      marginRight: -96,
    },
    '-my-28': {
      marginTop: -112,
      marginBottom: -112,
    },
    '-mx-28': {
      marginLeft: -112,
      marginRight: -112,
    },
    '-my-32': {
      marginTop: -128,
      marginBottom: -128,
    },
    '-mx-32': {
      marginLeft: -128,
      marginRight: -128,
    },
    '-my-36': {
      marginTop: -144,
      marginBottom: -144,
    },
    '-mx-36': {
      marginLeft: -144,
      marginRight: -144,
    },
    '-my-40': {
      marginTop: -160,
      marginBottom: -160,
    },
    '-mx-40': {
      marginLeft: -160,
      marginRight: -160,
    },
    '-my-44': {
      marginTop: -176,
      marginBottom: -176,
    },
    '-mx-44': {
      marginLeft: -176,
      marginRight: -176,
    },
    '-my-48': {
      marginTop: -192,
      marginBottom: -192,
    },
    '-mx-48': {
      marginLeft: -192,
      marginRight: -192,
    },
    '-my-52': {
      marginTop: -208,
      marginBottom: -208,
    },
    '-mx-52': {
      marginLeft: -208,
      marginRight: -208,
    },
    '-my-56': {
      marginTop: -224,
      marginBottom: -224,
    },
    '-mx-56': {
      marginLeft: -224,
      marginRight: -224,
    },
    '-my-60': {
      marginTop: -240,
      marginBottom: -240,
    },
    '-mx-60': {
      marginLeft: -240,
      marginRight: -240,
    },
    '-my-64': {
      marginTop: -256,
      marginBottom: -256,
    },
    '-mx-64': {
      marginLeft: -256,
      marginRight: -256,
    },
    '-my-72': {
      marginTop: -288,
      marginBottom: -288,
    },
    '-mx-72': {
      marginLeft: -288,
      marginRight: -288,
    },
    '-my-80': {
      marginTop: -320,
      marginBottom: -320,
    },
    '-mx-80': {
      marginLeft: -320,
      marginRight: -320,
    },
    '-my-96': {
      marginTop: -384,
      marginBottom: -384,
    },
    '-mx-96': {
      marginLeft: -384,
      marginRight: -384,
    },
    '-my-px': {
      marginTop: -1,
      marginBottom: -1,
    },
    '-mx-px': {
      marginLeft: -1,
      marginRight: -1,
    },
    '-my-0.5': {
      marginTop: -2,
      marginBottom: -2,
    },
    '-mx-0.5': {
      marginLeft: -2,
      marginRight: -2,
    },
    '-my-1.5': {
      marginTop: -6,
      marginBottom: -6,
    },
    '-mx-1.5': {
      marginLeft: -6,
      marginRight: -6,
    },
    '-my-2.5': {
      marginTop: -10,
      marginBottom: -10,
    },
    '-mx-2.5': {
      marginLeft: -10,
      marginRight: -10,
    },
    '-my-3.5': {
      marginTop: -14,
      marginBottom: -14,
    },
    '-mx-3.5': {
      marginLeft: -14,
      marginRight: -14,
    },
    'mt-0': {
      marginTop: 0,
    },
    'mr-0': {
      marginRight: 0,
    },
    'mb-0': {
      marginBottom: 0,
    },
    'ml-0': {
      marginLeft: 0,
    },
    'mt-1': {
      marginTop: 4,
    },
    'mr-1': {
      marginRight: 4,
    },
    'mb-1': {
      marginBottom: 4,
    },
    'ml-1': {
      marginLeft: 4,
    },
    'mt-2': {
      marginTop: 8,
    },
    'mr-2': {
      marginRight: 8,
    },
    'mb-2': {
      marginBottom: 8,
    },
    'ml-2': {
      marginLeft: 8,
    },
    'mt-3': {
      marginTop: 12,
    },
    'mr-3': {
      marginRight: 12,
    },
    'mb-3': {
      marginBottom: 12,
    },
    'ml-3': {
      marginLeft: 12,
    },
    'mt-4': {
      marginTop: 16,
    },
    'mr-4': {
      marginRight: 16,
    },
    'mb-4': {
      marginBottom: 16,
    },
    'ml-4': {
      marginLeft: 16,
    },
    'mt-5': {
      marginTop: 20,
    },
    'mr-5': {
      marginRight: 20,
    },
    'mb-5': {
      marginBottom: 20,
    },
    'ml-5': {
      marginLeft: 20,
    },
    'mt-6': {
      marginTop: 24,
    },
    'mr-6': {
      marginRight: 24,
    },
    'mb-6': {
      marginBottom: 24,
    },
    'ml-6': {
      marginLeft: 24,
    },
    'mt-7': {
      marginTop: 28,
    },
    'mr-7': {
      marginRight: 28,
    },
    'mb-7': {
      marginBottom: 28,
    },
    'ml-7': {
      marginLeft: 28,
    },
    'mt-8': {
      marginTop: 32,
    },
    'mr-8': {
      marginRight: 32,
    },
    'mb-8': {
      marginBottom: 32,
    },
    'ml-8': {
      marginLeft: 32,
    },
    'mt-9': {
      marginTop: 36,
    },
    'mr-9': {
      marginRight: 36,
    },
    'mb-9': {
      marginBottom: 36,
    },
    'ml-9': {
      marginLeft: 36,
    },
    'mt-10': {
      marginTop: 40,
    },
    'mr-10': {
      marginRight: 40,
    },
    'mb-10': {
      marginBottom: 40,
    },
    'ml-10': {
      marginLeft: 40,
    },
    'mt-11': {
      marginTop: 44,
    },
    'mr-11': {
      marginRight: 44,
    },
    'mb-11': {
      marginBottom: 44,
    },
    'ml-11': {
      marginLeft: 44,
    },
    'mt-12': {
      marginTop: 48,
    },
    'mr-12': {
      marginRight: 48,
    },
    'mb-12': {
      marginBottom: 48,
    },
    'ml-12': {
      marginLeft: 48,
    },
    'mt-14': {
      marginTop: 56,
    },
    'mr-14': {
      marginRight: 56,
    },
    'mb-14': {
      marginBottom: 56,
    },
    'ml-14': {
      marginLeft: 56,
    },
    'mt-16': {
      marginTop: 64,
    },
    'mr-16': {
      marginRight: 64,
    },
    'mb-16': {
      marginBottom: 64,
    },
    'ml-16': {
      marginLeft: 64,
    },
    'mt-20': {
      marginTop: 80,
    },
    'mr-20': {
      marginRight: 80,
    },
    'mb-20': {
      marginBottom: 80,
    },
    'ml-20': {
      marginLeft: 80,
    },
    'mt-24': {
      marginTop: 96,
    },
    'mr-24': {
      marginRight: 96,
    },
    'mb-24': {
      marginBottom: 96,
    },
    'ml-24': {
      marginLeft: 96,
    },
    'mt-28': {
      marginTop: 112,
    },
    'mr-28': {
      marginRight: 112,
    },
    'mb-28': {
      marginBottom: 112,
    },
    'ml-28': {
      marginLeft: 112,
    },
    'mt-32': {
      marginTop: 128,
    },
    'mr-32': {
      marginRight: 128,
    },
    'mb-32': {
      marginBottom: 128,
    },
    'ml-32': {
      marginLeft: 128,
    },
    'mt-36': {
      marginTop: 144,
    },
    'mr-36': {
      marginRight: 144,
    },
    'mb-36': {
      marginBottom: 144,
    },
    'ml-36': {
      marginLeft: 144,
    },
    'mt-40': {
      marginTop: 160,
    },
    'mr-40': {
      marginRight: 160,
    },
    'mb-40': {
      marginBottom: 160,
    },
    'ml-40': {
      marginLeft: 160,
    },
    'mt-44': {
      marginTop: 176,
    },
    'mr-44': {
      marginRight: 176,
    },
    'mb-44': {
      marginBottom: 176,
    },
    'ml-44': {
      marginLeft: 176,
    },
    'mt-48': {
      marginTop: 192,
    },
    'mr-48': {
      marginRight: 192,
    },
    'mb-48': {
      marginBottom: 192,
    },
    'ml-48': {
      marginLeft: 192,
    },
    'mt-52': {
      marginTop: 208,
    },
    'mr-52': {
      marginRight: 208,
    },
    'mb-52': {
      marginBottom: 208,
    },
    'ml-52': {
      marginLeft: 208,
    },
    'mt-56': {
      marginTop: 224,
    },
    'mr-56': {
      marginRight: 224,
    },
    'mb-56': {
      marginBottom: 224,
    },
    'ml-56': {
      marginLeft: 224,
    },
    'mt-60': {
      marginTop: 240,
    },
    'mr-60': {
      marginRight: 240,
    },
    'mb-60': {
      marginBottom: 240,
    },
    'ml-60': {
      marginLeft: 240,
    },
    'mt-64': {
      marginTop: 256,
    },
    'mr-64': {
      marginRight: 256,
    },
    'mb-64': {
      marginBottom: 256,
    },
    'ml-64': {
      marginLeft: 256,
    },
    'mt-72': {
      marginTop: 288,
    },
    'mr-72': {
      marginRight: 288,
    },
    'mb-72': {
      marginBottom: 288,
    },
    'ml-72': {
      marginLeft: 288,
    },
    'mt-80': {
      marginTop: 320,
    },
    'mr-80': {
      marginRight: 320,
    },
    'mb-80': {
      marginBottom: 320,
    },
    'ml-80': {
      marginLeft: 320,
    },
    'mt-96': {
      marginTop: 384,
    },
    'mr-96': {
      marginRight: 384,
    },
    'mb-96': {
      marginBottom: 384,
    },
    'ml-96': {
      marginLeft: 384,
    },
    'mt-px': {
      marginTop: 1,
    },
    'mr-px': {
      marginRight: 1,
    },
    'mb-px': {
      marginBottom: 1,
    },
    'ml-px': {
      marginLeft: 1,
    },
    'mt-0.5': {
      marginTop: 2,
    },
    'mr-0.5': {
      marginRight: 2,
    },
    'mb-0.5': {
      marginBottom: 2,
    },
    'ml-0.5': {
      marginLeft: 2,
    },
    'mt-1.5': {
      marginTop: 6,
    },
    'mr-1.5': {
      marginRight: 6,
    },
    'mb-1.5': {
      marginBottom: 6,
    },
    'ml-1.5': {
      marginLeft: 6,
    },
    'mt-2.5': {
      marginTop: 10,
    },
    'mr-2.5': {
      marginRight: 10,
    },
    'mb-2.5': {
      marginBottom: 10,
    },
    'ml-2.5': {
      marginLeft: 10,
    },
    'mt-3.5': {
      marginTop: 14,
    },
    'mr-3.5': {
      marginRight: 14,
    },
    'mb-3.5': {
      marginBottom: 14,
    },
    'ml-3.5': {
      marginLeft: 14,
    },
    '-mt-0': {
      marginTop: 0,
    },
    '-mr-0': {
      marginRight: 0,
    },
    '-mb-0': {
      marginBottom: 0,
    },
    '-ml-0': {
      marginLeft: 0,
    },
    '-mt-1': {
      marginTop: -4,
    },
    '-mr-1': {
      marginRight: -4,
    },
    '-mb-1': {
      marginBottom: -4,
    },
    '-ml-1': {
      marginLeft: -4,
    },
    '-mt-2': {
      marginTop: -8,
    },
    '-mr-2': {
      marginRight: -8,
    },
    '-mb-2': {
      marginBottom: -8,
    },
    '-ml-2': {
      marginLeft: -8,
    },
    '-mt-3': {
      marginTop: -12,
    },
    '-mr-3': {
      marginRight: -12,
    },
    '-mb-3': {
      marginBottom: -12,
    },
    '-ml-3': {
      marginLeft: -12,
    },
    '-mt-4': {
      marginTop: -16,
    },
    '-mr-4': {
      marginRight: -16,
    },
    '-mb-4': {
      marginBottom: -16,
    },
    '-ml-4': {
      marginLeft: -16,
    },
    '-mt-5': {
      marginTop: -20,
    },
    '-mr-5': {
      marginRight: -20,
    },
    '-mb-5': {
      marginBottom: -20,
    },
    '-ml-5': {
      marginLeft: -20,
    },
    '-mt-6': {
      marginTop: -24,
    },
    '-mr-6': {
      marginRight: -24,
    },
    '-mb-6': {
      marginBottom: -24,
    },
    '-ml-6': {
      marginLeft: -24,
    },
    '-mt-7': {
      marginTop: -28,
    },
    '-mr-7': {
      marginRight: -28,
    },
    '-mb-7': {
      marginBottom: -28,
    },
    '-ml-7': {
      marginLeft: -28,
    },
    '-mt-8': {
      marginTop: -32,
    },
    '-mr-8': {
      marginRight: -32,
    },
    '-mb-8': {
      marginBottom: -32,
    },
    '-ml-8': {
      marginLeft: -32,
    },
    '-mt-9': {
      marginTop: -36,
    },
    '-mr-9': {
      marginRight: -36,
    },
    '-mb-9': {
      marginBottom: -36,
    },
    '-ml-9': {
      marginLeft: -36,
    },
    '-mt-10': {
      marginTop: -40,
    },
    '-mr-10': {
      marginRight: -40,
    },
    '-mb-10': {
      marginBottom: -40,
    },
    '-ml-10': {
      marginLeft: -40,
    },
    '-mt-11': {
      marginTop: -44,
    },
    '-mr-11': {
      marginRight: -44,
    },
    '-mb-11': {
      marginBottom: -44,
    },
    '-ml-11': {
      marginLeft: -44,
    },
    '-mt-12': {
      marginTop: -48,
    },
    '-mr-12': {
      marginRight: -48,
    },
    '-mb-12': {
      marginBottom: -48,
    },
    '-ml-12': {
      marginLeft: -48,
    },
    '-mt-14': {
      marginTop: -56,
    },
    '-mr-14': {
      marginRight: -56,
    },
    '-mb-14': {
      marginBottom: -56,
    },
    '-ml-14': {
      marginLeft: -56,
    },
    '-mt-16': {
      marginTop: -64,
    },
    '-mr-16': {
      marginRight: -64,
    },
    '-mb-16': {
      marginBottom: -64,
    },
    '-ml-16': {
      marginLeft: -64,
    },
    '-mt-20': {
      marginTop: -80,
    },
    '-mr-20': {
      marginRight: -80,
    },
    '-mb-20': {
      marginBottom: -80,
    },
    '-ml-20': {
      marginLeft: -80,
    },
    '-mt-24': {
      marginTop: -96,
    },
    '-mr-24': {
      marginRight: -96,
    },
    '-mb-24': {
      marginBottom: -96,
    },
    '-ml-24': {
      marginLeft: -96,
    },
    '-mt-28': {
      marginTop: -112,
    },
    '-mr-28': {
      marginRight: -112,
    },
    '-mb-28': {
      marginBottom: -112,
    },
    '-ml-28': {
      marginLeft: -112,
    },
    '-mt-32': {
      marginTop: -128,
    },
    '-mr-32': {
      marginRight: -128,
    },
    '-mb-32': {
      marginBottom: -128,
    },
    '-ml-32': {
      marginLeft: -128,
    },
    '-mt-36': {
      marginTop: -144,
    },
    '-mr-36': {
      marginRight: -144,
    },
    '-mb-36': {
      marginBottom: -144,
    },
    '-ml-36': {
      marginLeft: -144,
    },
    '-mt-40': {
      marginTop: -160,
    },
    '-mr-40': {
      marginRight: -160,
    },
    '-mb-40': {
      marginBottom: -160,
    },
    '-ml-40': {
      marginLeft: -160,
    },
    '-mt-44': {
      marginTop: -176,
    },
    '-mr-44': {
      marginRight: -176,
    },
    '-mb-44': {
      marginBottom: -176,
    },
    '-ml-44': {
      marginLeft: -176,
    },
    '-mt-48': {
      marginTop: -192,
    },
    '-mr-48': {
      marginRight: -192,
    },
    '-mb-48': {
      marginBottom: -192,
    },
    '-ml-48': {
      marginLeft: -192,
    },
    '-mt-52': {
      marginTop: -208,
    },
    '-mr-52': {
      marginRight: -208,
    },
    '-mb-52': {
      marginBottom: -208,
    },
    '-ml-52': {
      marginLeft: -208,
    },
    '-mt-56': {
      marginTop: -224,
    },
    '-mr-56': {
      marginRight: -224,
    },
    '-mb-56': {
      marginBottom: -224,
    },
    '-ml-56': {
      marginLeft: -224,
    },
    '-mt-60': {
      marginTop: -240,
    },
    '-mr-60': {
      marginRight: -240,
    },
    '-mb-60': {
      marginBottom: -240,
    },
    '-ml-60': {
      marginLeft: -240,
    },
    '-mt-64': {
      marginTop: -256,
    },
    '-mr-64': {
      marginRight: -256,
    },
    '-mb-64': {
      marginBottom: -256,
    },
    '-ml-64': {
      marginLeft: -256,
    },
    '-mt-72': {
      marginTop: -288,
    },
    '-mr-72': {
      marginRight: -288,
    },
    '-mb-72': {
      marginBottom: -288,
    },
    '-ml-72': {
      marginLeft: -288,
    },
    '-mt-80': {
      marginTop: -320,
    },
    '-mr-80': {
      marginRight: -320,
    },
    '-mb-80': {
      marginBottom: -320,
    },
    '-ml-80': {
      marginLeft: -320,
    },
    '-mt-96': {
      marginTop: -384,
    },
    '-mr-96': {
      marginRight: -384,
    },
    '-mb-96': {
      marginBottom: -384,
    },
    '-ml-96': {
      marginLeft: -384,
    },
    '-mt-px': {
      marginTop: -1,
    },
    '-mr-px': {
      marginRight: -1,
    },
    '-mb-px': {
      marginBottom: -1,
    },
    '-ml-px': {
      marginLeft: -1,
    },
    '-mt-0.5': {
      marginTop: -2,
    },
    '-mr-0.5': {
      marginRight: -2,
    },
    '-mb-0.5': {
      marginBottom: -2,
    },
    '-ml-0.5': {
      marginLeft: -2,
    },
    '-mt-1.5': {
      marginTop: -6,
    },
    '-mr-1.5': {
      marginRight: -6,
    },
    '-mb-1.5': {
      marginBottom: -6,
    },
    '-ml-1.5': {
      marginLeft: -6,
    },
    '-mt-2.5': {
      marginTop: -10,
    },
    '-mr-2.5': {
      marginRight: -10,
    },
    '-mb-2.5': {
      marginBottom: -10,
    },
    '-ml-2.5': {
      marginLeft: -10,
    },
    '-mt-3.5': {
      marginTop: -14,
    },
    '-mr-3.5': {
      marginRight: -14,
    },
    '-mb-3.5': {
      marginBottom: -14,
    },
    '-ml-3.5': {
      marginLeft: -14,
    },
    'max-h-0': {
      maxHeight: 0,
    },
    'max-h-1': {
      maxHeight: 4,
    },
    'max-h-2': {
      maxHeight: 8,
    },
    'max-h-3': {
      maxHeight: 12,
    },
    'max-h-4': {
      maxHeight: 16,
    },
    'max-h-5': {
      maxHeight: 20,
    },
    'max-h-6': {
      maxHeight: 24,
    },
    'max-h-7': {
      maxHeight: 28,
    },
    'max-h-8': {
      maxHeight: 32,
    },
    'max-h-9': {
      maxHeight: 36,
    },
    'max-h-10': {
      maxHeight: 40,
    },
    'max-h-11': {
      maxHeight: 44,
    },
    'max-h-12': {
      maxHeight: 48,
    },
    'max-h-14': {
      maxHeight: 56,
    },
    'max-h-16': {
      maxHeight: 64,
    },
    'max-h-20': {
      maxHeight: 80,
    },
    'max-h-24': {
      maxHeight: 96,
    },
    'max-h-28': {
      maxHeight: 112,
    },
    'max-h-32': {
      maxHeight: 128,
    },
    'max-h-36': {
      maxHeight: 144,
    },
    'max-h-40': {
      maxHeight: 160,
    },
    'max-h-44': {
      maxHeight: 176,
    },
    'max-h-48': {
      maxHeight: 192,
    },
    'max-h-52': {
      maxHeight: 208,
    },
    'max-h-56': {
      maxHeight: 224,
    },
    'max-h-60': {
      maxHeight: 240,
    },
    'max-h-64': {
      maxHeight: 256,
    },
    'max-h-72': {
      maxHeight: 288,
    },
    'max-h-80': {
      maxHeight: 320,
    },
    'max-h-96': {
      maxHeight: 384,
    },
    'max-h-px': {
      maxHeight: 1,
    },
    'max-h-0.5': {
      maxHeight: 2,
    },
    'max-h-1.5': {
      maxHeight: 6,
    },
    'max-h-2.5': {
      maxHeight: 10,
    },
    'max-h-3.5': {
      maxHeight: 14,
    },
    'max-h-full': {
      maxHeight: '100%',
    },
    'max-w-0': {
      maxWidth: 0,
    },
    'max-w-none': {
      maxWidth: 'none',
    },
    'max-w-xs': {
      maxWidth: 320,
    },
    'max-w-sm': {
      maxWidth: 384,
    },
    'max-w-md': {
      maxWidth: 448,
    },
    'max-w-lg': {
      maxWidth: 512,
    },
    'max-w-xl': {
      maxWidth: 576,
    },
    'max-w-2xl': {
      maxWidth: 672,
    },
    'max-w-3xl': {
      maxWidth: 768,
    },
    'max-w-4xl': {
      maxWidth: 896,
    },
    'max-w-5xl': {
      maxWidth: 1024,
    },
    'max-w-6xl': {
      maxWidth: 1152,
    },
    'max-w-7xl': {
      maxWidth: 1280,
    },
    'max-w-full': {
      maxWidth: '100%',
    },
    'max-w-min': {
      maxWidth: 'min-content',
    },
    'max-w-max': {
      maxWidth: 'max-content',
    },
    'max-w-prose': {
      maxWidth: '65ch',
    },
    'max-w-screen-sm': {
      maxWidth: 640,
    },
    'max-w-screen-md': {
      maxWidth: 768,
    },
    'max-w-screen-lg': {
      maxWidth: 1024,
    },
    'max-w-screen-xl': {
      maxWidth: 1280,
    },
    'max-w-screen-2xl': {
      maxWidth: 1536,
    },
    'min-h-0': {
      minHeight: 0,
    },
    'min-h-full': {
      minHeight: '100%',
    },
    'min-w-0': {
      minWidth: 0,
    },
    'min-w-full': {
      minWidth: '100%',
    },
    'min-w-min': {
      minWidth: 'min-content',
    },
    'min-w-max': {
      minWidth: 'max-content',
    },
    'opacity-0': {
      opacity: 0,
    },
    'opacity-5': {
      opacity: 0.05,
    },
    'opacity-10': {
      opacity: 0.1,
    },
    'opacity-20': {
      opacity: 0.2,
    },
    'opacity-25': {
      opacity: 0.25,
    },
    'opacity-30': {
      opacity: 0.3,
    },
    'opacity-40': {
      opacity: 0.4,
    },
    'opacity-50': {
      opacity: 0.5,
    },
    'opacity-60': {
      opacity: 0.6,
    },
    'opacity-70': {
      opacity: 0.7,
    },
    'opacity-75': {
      opacity: 0.75,
    },
    'opacity-80': {
      opacity: 0.8,
    },
    'opacity-90': {
      opacity: 0.9,
    },
    'opacity-95': {
      opacity: 0.95,
    },
    'opacity-100': {
      opacity: 1,
    },
    'overflow-hidden': {
      overflow: 'hidden',
    },
    'overflow-visible': {
      overflow: 'visible',
    },
    'overflow-scroll': {
      overflow: 'scroll',
    },
    'p-0': {
      paddingTop: 0,
      paddingRight: 0,
      paddingBottom: 0,
      paddingLeft: 0,
    },
    'p-1': {
      paddingTop: 4,
      paddingRight: 4,
      paddingBottom: 4,
      paddingLeft: 4,
    },
    'p-2': {
      paddingTop: 8,
      paddingRight: 8,
      paddingBottom: 8,
      paddingLeft: 8,
    },
    'p-3': {
      paddingTop: 12,
      paddingRight: 12,
      paddingBottom: 12,
      paddingLeft: 12,
    },
    'p-4': {
      paddingTop: 16,
      paddingRight: 16,
      paddingBottom: 16,
      paddingLeft: 16,
    },
    'p-5': {
      paddingTop: 20,
      paddingRight: 20,
      paddingBottom: 20,
      paddingLeft: 20,
    },
    'p-6': {
      paddingTop: 24,
      paddingRight: 24,
      paddingBottom: 24,
      paddingLeft: 24,
    },
    'p-7': {
      paddingTop: 28,
      paddingRight: 28,
      paddingBottom: 28,
      paddingLeft: 28,
    },
    'p-8': {
      paddingTop: 32,
      paddingRight: 32,
      paddingBottom: 32,
      paddingLeft: 32,
    },
    'p-9': {
      paddingTop: 36,
      paddingRight: 36,
      paddingBottom: 36,
      paddingLeft: 36,
    },
    'p-10': {
      paddingTop: 40,
      paddingRight: 40,
      paddingBottom: 40,
      paddingLeft: 40,
    },
    'p-11': {
      paddingTop: 44,
      paddingRight: 44,
      paddingBottom: 44,
      paddingLeft: 44,
    },
    'p-12': {
      paddingTop: 48,
      paddingRight: 48,
      paddingBottom: 48,
      paddingLeft: 48,
    },
    'p-14': {
      paddingTop: 56,
      paddingRight: 56,
      paddingBottom: 56,
      paddingLeft: 56,
    },
    'p-16': {
      paddingTop: 64,
      paddingRight: 64,
      paddingBottom: 64,
      paddingLeft: 64,
    },
    'p-20': {
      paddingTop: 80,
      paddingRight: 80,
      paddingBottom: 80,
      paddingLeft: 80,
    },
    'p-24': {
      paddingTop: 96,
      paddingRight: 96,
      paddingBottom: 96,
      paddingLeft: 96,
    },
    'p-28': {
      paddingTop: 112,
      paddingRight: 112,
      paddingBottom: 112,
      paddingLeft: 112,
    },
    'p-32': {
      paddingTop: 128,
      paddingRight: 128,
      paddingBottom: 128,
      paddingLeft: 128,
    },
    'p-36': {
      paddingTop: 144,
      paddingRight: 144,
      paddingBottom: 144,
      paddingLeft: 144,
    },
    'p-40': {
      paddingTop: 160,
      paddingRight: 160,
      paddingBottom: 160,
      paddingLeft: 160,
    },
    'p-44': {
      paddingTop: 176,
      paddingRight: 176,
      paddingBottom: 176,
      paddingLeft: 176,
    },
    'p-48': {
      paddingTop: 192,
      paddingRight: 192,
      paddingBottom: 192,
      paddingLeft: 192,
    },
    'p-52': {
      paddingTop: 208,
      paddingRight: 208,
      paddingBottom: 208,
      paddingLeft: 208,
    },
    'p-56': {
      paddingTop: 224,
      paddingRight: 224,
      paddingBottom: 224,
      paddingLeft: 224,
    },
    'p-60': {
      paddingTop: 240,
      paddingRight: 240,
      paddingBottom: 240,
      paddingLeft: 240,
    },
    'p-64': {
      paddingTop: 256,
      paddingRight: 256,
      paddingBottom: 256,
      paddingLeft: 256,
    },
    'p-72': {
      paddingTop: 288,
      paddingRight: 288,
      paddingBottom: 288,
      paddingLeft: 288,
    },
    'p-80': {
      paddingTop: 320,
      paddingRight: 320,
      paddingBottom: 320,
      paddingLeft: 320,
    },
    'p-96': {
      paddingTop: 384,
      paddingRight: 384,
      paddingBottom: 384,
      paddingLeft: 384,
    },
    'p-px': {
      paddingTop: 1,
      paddingRight: 1,
      paddingBottom: 1,
      paddingLeft: 1,
    },
    'p-0.5': {
      paddingTop: 2,
      paddingRight: 2,
      paddingBottom: 2,
      paddingLeft: 2,
    },
    'p-1.5': {
      paddingTop: 6,
      paddingRight: 6,
      paddingBottom: 6,
      paddingLeft: 6,
    },
    'p-2.5': {
      paddingTop: 10,
      paddingRight: 10,
      paddingBottom: 10,
      paddingLeft: 10,
    },
    'p-3.5': {
      paddingTop: 14,
      paddingRight: 14,
      paddingBottom: 14,
      paddingLeft: 14,
    },
    'py-0': {
      paddingTop: 0,
      paddingBottom: 0,
    },
    'px-0': {
      paddingLeft: 0,
      paddingRight: 0,
    },
    'py-1': {
      paddingTop: 4,
      paddingBottom: 4,
    },
    'px-1': {
      paddingLeft: 4,
      paddingRight: 4,
    },
    'py-2': {
      paddingTop: 8,
      paddingBottom: 8,
    },
    'px-2': {
      paddingLeft: 8,
      paddingRight: 8,
    },
    'py-3': {
      paddingTop: 12,
      paddingBottom: 12,
    },
    'px-3': {
      paddingLeft: 12,
      paddingRight: 12,
    },
    'py-4': {
      paddingTop: 16,
      paddingBottom: 16,
    },
    'px-4': {
      paddingLeft: 16,
      paddingRight: 16,
    },
    'py-5': {
      paddingTop: 20,
      paddingBottom: 20,
    },
    'px-5': {
      paddingLeft: 20,
      paddingRight: 20,
    },
    'py-6': {
      paddingTop: 24,
      paddingBottom: 24,
    },
    'px-6': {
      paddingLeft: 24,
      paddingRight: 24,
    },
    'py-7': {
      paddingTop: 28,
      paddingBottom: 28,
    },
    'px-7': {
      paddingLeft: 28,
      paddingRight: 28,
    },
    'py-8': {
      paddingTop: 32,
      paddingBottom: 32,
    },
    'px-8': {
      paddingLeft: 32,
      paddingRight: 32,
    },
    'py-9': {
      paddingTop: 36,
      paddingBottom: 36,
    },
    'px-9': {
      paddingLeft: 36,
      paddingRight: 36,
    },
    'py-10': {
      paddingTop: 40,
      paddingBottom: 40,
    },
    'px-10': {
      paddingLeft: 40,
      paddingRight: 40,
    },
    'py-11': {
      paddingTop: 44,
      paddingBottom: 44,
    },
    'px-11': {
      paddingLeft: 44,
      paddingRight: 44,
    },
    'py-12': {
      paddingTop: 48,
      paddingBottom: 48,
    },
    'px-12': {
      paddingLeft: 48,
      paddingRight: 48,
    },
    'py-14': {
      paddingTop: 56,
      paddingBottom: 56,
    },
    'px-14': {
      paddingLeft: 56,
      paddingRight: 56,
    },
    'py-16': {
      paddingTop: 64,
      paddingBottom: 64,
    },
    'px-16': {
      paddingLeft: 64,
      paddingRight: 64,
    },
    'py-20': {
      paddingTop: 80,
      paddingBottom: 80,
    },
    'px-20': {
      paddingLeft: 80,
      paddingRight: 80,
    },
    'py-24': {
      paddingTop: 96,
      paddingBottom: 96,
    },
    'px-24': {
      paddingLeft: 96,
      paddingRight: 96,
    },
    'py-28': {
      paddingTop: 112,
      paddingBottom: 112,
    },
    'px-28': {
      paddingLeft: 112,
      paddingRight: 112,
    },
    'py-32': {
      paddingTop: 128,
      paddingBottom: 128,
    },
    'px-32': {
      paddingLeft: 128,
      paddingRight: 128,
    },
    'py-36': {
      paddingTop: 144,
      paddingBottom: 144,
    },
    'px-36': {
      paddingLeft: 144,
      paddingRight: 144,
    },
    'py-40': {
      paddingTop: 160,
      paddingBottom: 160,
    },
    'px-40': {
      paddingLeft: 160,
      paddingRight: 160,
    },
    'py-44': {
      paddingTop: 176,
      paddingBottom: 176,
    },
    'px-44': {
      paddingLeft: 176,
      paddingRight: 176,
    },
    'py-48': {
      paddingTop: 192,
      paddingBottom: 192,
    },
    'px-48': {
      paddingLeft: 192,
      paddingRight: 192,
    },
    'py-52': {
      paddingTop: 208,
      paddingBottom: 208,
    },
    'px-52': {
      paddingLeft: 208,
      paddingRight: 208,
    },
    'py-56': {
      paddingTop: 224,
      paddingBottom: 224,
    },
    'px-56': {
      paddingLeft: 224,
      paddingRight: 224,
    },
    'py-60': {
      paddingTop: 240,
      paddingBottom: 240,
    },
    'px-60': {
      paddingLeft: 240,
      paddingRight: 240,
    },
    'py-64': {
      paddingTop: 256,
      paddingBottom: 256,
    },
    'px-64': {
      paddingLeft: 256,
      paddingRight: 256,
    },
    'py-72': {
      paddingTop: 288,
      paddingBottom: 288,
    },
    'px-72': {
      paddingLeft: 288,
      paddingRight: 288,
    },
    'py-80': {
      paddingTop: 320,
      paddingBottom: 320,
    },
    'px-80': {
      paddingLeft: 320,
      paddingRight: 320,
    },
    'py-96': {
      paddingTop: 384,
      paddingBottom: 384,
    },
    'px-96': {
      paddingLeft: 384,
      paddingRight: 384,
    },
    'py-px': {
      paddingTop: 1,
      paddingBottom: 1,
    },
    'px-px': {
      paddingLeft: 1,
      paddingRight: 1,
    },
    'py-0.5': {
      paddingTop: 2,
      paddingBottom: 2,
    },
    'px-0.5': {
      paddingLeft: 2,
      paddingRight: 2,
    },
    'py-1.5': {
      paddingTop: 6,
      paddingBottom: 6,
    },
    'px-1.5': {
      paddingLeft: 6,
      paddingRight: 6,
    },
    'py-2.5': {
      paddingTop: 10,
      paddingBottom: 10,
    },
    'px-2.5': {
      paddingLeft: 10,
      paddingRight: 10,
    },
    'py-3.5': {
      paddingTop: 14,
      paddingBottom: 14,
    },
    'px-3.5': {
      paddingLeft: 14,
      paddingRight: 14,
    },
    'pt-0': {
      paddingTop: 0,
    },
    'pr-0': {
      paddingRight: 0,
    },
    'pb-0': {
      paddingBottom: 0,
    },
    'pl-0': {
      paddingLeft: 0,
    },
    'pt-1': {
      paddingTop: 4,
    },
    'pr-1': {
      paddingRight: 4,
    },
    'pb-1': {
      paddingBottom: 4,
    },
    'pl-1': {
      paddingLeft: 4,
    },
    'pt-2': {
      paddingTop: 8,
    },
    'pr-2': {
      paddingRight: 8,
    },
    'pb-2': {
      paddingBottom: 8,
    },
    'pl-2': {
      paddingLeft: 8,
    },
    'pt-3': {
      paddingTop: 12,
    },
    'pr-3': {
      paddingRight: 12,
    },
    'pb-3': {
      paddingBottom: 12,
    },
    'pl-3': {
      paddingLeft: 12,
    },
    'pt-4': {
      paddingTop: 16,
    },
    'pr-4': {
      paddingRight: 16,
    },
    'pb-4': {
      paddingBottom: 16,
    },
    'pl-4': {
      paddingLeft: 16,
    },
    'pt-5': {
      paddingTop: 20,
    },
    'pr-5': {
      paddingRight: 20,
    },
    'pb-5': {
      paddingBottom: 20,
    },
    'pl-5': {
      paddingLeft: 20,
    },
    'pt-6': {
      paddingTop: 24,
    },
    'pr-6': {
      paddingRight: 24,
    },
    'pb-6': {
      paddingBottom: 24,
    },
    'pl-6': {
      paddingLeft: 24,
    },
    'pt-7': {
      paddingTop: 28,
    },
    'pr-7': {
      paddingRight: 28,
    },
    'pb-7': {
      paddingBottom: 28,
    },
    'pl-7': {
      paddingLeft: 28,
    },
    'pt-8': {
      paddingTop: 32,
    },
    'pr-8': {
      paddingRight: 32,
    },
    'pb-8': {
      paddingBottom: 32,
    },
    'pl-8': {
      paddingLeft: 32,
    },
    'pt-9': {
      paddingTop: 36,
    },
    'pr-9': {
      paddingRight: 36,
    },
    'pb-9': {
      paddingBottom: 36,
    },
    'pl-9': {
      paddingLeft: 36,
    },
    'pt-10': {
      paddingTop: 40,
    },
    'pr-10': {
      paddingRight: 40,
    },
    'pb-10': {
      paddingBottom: 40,
    },
    'pl-10': {
      paddingLeft: 40,
    },
    'pt-11': {
      paddingTop: 44,
    },
    'pr-11': {
      paddingRight: 44,
    },
    'pb-11': {
      paddingBottom: 44,
    },
    'pl-11': {
      paddingLeft: 44,
    },
    'pt-12': {
      paddingTop: 48,
    },
    'pr-12': {
      paddingRight: 48,
    },
    'pb-12': {
      paddingBottom: 48,
    },
    'pl-12': {
      paddingLeft: 48,
    },
    'pt-14': {
      paddingTop: 56,
    },
    'pr-14': {
      paddingRight: 56,
    },
    'pb-14': {
      paddingBottom: 56,
    },
    'pl-14': {
      paddingLeft: 56,
    },
    'pt-16': {
      paddingTop: 64,
    },
    'pr-16': {
      paddingRight: 64,
    },
    'pb-16': {
      paddingBottom: 64,
    },
    'pl-16': {
      paddingLeft: 64,
    },
    'pt-20': {
      paddingTop: 80,
    },
    'pr-20': {
      paddingRight: 80,
    },
    'pb-20': {
      paddingBottom: 80,
    },
    'pl-20': {
      paddingLeft: 80,
    },
    'pt-24': {
      paddingTop: 96,
    },
    'pr-24': {
      paddingRight: 96,
    },
    'pb-24': {
      paddingBottom: 96,
    },
    'pl-24': {
      paddingLeft: 96,
    },
    'pt-28': {
      paddingTop: 112,
    },
    'pr-28': {
      paddingRight: 112,
    },
    'pb-28': {
      paddingBottom: 112,
    },
    'pl-28': {
      paddingLeft: 112,
    },
    'pt-32': {
      paddingTop: 128,
    },
    'pr-32': {
      paddingRight: 128,
    },
    'pb-32': {
      paddingBottom: 128,
    },
    'pl-32': {
      paddingLeft: 128,
    },
    'pt-36': {
      paddingTop: 144,
    },
    'pr-36': {
      paddingRight: 144,
    },
    'pb-36': {
      paddingBottom: 144,
    },
    'pl-36': {
      paddingLeft: 144,
    },
    'pt-40': {
      paddingTop: 160,
    },
    'pr-40': {
      paddingRight: 160,
    },
    'pb-40': {
      paddingBottom: 160,
    },
    'pl-40': {
      paddingLeft: 160,
    },
    'pt-44': {
      paddingTop: 176,
    },
    'pr-44': {
      paddingRight: 176,
    },
    'pb-44': {
      paddingBottom: 176,
    },
    'pl-44': {
      paddingLeft: 176,
    },
    'pt-48': {
      paddingTop: 192,
    },
    'pr-48': {
      paddingRight: 192,
    },
    'pb-48': {
      paddingBottom: 192,
    },
    'pl-48': {
      paddingLeft: 192,
    },
    'pt-52': {
      paddingTop: 208,
    },
    'pr-52': {
      paddingRight: 208,
    },
    'pb-52': {
      paddingBottom: 208,
    },
    'pl-52': {
      paddingLeft: 208,
    },
    'pt-56': {
      paddingTop: 224,
    },
    'pr-56': {
      paddingRight: 224,
    },
    'pb-56': {
      paddingBottom: 224,
    },
    'pl-56': {
      paddingLeft: 224,
    },
    'pt-60': {
      paddingTop: 240,
    },
    'pr-60': {
      paddingRight: 240,
    },
    'pb-60': {
      paddingBottom: 240,
    },
    'pl-60': {
      paddingLeft: 240,
    },
    'pt-64': {
      paddingTop: 256,
    },
    'pr-64': {
      paddingRight: 256,
    },
    'pb-64': {
      paddingBottom: 256,
    },
    'pl-64': {
      paddingLeft: 256,
    },
    'pt-72': {
      paddingTop: 288,
    },
    'pr-72': {
      paddingRight: 288,
    },
    'pb-72': {
      paddingBottom: 288,
    },
    'pl-72': {
      paddingLeft: 288,
    },
    'pt-80': {
      paddingTop: 320,
    },
    'pr-80': {
      paddingRight: 320,
    },
    'pb-80': {
      paddingBottom: 320,
    },
    'pl-80': {
      paddingLeft: 320,
    },
    'pt-96': {
      paddingTop: 384,
    },
    'pr-96': {
      paddingRight: 384,
    },
    'pb-96': {
      paddingBottom: 384,
    },
    'pl-96': {
      paddingLeft: 384,
    },
    'pt-px': {
      paddingTop: 1,
    },
    'pr-px': {
      paddingRight: 1,
    },
    'pb-px': {
      paddingBottom: 1,
    },
    'pl-px': {
      paddingLeft: 1,
    },
    'pt-0.5': {
      paddingTop: 2,
    },
    'pr-0.5': {
      paddingRight: 2,
    },
    'pb-0.5': {
      paddingBottom: 2,
    },
    'pl-0.5': {
      paddingLeft: 2,
    },
    'pt-1.5': {
      paddingTop: 6,
    },
    'pr-1.5': {
      paddingRight: 6,
    },
    'pb-1.5': {
      paddingBottom: 6,
    },
    'pl-1.5': {
      paddingLeft: 6,
    },
    'pt-2.5': {
      paddingTop: 10,
    },
    'pr-2.5': {
      paddingRight: 10,
    },
    'pb-2.5': {
      paddingBottom: 10,
    },
    'pl-2.5': {
      paddingLeft: 10,
    },
    'pt-3.5': {
      paddingTop: 14,
    },
    'pr-3.5': {
      paddingRight: 14,
    },
    'pb-3.5': {
      paddingBottom: 14,
    },
    'pl-3.5': {
      paddingLeft: 14,
    },
    'pointer-events-none': {
      pointerEvents: 'none',
    },
    absolute: {
      position: 'absolute',
    },
    relative: {
      position: 'relative',
    },
    'inset-0': {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
    'inset-1': {
      top: 4,
      right: 4,
      bottom: 4,
      left: 4,
    },
    'inset-2': {
      top: 8,
      right: 8,
      bottom: 8,
      left: 8,
    },
    'inset-3': {
      top: 12,
      right: 12,
      bottom: 12,
      left: 12,
    },
    'inset-4': {
      top: 16,
      right: 16,
      bottom: 16,
      left: 16,
    },
    'inset-5': {
      top: 20,
      right: 20,
      bottom: 20,
      left: 20,
    },
    'inset-6': {
      top: 24,
      right: 24,
      bottom: 24,
      left: 24,
    },
    'inset-7': {
      top: 28,
      right: 28,
      bottom: 28,
      left: 28,
    },
    'inset-8': {
      top: 32,
      right: 32,
      bottom: 32,
      left: 32,
    },
    'inset-9': {
      top: 36,
      right: 36,
      bottom: 36,
      left: 36,
    },
    'inset-10': {
      top: 40,
      right: 40,
      bottom: 40,
      left: 40,
    },
    'inset-11': {
      top: 44,
      right: 44,
      bottom: 44,
      left: 44,
    },
    'inset-12': {
      top: 48,
      right: 48,
      bottom: 48,
      left: 48,
    },
    'inset-14': {
      top: 56,
      right: 56,
      bottom: 56,
      left: 56,
    },
    'inset-16': {
      top: 64,
      right: 64,
      bottom: 64,
      left: 64,
    },
    'inset-20': {
      top: 80,
      right: 80,
      bottom: 80,
      left: 80,
    },
    'inset-24': {
      top: 96,
      right: 96,
      bottom: 96,
      left: 96,
    },
    'inset-28': {
      top: 112,
      right: 112,
      bottom: 112,
      left: 112,
    },
    'inset-32': {
      top: 128,
      right: 128,
      bottom: 128,
      left: 128,
    },
    'inset-36': {
      top: 144,
      right: 144,
      bottom: 144,
      left: 144,
    },
    'inset-40': {
      top: 160,
      right: 160,
      bottom: 160,
      left: 160,
    },
    'inset-44': {
      top: 176,
      right: 176,
      bottom: 176,
      left: 176,
    },
    'inset-48': {
      top: 192,
      right: 192,
      bottom: 192,
      left: 192,
    },
    'inset-52': {
      top: 208,
      right: 208,
      bottom: 208,
      left: 208,
    },
    'inset-56': {
      top: 224,
      right: 224,
      bottom: 224,
      left: 224,
    },
    'inset-60': {
      top: 240,
      right: 240,
      bottom: 240,
      left: 240,
    },
    'inset-64': {
      top: 256,
      right: 256,
      bottom: 256,
      left: 256,
    },
    'inset-72': {
      top: 288,
      right: 288,
      bottom: 288,
      left: 288,
    },
    'inset-80': {
      top: 320,
      right: 320,
      bottom: 320,
      left: 320,
    },
    'inset-96': {
      top: 384,
      right: 384,
      bottom: 384,
      left: 384,
    },
    'inset-px': {
      top: 1,
      right: 1,
      bottom: 1,
      left: 1,
    },
    'inset-0.5': {
      top: 2,
      right: 2,
      bottom: 2,
      left: 2,
    },
    'inset-1.5': {
      top: 6,
      right: 6,
      bottom: 6,
      left: 6,
    },
    'inset-2.5': {
      top: 10,
      right: 10,
      bottom: 10,
      left: 10,
    },
    'inset-3.5': {
      top: 14,
      right: 14,
      bottom: 14,
      left: 14,
    },
    '-inset-0': {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
    '-inset-1': {
      top: -4,
      right: -4,
      bottom: -4,
      left: -4,
    },
    '-inset-2': {
      top: -8,
      right: -8,
      bottom: -8,
      left: -8,
    },
    '-inset-3': {
      top: -12,
      right: -12,
      bottom: -12,
      left: -12,
    },
    '-inset-4': {
      top: -16,
      right: -16,
      bottom: -16,
      left: -16,
    },
    '-inset-5': {
      top: -20,
      right: -20,
      bottom: -20,
      left: -20,
    },
    '-inset-6': {
      top: -24,
      right: -24,
      bottom: -24,
      left: -24,
    },
    '-inset-7': {
      top: -28,
      right: -28,
      bottom: -28,
      left: -28,
    },
    '-inset-8': {
      top: -32,
      right: -32,
      bottom: -32,
      left: -32,
    },
    '-inset-9': {
      top: -36,
      right: -36,
      bottom: -36,
      left: -36,
    },
    '-inset-10': {
      top: -40,
      right: -40,
      bottom: -40,
      left: -40,
    },
    '-inset-11': {
      top: -44,
      right: -44,
      bottom: -44,
      left: -44,
    },
    '-inset-12': {
      top: -48,
      right: -48,
      bottom: -48,
      left: -48,
    },
    '-inset-14': {
      top: -56,
      right: -56,
      bottom: -56,
      left: -56,
    },
    '-inset-16': {
      top: -64,
      right: -64,
      bottom: -64,
      left: -64,
    },
    '-inset-20': {
      top: -80,
      right: -80,
      bottom: -80,
      left: -80,
    },
    '-inset-24': {
      top: -96,
      right: -96,
      bottom: -96,
      left: -96,
    },
    '-inset-28': {
      top: -112,
      right: -112,
      bottom: -112,
      left: -112,
    },
    '-inset-32': {
      top: -128,
      right: -128,
      bottom: -128,
      left: -128,
    },
    '-inset-36': {
      top: -144,
      right: -144,
      bottom: -144,
      left: -144,
    },
    '-inset-40': {
      top: -160,
      right: -160,
      bottom: -160,
      left: -160,
    },
    '-inset-44': {
      top: -176,
      right: -176,
      bottom: -176,
      left: -176,
    },
    '-inset-48': {
      top: -192,
      right: -192,
      bottom: -192,
      left: -192,
    },
    '-inset-52': {
      top: -208,
      right: -208,
      bottom: -208,
      left: -208,
    },
    '-inset-56': {
      top: -224,
      right: -224,
      bottom: -224,
      left: -224,
    },
    '-inset-60': {
      top: -240,
      right: -240,
      bottom: -240,
      left: -240,
    },
    '-inset-64': {
      top: -256,
      right: -256,
      bottom: -256,
      left: -256,
    },
    '-inset-72': {
      top: -288,
      right: -288,
      bottom: -288,
      left: -288,
    },
    '-inset-80': {
      top: -320,
      right: -320,
      bottom: -320,
      left: -320,
    },
    '-inset-96': {
      top: -384,
      right: -384,
      bottom: -384,
      left: -384,
    },
    '-inset-px': {
      top: -1,
      right: -1,
      bottom: -1,
      left: -1,
    },
    '-inset-0.5': {
      top: -2,
      right: -2,
      bottom: -2,
      left: -2,
    },
    '-inset-1.5': {
      top: -6,
      right: -6,
      bottom: -6,
      left: -6,
    },
    '-inset-2.5': {
      top: -10,
      right: -10,
      bottom: -10,
      left: -10,
    },
    '-inset-3.5': {
      top: -14,
      right: -14,
      bottom: -14,
      left: -14,
    },
    'inset-1/2': {
      top: '50%',
      right: '50%',
      bottom: '50%',
      left: '50%',
    },
    'inset-1/3': {
      top: '33.333333%',
      right: '33.333333%',
      bottom: '33.333333%',
      left: '33.333333%',
    },
    'inset-2/3': {
      top: '66.666667%',
      right: '66.666667%',
      bottom: '66.666667%',
      left: '66.666667%',
    },
    'inset-1/4': {
      top: '25%',
      right: '25%',
      bottom: '25%',
      left: '25%',
    },
    'inset-2/4': {
      top: '50%',
      right: '50%',
      bottom: '50%',
      left: '50%',
    },
    'inset-3/4': {
      top: '75%',
      right: '75%',
      bottom: '75%',
      left: '75%',
    },
    'inset-full': {
      top: '100%',
      right: '100%',
      bottom: '100%',
      left: '100%',
    },
    '-inset-1/2': {
      top: '-50%',
      right: '-50%',
      bottom: '-50%',
      left: '-50%',
    },
    '-inset-1/3': {
      top: '-33.333333%',
      right: '-33.333333%',
      bottom: '-33.333333%',
      left: '-33.333333%',
    },
    '-inset-2/3': {
      top: '-66.666667%',
      right: '-66.666667%',
      bottom: '-66.666667%',
      left: '-66.666667%',
    },
    '-inset-1/4': {
      top: '-25%',
      right: '-25%',
      bottom: '-25%',
      left: '-25%',
    },
    '-inset-2/4': {
      top: '-50%',
      right: '-50%',
      bottom: '-50%',
      left: '-50%',
    },
    '-inset-3/4': {
      top: '-75%',
      right: '-75%',
      bottom: '-75%',
      left: '-75%',
    },
    '-inset-full': {
      top: '-100%',
      right: '-100%',
      bottom: '-100%',
      left: '-100%',
    },
    'inset-y-0': {
      top: 0,
      bottom: 0,
    },
    'inset-x-0': {
      right: 0,
      left: 0,
    },
    'inset-y-1': {
      top: 4,
      bottom: 4,
    },
    'inset-x-1': {
      right: 4,
      left: 4,
    },
    'inset-y-2': {
      top: 8,
      bottom: 8,
    },
    'inset-x-2': {
      right: 8,
      left: 8,
    },
    'inset-y-3': {
      top: 12,
      bottom: 12,
    },
    'inset-x-3': {
      right: 12,
      left: 12,
    },
    'inset-y-4': {
      top: 16,
      bottom: 16,
    },
    'inset-x-4': {
      right: 16,
      left: 16,
    },
    'inset-y-5': {
      top: 20,
      bottom: 20,
    },
    'inset-x-5': {
      right: 20,
      left: 20,
    },
    'inset-y-6': {
      top: 24,
      bottom: 24,
    },
    'inset-x-6': {
      right: 24,
      left: 24,
    },
    'inset-y-7': {
      top: 28,
      bottom: 28,
    },
    'inset-x-7': {
      right: 28,
      left: 28,
    },
    'inset-y-8': {
      top: 32,
      bottom: 32,
    },
    'inset-x-8': {
      right: 32,
      left: 32,
    },
    'inset-y-9': {
      top: 36,
      bottom: 36,
    },
    'inset-x-9': {
      right: 36,
      left: 36,
    },
    'inset-y-10': {
      top: 40,
      bottom: 40,
    },
    'inset-x-10': {
      right: 40,
      left: 40,
    },
    'inset-y-11': {
      top: 44,
      bottom: 44,
    },
    'inset-x-11': {
      right: 44,
      left: 44,
    },
    'inset-y-12': {
      top: 48,
      bottom: 48,
    },
    'inset-x-12': {
      right: 48,
      left: 48,
    },
    'inset-y-14': {
      top: 56,
      bottom: 56,
    },
    'inset-x-14': {
      right: 56,
      left: 56,
    },
    'inset-y-16': {
      top: 64,
      bottom: 64,
    },
    'inset-x-16': {
      right: 64,
      left: 64,
    },
    'inset-y-20': {
      top: 80,
      bottom: 80,
    },
    'inset-x-20': {
      right: 80,
      left: 80,
    },
    'inset-y-24': {
      top: 96,
      bottom: 96,
    },
    'inset-x-24': {
      right: 96,
      left: 96,
    },
    'inset-y-28': {
      top: 112,
      bottom: 112,
    },
    'inset-x-28': {
      right: 112,
      left: 112,
    },
    'inset-y-32': {
      top: 128,
      bottom: 128,
    },
    'inset-x-32': {
      right: 128,
      left: 128,
    },
    'inset-y-36': {
      top: 144,
      bottom: 144,
    },
    'inset-x-36': {
      right: 144,
      left: 144,
    },
    'inset-y-40': {
      top: 160,
      bottom: 160,
    },
    'inset-x-40': {
      right: 160,
      left: 160,
    },
    'inset-y-44': {
      top: 176,
      bottom: 176,
    },
    'inset-x-44': {
      right: 176,
      left: 176,
    },
    'inset-y-48': {
      top: 192,
      bottom: 192,
    },
    'inset-x-48': {
      right: 192,
      left: 192,
    },
    'inset-y-52': {
      top: 208,
      bottom: 208,
    },
    'inset-x-52': {
      right: 208,
      left: 208,
    },
    'inset-y-56': {
      top: 224,
      bottom: 224,
    },
    'inset-x-56': {
      right: 224,
      left: 224,
    },
    'inset-y-60': {
      top: 240,
      bottom: 240,
    },
    'inset-x-60': {
      right: 240,
      left: 240,
    },
    'inset-y-64': {
      top: 256,
      bottom: 256,
    },
    'inset-x-64': {
      right: 256,
      left: 256,
    },
    'inset-y-72': {
      top: 288,
      bottom: 288,
    },
    'inset-x-72': {
      right: 288,
      left: 288,
    },
    'inset-y-80': {
      top: 320,
      bottom: 320,
    },
    'inset-x-80': {
      right: 320,
      left: 320,
    },
    'inset-y-96': {
      top: 384,
      bottom: 384,
    },
    'inset-x-96': {
      right: 384,
      left: 384,
    },
    'inset-y-px': {
      top: 1,
      bottom: 1,
    },
    'inset-x-px': {
      right: 1,
      left: 1,
    },
    'inset-y-0.5': {
      top: 2,
      bottom: 2,
    },
    'inset-x-0.5': {
      right: 2,
      left: 2,
    },
    'inset-y-1.5': {
      top: 6,
      bottom: 6,
    },
    'inset-x-1.5': {
      right: 6,
      left: 6,
    },
    'inset-y-2.5': {
      top: 10,
      bottom: 10,
    },
    'inset-x-2.5': {
      right: 10,
      left: 10,
    },
    'inset-y-3.5': {
      top: 14,
      bottom: 14,
    },
    'inset-x-3.5': {
      right: 14,
      left: 14,
    },
    '-inset-y-0': {
      top: 0,
      bottom: 0,
    },
    '-inset-x-0': {
      right: 0,
      left: 0,
    },
    '-inset-y-1': {
      top: -4,
      bottom: -4,
    },
    '-inset-x-1': {
      right: -4,
      left: -4,
    },
    '-inset-y-2': {
      top: -8,
      bottom: -8,
    },
    '-inset-x-2': {
      right: -8,
      left: -8,
    },
    '-inset-y-3': {
      top: -12,
      bottom: -12,
    },
    '-inset-x-3': {
      right: -12,
      left: -12,
    },
    '-inset-y-4': {
      top: -16,
      bottom: -16,
    },
    '-inset-x-4': {
      right: -16,
      left: -16,
    },
    '-inset-y-5': {
      top: -20,
      bottom: -20,
    },
    '-inset-x-5': {
      right: -20,
      left: -20,
    },
    '-inset-y-6': {
      top: -24,
      bottom: -24,
    },
    '-inset-x-6': {
      right: -24,
      left: -24,
    },
    '-inset-y-7': {
      top: -28,
      bottom: -28,
    },
    '-inset-x-7': {
      right: -28,
      left: -28,
    },
    '-inset-y-8': {
      top: -32,
      bottom: -32,
    },
    '-inset-x-8': {
      right: -32,
      left: -32,
    },
    '-inset-y-9': {
      top: -36,
      bottom: -36,
    },
    '-inset-x-9': {
      right: -36,
      left: -36,
    },
    '-inset-y-10': {
      top: -40,
      bottom: -40,
    },
    '-inset-x-10': {
      right: -40,
      left: -40,
    },
    '-inset-y-11': {
      top: -44,
      bottom: -44,
    },
    '-inset-x-11': {
      right: -44,
      left: -44,
    },
    '-inset-y-12': {
      top: -48,
      bottom: -48,
    },
    '-inset-x-12': {
      right: -48,
      left: -48,
    },
    '-inset-y-14': {
      top: -56,
      bottom: -56,
    },
    '-inset-x-14': {
      right: -56,
      left: -56,
    },
    '-inset-y-16': {
      top: -64,
      bottom: -64,
    },
    '-inset-x-16': {
      right: -64,
      left: -64,
    },
    '-inset-y-20': {
      top: -80,
      bottom: -80,
    },
    '-inset-x-20': {
      right: -80,
      left: -80,
    },
    '-inset-y-24': {
      top: -96,
      bottom: -96,
    },
    '-inset-x-24': {
      right: -96,
      left: -96,
    },
    '-inset-y-28': {
      top: -112,
      bottom: -112,
    },
    '-inset-x-28': {
      right: -112,
      left: -112,
    },
    '-inset-y-32': {
      top: -128,
      bottom: -128,
    },
    '-inset-x-32': {
      right: -128,
      left: -128,
    },
    '-inset-y-36': {
      top: -144,
      bottom: -144,
    },
    '-inset-x-36': {
      right: -144,
      left: -144,
    },
    '-inset-y-40': {
      top: -160,
      bottom: -160,
    },
    '-inset-x-40': {
      right: -160,
      left: -160,
    },
    '-inset-y-44': {
      top: -176,
      bottom: -176,
    },
    '-inset-x-44': {
      right: -176,
      left: -176,
    },
    '-inset-y-48': {
      top: -192,
      bottom: -192,
    },
    '-inset-x-48': {
      right: -192,
      left: -192,
    },
    '-inset-y-52': {
      top: -208,
      bottom: -208,
    },
    '-inset-x-52': {
      right: -208,
      left: -208,
    },
    '-inset-y-56': {
      top: -224,
      bottom: -224,
    },
    '-inset-x-56': {
      right: -224,
      left: -224,
    },
    '-inset-y-60': {
      top: -240,
      bottom: -240,
    },
    '-inset-x-60': {
      right: -240,
      left: -240,
    },
    '-inset-y-64': {
      top: -256,
      bottom: -256,
    },
    '-inset-x-64': {
      right: -256,
      left: -256,
    },
    '-inset-y-72': {
      top: -288,
      bottom: -288,
    },
    '-inset-x-72': {
      right: -288,
      left: -288,
    },
    '-inset-y-80': {
      top: -320,
      bottom: -320,
    },
    '-inset-x-80': {
      right: -320,
      left: -320,
    },
    '-inset-y-96': {
      top: -384,
      bottom: -384,
    },
    '-inset-x-96': {
      right: -384,
      left: -384,
    },
    '-inset-y-px': {
      top: -1,
      bottom: -1,
    },
    '-inset-x-px': {
      right: -1,
      left: -1,
    },
    '-inset-y-0.5': {
      top: -2,
      bottom: -2,
    },
    '-inset-x-0.5': {
      right: -2,
      left: -2,
    },
    '-inset-y-1.5': {
      top: -6,
      bottom: -6,
    },
    '-inset-x-1.5': {
      right: -6,
      left: -6,
    },
    '-inset-y-2.5': {
      top: -10,
      bottom: -10,
    },
    '-inset-x-2.5': {
      right: -10,
      left: -10,
    },
    '-inset-y-3.5': {
      top: -14,
      bottom: -14,
    },
    '-inset-x-3.5': {
      right: -14,
      left: -14,
    },
    'inset-y-1/2': {
      top: '50%',
      bottom: '50%',
    },
    'inset-x-1/2': {
      right: '50%',
      left: '50%',
    },
    'inset-y-1/3': {
      top: '33.333333%',
      bottom: '33.333333%',
    },
    'inset-x-1/3': {
      right: '33.333333%',
      left: '33.333333%',
    },
    'inset-y-2/3': {
      top: '66.666667%',
      bottom: '66.666667%',
    },
    'inset-x-2/3': {
      right: '66.666667%',
      left: '66.666667%',
    },
    'inset-y-1/4': {
      top: '25%',
      bottom: '25%',
    },
    'inset-x-1/4': {
      right: '25%',
      left: '25%',
    },
    'inset-y-2/4': {
      top: '50%',
      bottom: '50%',
    },
    'inset-x-2/4': {
      right: '50%',
      left: '50%',
    },
    'inset-y-3/4': {
      top: '75%',
      bottom: '75%',
    },
    'inset-x-3/4': {
      right: '75%',
      left: '75%',
    },
    'inset-y-full': {
      top: '100%',
      bottom: '100%',
    },
    'inset-x-full': {
      right: '100%',
      left: '100%',
    },
    '-inset-y-1/2': {
      top: '-50%',
      bottom: '-50%',
    },
    '-inset-x-1/2': {
      right: '-50%',
      left: '-50%',
    },
    '-inset-y-1/3': {
      top: '-33.333333%',
      bottom: '-33.333333%',
    },
    '-inset-x-1/3': {
      right: '-33.333333%',
      left: '-33.333333%',
    },
    '-inset-y-2/3': {
      top: '-66.666667%',
      bottom: '-66.666667%',
    },
    '-inset-x-2/3': {
      right: '-66.666667%',
      left: '-66.666667%',
    },
    '-inset-y-1/4': {
      top: '-25%',
      bottom: '-25%',
    },
    '-inset-x-1/4': {
      right: '-25%',
      left: '-25%',
    },
    '-inset-y-2/4': {
      top: '-50%',
      bottom: '-50%',
    },
    '-inset-x-2/4': {
      right: '-50%',
      left: '-50%',
    },
    '-inset-y-3/4': {
      top: '-75%',
      bottom: '-75%',
    },
    '-inset-x-3/4': {
      right: '-75%',
      left: '-75%',
    },
    '-inset-y-full': {
      top: '-100%',
      bottom: '-100%',
    },
    '-inset-x-full': {
      right: '-100%',
      left: '-100%',
    },
    'top-0': {
      top: 0,
    },
    'right-0': {
      right: 0,
    },
    'bottom-0': {
      bottom: 0,
    },
    'left-0': {
      left: 0,
    },
    'top-1': {
      top: 4,
    },
    'right-1': {
      right: 4,
    },
    'bottom-1': {
      bottom: 4,
    },
    'left-1': {
      left: 4,
    },
    'top-2': {
      top: 8,
    },
    'right-2': {
      right: 8,
    },
    'bottom-2': {
      bottom: 8,
    },
    'left-2': {
      left: 8,
    },
    'top-3': {
      top: 12,
    },
    'right-3': {
      right: 12,
    },
    'bottom-3': {
      bottom: 12,
    },
    'left-3': {
      left: 12,
    },
    'top-4': {
      top: 16,
    },
    'right-4': {
      right: 16,
    },
    'bottom-4': {
      bottom: 16,
    },
    'left-4': {
      left: 16,
    },
    'top-5': {
      top: 20,
    },
    'right-5': {
      right: 20,
    },
    'bottom-5': {
      bottom: 20,
    },
    'left-5': {
      left: 20,
    },
    'top-6': {
      top: 24,
    },
    'right-6': {
      right: 24,
    },
    'bottom-6': {
      bottom: 24,
    },
    'left-6': {
      left: 24,
    },
    'top-7': {
      top: 28,
    },
    'right-7': {
      right: 28,
    },
    'bottom-7': {
      bottom: 28,
    },
    'left-7': {
      left: 28,
    },
    'top-8': {
      top: 32,
    },
    'right-8': {
      right: 32,
    },
    'bottom-8': {
      bottom: 32,
    },
    'left-8': {
      left: 32,
    },
    'top-9': {
      top: 36,
    },
    'right-9': {
      right: 36,
    },
    'bottom-9': {
      bottom: 36,
    },
    'left-9': {
      left: 36,
    },
    'top-10': {
      top: 40,
    },
    'right-10': {
      right: 40,
    },
    'bottom-10': {
      bottom: 40,
    },
    'left-10': {
      left: 40,
    },
    'top-11': {
      top: 44,
    },
    'right-11': {
      right: 44,
    },
    'bottom-11': {
      bottom: 44,
    },
    'left-11': {
      left: 44,
    },
    'top-12': {
      top: 48,
    },
    'right-12': {
      right: 48,
    },
    'bottom-12': {
      bottom: 48,
    },
    'left-12': {
      left: 48,
    },
    'top-14': {
      top: 56,
    },
    'right-14': {
      right: 56,
    },
    'bottom-14': {
      bottom: 56,
    },
    'left-14': {
      left: 56,
    },
    'top-16': {
      top: 64,
    },
    'right-16': {
      right: 64,
    },
    'bottom-16': {
      bottom: 64,
    },
    'left-16': {
      left: 64,
    },
    'top-20': {
      top: 80,
    },
    'right-20': {
      right: 80,
    },
    'bottom-20': {
      bottom: 80,
    },
    'left-20': {
      left: 80,
    },
    'top-24': {
      top: 96,
    },
    'right-24': {
      right: 96,
    },
    'bottom-24': {
      bottom: 96,
    },
    'left-24': {
      left: 96,
    },
    'top-28': {
      top: 112,
    },
    'right-28': {
      right: 112,
    },
    'bottom-28': {
      bottom: 112,
    },
    'left-28': {
      left: 112,
    },
    'top-32': {
      top: 128,
    },
    'right-32': {
      right: 128,
    },
    'bottom-32': {
      bottom: 128,
    },
    'left-32': {
      left: 128,
    },
    'top-36': {
      top: 144,
    },
    'right-36': {
      right: 144,
    },
    'bottom-36': {
      bottom: 144,
    },
    'left-36': {
      left: 144,
    },
    'top-40': {
      top: 160,
    },
    'right-40': {
      right: 160,
    },
    'bottom-40': {
      bottom: 160,
    },
    'left-40': {
      left: 160,
    },
    'top-44': {
      top: 176,
    },
    'right-44': {
      right: 176,
    },
    'bottom-44': {
      bottom: 176,
    },
    'left-44': {
      left: 176,
    },
    'top-48': {
      top: 192,
    },
    'right-48': {
      right: 192,
    },
    'bottom-48': {
      bottom: 192,
    },
    'left-48': {
      left: 192,
    },
    'top-52': {
      top: 208,
    },
    'right-52': {
      right: 208,
    },
    'bottom-52': {
      bottom: 208,
    },
    'left-52': {
      left: 208,
    },
    'top-56': {
      top: 224,
    },
    'right-56': {
      right: 224,
    },
    'bottom-56': {
      bottom: 224,
    },
    'left-56': {
      left: 224,
    },
    'top-60': {
      top: 240,
    },
    'right-60': {
      right: 240,
    },
    'bottom-60': {
      bottom: 240,
    },
    'left-60': {
      left: 240,
    },
    'top-64': {
      top: 256,
    },
    'right-64': {
      right: 256,
    },
    'bottom-64': {
      bottom: 256,
    },
    'left-64': {
      left: 256,
    },
    'top-72': {
      top: 288,
    },
    'right-72': {
      right: 288,
    },
    'bottom-72': {
      bottom: 288,
    },
    'left-72': {
      left: 288,
    },
    'top-80': {
      top: 320,
    },
    'right-80': {
      right: 320,
    },
    'bottom-80': {
      bottom: 320,
    },
    'left-80': {
      left: 320,
    },
    'top-96': {
      top: 384,
    },
    'right-96': {
      right: 384,
    },
    'bottom-96': {
      bottom: 384,
    },
    'left-96': {
      left: 384,
    },
    'top-px': {
      top: 1,
    },
    'right-px': {
      right: 1,
    },
    'bottom-px': {
      bottom: 1,
    },
    'left-px': {
      left: 1,
    },
    'top-0.5': {
      top: 2,
    },
    'right-0.5': {
      right: 2,
    },
    'bottom-0.5': {
      bottom: 2,
    },
    'left-0.5': {
      left: 2,
    },
    'top-1.5': {
      top: 6,
    },
    'right-1.5': {
      right: 6,
    },
    'bottom-1.5': {
      bottom: 6,
    },
    'left-1.5': {
      left: 6,
    },
    'top-2.5': {
      top: 10,
    },
    'right-2.5': {
      right: 10,
    },
    'bottom-2.5': {
      bottom: 10,
    },
    'left-2.5': {
      left: 10,
    },
    'top-3.5': {
      top: 14,
    },
    'right-3.5': {
      right: 14,
    },
    'bottom-3.5': {
      bottom: 14,
    },
    'left-3.5': {
      left: 14,
    },
    '-top-0': {
      top: 0,
    },
    '-right-0': {
      right: 0,
    },
    '-bottom-0': {
      bottom: 0,
    },
    '-left-0': {
      left: 0,
    },
    '-top-1': {
      top: -4,
    },
    '-right-1': {
      right: -4,
    },
    '-bottom-1': {
      bottom: -4,
    },
    '-left-1': {
      left: -4,
    },
    '-top-2': {
      top: -8,
    },
    '-right-2': {
      right: -8,
    },
    '-bottom-2': {
      bottom: -8,
    },
    '-left-2': {
      left: -8,
    },
    '-top-3': {
      top: -12,
    },
    '-right-3': {
      right: -12,
    },
    '-bottom-3': {
      bottom: -12,
    },
    '-left-3': {
      left: -12,
    },
    '-top-4': {
      top: -16,
    },
    '-right-4': {
      right: -16,
    },
    '-bottom-4': {
      bottom: -16,
    },
    '-left-4': {
      left: -16,
    },
    '-top-5': {
      top: -20,
    },
    '-right-5': {
      right: -20,
    },
    '-bottom-5': {
      bottom: -20,
    },
    '-left-5': {
      left: -20,
    },
    '-top-6': {
      top: -24,
    },
    '-right-6': {
      right: -24,
    },
    '-bottom-6': {
      bottom: -24,
    },
    '-left-6': {
      left: -24,
    },
    '-top-7': {
      top: -28,
    },
    '-right-7': {
      right: -28,
    },
    '-bottom-7': {
      bottom: -28,
    },
    '-left-7': {
      left: -28,
    },
    '-top-8': {
      top: -32,
    },
    '-right-8': {
      right: -32,
    },
    '-bottom-8': {
      bottom: -32,
    },
    '-left-8': {
      left: -32,
    },
    '-top-9': {
      top: -36,
    },
    '-right-9': {
      right: -36,
    },
    '-bottom-9': {
      bottom: -36,
    },
    '-left-9': {
      left: -36,
    },
    '-top-10': {
      top: -40,
    },
    '-right-10': {
      right: -40,
    },
    '-bottom-10': {
      bottom: -40,
    },
    '-left-10': {
      left: -40,
    },
    '-top-11': {
      top: -44,
    },
    '-right-11': {
      right: -44,
    },
    '-bottom-11': {
      bottom: -44,
    },
    '-left-11': {
      left: -44,
    },
    '-top-12': {
      top: -48,
    },
    '-right-12': {
      right: -48,
    },
    '-bottom-12': {
      bottom: -48,
    },
    '-left-12': {
      left: -48,
    },
    '-top-14': {
      top: -56,
    },
    '-right-14': {
      right: -56,
    },
    '-bottom-14': {
      bottom: -56,
    },
    '-left-14': {
      left: -56,
    },
    '-top-16': {
      top: -64,
    },
    '-right-16': {
      right: -64,
    },
    '-bottom-16': {
      bottom: -64,
    },
    '-left-16': {
      left: -64,
    },
    '-top-20': {
      top: -80,
    },
    '-right-20': {
      right: -80,
    },
    '-bottom-20': {
      bottom: -80,
    },
    '-left-20': {
      left: -80,
    },
    '-top-24': {
      top: -96,
    },
    '-right-24': {
      right: -96,
    },
    '-bottom-24': {
      bottom: -96,
    },
    '-left-24': {
      left: -96,
    },
    '-top-28': {
      top: -112,
    },
    '-right-28': {
      right: -112,
    },
    '-bottom-28': {
      bottom: -112,
    },
    '-left-28': {
      left: -112,
    },
    '-top-32': {
      top: -128,
    },
    '-right-32': {
      right: -128,
    },
    '-bottom-32': {
      bottom: -128,
    },
    '-left-32': {
      left: -128,
    },
    '-top-36': {
      top: -144,
    },
    '-right-36': {
      right: -144,
    },
    '-bottom-36': {
      bottom: -144,
    },
    '-left-36': {
      left: -144,
    },
    '-top-40': {
      top: -160,
    },
    '-right-40': {
      right: -160,
    },
    '-bottom-40': {
      bottom: -160,
    },
    '-left-40': {
      left: -160,
    },
    '-top-44': {
      top: -176,
    },
    '-right-44': {
      right: -176,
    },
    '-bottom-44': {
      bottom: -176,
    },
    '-left-44': {
      left: -176,
    },
    '-top-48': {
      top: -192,
    },
    '-right-48': {
      right: -192,
    },
    '-bottom-48': {
      bottom: -192,
    },
    '-left-48': {
      left: -192,
    },
    '-top-52': {
      top: -208,
    },
    '-right-52': {
      right: -208,
    },
    '-bottom-52': {
      bottom: -208,
    },
    '-left-52': {
      left: -208,
    },
    '-top-56': {
      top: -224,
    },
    '-right-56': {
      right: -224,
    },
    '-bottom-56': {
      bottom: -224,
    },
    '-left-56': {
      left: -224,
    },
    '-top-60': {
      top: -240,
    },
    '-right-60': {
      right: -240,
    },
    '-bottom-60': {
      bottom: -240,
    },
    '-left-60': {
      left: -240,
    },
    '-top-64': {
      top: -256,
    },
    '-right-64': {
      right: -256,
    },
    '-bottom-64': {
      bottom: -256,
    },
    '-left-64': {
      left: -256,
    },
    '-top-72': {
      top: -288,
    },
    '-right-72': {
      right: -288,
    },
    '-bottom-72': {
      bottom: -288,
    },
    '-left-72': {
      left: -288,
    },
    '-top-80': {
      top: -320,
    },
    '-right-80': {
      right: -320,
    },
    '-bottom-80': {
      bottom: -320,
    },
    '-left-80': {
      left: -320,
    },
    '-top-96': {
      top: -384,
    },
    '-right-96': {
      right: -384,
    },
    '-bottom-96': {
      bottom: -384,
    },
    '-left-96': {
      left: -384,
    },
    '-top-px': {
      top: -1,
    },
    '-right-px': {
      right: -1,
    },
    '-bottom-px': {
      bottom: -1,
    },
    '-left-px': {
      left: -1,
    },
    '-top-0.5': {
      top: -2,
    },
    '-right-0.5': {
      right: -2,
    },
    '-bottom-0.5': {
      bottom: -2,
    },
    '-left-0.5': {
      left: -2,
    },
    '-top-1.5': {
      top: -6,
    },
    '-right-1.5': {
      right: -6,
    },
    '-bottom-1.5': {
      bottom: -6,
    },
    '-left-1.5': {
      left: -6,
    },
    '-top-2.5': {
      top: -10,
    },
    '-right-2.5': {
      right: -10,
    },
    '-bottom-2.5': {
      bottom: -10,
    },
    '-left-2.5': {
      left: -10,
    },
    '-top-3.5': {
      top: -14,
    },
    '-right-3.5': {
      right: -14,
    },
    '-bottom-3.5': {
      bottom: -14,
    },
    '-left-3.5': {
      left: -14,
    },
    'top-1/2': {
      top: '50%',
    },
    'right-1/2': {
      right: '50%',
    },
    'bottom-1/2': {
      bottom: '50%',
    },
    'left-1/2': {
      left: '50%',
    },
    'top-1/3': {
      top: '33.333333%',
    },
    'right-1/3': {
      right: '33.333333%',
    },
    'bottom-1/3': {
      bottom: '33.333333%',
    },
    'left-1/3': {
      left: '33.333333%',
    },
    'top-2/3': {
      top: '66.666667%',
    },
    'right-2/3': {
      right: '66.666667%',
    },
    'bottom-2/3': {
      bottom: '66.666667%',
    },
    'left-2/3': {
      left: '66.666667%',
    },
    'top-1/4': {
      top: '25%',
    },
    'right-1/4': {
      right: '25%',
    },
    'bottom-1/4': {
      bottom: '25%',
    },
    'left-1/4': {
      left: '25%',
    },
    'top-2/4': {
      top: '50%',
    },
    'right-2/4': {
      right: '50%',
    },
    'bottom-2/4': {
      bottom: '50%',
    },
    'left-2/4': {
      left: '50%',
    },
    'top-3/4': {
      top: '75%',
    },
    'right-3/4': {
      right: '75%',
    },
    'bottom-3/4': {
      bottom: '75%',
    },
    'left-3/4': {
      left: '75%',
    },
    'top-full': {
      top: '100%',
    },
    'right-full': {
      right: '100%',
    },
    'bottom-full': {
      bottom: '100%',
    },
    'left-full': {
      left: '100%',
    },
    '-top-1/2': {
      top: '-50%',
    },
    '-right-1/2': {
      right: '-50%',
    },
    '-bottom-1/2': {
      bottom: '-50%',
    },
    '-left-1/2': {
      left: '-50%',
    },
    '-top-1/3': {
      top: '-33.333333%',
    },
    '-right-1/3': {
      right: '-33.333333%',
    },
    '-bottom-1/3': {
      bottom: '-33.333333%',
    },
    '-left-1/3': {
      left: '-33.333333%',
    },
    '-top-2/3': {
      top: '-66.666667%',
    },
    '-right-2/3': {
      right: '-66.666667%',
    },
    '-bottom-2/3': {
      bottom: '-66.666667%',
    },
    '-left-2/3': {
      left: '-66.666667%',
    },
    '-top-1/4': {
      top: '-25%',
    },
    '-right-1/4': {
      right: '-25%',
    },
    '-bottom-1/4': {
      bottom: '-25%',
    },
    '-left-1/4': {
      left: '-25%',
    },
    '-top-2/4': {
      top: '-50%',
    },
    '-right-2/4': {
      right: '-50%',
    },
    '-bottom-2/4': {
      bottom: '-50%',
    },
    '-left-2/4': {
      left: '-50%',
    },
    '-top-3/4': {
      top: '-75%',
    },
    '-right-3/4': {
      right: '-75%',
    },
    '-bottom-3/4': {
      bottom: '-75%',
    },
    '-left-3/4': {
      left: '-75%',
    },
    '-top-full': {
      top: '-100%',
    },
    '-right-full': {
      right: '-100%',
    },
    '-bottom-full': {
      bottom: '-100%',
    },
    '-left-full': {
      left: '-100%',
    },
    '*': {
      '--tw-ring-inset': 'var(--tw-empty, )',
      '--tw-ring-offset-width': 0,
      '--tw-ring-offset-color': '#fff',
      '--tw-ring-color': 'rgba(59, 130, 246, 0.5)',
      '--tw-ring-offset-shadow': '0 0 #0000',
      '--tw-ring-shadow': '0 0 #0000',
    },
    'ring-inset': {
      '--tw-ring-inset': 'inset',
    },
    'ring-offset-transparent': {
      '--tw-ring-offset-color': 'transparent',
    },
    'ring-offset-black': {
      '--tw-ring-offset-color': '#000',
    },
    'ring-offset-white': {
      '--tw-ring-offset-color': '#fff',
    },
    'ring-offset-gray-50': {
      '--tw-ring-offset-color': '#f9fafb',
    },
    'ring-offset-gray-100': {
      '--tw-ring-offset-color': '#f3f4f6',
    },
    'ring-offset-gray-200': {
      '--tw-ring-offset-color': '#e5e7eb',
    },
    'ring-offset-gray-300': {
      '--tw-ring-offset-color': '#d1d5db',
    },
    'ring-offset-gray-400': {
      '--tw-ring-offset-color': '#9ca3af',
    },
    'ring-offset-gray-500': {
      '--tw-ring-offset-color': '#6b7280',
    },
    'ring-offset-gray-600': {
      '--tw-ring-offset-color': '#4b5563',
    },
    'ring-offset-gray-700': {
      '--tw-ring-offset-color': '#374151',
    },
    'ring-offset-gray-800': {
      '--tw-ring-offset-color': '#1f2937',
    },
    'ring-offset-gray-900': {
      '--tw-ring-offset-color': '#111827',
    },
    'ring-offset-red-50': {
      '--tw-ring-offset-color': '#fef2f2',
    },
    'ring-offset-red-100': {
      '--tw-ring-offset-color': '#fee2e2',
    },
    'ring-offset-red-200': {
      '--tw-ring-offset-color': '#fecaca',
    },
    'ring-offset-red-300': {
      '--tw-ring-offset-color': '#fca5a5',
    },
    'ring-offset-red-400': {
      '--tw-ring-offset-color': '#f87171',
    },
    'ring-offset-red-500': {
      '--tw-ring-offset-color': '#ef4444',
    },
    'ring-offset-red-600': {
      '--tw-ring-offset-color': '#dc2626',
    },
    'ring-offset-red-700': {
      '--tw-ring-offset-color': '#b91c1c',
    },
    'ring-offset-red-800': {
      '--tw-ring-offset-color': '#991b1b',
    },
    'ring-offset-red-900': {
      '--tw-ring-offset-color': '#7f1d1d',
    },
    'ring-offset-yellow-50': {
      '--tw-ring-offset-color': '#fffbeb',
    },
    'ring-offset-yellow-100': {
      '--tw-ring-offset-color': '#fef3c7',
    },
    'ring-offset-yellow-200': {
      '--tw-ring-offset-color': '#fde68a',
    },
    'ring-offset-yellow-300': {
      '--tw-ring-offset-color': '#fcd34d',
    },
    'ring-offset-yellow-400': {
      '--tw-ring-offset-color': '#fbbf24',
    },
    'ring-offset-yellow-500': {
      '--tw-ring-offset-color': '#f59e0b',
    },
    'ring-offset-yellow-600': {
      '--tw-ring-offset-color': '#d97706',
    },
    'ring-offset-yellow-700': {
      '--tw-ring-offset-color': '#b45309',
    },
    'ring-offset-yellow-800': {
      '--tw-ring-offset-color': '#92400e',
    },
    'ring-offset-yellow-900': {
      '--tw-ring-offset-color': '#78350f',
    },
    'ring-offset-green-50': {
      '--tw-ring-offset-color': '#ecfdf5',
    },
    'ring-offset-green-100': {
      '--tw-ring-offset-color': '#d1fae5',
    },
    'ring-offset-green-200': {
      '--tw-ring-offset-color': '#a7f3d0',
    },
    'ring-offset-green-300': {
      '--tw-ring-offset-color': '#6ee7b7',
    },
    'ring-offset-green-400': {
      '--tw-ring-offset-color': '#34d399',
    },
    'ring-offset-green-500': {
      '--tw-ring-offset-color': '#10b981',
    },
    'ring-offset-green-600': {
      '--tw-ring-offset-color': '#059669',
    },
    'ring-offset-green-700': {
      '--tw-ring-offset-color': '#047857',
    },
    'ring-offset-green-800': {
      '--tw-ring-offset-color': '#065f46',
    },
    'ring-offset-green-900': {
      '--tw-ring-offset-color': '#064e3b',
    },
    'ring-offset-blue-50': {
      '--tw-ring-offset-color': '#eff6ff',
    },
    'ring-offset-blue-100': {
      '--tw-ring-offset-color': '#dbeafe',
    },
    'ring-offset-blue-200': {
      '--tw-ring-offset-color': '#bfdbfe',
    },
    'ring-offset-blue-300': {
      '--tw-ring-offset-color': '#93c5fd',
    },
    'ring-offset-blue-400': {
      '--tw-ring-offset-color': '#60a5fa',
    },
    'ring-offset-blue-500': {
      '--tw-ring-offset-color': '#3b82f6',
    },
    'ring-offset-blue-600': {
      '--tw-ring-offset-color': '#2563eb',
    },
    'ring-offset-blue-700': {
      '--tw-ring-offset-color': '#1d4ed8',
    },
    'ring-offset-blue-800': {
      '--tw-ring-offset-color': '#1e40af',
    },
    'ring-offset-blue-900': {
      '--tw-ring-offset-color': '#1e3a8a',
    },
    'ring-offset-indigo-50': {
      '--tw-ring-offset-color': '#eef2ff',
    },
    'ring-offset-indigo-100': {
      '--tw-ring-offset-color': '#e0e7ff',
    },
    'ring-offset-indigo-200': {
      '--tw-ring-offset-color': '#c7d2fe',
    },
    'ring-offset-indigo-300': {
      '--tw-ring-offset-color': '#a5b4fc',
    },
    'ring-offset-indigo-400': {
      '--tw-ring-offset-color': '#818cf8',
    },
    'ring-offset-indigo-500': {
      '--tw-ring-offset-color': '#6366f1',
    },
    'ring-offset-indigo-600': {
      '--tw-ring-offset-color': '#4f46e5',
    },
    'ring-offset-indigo-700': {
      '--tw-ring-offset-color': '#4338ca',
    },
    'ring-offset-indigo-800': {
      '--tw-ring-offset-color': '#3730a3',
    },
    'ring-offset-indigo-900': {
      '--tw-ring-offset-color': '#312e81',
    },
    'ring-offset-purple-50': {
      '--tw-ring-offset-color': '#f5f3ff',
    },
    'ring-offset-purple-100': {
      '--tw-ring-offset-color': '#ede9fe',
    },
    'ring-offset-purple-200': {
      '--tw-ring-offset-color': '#ddd6fe',
    },
    'ring-offset-purple-300': {
      '--tw-ring-offset-color': '#c4b5fd',
    },
    'ring-offset-purple-400': {
      '--tw-ring-offset-color': '#a78bfa',
    },
    'ring-offset-purple-500': {
      '--tw-ring-offset-color': '#8b5cf6',
    },
    'ring-offset-purple-600': {
      '--tw-ring-offset-color': '#7c3aed',
    },
    'ring-offset-purple-700': {
      '--tw-ring-offset-color': '#6d28d9',
    },
    'ring-offset-purple-800': {
      '--tw-ring-offset-color': '#5b21b6',
    },
    'ring-offset-purple-900': {
      '--tw-ring-offset-color': '#4c1d95',
    },
    'ring-offset-pink-50': {
      '--tw-ring-offset-color': '#fdf2f8',
    },
    'ring-offset-pink-100': {
      '--tw-ring-offset-color': '#fce7f3',
    },
    'ring-offset-pink-200': {
      '--tw-ring-offset-color': '#fbcfe8',
    },
    'ring-offset-pink-300': {
      '--tw-ring-offset-color': '#f9a8d4',
    },
    'ring-offset-pink-400': {
      '--tw-ring-offset-color': '#f472b6',
    },
    'ring-offset-pink-500': {
      '--tw-ring-offset-color': '#ec4899',
    },
    'ring-offset-pink-600': {
      '--tw-ring-offset-color': '#db2777',
    },
    'ring-offset-pink-700': {
      '--tw-ring-offset-color': '#be185d',
    },
    'ring-offset-pink-800': {
      '--tw-ring-offset-color': '#9d174d',
    },
    'ring-offset-pink-900': {
      '--tw-ring-offset-color': '#831843',
    },
    'ring-offset-0': {
      '--tw-ring-offset-width': 0,
    },
    'ring-offset-1': {
      '--tw-ring-offset-width': 1,
    },
    'ring-offset-2': {
      '--tw-ring-offset-width': 2,
    },
    'ring-offset-4': {
      '--tw-ring-offset-width': 4,
    },
    'ring-offset-8': {
      '--tw-ring-offset-width': 8,
    },
    'ring-transparent': {
      '--tw-ring-color': 'transparent',
    },
    'ring-black': {
      '--tw-ring-opacity': 1,
      '--tw-ring-color': 'rgba(0, 0, 0, var(--tw-ring-opacity))',
    },
    'ring-white': {
      '--tw-ring-opacity': 1,
      '--tw-ring-color': 'rgba(255, 255, 255, var(--tw-ring-opacity))',
    },
    'ring-gray-50': {
      '--tw-ring-opacity': 1,
      '--tw-ring-color': 'rgba(249, 250, 251, var(--tw-ring-opacity))',
    },
    'ring-gray-100': {
      '--tw-ring-opacity': 1,
      '--tw-ring-color': 'rgba(243, 244, 246, var(--tw-ring-opacity))',
    },
    'ring-gray-200': {
      '--tw-ring-opacity': 1,
      '--tw-ring-color': 'rgba(229, 231, 235, var(--tw-ring-opacity))',
    },
    'ring-gray-300': {
      '--tw-ring-opacity': 1,
      '--tw-ring-color': 'rgba(209, 213, 219, var(--tw-ring-opacity))',
    },
    'ring-gray-400': {
      '--tw-ring-opacity': 1,
      '--tw-ring-color': 'rgba(156, 163, 175, var(--tw-ring-opacity))',
    },
    'ring-gray-500': {
      '--tw-ring-opacity': 1,
      '--tw-ring-color': 'rgba(107, 114, 128, var(--tw-ring-opacity))',
    },
    'ring-gray-600': {
      '--tw-ring-opacity': 1,
      '--tw-ring-color': 'rgba(75, 85, 99, var(--tw-ring-opacity))',
    },
    'ring-gray-700': {
      '--tw-ring-opacity': 1,
      '--tw-ring-color': 'rgba(55, 65, 81, var(--tw-ring-opacity))',
    },
    'ring-gray-800': {
      '--tw-ring-opacity': 1,
      '--tw-ring-color': 'rgba(31, 41, 55, var(--tw-ring-opacity))',
    },
    'ring-gray-900': {
      '--tw-ring-opacity': 1,
      '--tw-ring-color': 'rgba(17, 24, 39, var(--tw-ring-opacity))',
    },
    'ring-red-50': {
      '--tw-ring-opacity': 1,
      '--tw-ring-color': 'rgba(254, 242, 242, var(--tw-ring-opacity))',
    },
    'ring-red-100': {
      '--tw-ring-opacity': 1,
      '--tw-ring-color': 'rgba(254, 226, 226, var(--tw-ring-opacity))',
    },
    'ring-red-200': {
      '--tw-ring-opacity': 1,
      '--tw-ring-color': 'rgba(254, 202, 202, var(--tw-ring-opacity))',
    },
    'ring-red-300': {
      '--tw-ring-opacity': 1,
      '--tw-ring-color': 'rgba(252, 165, 165, var(--tw-ring-opacity))',
    },
    'ring-red-400': {
      '--tw-ring-opacity': 1,
      '--tw-ring-color': 'rgba(248, 113, 113, var(--tw-ring-opacity))',
    },
    'ring-red-500': {
      '--tw-ring-opacity': 1,
      '--tw-ring-color': 'rgba(239, 68, 68, var(--tw-ring-opacity))',
    },
    'ring-red-600': {
      '--tw-ring-opacity': 1,
      '--tw-ring-color': 'rgba(220, 38, 38, var(--tw-ring-opacity))',
    },
    'ring-red-700': {
      '--tw-ring-opacity': 1,
      '--tw-ring-color': 'rgba(185, 28, 28, var(--tw-ring-opacity))',
    },
    'ring-red-800': {
      '--tw-ring-opacity': 1,
      '--tw-ring-color': 'rgba(153, 27, 27, var(--tw-ring-opacity))',
    },
    'ring-red-900': {
      '--tw-ring-opacity': 1,
      '--tw-ring-color': 'rgba(127, 29, 29, var(--tw-ring-opacity))',
    },
    'ring-yellow-50': {
      '--tw-ring-opacity': 1,
      '--tw-ring-color': 'rgba(255, 251, 235, var(--tw-ring-opacity))',
    },
    'ring-yellow-100': {
      '--tw-ring-opacity': 1,
      '--tw-ring-color': 'rgba(254, 243, 199, var(--tw-ring-opacity))',
    },
    'ring-yellow-200': {
      '--tw-ring-opacity': 1,
      '--tw-ring-color': 'rgba(253, 230, 138, var(--tw-ring-opacity))',
    },
    'ring-yellow-300': {
      '--tw-ring-opacity': 1,
      '--tw-ring-color': 'rgba(252, 211, 77, var(--tw-ring-opacity))',
    },
    'ring-yellow-400': {
      '--tw-ring-opacity': 1,
      '--tw-ring-color': 'rgba(251, 191, 36, var(--tw-ring-opacity))',
    },
    'ring-yellow-500': {
      '--tw-ring-opacity': 1,
      '--tw-ring-color': 'rgba(245, 158, 11, var(--tw-ring-opacity))',
    },
    'ring-yellow-600': {
      '--tw-ring-opacity': 1,
      '--tw-ring-color': 'rgba(217, 119, 6, var(--tw-ring-opacity))',
    },
    'ring-yellow-700': {
      '--tw-ring-opacity': 1,
      '--tw-ring-color': 'rgba(180, 83, 9, var(--tw-ring-opacity))',
    },
    'ring-yellow-800': {
      '--tw-ring-opacity': 1,
      '--tw-ring-color': 'rgba(146, 64, 14, var(--tw-ring-opacity))',
    },
    'ring-yellow-900': {
      '--tw-ring-opacity': 1,
      '--tw-ring-color': 'rgba(120, 53, 15, var(--tw-ring-opacity))',
    },
    'ring-green-50': {
      '--tw-ring-opacity': 1,
      '--tw-ring-color': 'rgba(236, 253, 245, var(--tw-ring-opacity))',
    },
    'ring-green-100': {
      '--tw-ring-opacity': 1,
      '--tw-ring-color': 'rgba(209, 250, 229, var(--tw-ring-opacity))',
    },
    'ring-green-200': {
      '--tw-ring-opacity': 1,
      '--tw-ring-color': 'rgba(167, 243, 208, var(--tw-ring-opacity))',
    },
    'ring-green-300': {
      '--tw-ring-opacity': 1,
      '--tw-ring-color': 'rgba(110, 231, 183, var(--tw-ring-opacity))',
    },
    'ring-green-400': {
      '--tw-ring-opacity': 1,
      '--tw-ring-color': 'rgba(52, 211, 153, var(--tw-ring-opacity))',
    },
    'ring-green-500': {
      '--tw-ring-opacity': 1,
      '--tw-ring-color': 'rgba(16, 185, 129, var(--tw-ring-opacity))',
    },
    'ring-green-600': {
      '--tw-ring-opacity': 1,
      '--tw-ring-color': 'rgba(5, 150, 105, var(--tw-ring-opacity))',
    },
    'ring-green-700': {
      '--tw-ring-opacity': 1,
      '--tw-ring-color': 'rgba(4, 120, 87, var(--tw-ring-opacity))',
    },
    'ring-green-800': {
      '--tw-ring-opacity': 1,
      '--tw-ring-color': 'rgba(6, 95, 70, var(--tw-ring-opacity))',
    },
    'ring-green-900': {
      '--tw-ring-opacity': 1,
      '--tw-ring-color': 'rgba(6, 78, 59, var(--tw-ring-opacity))',
    },
    'ring-blue-50': {
      '--tw-ring-opacity': 1,
      '--tw-ring-color': 'rgba(239, 246, 255, var(--tw-ring-opacity))',
    },
    'ring-blue-100': {
      '--tw-ring-opacity': 1,
      '--tw-ring-color': 'rgba(219, 234, 254, var(--tw-ring-opacity))',
    },
    'ring-blue-200': {
      '--tw-ring-opacity': 1,
      '--tw-ring-color': 'rgba(191, 219, 254, var(--tw-ring-opacity))',
    },
    'ring-blue-300': {
      '--tw-ring-opacity': 1,
      '--tw-ring-color': 'rgba(147, 197, 253, var(--tw-ring-opacity))',
    },
    'ring-blue-400': {
      '--tw-ring-opacity': 1,
      '--tw-ring-color': 'rgba(96, 165, 250, var(--tw-ring-opacity))',
    },
    'ring-blue-500': {
      '--tw-ring-opacity': 1,
      '--tw-ring-color': 'rgba(59, 130, 246, var(--tw-ring-opacity))',
    },
    'ring-blue-600': {
      '--tw-ring-opacity': 1,
      '--tw-ring-color': 'rgba(37, 99, 235, var(--tw-ring-opacity))',
    },
    'ring-blue-700': {
      '--tw-ring-opacity': 1,
      '--tw-ring-color': 'rgba(29, 78, 216, var(--tw-ring-opacity))',
    },
    'ring-blue-800': {
      '--tw-ring-opacity': 1,
      '--tw-ring-color': 'rgba(30, 64, 175, var(--tw-ring-opacity))',
    },
    'ring-blue-900': {
      '--tw-ring-opacity': 1,
      '--tw-ring-color': 'rgba(30, 58, 138, var(--tw-ring-opacity))',
    },
    'ring-indigo-50': {
      '--tw-ring-opacity': 1,
      '--tw-ring-color': 'rgba(238, 242, 255, var(--tw-ring-opacity))',
    },
    'ring-indigo-100': {
      '--tw-ring-opacity': 1,
      '--tw-ring-color': 'rgba(224, 231, 255, var(--tw-ring-opacity))',
    },
    'ring-indigo-200': {
      '--tw-ring-opacity': 1,
      '--tw-ring-color': 'rgba(199, 210, 254, var(--tw-ring-opacity))',
    },
    'ring-indigo-300': {
      '--tw-ring-opacity': 1,
      '--tw-ring-color': 'rgba(165, 180, 252, var(--tw-ring-opacity))',
    },
    'ring-indigo-400': {
      '--tw-ring-opacity': 1,
      '--tw-ring-color': 'rgba(129, 140, 248, var(--tw-ring-opacity))',
    },
    'ring-indigo-500': {
      '--tw-ring-opacity': 1,
      '--tw-ring-color': 'rgba(99, 102, 241, var(--tw-ring-opacity))',
    },
    'ring-indigo-600': {
      '--tw-ring-opacity': 1,
      '--tw-ring-color': 'rgba(79, 70, 229, var(--tw-ring-opacity))',
    },
    'ring-indigo-700': {
      '--tw-ring-opacity': 1,
      '--tw-ring-color': 'rgba(67, 56, 202, var(--tw-ring-opacity))',
    },
    'ring-indigo-800': {
      '--tw-ring-opacity': 1,
      '--tw-ring-color': 'rgba(55, 48, 163, var(--tw-ring-opacity))',
    },
    'ring-indigo-900': {
      '--tw-ring-opacity': 1,
      '--tw-ring-color': 'rgba(49, 46, 129, var(--tw-ring-opacity))',
    },
    'ring-purple-50': {
      '--tw-ring-opacity': 1,
      '--tw-ring-color': 'rgba(245, 243, 255, var(--tw-ring-opacity))',
    },
    'ring-purple-100': {
      '--tw-ring-opacity': 1,
      '--tw-ring-color': 'rgba(237, 233, 254, var(--tw-ring-opacity))',
    },
    'ring-purple-200': {
      '--tw-ring-opacity': 1,
      '--tw-ring-color': 'rgba(221, 214, 254, var(--tw-ring-opacity))',
    },
    'ring-purple-300': {
      '--tw-ring-opacity': 1,
      '--tw-ring-color': 'rgba(196, 181, 253, var(--tw-ring-opacity))',
    },
    'ring-purple-400': {
      '--tw-ring-opacity': 1,
      '--tw-ring-color': 'rgba(167, 139, 250, var(--tw-ring-opacity))',
    },
    'ring-purple-500': {
      '--tw-ring-opacity': 1,
      '--tw-ring-color': 'rgba(139, 92, 246, var(--tw-ring-opacity))',
    },
    'ring-purple-600': {
      '--tw-ring-opacity': 1,
      '--tw-ring-color': 'rgba(124, 58, 237, var(--tw-ring-opacity))',
    },
    'ring-purple-700': {
      '--tw-ring-opacity': 1,
      '--tw-ring-color': 'rgba(109, 40, 217, var(--tw-ring-opacity))',
    },
    'ring-purple-800': {
      '--tw-ring-opacity': 1,
      '--tw-ring-color': 'rgba(91, 33, 182, var(--tw-ring-opacity))',
    },
    'ring-purple-900': {
      '--tw-ring-opacity': 1,
      '--tw-ring-color': 'rgba(76, 29, 149, var(--tw-ring-opacity))',
    },
    'ring-pink-50': {
      '--tw-ring-opacity': 1,
      '--tw-ring-color': 'rgba(253, 242, 248, var(--tw-ring-opacity))',
    },
    'ring-pink-100': {
      '--tw-ring-opacity': 1,
      '--tw-ring-color': 'rgba(252, 231, 243, var(--tw-ring-opacity))',
    },
    'ring-pink-200': {
      '--tw-ring-opacity': 1,
      '--tw-ring-color': 'rgba(251, 207, 232, var(--tw-ring-opacity))',
    },
    'ring-pink-300': {
      '--tw-ring-opacity': 1,
      '--tw-ring-color': 'rgba(249, 168, 212, var(--tw-ring-opacity))',
    },
    'ring-pink-400': {
      '--tw-ring-opacity': 1,
      '--tw-ring-color': 'rgba(244, 114, 182, var(--tw-ring-opacity))',
    },
    'ring-pink-500': {
      '--tw-ring-opacity': 1,
      '--tw-ring-color': 'rgba(236, 72, 153, var(--tw-ring-opacity))',
    },
    'ring-pink-600': {
      '--tw-ring-opacity': 1,
      '--tw-ring-color': 'rgba(219, 39, 119, var(--tw-ring-opacity))',
    },
    'ring-pink-700': {
      '--tw-ring-opacity': 1,
      '--tw-ring-color': 'rgba(190, 24, 93, var(--tw-ring-opacity))',
    },
    'ring-pink-800': {
      '--tw-ring-opacity': 1,
      '--tw-ring-color': 'rgba(157, 23, 77, var(--tw-ring-opacity))',
    },
    'ring-pink-900': {
      '--tw-ring-opacity': 1,
      '--tw-ring-color': 'rgba(131, 24, 67, var(--tw-ring-opacity))',
    },
    'ring-opacity-0': {
      '--tw-ring-opacity': 0,
    },
    'ring-opacity-5': {
      '--tw-ring-opacity': 0.05,
    },
    'ring-opacity-10': {
      '--tw-ring-opacity': 0.1,
    },
    'ring-opacity-20': {
      '--tw-ring-opacity': 0.2,
    },
    'ring-opacity-25': {
      '--tw-ring-opacity': 0.25,
    },
    'ring-opacity-30': {
      '--tw-ring-opacity': 0.3,
    },
    'ring-opacity-40': {
      '--tw-ring-opacity': 0.4,
    },
    'ring-opacity-50': {
      '--tw-ring-opacity': 0.5,
    },
    'ring-opacity-60': {
      '--tw-ring-opacity': 0.6,
    },
    'ring-opacity-70': {
      '--tw-ring-opacity': 0.7,
    },
    'ring-opacity-75': {
      '--tw-ring-opacity': 0.75,
    },
    'ring-opacity-80': {
      '--tw-ring-opacity': 0.8,
    },
    'ring-opacity-90': {
      '--tw-ring-opacity': 0.9,
    },
    'ring-opacity-95': {
      '--tw-ring-opacity': 0.95,
    },
    'ring-opacity-100': {
      '--tw-ring-opacity': 1,
    },
    'text-left': {
      textAlign: 'left',
    },
    'text-center': {
      textAlign: 'center',
    },
    'text-right': {
      textAlign: 'right',
    },
    'text-justify': {
      textAlign: 'justify',
    },
    'text-transparent': {
      color: 'transparent',
    },
    'text-black': {
      '--tw-text-opacity': 1,
      color: 'rgba(0, 0, 0, var(--tw-text-opacity))',
    },
    'text-white': {
      '--tw-text-opacity': 1,
      color: 'rgba(255, 255, 255, var(--tw-text-opacity))',
    },
    'text-gray-50': {
      '--tw-text-opacity': 1,
      color: 'rgba(249, 250, 251, var(--tw-text-opacity))',
    },
    'text-gray-100': {
      '--tw-text-opacity': 1,
      color: 'rgba(243, 244, 246, var(--tw-text-opacity))',
    },
    'text-gray-200': {
      '--tw-text-opacity': 1,
      color: 'rgba(229, 231, 235, var(--tw-text-opacity))',
    },
    'text-gray-300': {
      '--tw-text-opacity': 1,
      color: 'rgba(209, 213, 219, var(--tw-text-opacity))',
    },
    'text-gray-400': {
      '--tw-text-opacity': 1,
      color: 'rgba(156, 163, 175, var(--tw-text-opacity))',
    },
    'text-gray-500': {
      '--tw-text-opacity': 1,
      color: 'rgba(107, 114, 128, var(--tw-text-opacity))',
    },
    'text-gray-600': {
      '--tw-text-opacity': 1,
      color: 'rgba(75, 85, 99, var(--tw-text-opacity))',
    },
    'text-gray-700': {
      '--tw-text-opacity': 1,
      color: 'rgba(55, 65, 81, var(--tw-text-opacity))',
    },
    'text-gray-800': {
      '--tw-text-opacity': 1,
      color: 'rgba(31, 41, 55, var(--tw-text-opacity))',
    },
    'text-gray-900': {
      '--tw-text-opacity': 1,
      color: 'rgba(17, 24, 39, var(--tw-text-opacity))',
    },
    'text-red-50': {
      '--tw-text-opacity': 1,
      color: 'rgba(254, 242, 242, var(--tw-text-opacity))',
    },
    'text-red-100': {
      '--tw-text-opacity': 1,
      color: 'rgba(254, 226, 226, var(--tw-text-opacity))',
    },
    'text-red-200': {
      '--tw-text-opacity': 1,
      color: 'rgba(254, 202, 202, var(--tw-text-opacity))',
    },
    'text-red-300': {
      '--tw-text-opacity': 1,
      color: 'rgba(252, 165, 165, var(--tw-text-opacity))',
    },
    'text-red-400': {
      '--tw-text-opacity': 1,
      color: 'rgba(248, 113, 113, var(--tw-text-opacity))',
    },
    'text-red-500': {
      '--tw-text-opacity': 1,
      color: 'rgba(239, 68, 68, var(--tw-text-opacity))',
    },
    'text-red-600': {
      '--tw-text-opacity': 1,
      color: 'rgba(220, 38, 38, var(--tw-text-opacity))',
    },
    'text-red-700': {
      '--tw-text-opacity': 1,
      color: 'rgba(185, 28, 28, var(--tw-text-opacity))',
    },
    'text-red-800': {
      '--tw-text-opacity': 1,
      color: 'rgba(153, 27, 27, var(--tw-text-opacity))',
    },
    'text-red-900': {
      '--tw-text-opacity': 1,
      color: 'rgba(127, 29, 29, var(--tw-text-opacity))',
    },
    'text-yellow-50': {
      '--tw-text-opacity': 1,
      color: 'rgba(255, 251, 235, var(--tw-text-opacity))',
    },
    'text-yellow-100': {
      '--tw-text-opacity': 1,
      color: 'rgba(254, 243, 199, var(--tw-text-opacity))',
    },
    'text-yellow-200': {
      '--tw-text-opacity': 1,
      color: 'rgba(253, 230, 138, var(--tw-text-opacity))',
    },
    'text-yellow-300': {
      '--tw-text-opacity': 1,
      color: 'rgba(252, 211, 77, var(--tw-text-opacity))',
    },
    'text-yellow-400': {
      '--tw-text-opacity': 1,
      color: 'rgba(251, 191, 36, var(--tw-text-opacity))',
    },
    'text-yellow-500': {
      '--tw-text-opacity': 1,
      color: 'rgba(245, 158, 11, var(--tw-text-opacity))',
    },
    'text-yellow-600': {
      '--tw-text-opacity': 1,
      color: 'rgba(217, 119, 6, var(--tw-text-opacity))',
    },
    'text-yellow-700': {
      '--tw-text-opacity': 1,
      color: 'rgba(180, 83, 9, var(--tw-text-opacity))',
    },
    'text-yellow-800': {
      '--tw-text-opacity': 1,
      color: 'rgba(146, 64, 14, var(--tw-text-opacity))',
    },
    'text-yellow-900': {
      '--tw-text-opacity': 1,
      color: 'rgba(120, 53, 15, var(--tw-text-opacity))',
    },
    'text-green-50': {
      '--tw-text-opacity': 1,
      color: 'rgba(236, 253, 245, var(--tw-text-opacity))',
    },
    'text-green-100': {
      '--tw-text-opacity': 1,
      color: 'rgba(209, 250, 229, var(--tw-text-opacity))',
    },
    'text-green-200': {
      '--tw-text-opacity': 1,
      color: 'rgba(167, 243, 208, var(--tw-text-opacity))',
    },
    'text-green-300': {
      '--tw-text-opacity': 1,
      color: 'rgba(110, 231, 183, var(--tw-text-opacity))',
    },
    'text-green-400': {
      '--tw-text-opacity': 1,
      color: 'rgba(52, 211, 153, var(--tw-text-opacity))',
    },
    'text-green-500': {
      '--tw-text-opacity': 1,
      color: 'rgba(16, 185, 129, var(--tw-text-opacity))',
    },
    'text-green-600': {
      '--tw-text-opacity': 1,
      color: 'rgba(5, 150, 105, var(--tw-text-opacity))',
    },
    'text-green-700': {
      '--tw-text-opacity': 1,
      color: 'rgba(4, 120, 87, var(--tw-text-opacity))',
    },
    'text-green-800': {
      '--tw-text-opacity': 1,
      color: 'rgba(6, 95, 70, var(--tw-text-opacity))',
    },
    'text-green-900': {
      '--tw-text-opacity': 1,
      color: 'rgba(6, 78, 59, var(--tw-text-opacity))',
    },
    'text-blue-50': {
      '--tw-text-opacity': 1,
      color: 'rgba(239, 246, 255, var(--tw-text-opacity))',
    },
    'text-blue-100': {
      '--tw-text-opacity': 1,
      color: 'rgba(219, 234, 254, var(--tw-text-opacity))',
    },
    'text-blue-200': {
      '--tw-text-opacity': 1,
      color: 'rgba(191, 219, 254, var(--tw-text-opacity))',
    },
    'text-blue-300': {
      '--tw-text-opacity': 1,
      color: 'rgba(147, 197, 253, var(--tw-text-opacity))',
    },
    'text-blue-400': {
      '--tw-text-opacity': 1,
      color: 'rgba(96, 165, 250, var(--tw-text-opacity))',
    },
    'text-blue-500': {
      '--tw-text-opacity': 1,
      color: 'rgba(59, 130, 246, var(--tw-text-opacity))',
    },
    'text-blue-600': {
      '--tw-text-opacity': 1,
      color: 'rgba(37, 99, 235, var(--tw-text-opacity))',
    },
    'text-blue-700': {
      '--tw-text-opacity': 1,
      color: 'rgba(29, 78, 216, var(--tw-text-opacity))',
    },
    'text-blue-800': {
      '--tw-text-opacity': 1,
      color: 'rgba(30, 64, 175, var(--tw-text-opacity))',
    },
    'text-blue-900': {
      '--tw-text-opacity': 1,
      color: 'rgba(30, 58, 138, var(--tw-text-opacity))',
    },
    'text-indigo-50': {
      '--tw-text-opacity': 1,
      color: 'rgba(238, 242, 255, var(--tw-text-opacity))',
    },
    'text-indigo-100': {
      '--tw-text-opacity': 1,
      color: 'rgba(224, 231, 255, var(--tw-text-opacity))',
    },
    'text-indigo-200': {
      '--tw-text-opacity': 1,
      color: 'rgba(199, 210, 254, var(--tw-text-opacity))',
    },
    'text-indigo-300': {
      '--tw-text-opacity': 1,
      color: 'rgba(165, 180, 252, var(--tw-text-opacity))',
    },
    'text-indigo-400': {
      '--tw-text-opacity': 1,
      color: 'rgba(129, 140, 248, var(--tw-text-opacity))',
    },
    'text-indigo-500': {
      '--tw-text-opacity': 1,
      color: 'rgba(99, 102, 241, var(--tw-text-opacity))',
    },
    'text-indigo-600': {
      '--tw-text-opacity': 1,
      color: 'rgba(79, 70, 229, var(--tw-text-opacity))',
    },
    'text-indigo-700': {
      '--tw-text-opacity': 1,
      color: 'rgba(67, 56, 202, var(--tw-text-opacity))',
    },
    'text-indigo-800': {
      '--tw-text-opacity': 1,
      color: 'rgba(55, 48, 163, var(--tw-text-opacity))',
    },
    'text-indigo-900': {
      '--tw-text-opacity': 1,
      color: 'rgba(49, 46, 129, var(--tw-text-opacity))',
    },
    'text-purple-50': {
      '--tw-text-opacity': 1,
      color: 'rgba(245, 243, 255, var(--tw-text-opacity))',
    },
    'text-purple-100': {
      '--tw-text-opacity': 1,
      color: 'rgba(237, 233, 254, var(--tw-text-opacity))',
    },
    'text-purple-200': {
      '--tw-text-opacity': 1,
      color: 'rgba(221, 214, 254, var(--tw-text-opacity))',
    },
    'text-purple-300': {
      '--tw-text-opacity': 1,
      color: 'rgba(196, 181, 253, var(--tw-text-opacity))',
    },
    'text-purple-400': {
      '--tw-text-opacity': 1,
      color: 'rgba(167, 139, 250, var(--tw-text-opacity))',
    },
    'text-purple-500': {
      '--tw-text-opacity': 1,
      color: 'rgba(139, 92, 246, var(--tw-text-opacity))',
    },
    'text-purple-600': {
      '--tw-text-opacity': 1,
      color: 'rgba(124, 58, 237, var(--tw-text-opacity))',
    },
    'text-purple-700': {
      '--tw-text-opacity': 1,
      color: 'rgba(109, 40, 217, var(--tw-text-opacity))',
    },
    'text-purple-800': {
      '--tw-text-opacity': 1,
      color: 'rgba(91, 33, 182, var(--tw-text-opacity))',
    },
    'text-purple-900': {
      '--tw-text-opacity': 1,
      color: 'rgba(76, 29, 149, var(--tw-text-opacity))',
    },
    'text-pink-50': {
      '--tw-text-opacity': 1,
      color: 'rgba(253, 242, 248, var(--tw-text-opacity))',
    },
    'text-pink-100': {
      '--tw-text-opacity': 1,
      color: 'rgba(252, 231, 243, var(--tw-text-opacity))',
    },
    'text-pink-200': {
      '--tw-text-opacity': 1,
      color: 'rgba(251, 207, 232, var(--tw-text-opacity))',
    },
    'text-pink-300': {
      '--tw-text-opacity': 1,
      color: 'rgba(249, 168, 212, var(--tw-text-opacity))',
    },
    'text-pink-400': {
      '--tw-text-opacity': 1,
      color: 'rgba(244, 114, 182, var(--tw-text-opacity))',
    },
    'text-pink-500': {
      '--tw-text-opacity': 1,
      color: 'rgba(236, 72, 153, var(--tw-text-opacity))',
    },
    'text-pink-600': {
      '--tw-text-opacity': 1,
      color: 'rgba(219, 39, 119, var(--tw-text-opacity))',
    },
    'text-pink-700': {
      '--tw-text-opacity': 1,
      color: 'rgba(190, 24, 93, var(--tw-text-opacity))',
    },
    'text-pink-800': {
      '--tw-text-opacity': 1,
      color: 'rgba(157, 23, 77, var(--tw-text-opacity))',
    },
    'text-pink-900': {
      '--tw-text-opacity': 1,
      color: 'rgba(131, 24, 67, var(--tw-text-opacity))',
    },
    'text-opacity-0': {
      '--tw-text-opacity': 0,
    },
    'text-opacity-5': {
      '--tw-text-opacity': 0.05,
    },
    'text-opacity-10': {
      '--tw-text-opacity': 0.1,
    },
    'text-opacity-20': {
      '--tw-text-opacity': 0.2,
    },
    'text-opacity-25': {
      '--tw-text-opacity': 0.25,
    },
    'text-opacity-30': {
      '--tw-text-opacity': 0.3,
    },
    'text-opacity-40': {
      '--tw-text-opacity': 0.4,
    },
    'text-opacity-50': {
      '--tw-text-opacity': 0.5,
    },
    'text-opacity-60': {
      '--tw-text-opacity': 0.6,
    },
    'text-opacity-70': {
      '--tw-text-opacity': 0.7,
    },
    'text-opacity-75': {
      '--tw-text-opacity': 0.75,
    },
    'text-opacity-80': {
      '--tw-text-opacity': 0.8,
    },
    'text-opacity-90': {
      '--tw-text-opacity': 0.9,
    },
    'text-opacity-95': {
      '--tw-text-opacity': 0.95,
    },
    'text-opacity-100': {
      '--tw-text-opacity': 1,
    },
    'overflow-ellipsis': {
      textOverflow: 'ellipsis',
    },
    'overflow-clip': {
      textOverflow: 'clip',
    },
    italic: {
      fontStyle: 'italic',
    },
    'not-italic': {
      fontStyle: 'normal',
    },
    uppercase: {
      textTransform: 'uppercase',
    },
    lowercase: {
      textTransform: 'lowercase',
    },
    capitalize: {
      textTransform: 'capitalize',
    },
    'normal-case': {
      textTransform: 'none',
    },
    ordinal: {
      '--tw-ordinal': 'ordinal',
    },
    'slashed-zero': {
      '--tw-slashed-zero': 'slashed-zero',
    },
    'lining-nums': {
      '--tw-numeric-figure': 'lining-nums',
    },
    'oldstyle-nums': {
      '--tw-numeric-figure': 'oldstyle-nums',
    },
    'proportional-nums': {
      '--tw-numeric-spacing': 'proportional-nums',
    },
    'tabular-nums': {
      '--tw-numeric-spacing': 'tabular-nums',
    },
    'diagonal-fractions': {
      '--tw-numeric-fraction': 'diagonal-fractions',
    },
    'stacked-fractions': {
      '--tw-numeric-fraction': 'stacked-fractions',
    },
    'normal-nums': {
      fontVariantNumeric: 'normal',
    },
    'tracking-tighter': {
      letterSpacing: '-0.05em',
    },
    'tracking-tight': {
      letterSpacing: '-0.025em',
    },
    'tracking-normal': {
      letterSpacing: '0em',
    },
    'tracking-wide': {
      letterSpacing: '0.025em',
    },
    'tracking-wider': {
      letterSpacing: '0.05em',
    },
    'tracking-widest': {
      letterSpacing: '0.1em',
    },
    'break-words': {
      overflowWrap: 'break-word',
    },
    'w-0': {
      width: 0,
    },
    'w-1': {
      width: 4,
    },
    'w-2': {
      width: 8,
    },
    'w-3': {
      width: 12,
    },
    'w-4': {
      width: 16,
    },
    'w-5': {
      width: 20,
    },
    'w-6': {
      width: 24,
    },
    'w-7': {
      width: 28,
    },
    'w-8': {
      width: 32,
    },
    'w-9': {
      width: 36,
    },
    'w-10': {
      width: 40,
    },
    'w-11': {
      width: 44,
    },
    'w-12': {
      width: 48,
    },
    'w-14': {
      width: 56,
    },
    'w-16': {
      width: 64,
    },
    'w-20': {
      width: 80,
    },
    'w-24': {
      width: 96,
    },
    'w-28': {
      width: 112,
    },
    'w-32': {
      width: 128,
    },
    'w-36': {
      width: 144,
    },
    'w-40': {
      width: 160,
    },
    'w-44': {
      width: 176,
    },
    'w-48': {
      width: 192,
    },
    'w-52': {
      width: 208,
    },
    'w-56': {
      width: 224,
    },
    'w-60': {
      width: 240,
    },
    'w-64': {
      width: 256,
    },
    'w-72': {
      width: 288,
    },
    'w-80': {
      width: 320,
    },
    'w-96': {
      width: 384,
    },
    'w-px': {
      width: 1,
    },
    'w-0.5': {
      width: 2,
    },
    'w-1.5': {
      width: 6,
    },
    'w-2.5': {
      width: 10,
    },
    'w-3.5': {
      width: 14,
    },
    'w-1/2': {
      width: '50%',
    },
    'w-1/3': {
      width: '33.333333%',
    },
    'w-2/3': {
      width: '66.666667%',
    },
    'w-1/4': {
      width: '25%',
    },
    'w-2/4': {
      width: '50%',
    },
    'w-3/4': {
      width: '75%',
    },
    'w-1/5': {
      width: '20%',
    },
    'w-2/5': {
      width: '40%',
    },
    'w-3/5': {
      width: '60%',
    },
    'w-4/5': {
      width: '80%',
    },
    'w-1/6': {
      width: '16.666667%',
    },
    'w-2/6': {
      width: '33.333333%',
    },
    'w-3/6': {
      width: '50%',
    },
    'w-4/6': {
      width: '66.666667%',
    },
    'w-5/6': {
      width: '83.333333%',
    },
    'w-1/12': {
      width: '8.333333%',
    },
    'w-2/12': {
      width: '16.666667%',
    },
    'w-3/12': {
      width: '25%',
    },
    'w-4/12': {
      width: '33.333333%',
    },
    'w-5/12': {
      width: '41.666667%',
    },
    'w-6/12': {
      width: '50%',
    },
    'w-7/12': {
      width: '58.333333%',
    },
    'w-8/12': {
      width: '66.666667%',
    },
    'w-9/12': {
      width: '75%',
    },
    'w-10/12': {
      width: '83.333333%',
    },
    'w-11/12': {
      width: '91.666667%',
    },
    'w-full': {
      width: '100%',
    },
    'w-min': {
      width: 'min-content',
    },
    'w-max': {
      width: 'max-content',
    },
    'z-0': {
      zIndex: 0,
    },
    'z-10': {
      zIndex: 10,
    },
    'z-20': {
      zIndex: 20,
    },
    'z-30': {
      zIndex: 30,
    },
    'z-40': {
      zIndex: 40,
    },
    'z-50': {
      zIndex: 50,
    },
    underline: {
      textDecorationLine: 'underline',
    },
    'line-through': {
      textDecorationLine: 'line-through',
    },
    'no-underline': {
      textDecorationLine: 'none',
    },
  }

  let data2 = {}
  Object.keys(data).map(key => {
    let prop = data[key]

    if (key.substr(0, 2) != 'z-' && key.substr(0, 7) != 'opacity') {
      Object.keys(prop).map(key_style => {
        let value = prop[key_style]
        if (isNumber(value) && !(value <= 1)) {
          value = scale(value / scale_ratio)
          prop[key_style] = value
        }
      })
    }

    data2[key] = prop
  })

  return data2
}
