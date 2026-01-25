import { Link, useNavigate } from 'react-router-dom';
import type { ReactNode, MouseEvent, CSSProperties } from 'react';
import './BlockTable.css';

interface BlockTableColumn<T> {
  key: string;
  label: string;
  width?: string;
  className?: string;
  render: (row: T, rowIndex: number) => ReactNode;
}

interface BlockTableProps<T> {
  columns: BlockTableColumn<T>[];
  rows: T[];
  rowKey?: (row: T, rowIndex: number) => string | number;
  rowLink?: (row: T, rowIndex: number) => string | null;
  emptyMessage?: string;
  cellLink?: (col: BlockTableColumn<T>, row: T, rowIndex: number) => string | null;
}

const BlockTable = <T,>({
  columns,
  rows,
  rowKey,
  rowLink,
  emptyMessage = 'No data available',
  cellLink,
}: BlockTableProps<T>) => {
  const navigate = useNavigate();
  const columnTemplate = columns.map((col) => col.width || '1fr').join(' ');

  const renderCells = (row: T, rowIndex: number) =>
    columns.map((col) => {
      const cellContent = col.render(row, rowIndex);
      const linkTarget = cellLink ? cellLink(col, row, rowIndex) : null;

      if (linkTarget) {
        return (
          <Link key={col.key || col.label} to={linkTarget} className={col.className}>
            {cellContent}
          </Link>
        );
      }

      return (
        <div key={col.key || col.label} className={col.className}>
          {cellContent}
        </div>
      );
    });

  const renderRow = (row: T, rowIndex: number) => {
    const key = rowKey ? rowKey(row, rowIndex) : rowIndex;
    const link = rowLink ? rowLink(row, rowIndex) : null;
    const commonProps = {
      className: 'table-row',
      style: { '--block-table-template': columnTemplate } as CSSProperties,
    };

    if (link) {
      return (
        <div
          key={key}
          {...commonProps}
          onClick={(e: MouseEvent<HTMLDivElement>) => {
            // If the clicked element is a link or inside a link, don't navigate
            const target = e.target as HTMLElement;
            if (target.tagName === 'A' || target.closest('a')) {
              return;
            }
            navigate(link);
          }}
          style={{
            ...commonProps.style,
            cursor: 'pointer',
          }}
        >
          {renderCells(row, rowIndex)}
        </div>
      );
    }

    return (
      <div key={key} {...commonProps}>
        {renderCells(row, rowIndex)}
      </div>
    );
  };

  return (
    <div className="blocks-table">
      <div
        className="table-header"
        style={{ '--block-table-template': columnTemplate } as CSSProperties}
      >
        {columns.map((col) => (
          <div key={col.key || col.label}>{col.label}</div>
        ))}
      </div>

      {rows.length === 0 ? (
        <div className="table-empty">{emptyMessage}</div>
      ) : (
        rows.map(renderRow)
      )}
    </div>
  );
};

export default BlockTable;
