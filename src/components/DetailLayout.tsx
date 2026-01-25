import { Link } from 'react-router-dom';
import { useTranslation } from '../i18n';
import type { ReactNode } from 'react';

interface DetailLayoutProps {
  title: string;
  backTo?: string;
  onBack?: () => void;
  actions?: ReactNode;
  className?: string;
  children: ReactNode;
}

const DetailLayout = ({
  title,
  backTo = '/',
  onBack,
  actions,
  className = '',
  children,
}: DetailLayoutProps) => {
  const { t } = useTranslation();

  const renderBackButton = () => {
    if (onBack) {
      return (
        <button type="button" className="back-button" onClick={onBack}>
          ← {t('common.back')}
        </button>
      );
    }

    return (
      <Link to={backTo} className="back-button">
        ← {t('common.back')}
      </Link>
    );
  };

  return (
    <div className={`detail-page ${className}`.trim()}>
      <div className="navigation">
        {renderBackButton()}
        {actions ? <div className="navigation-actions">{actions}</div> : null}
      </div>
      <h2>{title}</h2>
      {children}
    </div>
  );
};

export default DetailLayout;
