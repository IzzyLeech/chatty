import Button from '@components/button/Button';
import BasicInfoSkeleton from '@components/timeline/BasicInfoSkeleton';
import PropTypes from 'prop-types';
import { useState } from 'react';
import ContentEditable from 'react-contenteditable';
import {
  FaBriefcase,
  FaFacebook,
  FaGraduationCap,
  FaInstagram,
  FaMapMarkerAlt,
  FaTwitter,
  FaYoutube
} from 'react-icons/fa';

const InfoDisplay = ({
  title,
  type,
  isCurrentUser,
  noBasicInfo,
  noSocialInfo,
  basicInfoPlaceholder,
  socialLinksPlaceholder,
  editableInputs,
  editableSocialInputs,
  loading,
  setEditableInputs,
  setEditableSocialInputs,
  updateInfo
}) => {
  const [editIntroBtn, setEditIntroBtn] = useState(true);

  const sanitize = (html) => {
    if (html == null) return '';
    let s = String(html)
      .replace(/<br\s*\/?>/gi, '')
      .replace(/<\/div><div>/gi, '\n')
      .replace(/<\/?div[^>]*>/gi, '')
      .replace(/<\/?span[^>]*>/gi, '')
      .replace(/&nbsp;/gi, ' ')
      .replace(/\u00A0/g, ' ')
      .replace(/<\/?[^>]+(>|$)/g, '');
    return s.trim();
  };

  const { quote, work, school, location } = editableInputs;
  const { quoteMsg, workMsg, schoolMsg, locationMsg } = noBasicInfo;

  const { instagramMsg, twitterMsg, facebookMsg, youtubeMsg } = noSocialInfo;
  const { instagram, twitter, facebook, youtube } = editableSocialInputs;

  const { quotePlacehoder, workPlacehoder, schoolPlacehoder, locationPlacehoder } = basicInfoPlaceholder;
  const { instagramPlacehoder, twitterPlacehoder, facebookPlacehoder, youtubePlacehoder } = socialLinksPlaceholder;

  const sQuote = sanitize(quote);
  const sWork = sanitize(work);
  const sSchool = sanitize(school);
  const sLocation = sanitize(location);

  const sInstagram = sanitize(instagram);
  const sTwitter = sanitize(twitter);
  const sFacebook = sanitize(facebook);
  const sYoutube = sanitize(youtube);

  return (
    <>
      {loading ? (
        <BasicInfoSkeleton />
      ) : (
        <div className="side-container" data-testid="side-container">
          <div className="side-container-header">
            <p>{title}</p>
            {isCurrentUser && (
              <p className="editBtn" data-testid="editBtn" onClick={() => setEditIntroBtn(!editIntroBtn)}>
                Edit
              </p>
            )}
          </div>

          {type === 'basic' && (
            <div className="side-container-body">
              <div className="side-container-body-about" data-testid="quote">
                {editIntroBtn ? (
                  sQuote ? (
                    <div className="about">{sQuote}</div>
                  ) : (
                    <div className="no-information">{quoteMsg}</div>
                  )
                ) : (
                  <ContentEditable
                    data-testid="quote-editable"
                    data-placeholder={quotePlacehoder}
                    data-has-value={sQuote !== ''}
                    tagName="div"
                    className="about"
                    disabled={false}
                    html={sQuote === '' ? '' : quote}
                    style={{ maxHeight: '70px', overflowY: 'auto', width: '250px' }}
                    onChange={(e) => setEditableInputs({ ...editableInputs, quote: sanitize(e.target.value) })}
                  />
                )}
              </div>
            </div>
          )}

          <div className="side-container-body">
            <div className="side-container-body-icon">
              {type === 'basic' ? <FaBriefcase className="icon" /> : <FaInstagram className="icon instagram" />}
            </div>
            <div className="side-container-body-content" data-testid="content-1">
              {editIntroBtn ? (
                type === 'basic' ? (
                  sWork ? (
                    <>Works at {sWork}</>
                  ) : (
                    <div className="no-information">{workMsg}</div>
                  )
                ) : sInstagram ? (
                  <a className="link" href={sInstagram} target="_blank" rel="noreferrer noopener">
                    {sInstagram}
                  </a>
                ) : (
                  <div className="no-information">{instagramMsg}</div>
                )
              ) : (
                <ContentEditable
                  data-testid="content-1-editable"
                  data-placeholder={type === 'basic' ? workPlacehoder : instagramPlacehoder}
                  data-has-value={(type === 'basic' ? sWork : sInstagram) !== ''}
                  tagName="div"
                  disabled={false}
                  html={(type === 'basic' ? sWork : sInstagram) === '' ? '' : type === 'basic' ? work : instagram}
                  style={{ maxHeight: '70px', overflowY: 'auto' }}
                  onChange={(e) => {
                    const clean = sanitize(e.target.value);
                    if (type === 'basic') {
                      setEditableInputs({ ...editableInputs, work: clean });
                    } else {
                      setEditableSocialInputs({ ...editableSocialInputs, instagram: clean });
                    }
                  }}
                />
              )}
            </div>
          </div>

          <div className="side-container-body">
            <div className="side-container-body-icon">
              {type === 'basic' ? <FaGraduationCap className="icon" /> : <FaTwitter className="icon twitter" />}
            </div>
            <div className="side-container-body-content" data-testid="content-2">
              {editIntroBtn ? (
                type === 'basic' ? (
                  sSchool ? (
                    <>Went to {sSchool}</>
                  ) : (
                    <div className="no-information">{schoolMsg}</div>
                  )
                ) : sTwitter ? (
                  <a className="link" href={sTwitter} target="_blank" rel="noreferrer noopener">
                    {sTwitter}
                  </a>
                ) : (
                  <div className="no-information">{twitterMsg}</div>
                )
              ) : (
                <ContentEditable
                  data-testid="content-2-editable"
                  data-placeholder={type === 'basic' ? schoolPlacehoder : twitterPlacehoder}
                  data-has-value={(type === 'basic' ? sSchool : sTwitter) !== ''}
                  tagName="div"
                  disabled={false}
                  html={(type === 'basic' ? sSchool : sTwitter) === '' ? '' : type === 'basic' ? school : twitter}
                  style={{ maxHeight: '70px', overflowY: 'auto' }}
                  onChange={(e) => {
                    const clean = sanitize(e.target.value);
                    if (type === 'basic') {
                      setEditableInputs({ ...editableInputs, school: clean });
                    } else {
                      setEditableSocialInputs({ ...editableSocialInputs, twitter: clean });
                    }
                  }}
                />
              )}
            </div>
          </div>

          <div className="side-container-body">
            <div className="side-container-body-icon">
              {type === 'basic' ? <FaMapMarkerAlt className="icon" /> : <FaFacebook className="icon facebook" />}
            </div>
            <div className="side-container-body-content" data-testid="content-3">
              {editIntroBtn ? (
                type === 'basic' ? (
                  sLocation ? (
                    <>Lives in {sLocation}</>
                  ) : (
                    <div className="no-information">{locationMsg}</div>
                  )
                ) : sFacebook ? (
                  <a className="link" href={sFacebook} target="_blank" rel="noreferrer noopener">
                    {sFacebook}
                  </a>
                ) : (
                  <div className="no-information">{facebookMsg}</div>
                )
              ) : (
                <ContentEditable
                  data-testid="content-3-editable"
                  data-placeholder={type === 'basic' ? locationPlacehoder : facebookPlacehoder}
                  data-has-value={(type === 'basic' ? sLocation : sFacebook) !== ''}
                  tagName="div"
                  disabled={false}
                  html={(type === 'basic' ? sLocation : sFacebook) === '' ? '' : type === 'basic' ? location : facebook}
                  style={{ maxHeight: '70px', overflowY: 'auto' }}
                  onChange={(e) => {
                    const clean = sanitize(e.target.value);
                    if (type === 'basic') {
                      setEditableInputs({ ...editableInputs, location: clean });
                    } else {
                      setEditableSocialInputs({ ...editableSocialInputs, facebook: clean });
                    }
                  }}
                />
              )}
            </div>
          </div>

          {type !== 'basic' && (
            <div className="side-container-body">
              <div className="side-container-body-icon">
                <FaYoutube className="icon youtube" />
              </div>
              <div className="side-container-body-content" data-testid="content-4">
                {editIntroBtn ? (
                  sYoutube ? (
                    <a className="link" href={sYoutube} target="_blank" rel="noreferrer noopener">
                      {sYoutube}
                    </a>
                  ) : (
                    <div className="no-information">{youtubeMsg}</div>
                  )
                ) : (
                  <ContentEditable
                    data-testid="content-4-editable"
                    data-placeholder={youtubePlacehoder}
                    data-has-value={sYoutube !== ''}
                    tagName="div"
                    disabled={false}
                    html={sYoutube === '' ? '' : youtube}
                    style={{ maxHeight: '70px', overflowY: 'auto' }}
                    onChange={(e) =>
                      setEditableSocialInputs({ ...editableSocialInputs, youtube: sanitize(e.target.value) })
                    }
                  />
                )}
              </div>
            </div>
          )}

          {isCurrentUser && (
            <div className="intro-submit-button">
              <Button
                label="Update"
                className="button updateBtn"
                disabled={editIntroBtn}
                handleClick={() => {
                  setEditIntroBtn(true);
                  updateInfo();
                }}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

InfoDisplay.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  isCurrentUser: PropTypes.bool,
  noBasicInfo: PropTypes.object,
  noSocialInfo: PropTypes.object,
  basicInfoPlaceholder: PropTypes.object,
  socialLinksPlaceholder: PropTypes.object,
  editableInputs: PropTypes.object,
  editableSocialInputs: PropTypes.object,
  loading: PropTypes.bool,
  setEditableInputs: PropTypes.func,
  setEditableSocialInputs: PropTypes.func,
  updateInfo: PropTypes.func
};

export default InfoDisplay;
