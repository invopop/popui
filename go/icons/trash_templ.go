// Code generated by templ - DO NOT EDIT.

// templ: version: v0.2.793
package icons

//lint:file-ignore SA4006 This context is only used if a nested component is present.

import "github.com/a-h/templ"
import templruntime "github.com/a-h/templ/runtime"

func Trash() templ.Component {
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
		_, templ_7745c5c3_Err = templ_7745c5c3_Buffer.WriteString("<svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M3.52327 13.1851L4.02224 13.1529L3.52327 13.1851ZM12.4767 13.1851L11.9778 13.1529L12.4767 13.1851ZM1.5 3.10811H1V4.10811H1.5V3.10811ZM14.5 4.10811H15V3.10811H14.5V4.10811ZM6.91892 7.12162V6.62162H5.91892V7.12162H6.91892ZM5.91892 10.9865V11.4865H6.91892V10.9865H5.91892ZM10.0811 7.12162V6.62162H9.08108V7.12162H10.0811ZM9.08108 10.9865V11.4865H10.0811V10.9865H9.08108ZM10.2381 3.73274C10.3069 4.00016 10.5795 4.16116 10.8469 4.09233C11.1143 4.0235 11.2753 3.75091 11.2065 3.48348L10.2381 3.73274ZM4.79354 3.48348C4.72471 3.75091 4.8857 4.0235 5.15313 4.09233C5.42055 4.16116 5.69314 4.00016 5.76197 3.73274L4.79354 3.48348ZM2.40644 3.6403L3.02431 13.2173L4.02224 13.1529L3.40437 3.57592L2.40644 3.6403ZM4.92576 15H11.0742V14H4.92576V15ZM12.9757 13.2173L13.5936 3.6403L12.5956 3.57592L11.9778 13.1529L12.9757 13.2173ZM13.0946 3.10811H2.90541V4.10811H13.0946V3.10811ZM1.5 4.10811H2.90541V3.10811H1.5V4.10811ZM13.0946 4.10811H14.5V3.10811H13.0946V4.10811ZM11.0742 15C12.0789 15 12.911 14.2199 12.9757 13.2173L11.9778 13.1529C11.947 13.6293 11.5516 14 11.0742 14V15ZM3.02431 13.2173C3.089 14.2199 3.92107 15 4.92576 15V14C4.44835 14 4.05297 13.6293 4.02224 13.1529L3.02431 13.2173ZM5.91892 7.12162V10.9865H6.91892V7.12162H5.91892ZM9.08108 7.12162V10.9865H10.0811V7.12162H9.08108ZM8.00001 2C9.07607 2 9.9815 2.73596 10.2381 3.73274L11.2065 3.48348C10.839 2.05561 9.5434 1 8.00001 1V2ZM5.76197 3.73274C6.01853 2.73596 6.92395 2 8.00001 2V1C6.45662 1 5.16105 2.05561 4.79354 3.48348L5.76197 3.73274Z\" fill=\"#C92D45\"></path></svg>")
		if templ_7745c5c3_Err != nil {
			return templ_7745c5c3_Err
		}
		return templ_7745c5c3_Err
	})
}

var _ = templruntime.GeneratedTemplate
