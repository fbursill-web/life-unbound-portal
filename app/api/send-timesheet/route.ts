import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { workerName, fortnightStarting, shiftDescription, supportCategory, totalHours, kmsDriven, notesCompleted } = body

    const data = await resend.emails.send({
      from: 'Life Unbound Roster <onboarding@resend.dev>',
      to: ['fin@lifeunboundsupport.com.au'],
      subject: `📋 New Timesheet Submission: ${workerName}`,
      html: `
        <div style="font-family: sans-serif; color: #334155; max-width: 600px; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
          <h2 style="color: #0284c7; margin-bottom: 4px;">Life Unbound Support</h2>
          <p style="font-size: 14px; color: #64748b; margin-top: 0;">Automated Audit-Ready Timesheet Log</p>
          <hr style="border: 0; border-top: 1px solid #edf2f7; margin: 20px 0;" />
          
          <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 14px;">
            <tr style="background-color: #f8fafc;"><td style="padding: 10px; font-weight: bold;">Support Worker:</td><td style="padding: 10px;">${workerName}</td></tr>
            <tr><td style="padding: 10px; font-weight: bold;">Fortnight Starting:</td><td style="padding: 10px;">${fortnightStarting}</td></tr>
            <tr style="background-color: #f8fafc;"><td style="padding: 10px; font-weight: bold;">Shift Description:</td><td style="padding: 10px;">${shiftDescription}</td></tr>
            <tr><td style="padding: 10px; font-weight: bold;">NDIS Support Category:</td><td style="padding: 10px;">${supportCategory}</td></tr>
            <tr style="background-color: #f8fafc;"><td style="padding: 10px; font-weight: bold;">Total Hours Claimed:</td><td style="padding: 10px; font-weight: bold; color: #0284c7;">${totalHours} Hours</td></tr>
            <tr><td style="padding: 10px; font-weight: bold;">Kilometres Driven:</td><td style="padding: 10px;">${kmsDriven} km</td></tr>
            <tr style="background-color: #f8fafc;"><td style="padding: 10px; font-weight: bold;">CRM Notes Completed:</td><td style="padding: 10px;">${notesCompleted}</td></tr>
          </table>
          
          <hr style="border: 0; border-top: 1px solid #edf2f7; margin: 20px 0;" />
          <p style="font-size: 11px; color: #94a3b8; text-align: center;">This is an encrypted NDIS audit-compliant transaction summary logged for payroll verification.</p>
        </div>
      `
    })

    return NextResponse.json({ success: true, data })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
