import { Link } from 'react-router-dom';
import DetailLayout from './DetailLayout';
import { useTranslation } from '../i18n';
import type { Account, Asset, AccountMetadata } from '../types';
import './AccountDetail.css';

interface AccountDetailProps {
  account: Account | null;
}

const AccountDetail = ({ account }: AccountDetailProps) => {
  const { t } = useTranslation();
  if (!account) return null;

  // Parse JSON metadata safely
  let metadata: AccountMetadata = {};
  try {
    metadata = account.json_metadata ? JSON.parse(account.json_metadata) : {};
  } catch {
    metadata = {};
  }

  // Format dates for display
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString + 'Z');
    if (date.getTime() === 0) {
      return '-';
    }
    return date.toLocaleString();
  };

  // Format ZTR token amounts
  const formatToken = (tokenData: Asset | string | undefined): string => {
    if (!tokenData) return '0.000';

    // Handle new format: {amount: "0", precision: 3, nai: "..."}
    if (typeof tokenData === 'object' && 'amount' in tokenData) {
      const amount = parseInt(tokenData.amount);
      const precision = tokenData.precision || 3;
      const value = amount / Math.pow(10, precision);
      return value.toLocaleString(undefined, {
        minimumFractionDigits: precision,
        maximumFractionDigits: precision,
      });
    }

    // Handle old format: "123.456 ZTR"
    if (typeof tokenData === 'string') {
      return parseFloat(tokenData).toLocaleString(undefined, {
        minimumFractionDigits: 3,
        maximumFractionDigits: 3,
      });
    }

    return '0.000';
  };

  // Calculate voting power percentage
  const votingPower = ((account.voting_power || 0) / 100).toFixed(2);

  // Calculate reputation score
  const calculateReputation = (rep: string | undefined): number => {
    if (rep == null) return 25;
    let reputation = parseInt(rep);
    const isNeg = reputation < 0;
    reputation = Math.log10(Math.abs(reputation)) - 9;
    reputation = Math.max(reputation * 9 + 25, 0);
    if (isNeg) reputation = 50 - reputation;
    return Math.floor(reputation);
  };

  const reputation = calculateReputation(account.reputation);

  return (
    <DetailLayout
      className="account-detail"
      title={`@${account.name}`}
      backTo="/"
      actions={
        <div className="reputation-badge">
          {t('account.reputation')}: {reputation}
        </div>
      }
    >
      <div className="detail-section">
        <h3>{t('account.profileInfo')}</h3>
        <div className="detail-grid">
          <div className="detail-item">
            <span className="label">{t('account.accountId')}:</span>
            <span className="value">{account.id}</span>
          </div>
          <div className="detail-item">
            <span className="label">{t('account.created')}:</span>
            <span className="value">{formatDate(account.created)}</span>
          </div>
          <div className="detail-item">
            <span className="label">{t('account.lastActive')}:</span>
            <span className="value">{formatDate(account.last_post)}</span>
          </div>
          {metadata.profile?.name && (
            <div className="detail-item">
              <span className="label">{t('account.displayName')}:</span>
              <span className="value">{metadata.profile.name}</span>
            </div>
          )}
          {metadata.profile?.location && (
            <div className="detail-item">
              <span className="label">{t('account.location')}:</span>
              <span className="value">{metadata.profile.location}</span>
            </div>
          )}
          {metadata.profile?.website && (
            <div className="detail-item">
              <span className="label">{t('account.website')}:</span>
              <span className="value">
                <a
                  href={metadata.profile.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="external-link"
                >
                  {metadata.profile.website}
                </a>
              </span>
            </div>
          )}
          {metadata.profile?.about && (
            <div className="detail-item full-width">
              <span className="label">{t('account.about')}:</span>
              <span className="value">{metadata.profile.about}</span>
            </div>
          )}
        </div>
      </div>

      {/* Balances Section */}
      <div className="detail-section">
        <h3>{t('account.balances')}</h3>
        <div className="detail-grid">
          <div className="detail-item">
            <span className="label">{t('account.ztrBalance')}:</span>
            <span className="value">{formatToken(account.liquid_balance)}</span>
          </div>
          <div className="detail-item">
            <span className="label">{t('account.zatteraPower')}:</span>
            <span className="value">{formatToken(account.vesting_share_balance)}</span>
          </div>
          <div className="detail-item">
            <span className="label">{t('account.zbdBalance')}:</span>
            <span className="value">{formatToken(account.dollar_balance)}</span>
          </div>
          <div className="detail-item">
            <span className="label">{t('account.savingsZtr')}:</span>
            <span className="value">{formatToken(account.savings_liquid_balance)}</span>
          </div>
          <div className="detail-item">
            <span className="label">{t('account.savingsZbd')}:</span>
            <span className="value">{formatToken(account.savings_dollar_balance)}</span>
          </div>
          <div className="detail-item">
            <span className="label">{t('account.pendingZtr')}:</span>
            <span className="value">{formatToken(account.reward_liquid_balance)}</span>
          </div>
          <div className="detail-item">
            <span className="label">{t('account.pendingZbd')}:</span>
            <span className="value">{formatToken(account.reward_dollar_balance)}</span>
          </div>
          <div className="detail-item">
            <span className="label">{t('account.pendingZp')}:</span>
            <span className="value">{formatToken(account.reward_vesting_share_balance)}</span>
          </div>
        </div>
      </div>

      {/* Activity Section */}
      <div className="detail-section">
        <h3>{t('account.activity')}</h3>
        <div className="detail-grid">
          <div className="detail-item">
            <span className="label">{t('account.postCount')}:</span>
            <span className="value">{account.post_count?.toLocaleString() || 0}</span>
          </div>
          <div className="detail-item">
            <span className="label">{t('account.votingPower')}:</span>
            <span className="value">{votingPower}%</span>
          </div>
          <div className="detail-item">
            <span className="label">{t('account.followingCount')}:</span>
            <span className="value">{account.following_count?.toLocaleString() || 0}</span>
          </div>
          <div className="detail-item">
            <span className="label">{t('account.followersCount')}:</span>
            <span className="value">{account.follower_count?.toLocaleString() || 0}</span>
          </div>
          <div className="detail-item">
            <span className="label">{t('account.witnessVotes')}:</span>
            <span className="value">{account.witnesses_voted_for || 0}</span>
          </div>
          <div className="detail-item">
            <span className="label">{t('account.votingProxy')}:</span>
            <span className="value">{account.proxy || t('common.none')}</span>
          </div>
        </div>
      </div>

      {/* Security Section */}
      <div className="detail-section">
        <h3>{t('account.security')}</h3>
        <div className="detail-grid">
          <div className="detail-item">
            <span className="label">{t('account.recoveryAccount')}:</span>
            <span className="value">
              <Link to={`/account/${account.recovery_account}`} className="internal-link">
                @{account.recovery_account}
              </Link>
            </span>
          </div>
          <div className="detail-item full-width">
            <span className="label">{t('account.memoKey')}:</span>
            <span className="value hash">{account.memo_key}</span>
          </div>
        </div>
      </div>

      {/* Raw JSON Section */}
      <details className="detail-section">
        <summary className="collapsible-header">{t('account.rawJson')}</summary>
        <pre className="json-data">{JSON.stringify(account, null, 2)}</pre>
      </details>
    </DetailLayout>
  );
};

export default AccountDetail;
