// Package classes contains the available default css classes for components.
package classes

// Accordion related classes
const (
	Accordion           = "popui-accordion"
	AccordionScrollable = "popui-accordion__scrollable"
	AccordionContent    = "popui-accordion__content"
)

// Avatar related classes
const (
	AvatarBase    = "popui-avatar"
	AvatarLarge   = "popui-avatar--large"
	AvatarInitial = "popui-avatar--initial"
)

// Card related classes
const (
	Card            = "popui-card"
	CardDisabled    = "popui-card--disabled"
	CardHeader      = "popui-card__header"
	CardHeaderFlag  = "popui-card__header-flag"
	CardHeaderTitle = "popui-card__header-title"

	CardProgressBar                    = "popui-card-progress-bar"
	CardProgressBarProgress            = "popui-card-progress-bar__progress"
	CardProgressBarHeader              = "popui-card-progress-bar__header"
	CardProgressBarHeaderTitle         = "popui-card-progress-bar__header-title"
	CardProgressBarHeaderSubtitle      = "popui-card-progress-bar__header-subtitle"
	CardProgressBarHeaderAmount        = "popui-card-progress-bar__header-amount"
	CardProgressBarHeaderAmountCurrent = "popui-card-progress-bar__header-amount_current"

	CardDashboard          = "popui-card-dashboard"
	CardDashboardItem      = "popui-card-dashboard__item"
	CardDashboardItemLabel = "popui-card-dashboard__item-label"
	CardDashboardItemValue = "popui-card-dashboard__item-value"

	CardFile = "popui-card-file"
)

// Container classes
const (
	PopupConfigContainer = "popui-container-config"
)

// Image related classes
const (
	Image = "popui-image"
)

// Form and input and related classes
const (
	FormContainer = "popui-form__container"
	FormListItem  = "popui-form__list-item"
	FormCellGroup = "popui-form__cell-group"

	Fieldset           = "popui-fieldset"
	FieldsetCard       = "popui-fieldset popui-fieldset__card"
	FieldsetCardGrayed = "popui-fieldset popui-fieldset__card popui-fieldset__card-grayed"
	FieldsetLegend     = "popui-fieldset-legend"

	OptionGroup = "popui-option-group"

	InputTitle = "popui-input-title"

	InputTextWrapper = "popui-input-text-wrapper"
	InputTextGroup   = "popui-input-text-group"
	InputTextBase    = "popui-input-text"
	InputTextError   = "popui-input-text--error"

	InputFile = "popui-input-file"

	CheckboxWrapper = "popui-checkbox-wrapper"
	CheckboxInput   = "popui-checkbox-input"
	CheckboxLabel   = "popui-checkbox-label"

	RangeInput = "popui-range__input"

	SwitchWrapper = "popui-switch__wrapper"
	SwitchInput   = "popui-switch__input"
	SwitchLabel   = "popui-switch__label"

	ButtonBase        = "popui-button"
	ButtonDanger      = "popui-button--danger"
	ButtonPrimary     = "popui-button--primary"
	ButtonSecondary   = "popui-button--secondary"
	ButtonLoading     = "popui-button--loading"
	ButtonSpinner     = "popui-button-spinner"
	ButtonTransparent = "popui-button--transparent"
	ButtonSmall       = "popui-button--small"

	Radio             = "popui-radio"
	RadioWrapper      = "popui-radio-wrapper"
	RadioWrapperInner = "popui-radio-wrapper__inner"
	RadioLabel        = "popui-radio-label"
	RadioLabelWrapper = "popui-radio-label__wrapper"
	RadioDescription  = "popui-radio-description"
	RadioTheme        = "popui-radio__theme"

	SelectWrapper = "popui-select-wrapper"
	SelectBase    = "popui-select"
	SelectError   = "popui-input--error"

	TextareaWrapper         = "popui-textarea-wrapper"
	TextareaBase            = "popui-textarea"
	TextareaContenteditable = "popui-textarea__contenteditable"
	TextareaError           = "popui-input--error"
	TextareaMonospaced      = "popui-textarea--monospaced"

	Label = "popui-label"
	Error = "popui-error"
)

// Prose and general classes
const (
	P                        = "popui-paragraph"
	Title                    = "popui-title"
	Subtitle                 = "popui-subtitle"
	Description              = "popui-description"
	Info                     = "popui-info"
	InfoText                 = "popui-info-text"
	FlashMessage             = "popui-form-message"
	FlashMessageSuccess      = "popui-form-message--success"
	WarningText              = "popui-warning-text"
	Notification             = "popui-notification"
	NotificationInfo         = "popui-notification__info"
	NotificationWarning      = "popui-notification__warning"
	NotificationSuccess      = "popui-notification__success"
	NotificationError        = "popui-notification__error"
	NotificationDescription  = "popui-notification__description"
	Prose                    = "popui-prose"
	HorizontalDividerWrapper = "popui-divider-wrapper"
	HorizontalDivider        = "popui-divider"
	DescList                 = "popui-desc-list"
	EmptyState               = "popui-empty-state"
)

// Page classes
const (
	Page               = "popui-admin-page"
	PageHeader         = "popui-admin-page__header"
	PageHeaderActions  = "popui-admin-page__header-actions"
	PageContent        = "popui-admin-page__content"
	PageSection        = "popui-admin-page__section"
	PageSectionTitle   = "popui-admin-page__section-title"
	PageSectionContent = "popui-admin-page__section-content"
	PageBreadcrumbs    = "popui-admin-page__breadcrumbs"
	PageTitle          = "popui-admin-page-title"
	PageTitleWrapper   = "popui-admin-page-title__wrapper"
)

// Wizard classes
const (
	WizardPageWrapper           = "popui-wizard-page"
	WizardHeader                = "popui-wizard-header"
	WizardContent               = "popui-wizard-content"
	WizardFooter                = "popui-wizard-footer"
	WizardContentCenterVertical = "popui-wizard-content__center-vertical"
)

// Popover classes
const (
	PopoverWrapper          = "popui-popover-wrapper"
	PopoverWrapperRight     = "popui-popover-wrapper__right"
	PopoverList             = "popui-popover-list"
	PopoverListRight        = "popui-popover-list__right"
	PopoverListStretch      = "popui-popover-list__stretch"
	PopoverListItem         = "popui-popover-list-item"
	PopoverListItemTextLeft = "popui-popover-list-item__text-left"
)

// Sidebar classes
const (
	Sidebar                  = "popui-admin-sidebar"
	SidebarHeader            = "popui-admin-sidebar__header"
	SidebarContent           = "popui-admin-sidebar__content"
	SidebarFooter            = "popui-admin-sidebar__footer"
	SidebarSection           = "popui-admin-sidebar__section"
	SidebarSectionItemActive = "popui-admin-sidebar__item-active"
)

// SVG classes
const (
	SVGLoading = "popui-svg-loading"
)

// Table classes
const (
	Table          = "popui-table"
	TableClickable = "popui-table--clickable"
	TableWrapper   = "popui-table-wrapper"
	TableCellRight = "popui-table-cell__right"
)

// Tabs classes
const (
	Tabs        = "popui-tabs"
	TabsPill    = "popui-tabs__pill"
	Tab         = "popui-tab"
	TabPill     = "popui-tab__pill"
	TabActive   = "popui-tab--active"
	TabDisabled = "popui-tab--disabled"
)

// Tags classes
const (
	TagsWrapper  = "popui-tags-wrapper"
	Tags         = "popui-tags"
	Tag          = "popui-tag"
	TagButton    = "popui-tag-button"
	TagAddButton = "popui-tag-add-button"
	TagAddInput  = "popui-tag-add-input"
)

// TagStatus classes
const (
	TagStatusBase  = "popui-tag-status"
	TagStatusDot   = "popui-tag-status__dot"
	TagStatusLabel = "popui-tag-status__label"

	TagStatusGreen      = "popui-tag-status--green"
	TagStatusYellow     = "popui-tag-status--yellow"
	TagStatusRed        = "popui-tag-status--red"
	TagStatusOrange     = "popui-tag-status--orange"
	TagStatusBlue       = "popui-tag-status--blue"
	TagStatusPurple     = "popui-tag-status--purple"
	TagStatusOlive      = "popui-tag-status--olive"
	TagStatusTeal       = "popui-tag-status--teal"
	TagStatusCrimson    = "popui-tag-status--crimson"
	TagStatusBlueViolet = "popui-tag-status--blue-violet"
	TagStatusSteelBlue  = "popui-tag-status--steel-blue"
	TagStatusEmpty      = "popui-tag-status--empty"
	TagStatusGrey       = "popui-tag-status--grey"
)

// UUIDCopy component classes
const (
	UUIDCopy        = "popui-uuid-copy"
	UUIDCopyText    = "popui-uuid-copy__text"
	UUIDCopyButton  = "popui-uuid-copy__button"
	UUIDCopyIcon    = "popui-uuid-copy__icon"
	UUIDCopyPopover = "popui-uuid-copy__popover"
)

// Upload classes
const (
	UploadFile            = "popui-upload_file"
	UploadFileImg         = "popui-upload_file-image"
	UploadFileImgSquare   = "popui-upload_file-image_square"
	UploadFilePlaceholder = "popui-upload_file-placeholder"
	UploadFileText        = "popui-upload_file-text"
)
