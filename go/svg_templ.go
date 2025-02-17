// Code generated by templ - DO NOT EDIT.

// templ: version: v0.3.833
package popui

//lint:file-ignore SA4006 This context is only used if a nested component is present.

import "github.com/a-h/templ"
import templruntime "github.com/a-h/templ/runtime"

import "github.com/invopop/popui/go/classes"

func ErrorIcon() templ.Component {
	return templruntime.GeneratedTemplate(func(templ_7745c5c3_Input templruntime.GeneratedComponentInput) (templ_7745c5c3_Err error) {
		templ_7745c5c3_W, ctx := templ_7745c5c3_Input.Writer, templ_7745c5c3_Input.Context
		if templ_7745c5c3_CtxErr := ctx.Err(); templ_7745c5c3_CtxErr != nil {
			return templ_7745c5c3_CtxErr
		}
		templ_7745c5c3_Buffer, templ_7745c5c3_IsBuffer := templruntime.GetBuffer(templ_7745c5c3_W)
		if !templ_7745c5c3_IsBuffer {
			defer func() {
				templ_7745c5c3_BufErr := templruntime.ReleaseBuffer(templ_7745c5c3_Buffer)
				if templ_7745c5c3_Err == nil {
					templ_7745c5c3_Err = templ_7745c5c3_BufErr
				}
			}()
		}
		ctx = templ.InitializeContext(ctx)
		templ_7745c5c3_Var1 := templ.GetChildren(ctx)
		if templ_7745c5c3_Var1 == nil {
			templ_7745c5c3_Var1 = templ.NopComponent
		}
		ctx = templ.ClearChildren(ctx)
		templ_7745c5c3_Err = templruntime.WriteString(templ_7745c5c3_Buffer, 1, "<svg width=\"40\" height=\"40\" viewBox=\"0 0 40 40\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M20.0001 1.53845C9.82088 1.53845 1.53857 9.82076 1.53857 20C1.53857 30.1792 9.82088 38.4615 20.0001 38.4615C30.1793 38.4615 38.4617 30.1792 38.4617 20C38.4617 9.82076 30.1793 1.53845 20.0001 1.53845Z\" fill=\"#C92D45\"></path> <circle cx=\"20.0001\" cy=\"20\" r=\"15.3846\" stroke=\"white\" stroke-opacity=\"0.4\" stroke-width=\"0.923077\"></circle> <path d=\"M18.2695 11.7646C18.2695 10.8093 19.0448 10.0339 20.0001 10.0339C20.9554 10.0339 21.7308 10.8093 21.7308 11.7646V21.3153C21.7308 22.2706 20.9554 23.0459 20.0001 23.0459C19.0448 23.0459 18.2695 22.2706 18.2695 21.3153V11.7646ZM20.0001 30.1923C18.7264 30.1923 17.6926 29.1562 17.6926 27.8848C17.6926 26.6133 18.7264 25.5773 20.0001 25.5773C21.2739 25.5773 22.3076 26.6133 22.3076 27.8848C22.3076 29.1562 21.2739 30.1923 20.0001 30.1923Z\" fill=\"white\"></path></svg>")
		if templ_7745c5c3_Err != nil {
			return templ_7745c5c3_Err
		}
		return nil
	})
}

func SuccessIcon() templ.Component {
	return templruntime.GeneratedTemplate(func(templ_7745c5c3_Input templruntime.GeneratedComponentInput) (templ_7745c5c3_Err error) {
		templ_7745c5c3_W, ctx := templ_7745c5c3_Input.Writer, templ_7745c5c3_Input.Context
		if templ_7745c5c3_CtxErr := ctx.Err(); templ_7745c5c3_CtxErr != nil {
			return templ_7745c5c3_CtxErr
		}
		templ_7745c5c3_Buffer, templ_7745c5c3_IsBuffer := templruntime.GetBuffer(templ_7745c5c3_W)
		if !templ_7745c5c3_IsBuffer {
			defer func() {
				templ_7745c5c3_BufErr := templruntime.ReleaseBuffer(templ_7745c5c3_Buffer)
				if templ_7745c5c3_Err == nil {
					templ_7745c5c3_Err = templ_7745c5c3_BufErr
				}
			}()
		}
		ctx = templ.InitializeContext(ctx)
		templ_7745c5c3_Var2 := templ.GetChildren(ctx)
		if templ_7745c5c3_Var2 == nil {
			templ_7745c5c3_Var2 = templ.NopComponent
		}
		ctx = templ.ClearChildren(ctx)
		templ_7745c5c3_Err = templruntime.WriteString(templ_7745c5c3_Buffer, 2, "<svg width=\"40\" height=\"40\" viewBox=\"0 0 40 40\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M20.0001 1.53845C9.82088 1.53845 1.53857 9.82076 1.53857 20C1.53857 30.1792 9.82088 38.4615 20.0001 38.4615C30.1793 38.4615 38.4617 30.1792 38.4617 20C38.4617 9.82076 30.1793 1.53845 20.0001 1.53845Z\" fill=\"#169958\"></path> <circle cx=\"20.0001\" cy=\"20\" r=\"15.3846\" stroke=\"white\" stroke-opacity=\"0.4\" stroke-width=\"0.923077\"></circle> <path d=\"M28.8677 14.7113L19.0609 27.4025C18.7471 27.8087 18.2694 28.0556 17.7571 28.074C17.7341 28.074 17.7133 28.074 17.6925 28.074C17.2033 28.074 16.7349 27.8664 16.4049 27.5018L11.2131 21.733C10.5739 21.0223 10.6316 19.9286 11.3423 19.2871C12.0553 18.6502 13.1444 18.7056 13.7882 19.4163L17.591 23.6436L26.1311 12.593C26.7148 11.8362 27.804 11.6977 28.5585 12.2815C29.3154 12.8653 29.4539 13.9521 28.8701 14.709L28.8677 14.7113Z\" fill=\"white\"></path></svg>")
		if templ_7745c5c3_Err != nil {
			return templ_7745c5c3_Err
		}
		return nil
	})
}

func InfoIcon() templ.Component {
	return templruntime.GeneratedTemplate(func(templ_7745c5c3_Input templruntime.GeneratedComponentInput) (templ_7745c5c3_Err error) {
		templ_7745c5c3_W, ctx := templ_7745c5c3_Input.Writer, templ_7745c5c3_Input.Context
		if templ_7745c5c3_CtxErr := ctx.Err(); templ_7745c5c3_CtxErr != nil {
			return templ_7745c5c3_CtxErr
		}
		templ_7745c5c3_Buffer, templ_7745c5c3_IsBuffer := templruntime.GetBuffer(templ_7745c5c3_W)
		if !templ_7745c5c3_IsBuffer {
			defer func() {
				templ_7745c5c3_BufErr := templruntime.ReleaseBuffer(templ_7745c5c3_Buffer)
				if templ_7745c5c3_Err == nil {
					templ_7745c5c3_Err = templ_7745c5c3_BufErr
				}
			}()
		}
		ctx = templ.InitializeContext(ctx)
		templ_7745c5c3_Var3 := templ.GetChildren(ctx)
		if templ_7745c5c3_Var3 == nil {
			templ_7745c5c3_Var3 = templ.NopComponent
		}
		ctx = templ.ClearChildren(ctx)
		templ_7745c5c3_Err = templruntime.WriteString(templ_7745c5c3_Buffer, 3, "<svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><circle cx=\"8\" cy=\"8\" r=\"6\" stroke=\"currentColor\"></circle> <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M8 5.7002C8.41421 5.7002 8.75 5.36441 8.75 4.9502C8.75 4.53598 8.41421 4.2002 8 4.2002C7.58579 4.2002 7.25 4.53598 7.25 4.9502C7.25 5.36441 7.58579 5.7002 8 5.7002ZM7.5 11.2002L7.5 11.7002H8.5V11.2002L8.5 7.2002L8.5 6.7002H7.5L7.5 7.2002L7.5 11.2002Z\" fill=\"currentColor\"></path></svg>")
		if templ_7745c5c3_Err != nil {
			return templ_7745c5c3_Err
		}
		return nil
	})
}

func InvopopLogo() templ.Component {
	return templruntime.GeneratedTemplate(func(templ_7745c5c3_Input templruntime.GeneratedComponentInput) (templ_7745c5c3_Err error) {
		templ_7745c5c3_W, ctx := templ_7745c5c3_Input.Writer, templ_7745c5c3_Input.Context
		if templ_7745c5c3_CtxErr := ctx.Err(); templ_7745c5c3_CtxErr != nil {
			return templ_7745c5c3_CtxErr
		}
		templ_7745c5c3_Buffer, templ_7745c5c3_IsBuffer := templruntime.GetBuffer(templ_7745c5c3_W)
		if !templ_7745c5c3_IsBuffer {
			defer func() {
				templ_7745c5c3_BufErr := templruntime.ReleaseBuffer(templ_7745c5c3_Buffer)
				if templ_7745c5c3_Err == nil {
					templ_7745c5c3_Err = templ_7745c5c3_BufErr
				}
			}()
		}
		ctx = templ.InitializeContext(ctx)
		templ_7745c5c3_Var4 := templ.GetChildren(ctx)
		if templ_7745c5c3_Var4 == nil {
			templ_7745c5c3_Var4 = templ.NopComponent
		}
		ctx = templ.ClearChildren(ctx)
		templ_7745c5c3_Err = templruntime.WriteString(templ_7745c5c3_Buffer, 4, "<svg width=\"77\" height=\"16\" viewBox=\"0 0 77 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_3_2440)\"><path d=\"M15.9473 15.4135L15.5939 15.1108H4.56312C4.48575 15.111 4.4109 15.083 4.35216 15.0318L1.33141 12.4529H1.18901C1.12183 12.4527 1.05623 12.4736 1.00113 12.5126C0.946034 12.5516 0.904108 12.6069 0.881057 12.671C0.858007 12.7351 0.854951 12.8048 0.872304 12.8707C0.889658 12.9366 0.926579 12.9955 0.978047 13.0394L4.35216 15.929C4.41132 15.9792 4.486 16.0067 4.56312 16.0067H15.735C15.8039 16.0089 15.8717 15.989 15.9288 15.9497C15.9859 15.9105 16.0293 15.854 16.0528 15.7882C16.0763 15.7224 16.0788 15.6507 16.0599 15.5834C16.0409 15.5162 16.0015 15.4567 15.9473 15.4135Z\" fill=\"#194136\"></path> <path d=\"M15.9473 13.6353L15.5939 13.3326H4.56312C4.48575 13.3328 4.41089 13.3048 4.35216 13.2536L1.33141 10.668H1.18901C1.12183 10.6678 1.05623 10.6886 1.00113 10.7277C0.946034 10.7667 0.904108 10.822 0.881057 10.8861C0.858007 10.9502 0.854951 11.0199 0.872304 11.0858C0.889658 11.1517 0.926579 11.2106 0.978047 11.2545L4.35216 14.1427C4.41089 14.1939 4.48575 14.2219 4.56312 14.2217H15.735C15.8023 14.2222 15.8681 14.2015 15.9234 14.1626C15.9787 14.1237 16.0208 14.0684 16.0441 14.0042C16.0673 13.9401 16.0704 13.8702 16.0531 13.8042C16.0358 13.7382 15.9988 13.6792 15.9473 13.6353Z\" fill=\"#194136\"></path> <path d=\"M15.9472 6.52368L15.5938 6.22106H4.56304C4.48582 6.22173 4.41094 6.19416 4.35207 6.1434L1.33133 3.55775H1.18893C1.12016 3.5558 1.05254 3.57594 0.99569 3.61528C0.93884 3.65463 0.895659 3.71118 0.872289 3.77689C0.848919 3.8426 0.846553 3.91412 0.865525 3.98128C0.884498 4.04843 0.923844 4.1078 0.977964 4.15093L4.44305 7.11018L8.50412 10.5916C8.56362 10.6422 8.63883 10.6697 8.7164 10.6693H11.4418L11.7952 10.9719C11.8464 11.016 11.8831 11.075 11.9003 11.1409C11.9175 11.2068 11.9144 11.2764 11.8914 11.3405C11.8684 11.4046 11.8267 11.4599 11.7717 11.4991C11.7168 11.5383 11.6513 11.5595 11.5842 11.5598H8.7164C8.63971 11.558 8.56604 11.5291 8.50807 11.4781L5.47546 8.88974H1.18893C1.12175 8.88957 1.05615 8.91042 1.00105 8.94945C0.945951 8.98848 0.904025 9.04379 0.880974 9.10787C0.857924 9.17195 0.854868 9.24169 0.872221 9.3076C0.889575 9.37351 0.926496 9.43239 0.977964 9.47623L4.35207 12.3645C4.41081 12.4156 4.48567 12.4437 4.56304 12.4435H15.7349C15.8022 12.4435 15.8678 12.4226 15.923 12.3835C15.9781 12.3444 16.0201 12.289 16.0432 12.2249C16.0664 12.1608 16.0696 12.091 16.0524 12.0249C16.0353 11.9589 15.9985 11.8998 15.9472 11.8557L11.4418 7.99929H8.7164C8.64028 7.9982 8.56681 7.9708 8.50807 7.92163L7.55873 7.11018H15.7336C15.801 7.1109 15.867 7.09046 15.9225 7.05164C15.978 7.01282 16.0204 6.95752 16.0438 6.89331C16.0671 6.82911 16.0704 6.75913 16.0531 6.69297C16.0358 6.6268 15.9988 6.56768 15.9472 6.52368ZM8.50807 8.81074C8.56758 8.86128 8.64278 8.88879 8.72036 8.8884H11.4431L11.7952 9.18968C11.8461 9.23365 11.8826 9.29243 11.8996 9.3581C11.9167 9.42376 11.9135 9.49316 11.8905 9.55693C11.8675 9.6207 11.8258 9.67578 11.7711 9.71474C11.7163 9.75371 11.6511 9.77468 11.5842 9.77483H8.7164C8.64051 9.77504 8.56689 9.74855 8.50807 9.69985L5.47546 7.11018H6.51446L8.50807 8.81074Z\" fill=\"#194136\"></path> <path d=\"M15.9473 4.74548L15.5939 4.44286H4.56313C4.48601 4.44293 4.41132 4.41544 4.35217 4.36519L1.33142 1.7782H1.18902C1.12188 1.77845 1.05643 1.79961 1.00149 1.83881C0.946558 1.87801 0.904779 1.93338 0.881787 1.99744C0.858796 2.0615 0.855698 2.13119 0.872911 2.19709C0.890124 2.263 0.926821 2.32196 0.978054 2.36603L4.35217 5.2543C4.41103 5.30507 4.48591 5.33263 4.56313 5.33197H15.735C15.8023 5.33241 15.8681 5.31177 15.9234 5.27284C15.9787 5.23392 16.0209 5.17861 16.0441 5.11447C16.0673 5.05032 16.0704 4.98047 16.0531 4.91443C16.0358 4.8484 15.9989 4.78939 15.9473 4.74548Z\" fill=\"#194136\"></path> <path d=\"M0.978169 0.586494L4.35228 3.48146C4.41144 3.53171 4.48612 3.55921 4.56325 3.55913H15.7351C15.8024 3.55957 15.8682 3.53893 15.9235 3.5C15.9788 3.46108 16.021 3.40577 16.0442 3.34163C16.0674 3.27748 16.0706 3.20763 16.0532 3.14159C16.0359 3.07556 15.999 3.01655 15.9474 2.97263L12.5733 0.0776644C12.5139 0.02791 12.4394 0.000481674 12.3623 1.02023e-06H1.18913C1.12195 -0.000168048 1.05636 0.0206795 1.00126 0.0597086C0.946156 0.0987376 0.90423 0.154054 0.88118 0.218135C0.858129 0.282217 0.855073 0.351953 0.872427 0.41786C0.88978 0.483768 0.926701 0.542648 0.978169 0.586494Z\" fill=\"#194136\"></path> <path d=\"M15.9473 15.4135L15.5939 15.1108H4.56312C4.48576 15.111 4.4109 15.083 4.35216 15.0318L1.33141 12.4529H1.18901C1.12183 12.4527 1.05623 12.4736 1.00113 12.5126C0.946034 12.5516 0.904108 12.6069 0.881057 12.671C0.858007 12.7351 0.854951 12.8048 0.872304 12.8707C0.889658 12.9366 0.926579 12.9955 0.978047 13.0394L4.35216 15.929C4.41132 15.9792 4.486 16.0067 4.56312 16.0067H15.735C15.8039 16.0089 15.8717 15.989 15.9288 15.9497C15.9859 15.9105 16.0293 15.854 16.0528 15.7882C16.0763 15.7224 16.0788 15.6507 16.0599 15.5834C16.0409 15.5162 16.0015 15.4567 15.9473 15.4135Z\" fill=\"#194136\"></path> <path d=\"M15.9473 13.6353L15.5939 13.3326H4.56312C4.48575 13.3328 4.4109 13.3048 4.35216 13.2536L1.33141 10.668H1.18901C1.12183 10.6678 1.05623 10.6886 1.00113 10.7277C0.946034 10.7667 0.904108 10.822 0.881057 10.8861C0.858007 10.9502 0.854951 11.0199 0.872304 11.0858C0.889658 11.1517 0.926579 11.2106 0.978047 11.2545L4.35216 14.1427C4.4109 14.1939 4.48575 14.2219 4.56312 14.2217H15.735C15.8023 14.2222 15.8681 14.2015 15.9234 14.1626C15.9787 14.1237 16.0208 14.0684 16.0441 14.0042C16.0673 13.9401 16.0704 13.8702 16.0531 13.8042C16.0358 13.7382 15.9988 13.6792 15.9473 13.6353Z\" fill=\"#194136\"></path> <path d=\"M15.9472 6.52368L15.5938 6.22106H4.56304C4.48582 6.22173 4.41094 6.19416 4.35207 6.1434L1.33133 3.55775H1.18893C1.12016 3.5558 1.05254 3.57594 0.99569 3.61528C0.93884 3.65463 0.895659 3.71118 0.872289 3.77689C0.848919 3.8426 0.846553 3.91412 0.865525 3.98128C0.884498 4.04843 0.923844 4.1078 0.977964 4.15093L4.44305 7.11018L8.50412 10.5916C8.56362 10.6422 8.63883 10.6697 8.7164 10.6693H11.4418L11.7952 10.9719C11.8464 11.016 11.8831 11.075 11.9003 11.1409C11.9175 11.2068 11.9144 11.2764 11.8914 11.3405C11.8684 11.4046 11.8267 11.4599 11.7717 11.4991C11.7168 11.5383 11.6513 11.5595 11.5842 11.5598H8.7164C8.63971 11.558 8.56604 11.5291 8.50807 11.4781L5.47546 8.88974H1.18893C1.12175 8.88957 1.05615 8.91042 1.00105 8.94945C0.945951 8.98848 0.904025 9.04379 0.880974 9.10787C0.857924 9.17195 0.854868 9.24169 0.872221 9.3076C0.889575 9.37351 0.926496 9.43239 0.977964 9.47623L4.35207 12.3645C4.41081 12.4156 4.48567 12.4437 4.56304 12.4435H15.7349C15.8022 12.4435 15.8678 12.4226 15.923 12.3835C15.9781 12.3444 16.0201 12.289 16.0432 12.2249C16.0664 12.1608 16.0696 12.091 16.0524 12.0249C16.0353 11.9589 15.9985 11.8998 15.9472 11.8557L11.4418 7.99929H8.7164C8.64028 7.9982 8.56681 7.9708 8.50807 7.92163L7.55873 7.11018H15.7336C15.801 7.1109 15.867 7.09046 15.9225 7.05164C15.978 7.01282 16.0204 6.95752 16.0438 6.89331C16.0671 6.82911 16.0704 6.75913 16.0531 6.69297C16.0358 6.6268 15.9988 6.56768 15.9472 6.52368ZM8.50807 8.81074C8.56758 8.86128 8.64278 8.88879 8.72036 8.8884H11.4431L11.7952 9.18968C11.8461 9.23365 11.8826 9.29243 11.8996 9.3581C11.9167 9.42376 11.9135 9.49316 11.8905 9.55693C11.8675 9.6207 11.8258 9.67578 11.7711 9.71474C11.7163 9.75371 11.6511 9.77468 11.5842 9.77483H8.7164C8.64051 9.77504 8.56689 9.74855 8.50807 9.69985L5.47546 7.11018H6.51446L8.50807 8.81074Z\" fill=\"#194136\"></path> <path d=\"M15.9473 4.74548L15.5939 4.44286H4.56313C4.48601 4.44293 4.41132 4.41544 4.35217 4.36519L1.33142 1.7782H1.18902C1.12188 1.77845 1.05643 1.79961 1.00149 1.83881C0.946558 1.87801 0.904779 1.93338 0.881787 1.99744C0.858796 2.0615 0.855698 2.13119 0.872911 2.19709C0.890124 2.263 0.926821 2.32196 0.978054 2.36603L4.35217 5.2543C4.41103 5.30507 4.48591 5.33263 4.56313 5.33197H15.735C15.8023 5.33241 15.8681 5.31177 15.9234 5.27284C15.9787 5.23392 16.0209 5.17861 16.0441 5.11447C16.0673 5.05032 16.0705 4.98047 16.0531 4.91443C16.0358 4.8484 15.9989 4.78939 15.9473 4.74548Z\" fill=\"#194136\"></path> <path d=\"M0.978169 0.586493L4.35228 3.48146C4.41144 3.53171 4.48612 3.55921 4.56325 3.55913H15.7351C15.8024 3.55957 15.8682 3.53892 15.9235 3.5C15.9788 3.46107 16.021 3.40577 16.0442 3.34163C16.0674 3.27748 16.0706 3.20763 16.0532 3.14159C16.0359 3.07556 15.999 3.01655 15.9474 2.97263L12.5733 0.0776644C12.5139 0.02791 12.4394 0.000481674 12.3623 1.02023e-06H1.18913C1.12195 -0.000168047 1.05636 0.0206795 1.00126 0.0597085C0.946156 0.0987376 0.90423 0.154054 0.88118 0.218135C0.858129 0.282217 0.855073 0.351953 0.872427 0.41786C0.88978 0.483768 0.926701 0.542648 0.978169 0.586493Z\" fill=\"#194136\"></path> <path d=\"M22.7113 6.22515V12.4449H24.9778V6.22515H22.7113ZM22.7113 4.19519V5.51011H24.9778V4.19519H22.7113Z\" fill=\"#194136\"></path> <path d=\"M26.6919 6.22507V12.4448H28.9584V9.42266C28.9584 8.32734 29.6072 7.65648 30.4088 7.65648C31.229 7.65648 31.6707 8.19209 31.6707 9.28608V12.4448H33.9359V8.96337C33.9359 7.03518 33.0301 6.04028 31.2988 6.04028C30.2084 6.04028 29.4621 6.45002 28.9716 7.44626V6.22507H26.6919Z\" fill=\"#194136\"></path> <path d=\"M34.3513 6.2251L36.9726 12.4449H39.7283L42.3376 6.2251H39.7731L38.622 9.67041C38.5137 9.95995 38.4199 10.2549 38.3412 10.5542H38.2792C38.2183 10.254 38.1363 9.95869 38.034 9.67041L36.7972 6.2251H34.3513Z\" fill=\"#194136\"></path> <path d=\"M46.2457 11.114C45.3148 11.114 44.7149 10.4793 44.7149 9.32235C44.7149 8.16543 45.3148 7.55618 46.2457 7.55618C47.1766 7.55618 47.7778 8.16811 47.7778 9.32235C47.7778 10.4766 47.1766 11.114 46.2457 11.114ZM46.2457 12.6311C48.5004 12.6311 50.1169 11.426 50.1169 9.32235C50.1169 7.21874 48.5004 6.03906 46.2457 6.03906C43.991 6.03906 42.3943 7.22008 42.3943 9.32235C42.3943 11.4246 43.9923 12.6311 46.2457 12.6311Z\" fill=\"#194136\"></path> <path d=\"M54.8753 10.9894C53.9445 10.9894 53.3208 10.3922 53.3208 9.47232V9.21121C53.3208 8.19088 53.9445 7.60438 54.8885 7.60438C55.8326 7.60438 56.3706 8.22837 56.3706 9.3103C56.3706 10.3427 55.8062 10.9894 54.8753 10.9894ZM51.103 6.22519V14.8713H53.3696V11.6362C53.8588 12.2963 54.6182 12.6311 55.586 12.6311C57.4966 12.6311 58.7953 11.3135 58.7953 9.3103C58.7953 7.33256 57.5585 6.03906 55.6717 6.03906C54.6551 6.03906 53.7981 6.46219 53.3076 7.27097V6.22519H51.103Z\" fill=\"#194136\"></path> <path d=\"M63.5897 11.114C62.6588 11.114 62.0589 10.4793 62.0589 9.32235C62.0589 8.16543 62.6588 7.55618 63.5897 7.55618C64.5206 7.55618 65.1218 8.16811 65.1218 9.32235C65.1218 10.4766 64.5206 11.114 63.5897 11.114ZM63.5897 12.6311C65.8444 12.6311 67.4609 11.426 67.4609 9.32235C67.4609 7.21874 65.8444 6.03906 63.5897 6.03906C61.335 6.03906 59.7317 7.22008 59.7317 9.32235C59.7317 11.4246 61.3363 12.6311 63.5897 12.6311Z\" fill=\"#194136\"></path> <path d=\"M72.2193 10.9894C71.2884 10.9894 70.6648 10.3922 70.6648 9.47232V9.21121C70.6648 8.19088 71.2884 7.60438 72.2325 7.60438C73.1766 7.60438 73.7145 8.22703 73.7145 9.30896C73.7145 10.3427 73.1502 10.9894 72.2193 10.9894ZM68.447 6.22519V14.8713H70.7136V11.6362C71.2027 12.2963 71.9622 12.6311 72.93 12.6311C74.8406 12.6311 76.1393 11.3135 76.1393 9.3103C76.1393 7.33256 74.9025 6.03906 73.0157 6.03906C71.9991 6.03906 71.1421 6.46219 70.6516 7.27097V6.22519H68.447Z\" fill=\"#194136\"></path></g> <defs><clipPath id=\"clip0_3_2440\"><rect width=\"75.2787\" height=\"16\" fill=\"white\" transform=\"translate(0.860657)\"></rect></clipPath></defs></svg>")
		if templ_7745c5c3_Err != nil {
			return templ_7745c5c3_Err
		}
		return nil
	})
}

func LoadingIcon() templ.Component {
	return templruntime.GeneratedTemplate(func(templ_7745c5c3_Input templruntime.GeneratedComponentInput) (templ_7745c5c3_Err error) {
		templ_7745c5c3_W, ctx := templ_7745c5c3_Input.Writer, templ_7745c5c3_Input.Context
		if templ_7745c5c3_CtxErr := ctx.Err(); templ_7745c5c3_CtxErr != nil {
			return templ_7745c5c3_CtxErr
		}
		templ_7745c5c3_Buffer, templ_7745c5c3_IsBuffer := templruntime.GetBuffer(templ_7745c5c3_W)
		if !templ_7745c5c3_IsBuffer {
			defer func() {
				templ_7745c5c3_BufErr := templruntime.ReleaseBuffer(templ_7745c5c3_Buffer)
				if templ_7745c5c3_Err == nil {
					templ_7745c5c3_Err = templ_7745c5c3_BufErr
				}
			}()
		}
		ctx = templ.InitializeContext(ctx)
		templ_7745c5c3_Var5 := templ.GetChildren(ctx)
		if templ_7745c5c3_Var5 == nil {
			templ_7745c5c3_Var5 = templ.NopComponent
		}
		ctx = templ.ClearChildren(ctx)
		templ_7745c5c3_Err = templruntime.WriteString(templ_7745c5c3_Buffer, 5, "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><style>.spinner_jCIR{animation:spinner_B8Vq .9s linear infinite;animation-delay:-.9s}.spinner_upm8{animation-delay:-.8s}.spinner_2eL5{animation-delay:-.7s}.spinner_Rp9l{animation-delay:-.6s}.spinner_dy3W{animation-delay:-.5s}@keyframes spinner_B8Vq{0%,66.66%{animation-timing-function:cubic-bezier(0.36,.61,.3,.98);y:6px;height:12px}33.33%{animation-timing-function:cubic-bezier(0.36,.61,.3,.98);y:1px;height:22px}}</style><rect class=\"spinner_jCIR\" x=\"1\" y=\"6\" width=\"2.8\" height=\"12\" fill=\"currentColor\"></rect> <rect class=\"spinner_jCIR spinner_upm8\" x=\"5.8\" y=\"6\" width=\"2.8\" height=\"12\" fill=\"currentColor\"></rect> <rect class=\"spinner_jCIR spinner_2eL5\" x=\"10.6\" y=\"6\" width=\"2.8\" height=\"12\" fill=\"currentColor\"></rect> <rect class=\"spinner_jCIR spinner_Rp9l\" x=\"15.4\" y=\"6\" width=\"2.8\" height=\"12\" fill=\"currentColor\"></rect> <rect class=\"spinner_jCIR spinner_dy3W\" x=\"20.2\" y=\"6\" width=\"2.8\" height=\"12\" fill=\"currentColor\"></rect></svg>")
		if templ_7745c5c3_Err != nil {
			return templ_7745c5c3_Err
		}
		return nil
	})
}

func LoadingInvopopIcon() templ.Component {
	return templruntime.GeneratedTemplate(func(templ_7745c5c3_Input templruntime.GeneratedComponentInput) (templ_7745c5c3_Err error) {
		templ_7745c5c3_W, ctx := templ_7745c5c3_Input.Writer, templ_7745c5c3_Input.Context
		if templ_7745c5c3_CtxErr := ctx.Err(); templ_7745c5c3_CtxErr != nil {
			return templ_7745c5c3_CtxErr
		}
		templ_7745c5c3_Buffer, templ_7745c5c3_IsBuffer := templruntime.GetBuffer(templ_7745c5c3_W)
		if !templ_7745c5c3_IsBuffer {
			defer func() {
				templ_7745c5c3_BufErr := templruntime.ReleaseBuffer(templ_7745c5c3_Buffer)
				if templ_7745c5c3_Err == nil {
					templ_7745c5c3_Err = templ_7745c5c3_BufErr
				}
			}()
		}
		ctx = templ.InitializeContext(ctx)
		templ_7745c5c3_Var6 := templ.GetChildren(ctx)
		if templ_7745c5c3_Var6 == nil {
			templ_7745c5c3_Var6 = templ.NopComponent
		}
		ctx = templ.ClearChildren(ctx)
		var templ_7745c5c3_Var7 = []any{classes.SVGLoading}
		templ_7745c5c3_Err = templ.RenderCSSItems(ctx, templ_7745c5c3_Buffer, templ_7745c5c3_Var7...)
		if templ_7745c5c3_Err != nil {
			return templ_7745c5c3_Err
		}
		templ_7745c5c3_Err = templruntime.WriteString(templ_7745c5c3_Buffer, 6, "<svg class=\"")
		if templ_7745c5c3_Err != nil {
			return templ_7745c5c3_Err
		}
		var templ_7745c5c3_Var8 string
		templ_7745c5c3_Var8, templ_7745c5c3_Err = templ.JoinStringErrs(templ.CSSClasses(templ_7745c5c3_Var7).String())
		if templ_7745c5c3_Err != nil {
			return templ.Error{Err: templ_7745c5c3_Err, FileName: `go/svg.templ`, Line: 1, Col: 0}
		}
		_, templ_7745c5c3_Err = templ_7745c5c3_Buffer.WriteString(templ.EscapeString(templ_7745c5c3_Var8))
		if templ_7745c5c3_Err != nil {
			return templ_7745c5c3_Err
		}
		templ_7745c5c3_Err = templruntime.WriteString(templ_7745c5c3_Buffer, 7, "\" width=\"92\" height=\"96\" viewBox=\"0 0 92 96\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M90.8615 92.4407L88.7423 90.6258H22.5888C22.1248 90.6268 21.6758 90.4587 21.3236 90.152L3.20766 74.6856H2.35366C1.95078 74.6845 1.55737 74.8096 1.22692 75.0436C0.896482 75.2777 0.645045 75.6094 0.506809 75.9937C0.368572 76.378 0.350243 76.7963 0.454315 77.1915C0.558387 77.5868 0.77981 77.9399 1.08847 78.2028L21.3236 95.5324C21.6784 95.8337 22.1263 95.9986 22.5888 95.9981H89.5884C90.0015 96.0115 90.4083 95.8921 90.7505 95.6568C91.0928 95.4215 91.3531 95.0824 91.4943 94.6879C91.6355 94.2934 91.6503 93.8637 91.5367 93.4601C91.423 93.0565 91.1867 92.6997 90.8615 92.4407Z\" fill=\"#E5E7EB\"></path> <path d=\"M90.8615 81.7738L88.7423 79.9589H22.5888C22.1248 79.96 21.6758 79.7918 21.3236 79.4851L3.20766 63.9785H2.35366C1.95078 63.9775 1.55737 64.1025 1.22692 64.3366C0.896482 64.5707 0.645045 64.9024 0.506809 65.2867C0.368572 65.671 0.350243 66.0892 0.454315 66.4845C0.558387 66.8798 0.77981 67.2329 1.08847 67.4958L21.3236 84.8173C21.6758 85.124 22.1248 85.2921 22.5888 85.2911H89.5884C89.992 85.2938 90.3865 85.1699 90.7182 84.9365C91.0499 84.703 91.3026 84.3714 91.4419 83.9867C91.5811 83.602 91.6001 83.1831 91.4962 82.7871C91.3924 82.391 91.1707 82.0372 90.8615 81.7738Z\" fill=\"#E5E7EB\"></path> <path d=\"M90.9112 39.1278L88.792 37.313H22.6384C22.1753 37.317 21.7262 37.1517 21.3732 36.8472L3.25731 21.3406H2.40331C1.99089 21.329 1.58536 21.4497 1.24442 21.6857C0.90349 21.9216 0.644521 22.2608 0.50437 22.6549C0.364218 23.0489 0.350024 23.4779 0.463807 23.8806C0.57759 24.2833 0.813554 24.6394 1.13812 24.8981L21.9188 42.6451L46.2737 63.5241C46.6306 63.8272 47.0816 63.9922 47.5468 63.9898H63.8915L66.0107 65.8047C66.3179 66.069 66.538 66.4226 66.6412 66.8178C66.7445 67.2131 66.7259 67.631 66.588 68.0152C66.4501 68.3994 66.1996 68.7314 65.8701 68.9665C65.5406 69.2016 65.1481 69.3285 64.7455 69.33H47.5468C47.0869 69.3193 46.6451 69.1461 46.2974 68.8402L28.1104 53.3175H2.40331C2.00043 53.3165 1.60702 53.4415 1.27657 53.6756C0.946131 53.9096 0.694695 54.2414 0.556458 54.6257C0.418221 55.01 0.399893 55.4282 0.503965 55.8235C0.608037 56.2187 0.829459 56.5718 1.13812 56.8348L21.3732 74.1562C21.7255 74.4629 22.1744 74.6311 22.6384 74.63H89.6381C90.0414 74.6301 90.435 74.5045 90.7657 74.27C91.0964 74.0355 91.3482 73.7035 91.4871 73.319C91.626 72.9344 91.6452 72.5158 91.5422 72.1198C91.4392 71.7238 91.2189 71.3695 90.9112 71.1047L63.8915 47.9773H47.5468C47.0903 47.9708 46.6497 47.8065 46.2974 47.5115L40.6041 42.6451H89.6302C90.0344 42.6495 90.4301 42.5269 90.763 42.2941C91.096 42.0613 91.35 41.7296 91.4902 41.3446C91.6305 40.9595 91.6501 40.5399 91.5464 40.1431C91.4428 39.7463 91.2209 39.3917 90.9112 39.1278ZM46.2974 52.8437C46.6543 53.1468 47.1053 53.3118 47.5705 53.3094H63.8994L66.0107 55.1163C66.3163 55.38 66.535 55.7325 66.6372 56.1263C66.7395 56.5201 66.7204 56.9363 66.5825 57.3187C66.4446 57.7012 66.1946 58.0315 65.8661 58.2652C65.5376 58.4988 65.1465 58.6246 64.7455 58.6255H47.5468C47.0917 58.6268 46.6502 58.4679 46.2974 58.1758L28.1104 42.6451H34.3414L46.2974 52.8437Z\" fill=\"#E5E7EB\"></path> <path d=\"M90.8572 28.4554L88.738 26.6406H22.5844C22.1219 26.641 21.674 26.4761 21.3192 26.1748L3.20331 10.6602H2.34931C1.94665 10.6617 1.55414 10.7886 1.22469 11.0237C0.895232 11.2588 0.644675 11.5908 0.506793 11.975C0.368911 12.3592 0.350332 12.7771 0.453562 13.1723C0.556791 13.5676 0.776866 13.9212 1.08412 14.1855L21.3192 31.507C21.6723 31.8114 22.1213 31.9767 22.5844 31.9727H89.5841C89.9876 31.9754 90.3822 31.8516 90.7139 31.6181C91.0456 31.3847 91.2983 31.053 91.4375 30.6683C91.5767 30.2837 91.5957 29.8647 91.4919 29.4687C91.388 29.0727 91.1664 28.7188 90.8572 28.4554Z\" fill=\"#E5E7EB\"></path> <path d=\"M1.08847 3.5173L21.3236 20.8789C21.6784 21.1803 22.1263 21.3452 22.5888 21.3447H89.5884C89.992 21.3474 90.3865 21.2235 90.7182 20.9901C91.0499 20.7567 91.3027 20.425 91.4419 20.0403C91.5811 19.6556 91.6001 19.2367 91.4962 18.8407C91.3924 18.4446 91.1707 18.0908 90.8615 17.8274L70.6264 0.465767C70.27 0.167381 69.8232 0.00288868 69.3612 6.1185e-06H2.35366C1.95078 -0.00100781 1.55737 0.124018 1.22692 0.358082C0.896482 0.592146 0.645045 0.923888 0.506809 1.30819C0.368572 1.6925 0.350243 2.11072 0.454315 2.50598C0.558387 2.90124 0.77981 3.25435 1.08847 3.5173Z\" fill=\"#E5E7EB\"></path> <path d=\"M90.8615 92.4407L88.7423 90.6258H22.5888C22.1248 90.6268 21.6758 90.4587 21.3236 90.152L3.20766 74.6856H2.35366C1.95078 74.6845 1.55737 74.8096 1.22692 75.0436C0.896482 75.2777 0.645045 75.6094 0.506809 75.9937C0.368572 76.378 0.350243 76.7963 0.454315 77.1915C0.558387 77.5868 0.77981 77.9399 1.08847 78.2028L21.3236 95.5324C21.6784 95.8337 22.1263 95.9986 22.5888 95.9981H89.5884C90.0015 96.0115 90.4083 95.8921 90.7505 95.6568C91.0928 95.4215 91.3531 95.0824 91.4943 94.6879C91.6355 94.2934 91.6503 93.8637 91.5367 93.4601C91.423 93.0565 91.1867 92.6997 90.8615 92.4407Z\" fill=\"#E5E7EB\"></path> <path d=\"M90.8615 81.7738L88.7423 79.9589H22.5888C22.1248 79.96 21.6758 79.7918 21.3236 79.4851L3.20766 63.9785H2.35366C1.95078 63.9775 1.55737 64.1025 1.22692 64.3366C0.896482 64.5707 0.645045 64.9024 0.506809 65.2867C0.368572 65.671 0.350243 66.0892 0.454315 66.4845C0.558387 66.8798 0.77981 67.2329 1.08847 67.4958L21.3236 84.8173C21.6758 85.124 22.1248 85.2921 22.5888 85.2911H89.5884C89.992 85.2938 90.3865 85.1699 90.7182 84.9365C91.0499 84.703 91.3026 84.3714 91.4419 83.9867C91.5811 83.602 91.6001 83.1831 91.4962 82.7871C91.3924 82.391 91.1707 82.0372 90.8615 81.7738Z\" fill=\"#E5E7EB\"></path> <path d=\"M90.9112 39.1278L88.792 37.313H22.6384C22.1753 37.317 21.7262 37.1517 21.3732 36.8472L3.25731 21.3406H2.40331C1.99089 21.329 1.58536 21.4497 1.24442 21.6857C0.90349 21.9216 0.644521 22.2608 0.50437 22.6549C0.364218 23.0489 0.350024 23.4779 0.463807 23.8806C0.57759 24.2833 0.813554 24.6394 1.13812 24.8981L21.9188 42.6451L46.2737 63.5241C46.6306 63.8272 47.0816 63.9922 47.5468 63.9898H63.8915L66.0107 65.8047C66.3179 66.069 66.538 66.4226 66.6412 66.8178C66.7445 67.2131 66.7259 67.631 66.588 68.0152C66.4501 68.3994 66.1996 68.7314 65.8701 68.9665C65.5406 69.2016 65.1481 69.3285 64.7455 69.33H47.5468C47.0869 69.3193 46.6451 69.1461 46.2974 68.8402L28.1104 53.3175H2.40331C2.00043 53.3165 1.60702 53.4415 1.27657 53.6756C0.946131 53.9096 0.694695 54.2414 0.556458 54.6257C0.418221 55.01 0.399893 55.4282 0.503965 55.8235C0.608037 56.2187 0.829459 56.5718 1.13812 56.8348L21.3732 74.1562C21.7255 74.4629 22.1744 74.6311 22.6384 74.63H89.6381C90.0414 74.6301 90.435 74.5045 90.7657 74.27C91.0964 74.0355 91.3482 73.7035 91.4871 73.319C91.626 72.9344 91.6452 72.5158 91.5422 72.1198C91.4392 71.7238 91.2189 71.3695 90.9112 71.1047L63.8915 47.9773H47.5468C47.0903 47.9708 46.6497 47.8065 46.2974 47.5115L40.6041 42.6451H89.6302C90.0344 42.6495 90.4301 42.5269 90.763 42.2941C91.096 42.0613 91.35 41.7296 91.4902 41.3446C91.6305 40.9595 91.6501 40.5399 91.5464 40.1431C91.4428 39.7463 91.2209 39.3917 90.9112 39.1278ZM46.2974 52.8437C46.6543 53.1468 47.1053 53.3118 47.5705 53.3094H63.8994L66.0107 55.1163C66.3163 55.38 66.535 55.7325 66.6372 56.1263C66.7395 56.5201 66.7204 56.9363 66.5825 57.3187C66.4446 57.7012 66.1946 58.0315 65.8661 58.2652C65.5376 58.4988 65.1465 58.6246 64.7455 58.6255H47.5468C47.0917 58.6268 46.6502 58.4679 46.2974 58.1758L28.1104 42.6451H34.3414L46.2974 52.8437Z\" fill=\"#E5E7EB\"></path> <path d=\"M90.8572 28.4554L88.738 26.6406H22.5844C22.1219 26.641 21.674 26.4761 21.3192 26.1748L3.20331 10.6602H2.34931C1.94665 10.6617 1.55414 10.7886 1.22469 11.0237C0.895232 11.2588 0.644675 11.5908 0.506793 11.975C0.368911 12.3592 0.350332 12.7771 0.453562 13.1723C0.556791 13.5676 0.776866 13.9212 1.08412 14.1855L21.3192 31.507C21.6723 31.8114 22.1213 31.9767 22.5844 31.9727H89.5841C89.9876 31.9754 90.3822 31.8516 90.7139 31.6181C91.0456 31.3847 91.2983 31.053 91.4375 30.6683C91.5767 30.2837 91.5957 29.8647 91.4919 29.4687C91.388 29.0727 91.1664 28.7188 90.8572 28.4554Z\" fill=\"#E5E7EB\"></path> <path d=\"M1.08847 3.5173L21.3236 20.8789C21.6784 21.1803 22.1263 21.3452 22.5888 21.3447H89.5884C89.992 21.3474 90.3865 21.2235 90.7182 20.9901C91.0499 20.7567 91.3027 20.425 91.4419 20.0403C91.5811 19.6556 91.6001 19.2367 91.4962 18.8407C91.3924 18.4446 91.1707 18.0908 90.8615 17.8274L70.6264 0.465767C70.27 0.167381 69.8232 0.00288868 69.3612 6.1185e-06H2.35366C1.95078 -0.00100781 1.55737 0.124018 1.22692 0.358082C0.896482 0.592146 0.645045 0.923888 0.506809 1.30819C0.368572 1.6925 0.350243 2.11072 0.454315 2.50598C0.558387 2.90124 0.77981 3.25435 1.08847 3.5173Z\" fill=\"#E5E7EB\"></path></svg>")
		if templ_7745c5c3_Err != nil {
			return templ_7745c5c3_Err
		}
		return nil
	})
}

func CloseIcon() templ.Component {
	return templruntime.GeneratedTemplate(func(templ_7745c5c3_Input templruntime.GeneratedComponentInput) (templ_7745c5c3_Err error) {
		templ_7745c5c3_W, ctx := templ_7745c5c3_Input.Writer, templ_7745c5c3_Input.Context
		if templ_7745c5c3_CtxErr := ctx.Err(); templ_7745c5c3_CtxErr != nil {
			return templ_7745c5c3_CtxErr
		}
		templ_7745c5c3_Buffer, templ_7745c5c3_IsBuffer := templruntime.GetBuffer(templ_7745c5c3_W)
		if !templ_7745c5c3_IsBuffer {
			defer func() {
				templ_7745c5c3_BufErr := templruntime.ReleaseBuffer(templ_7745c5c3_Buffer)
				if templ_7745c5c3_Err == nil {
					templ_7745c5c3_Err = templ_7745c5c3_BufErr
				}
			}()
		}
		ctx = templ.InitializeContext(ctx)
		templ_7745c5c3_Var9 := templ.GetChildren(ctx)
		if templ_7745c5c3_Var9 == nil {
			templ_7745c5c3_Var9 = templ.NopComponent
		}
		ctx = templ.ClearChildren(ctx)
		templ_7745c5c3_Err = templruntime.WriteString(templ_7745c5c3_Buffer, 8, "<svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M8.00001 8.65125L12.3409 13.0332L13.0446 12.3227L8.70378 7.94082L12.9567 3.64768L12.2529 2.93725L8.00001 7.23039L3.74709 2.93724L3.04332 3.64767L7.29624 7.94082L2.95538 12.3227L3.65915 13.0332L8.00001 8.65125Z\" fill=\"currentColor\"></path></svg>")
		if templ_7745c5c3_Err != nil {
			return templ_7745c5c3_Err
		}
		return nil
	})
}

var _ = templruntime.GeneratedTemplate
