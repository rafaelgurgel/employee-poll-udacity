import defaultAvatarSVG from '../assets/defaultAvatar.svg'

export default function getAvatar(avatarURL) {
  return avatarURL ? avatarURL : defaultAvatarSVG
}
