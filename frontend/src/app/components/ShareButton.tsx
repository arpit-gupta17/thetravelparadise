import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Share2, Link2, Check, Mail, MessageCircle } from 'lucide-react';

interface ShareButtonProps {
  packageTitle: string;
  packageId: string;
  price?: number;
  priceUnit?: string;
  className?: string;
  /** If true, renders as a small icon-only button (for cards) */
  compact?: boolean;
}

interface ShareOption {
  label: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  action: () => void;
}

const DROPDOWN_WIDTH = 220;

export function ShareButton({
  packageTitle,
  packageId,
  price,
  priceUnit,
  className = '',
  compact = false,
}: ShareButtonProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });
  const btnRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const pageUrl = `${window.location.origin}/packages/${packageId}`;
  const shareText = price
    ? `✈️ Check out this amazing travel package: ${packageTitle}!\n💰 Starting from ₹${price.toLocaleString('en-IN')} ${priceUnit || 'per person'}\n\n${pageUrl}`
    : `✈️ Check out this amazing travel package: ${packageTitle}!\n\n${pageUrl}`;

  const encodedText = encodeURIComponent(shareText);
  const encodedUrl = encodeURIComponent(pageUrl);
  const encodedTitle = encodeURIComponent(packageTitle);

  /** Compute portal position using FIXED (viewport) coords — no scrollY needed */
  const updatePosition = useCallback(() => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();

    // Default: open below, right-aligned to button
    let top = rect.bottom + 6;
    let left = rect.right - DROPDOWN_WIDTH;

    // Clamp left so it doesn't go off screen
    if (left < 8) left = rect.left;
    if (left + DROPDOWN_WIDTH > window.innerWidth - 8) {
      left = window.innerWidth - DROPDOWN_WIDTH - 8;
    }

    // If too close to bottom of viewport, open upwards
    const estimatedHeight = 380;
    if (rect.bottom + estimatedHeight > window.innerHeight) {
      top = rect.top - estimatedHeight - 6;
      if (top < 8) top = 8;
    }

    setDropdownPos({ top, left });
  }, []);

  const handleOpen = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!open) updatePosition();
    setOpen((v) => !v);
  };

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (
        btnRef.current?.contains(e.target as Node) ||
        dropdownRef.current?.contains(e.target as Node)
      ) return;
      setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  // Reposition on page scroll so dropdown tracks the button.
  // Only close on resize (button may have moved significantly).
  useEffect(() => {
    if (!open) return;

    const onScroll = (e: Event) => {
      // If the scroll happened INSIDE the dropdown, don't reposition/close
      if (dropdownRef.current?.contains(e.target as Node)) return;
      updatePosition();
    };

    const onResize = () => setOpen(false);

    window.addEventListener('scroll', onScroll, true);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('scroll', onScroll, true);
      window.removeEventListener('resize', onResize);
    };
  }, [open, updatePosition]);

  const copyLink = () => {
    navigator.clipboard.writeText(pageUrl).then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setOpen(false);
      }, 1500);
    });
  };

  const nativeShare = () => {
    if (navigator.share) {
      navigator.share({ title: packageTitle, text: shareText, url: pageUrl })
        .then(() => setOpen(false))
        .catch(() => {});
    }
  };

  /** Show a brief toast at bottom of screen */
  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const shareOptions: ShareOption[] = [
    ...(navigator.share ? [{
      label: 'Share via...',
      icon: <Share2 className="w-4 h-4" />,
      color: '#6366f1',
      bgColor: '#eef2ff',
      action: nativeShare,
    }] : []),
    {
      label: 'WhatsApp',
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      ),
      color: '#25D366',
      bgColor: '#f0fdf4',
      action: () => { window.open(`https://wa.me/?text=${encodedText}`, '_blank'); setOpen(false); },
    },
    {
      label: 'X / Twitter',
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.735-8.856L1.254 2.25H8.08l4.258 5.63L18.244 2.25zM17.083 20.5h1.833L7.084 4.125H5.117L17.083 20.5z"/>
        </svg>
      ),
      color: '#000000',
      bgColor: '#f3f4f6',
      action: () => { window.open(`https://twitter.com/intent/tweet?text=${encodedText}`, '_blank'); setOpen(false); },
    },
    {
      label: 'Telegram',
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
        </svg>
      ),
      color: '#0088CC',
      bgColor: '#e8f4ff',
      action: () => { window.open(`https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`, '_blank'); setOpen(false); },
    },
    {
      label: 'Instagram',
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
      color: '#E1306C',
      bgColor: '#fff0f5',
      action: () => {
        // Copy link silently
        navigator.clipboard.writeText(pageUrl).catch(() => {});
        // Try deep link to open Instagram app (works on mobile)
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        const isAndroid = /Android/.test(navigator.userAgent);
        if (isIOS || isAndroid) {
          // Try to open Instagram app; falls back to App Store / Play Store if not installed
          window.location.href = 'instagram://';
          setTimeout(() => {
            // If app didn't open (still on page), show fallback
            showToast('📸 Link copied! Paste it in your Instagram DM or Story.');
          }, 1200);
        } else {
          // Desktop: open instagram.com and show toast
          window.open('https://www.instagram.com/direct/inbox/', '_blank');
          showToast('📸 Link copied! Paste it in your Instagram DM.');
        }
        setOpen(false);
      },
    },
    {
      label: 'Snapchat',
      icon: (
        <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12 1.033-.301.165-.088.344-.104.464-.104.182 0 .359.029.509.09.45.149.734.479.734.838.015.449-.39.839-1.213 1.168-.089.029-.209.075-.344.119-.45.135-1.139.36-1.333.81-.09.224-.061.524.12.868l.015.015c.06.136 1.526 3.475 4.791 4.014.255.044.435.27.42.509 0 .075-.015.149-.045.225-.24.569-1.273.988-3.146 1.271-.059.091-.12.375-.164.57-.029.179-.074.36-.134.553-.076.271-.27.405-.555.405h-.03c-.135 0-.313-.031-.538-.074-.36-.075-.765-.135-1.273-.135-.3 0-.599.015-.913.074-.6.104-1.123.464-1.723.884-.853.599-1.826 1.288-3.294 1.288-.06 0-.119-.015-.18-.015h-.149c-1.468 0-2.427-.675-3.279-1.288-.599-.42-1.107-.779-1.707-.884-.314-.045-.629-.074-.928-.074-.54 0-.958.089-1.272.149-.211.043-.391.074-.54.074-.374 0-.523-.224-.583-.42-.061-.192-.09-.389-.135-.567-.046-.181-.104-.494-.166-.57-1.918-.222-2.95-.642-3.189-1.226-.031-.063-.045-.15-.045-.225-.015-.243.165-.465.42-.509 3.264-.54 4.73-3.879 4.791-4.02l.016-.029c.18-.345.224-.645.119-.869-.195-.434-.884-.658-1.332-.809-.121-.029-.24-.074-.346-.119-1.107-.435-1.257-.93-1.197-1.273.09-.479.674-.793 1.168-.793.146 0 .27.029.383.074.42.194.789.3 1.104.3.234 0 .384-.06.465-.105l-.046-.569c-.098-1.626-.225-3.651.307-4.837C7.392 1.077 10.739.807 11.727.807l.419-.015h.06z"/>
        </svg>
      ),
      color: '#fff',
      bgColor: '#FFFC00',
      action: () => { window.open(`https://www.snapchat.com/share?url=${encodedUrl}`, '_blank'); setOpen(false); },
    },
    {
      label: 'Email',
      icon: <Mail className="w-4 h-4" />,
      color: '#6366f1',
      bgColor: '#eef2ff',
      action: () => { window.open(`mailto:?subject=${encodedTitle}&body=${encodedText}`, '_blank'); setOpen(false); },
    },
    {
      label: 'SMS',
      icon: <MessageCircle className="w-4 h-4" />,
      color: '#10b981',
      bgColor: '#ecfdf5',
      action: () => { window.open(`sms:?body=${encodedText}`, '_blank'); setOpen(false); },
    },
    {
      label: copied ? 'Copied!' : 'Copy Link',
      icon: copied ? <Check className="w-4 h-4" /> : <Link2 className="w-4 h-4" />,
      color: copied ? '#10b981' : '#374151',
      bgColor: copied ? '#ecfdf5' : '#f9fafb',
      action: copyLink,
    },
  ];

  /* ── Portal dropdown rendered at <body> so it's never clipped ── */
  const dropdown = open
    ? createPortal(
        <div
          ref={dropdownRef}
          style={{
            position: 'fixed',
            top: dropdownPos.top,
            left: dropdownPos.left,
            width: DROPDOWN_WIDTH,
            zIndex: 99999,
            animation: 'shareDropIn 0.18s ease-out',
          }}
          className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-700 rounded-2xl shadow-2xl"
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
        >
          {/* Header */}
          <div className="px-4 py-3 border-b border-gray-100 dark:border-slate-800 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-slate-800 dark:to-slate-800 rounded-t-2xl">
            <p className="font-[var(--font-nunito)] font-[700] text-[11px] text-[var(--text-muted)] uppercase tracking-widest flex items-center gap-2">
              <Share2 className="w-3 h-3 text-[var(--brand-orange-red)]" />
              Share this package
            </p>
          </div>

          {/* Options — scrollable */}
          <div
            style={{ maxHeight: '300px', overflowY: 'auto', overflowX: 'hidden' }}
            className="py-1.5"
          >
            {shareOptions.map((option) => (
              <button
                key={option.label}
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); option.action(); }}
                className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors text-left"
              >
                <span
                  className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: option.bgColor, color: option.color }}
                >
                  {option.icon}
                </span>
                <span
                  className="font-[var(--font-nunito)] font-[600] text-[13px]"
                  style={{ color: option.label === 'Copied!' ? '#10b981' : 'var(--text-primary)' }}
                >
                  {option.label}
                </span>
              </button>
            ))}
          </div>

          <style>{`
            @keyframes shareDropIn {
              from { opacity: 0; transform: translateY(-8px) scale(0.96); }
              to   { opacity: 1; transform: translateY(0) scale(1); }
            }
          `}</style>
        </div>,
        document.body
      )
    : null;

  return (
    <>
      <div className={`relative inline-block ${className}`}>
        <button
          ref={btnRef}
          onClick={handleOpen}
          aria-label="Share this package"
          className={`
            group flex items-center gap-1.5 rounded-full transition-all duration-200
            ${compact
              ? 'w-9 h-9 justify-center bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm shadow-md hover:shadow-lg hover:scale-110 border border-white/50 dark:border-slate-700/50'
              : 'px-4 py-2 bg-white dark:bg-slate-800 shadow-md hover:shadow-lg border border-gray-200 dark:border-slate-700 hover:border-[var(--brand-orange-red)] hover:text-[var(--brand-orange-red)] text-[var(--text-secondary)]'
            }
          `}
        >
          <Share2
            className={`transition-transform group-hover:scale-110 ${
              compact ? 'w-4 h-4 text-[var(--brand-orange-red)]' : 'w-4 h-4'
            }`}
          />
          {!compact && (
            <span className="font-[var(--font-nunito)] font-[600] text-[13px]">Share</span>
          )}
        </button>
      </div>

      {dropdown}

      {/* Toast notification */}
      {toast && createPortal(
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 999999,
            animation: 'toastIn 0.3s ease-out',
            whiteSpace: 'nowrap',
          }}
          className="bg-gray-900 text-white px-5 py-3 rounded-2xl shadow-2xl font-[var(--font-nunito)] font-[600] text-[14px] flex items-center gap-2"
        >
          {toast}
          <style>{`
            @keyframes toastIn {
              from { opacity: 0; transform: translateX(-50%) translateY(12px); }
              to   { opacity: 1; transform: translateX(-50%) translateY(0); }
            }
          `}</style>
        </div>,
        document.body
      )}
    </>
  );
}
