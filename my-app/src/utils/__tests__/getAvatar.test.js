import getAvatar from '../getAvatar';
import defaultAvatarSVG from '../../assets/defaultAvatar.svg';

describe('getAvatar utility', () => {
  it('should return the provided avatarURL when available', () => {
    const avatarURL = 'https://example.com/avatar.png';
    const result = getAvatar(avatarURL);

    expect(result).toBe(avatarURL);
  });

  it('should return the default avatar when avatarURL is not provided', () => {
    const result = getAvatar(null); // No avatar URL provided

    expect(result).toBe(defaultAvatarSVG);
  });

  it('should return the default avatar when avatarURL is an empty string', () => {
    const result = getAvatar(''); // Empty string as avatar URL

    expect(result).toBe(defaultAvatarSVG);
  });

  it('should handle undefined avatarURL gracefully', () => {
    const result = getAvatar(undefined); // Undefined avatar URL

    expect(result).toBe(defaultAvatarSVG);
  });
});
