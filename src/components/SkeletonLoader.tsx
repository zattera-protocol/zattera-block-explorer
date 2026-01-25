import './SkeletonLoader.css';
import { useTranslation } from '../i18n';
import { Link } from 'react-router-dom';
import type { CSSProperties } from 'react';

export const BlockListSkeleton = () => {
  const { t } = useTranslation();

  return (
    <div className="block-list">
      <div className="block-header">
        <h2>{t('blockList.title')}</h2>
        <div className="latest-block-info">
          <span className="skeleton skeleton-text skeleton-latest"></span>
        </div>
      </div>

      <table className="block-table">
        <thead>
          <tr>
            <th>{t('common.blockNumber')}</th>
            <th>{t('common.time')}</th>
            <th>{t('common.transactions')}</th>
            <th>{t('common.witness')}</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(20)].map((_, index) => (
            <tr key={index}>
              <td>
                <span className="skeleton skeleton-text skeleton-block-num"></span>
              </td>
              <td>
                <span className="skeleton skeleton-text skeleton-timestamp"></span>
              </td>
              <td>
                <span className="skeleton skeleton-text skeleton-tx-count"></span>
              </td>
              <td>
                <span className="skeleton skeleton-text skeleton-witness"></span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const BlockDetailSkeleton = () => {
  const { t } = useTranslation();

  return (
    <div className="detail-page block-detail">
      <div className="navigation">
        <Link to="/blocks" className="back-button">
          ← {t('common.back')}
        </Link>
        <div className="navigation-actions">
          <button className="nav-button disabled" disabled>
            {t('blockDetail.previousBlock')}
          </button>
          <button className="nav-button disabled" disabled>
            {t('blockDetail.nextBlock')}
          </button>
        </div>
      </div>

      <h2>
        <span className="skeleton skeleton-text skeleton-title"></span>
      </h2>

      <div className="detail-section">
        <h3>{t('blockDetail.info')}</h3>
        <div className="detail-grid">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="detail-item">
              <span className="label">
                <span className="skeleton skeleton-text skeleton-label"></span>
              </span>
              <span className="value">
                <span className="skeleton skeleton-text skeleton-value"></span>
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="detail-section">
        <h3>{t('blockDetail.transactions', { count: 0 })}</h3>
        <div className="transactions-list">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="transaction-card">
              <div className="transaction-header">
                <span className="transaction-title">
                  <span className="skeleton skeleton-text skeleton-tx-index"></span>
                </span>
                <span className="transaction-meta">
                  <span className="skeleton skeleton-text skeleton-tx-ops"></span>
                </span>
              </div>
              <div className="operations-list">
                <span className="skeleton skeleton-box skeleton-operations"></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const DashboardSkeleton = () => {
  const { t } = useTranslation();

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">{t('dashboard.title')}</h1>

      <div className="stats-grid">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon">
              <span className="skeleton skeleton-stat-icon"></span>
            </div>
            <div className="stat-content">
              <div className="stat-label">
                <span className="skeleton skeleton-text skeleton-stat-label"></span>
              </div>
              <div className="stat-value">
                <span className="skeleton skeleton-text skeleton-stat-value"></span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="recent-blocks-section">
        <h2 className="section-title">{t('dashboard.recentBlocks')}</h2>
        <div className="blocks-table">
          <div
            className="table-header"
            style={{ '--block-table-template': '150px 220px 1fr 140px' } as CSSProperties}
          >
            <div>{t('common.blockNumber')}</div>
            <div>{t('common.time')}</div>
            <div>{t('common.witness')}</div>
            <div>{t('common.transactions')}</div>
          </div>
          {[...Array(10)].map((_, index) => (
            <div
              key={index}
              className="table-row"
              style={{ '--block-table-template': '150px 220px 1fr 140px' } as CSSProperties}
            >
              <div className="block-number">
                <span className="skeleton skeleton-text skeleton-block-num"></span>
              </div>
              <div className="block-time">
                <span className="skeleton skeleton-text skeleton-timestamp"></span>
              </div>
              <div className="block-witness">
                <span className="skeleton skeleton-text skeleton-witness"></span>
              </div>
              <div className="block-tx-count">
                <span className="skeleton skeleton-text skeleton-tx-count"></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const BlocksPageSkeleton = () => {
  const { t } = useTranslation();

  return (
    <div className="blocks-page">
      <div className="blocks-header">
        <h1 className="blocks-title">{t('blocksPage.title')}</h1>
        <form className="block-search">
          <input
            type="text"
            placeholder={t('blocksPage.searchPlaceholder')}
            className="search-input"
            disabled
          />
          <button type="submit" className="search-button" disabled>
            {t('blocksPage.searchButton')}
          </button>
        </form>
      </div>

      <div className="blocks-info">
        <div className="info-badge">
          <span className="skeleton skeleton-text skeleton-info-badge"></span>
        </div>
        <div className="info-badge">
          <span className="skeleton skeleton-text skeleton-info-badge"></span>
        </div>
      </div>

      <div className="blocks-table">
        <div
          className="table-header"
          style={{ '--block-table-template': '150px 220px 1fr 140px 120px' } as CSSProperties}
        >
          <div>{t('common.blockNumber')}</div>
          <div>{t('common.time')}</div>
          <div>{t('common.witness')}</div>
          <div>{t('common.transactions')}</div>
          <div>{t('common.size')}</div>
        </div>
        {[...Array(20)].map((_, index) => (
          <div
            key={index}
            className="table-row"
            style={{ '--block-table-template': '150px 220px 1fr 140px 120px' } as CSSProperties}
          >
            <div className="block-number">
              <span className="skeleton skeleton-text skeleton-block-num"></span>
            </div>
            <div className="block-timestamp">
              <span className="skeleton skeleton-text skeleton-timestamp"></span>
            </div>
            <div className="block-witness">
              <span className="skeleton skeleton-text skeleton-witness"></span>
            </div>
            <div className="block-tx-count">
              <span className="skeleton skeleton-text skeleton-tx-count"></span>
            </div>
            <div className="block-size">
              <span className="skeleton skeleton-text skeleton-size"></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const AccountDetailSkeleton = () => {
  const { t } = useTranslation();

  return (
    <div className="detail-page account-detail">
      <div className="navigation">
        <Link to="/" className="back-button">
          ← {t('common.back')}
        </Link>
      </div>

      <h2>
        <span className="skeleton skeleton-text skeleton-title"></span>
      </h2>

      <div className="detail-section">
        <h3>{t('account.profileInfo')}</h3>
        <div className="detail-grid">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="detail-item">
              <span className="label">
                <span className="skeleton skeleton-text skeleton-label"></span>
              </span>
              <span className="value">
                <span className="skeleton skeleton-text skeleton-value"></span>
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="detail-section">
        <h3>{t('account.balances')}</h3>
        <div className="detail-grid">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="detail-item">
              <span className="label">
                <span className="skeleton skeleton-text skeleton-label"></span>
              </span>
              <span className="value">
                <span className="skeleton skeleton-text skeleton-value"></span>
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="detail-section">
        <h3>{t('account.activity')}</h3>
        <div className="detail-grid">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="detail-item">
              <span className="label">
                <span className="skeleton skeleton-text skeleton-label"></span>
              </span>
              <span className="value">
                <span className="skeleton skeleton-text skeleton-value"></span>
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="detail-section">
        <h3>{t('account.security')}</h3>
        <div className="detail-grid">
          {[...Array(2)].map((_, index) => (
            <div key={index} className="detail-item">
              <span className="label">
                <span className="skeleton skeleton-text skeleton-label"></span>
              </span>
              <span className="value">
                <span className="skeleton skeleton-text skeleton-value"></span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const PostsPageSkeleton = () => {
  const { t } = useTranslation();

  return (
    <div className="posts-page">
      <div className="posts-header">
        <h1 className="posts-title">{t('posts.title')}</h1>
        <div className="sort-buttons">
          <button className="sort-button active" disabled>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
              <polyline points="17 6 23 6 23 12"></polyline>
            </svg>{' '}
            {t('posts.trending')}
          </button>
          <button className="sort-button" disabled>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>{' '}
            {t('posts.latest')}
          </button>
          <button className="sort-button" disabled>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path>
            </svg>{' '}
            {t('posts.hot')}
          </button>
        </div>
      </div>

      <div className="posts-list">
        {[...Array(5)].map((_, index) => (
          <article key={index} className="post-card">
            <div className="post-header">
              <span className="skeleton skeleton-text skeleton-post-author"></span>
              <span className="skeleton skeleton-text skeleton-post-category"></span>
            </div>

            <h2 className="post-title">
              <span className="skeleton skeleton-text skeleton-post-title"></span>
            </h2>

            <div className="post-body">
              <span className="skeleton skeleton-box skeleton-post-body"></span>
            </div>

            <div className="post-footer">
              <div className="post-stats">
                <span className="skeleton skeleton-text skeleton-post-stat"></span>
                <span className="skeleton skeleton-text skeleton-post-stat"></span>
                <span className="skeleton skeleton-text skeleton-post-stat"></span>
              </div>
              <div className="post-time">
                <span className="skeleton skeleton-text skeleton-post-time"></span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export const WitnessesPageSkeleton = () => {
  const { t } = useTranslation();

  return (
    <div className="witnesses-page">
      <div className="witnesses-header">
        <h1 className="witnesses-title">{t('witnesses.title')}</h1>
        <div className="witnesses-info">
          <span className="skeleton skeleton-text skeleton-info-badge"></span>
        </div>
      </div>

      <div className="witnesses-grid">
        {[...Array(10)].map((_, index) => (
          <div key={index} className="witness-card">
            <div className="witness-rank skeleton-witness-rank-number">#{index + 1}</div>
            <div className="witness-content">
              <span className="skeleton skeleton-text skeleton-witness-name"></span>
              <div className="witness-details">
                {[...Array(4)].map((_, detailIndex) => (
                  <div key={detailIndex} className="witness-detail-item">
                    <span className="skeleton skeleton-text skeleton-detail-label"></span>
                    <span className="skeleton skeleton-text skeleton-detail-value"></span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
